import { MODULE_ID } from './settings.ts'
import { localize } from './wrapper.ts'
import rollShip from './roll.ts'
import generateShip from './ship.ts'

const isNationality = (candidate: unknown): candidate is Nationality => {
  if (typeof candidate !== 'string') return false
  const valid = ['Spanish', 'British', 'French', 'Dutch']
  return valid.includes(candidate)
}

const filterTypeOptions = (
  nationalities: NodeListOf<HTMLInputElement>,
  purposes: HTMLSelectElement,
  types: HTMLSelectElement
) => {
  const nation = Array.from(nationalities).find(input => input.checked)?.value
  const purpose = purposes.value
  const options = Array.from(types.options)

  for (const option of options) {
    const requirements = {
      nation: option.dataset.nationality,
      purpose: option.dataset.purpose
    }

    let hide = false
    if (requirements.nation && requirements.nation !== nation) hide = true
    if (requirements.purpose && requirements.purpose !== purpose) hide = true

    option.hidden = hide
    option.disabled = hide

    if (hide && option.selected) {
      const rnd = options.find(opt => opt.value === 'random')
      if (rnd) rnd.selected = true
    }
  }
}

const defaultOnComplete = async (
  details: ShipDetails,
  ship: Actor,
  captain: Actor
) => {
  const links: { ship: string, type: string, captain: string } = {
    ship: `@UUID[Actor.${ship.id}]{${ship.name}}`,
    type: details.type.toLowerCase(),
    captain: `@UUID[Actor.${captain.id}]{${captain.name}}`
  }

  const content = details.pirate
    ? localize(`${MODULE_ID}.message.content.pirate`, links)
    : details.nationality === 'Dutch'
      ? localize(`${MODULE_ID}.message.content.dutch`, links)
      : details.naval
        ? localize(`${MODULE_ID}.message.content.${details.nationality.toLowerCase()}.naval`, links)
        : localize(`${MODULE_ID}.message.content.${details.nationality.toLowerCase()}.merchant`, links)

  await foundry.documents.ChatMessage.create({
    speaker: { alias: localize(`${MODULE_ID}.message.speaker`) },
    flavor: localize(`${MODULE_ID}.message.flavor`),
    content,
    whisper: [game.user.id]
  })
}

const openGenerateShipDialog = async (
  onComplete: (details: ShipDetails, ship: Actor, captain: Actor) => Promise<void> = defaultOnComplete
): Promise<void> => {
  const title = localize(`${MODULE_ID}.dialog.title`)

  const nationalities = ['Random', 'Spanish', 'British', 'French', 'Dutch', 'Pirate'].map(nation => {
    const value = localize(`${MODULE_ID}.dialog.nationalities.options.${nation}`)
    const input = nation === 'Random'
      ? `<input type="radio" name="nationality" value="${nation}" id="nationality-${nation}" checked />`
      : `<input type="radio" name="nationality" value="${nation}" id="nationality-${nation}" />`
    const flag = `<img src="/modules/${MODULE_ID}/images/${nation.toLowerCase()}.png" alt="${value}" class="flag" />`
    const label = `<label for="nationality-${nation}">${flag} ${value}</label>`
    return `<li>${input}\n${label}</li>`
  }).join('\n')

  const purposes = ['random', 'merchant', 'naval'].map(t => {
    const value = localize(`${MODULE_ID}.dialog.purpose.options.${t}`)
    return t === 'random'
      ? `<option value="${t}" selected>${value}</option>`
      : `<option value="${t}">${value}</option>`
  }).join('\n')

  const types = ['random', 'brigantine', 'fluyt', 'frigate', 'manowar', 'sloop'].map(t => {
    const data: Record<string, string> = {}
    if (t === 'fluyt') data.nationality = 'Dutch'
    if (t === 'manowar') data.purpose = 'naval'
    let attrs = Object.keys(data)
      .map(key => `data-${key}="${data[key]}"`)
      .join(' ')

    const value = localize(`${MODULE_ID}.dialog.type.options.${t}`)
    if (t === 'random') attrs += ' selected'
    return attrs.length > 0
      ? `<option value="${t}" ${attrs}>${value}</option>`
      : `<option value="${t}">${value}</option>`
  }).join('\n')

  const dialog = new foundry.applications.api.DialogV2({
    id: `${MODULE_ID}-generate-ship`,
    window: { title },
    position: { width: 600 },
    content: `
        <fieldset class="generate-ship-dialog-nationality">
          <legend>${localize(`${MODULE_ID}.dialog.nationalities.label`)}</legend>
          <ul>
            ${nationalities}
          </ul>
        </fieldset>
        <fieldset class="generate-ship-dialog-other">
          <label for="generate-ship-dialog-purpose">
            ${localize(`${MODULE_ID}.dialog.purpose.label`)}
          </label>
          <p class="hint">
            ${localize(`${MODULE_ID}.dialog.purpose.hint`)}
          </p>
          <select name="purpose" id="generate-ship-dialog-purpose">
            ${purposes}
          </select>
          
          <label for="generate-ship-dialog-type">
            ${localize(`${MODULE_ID}.dialog.type.label`)}
          </label>
          <p class="hint">
            ${localize(`${MODULE_ID}.dialog.type.hint`)}
          </p>
          <select name="type" id="generate-ship-dialog-type">
            ${types}
          </select>
        </fieldset>
      `,
    buttons: [
      {
        action: 'generate',
        label: localize(`${MODULE_ID}.dialog.actions.generate`),
        callback: async (_event: Event, button: HTMLButtonElement) => {
          const coll = button.form?.elements
          if (!coll) return

          const nation: string | undefined = (coll.namedItem('nationality') as RadioNodeList).value
          const purpose: string | undefined = (coll.namedItem('purpose') as HTMLSelectElement).value
          const type: string | undefined = (coll.namedItem('type') as HTMLSelectElement).value

          const determined: Partial<ShipDetails> = {}
          if (isNationality(nation)) determined.nationality = nation
          if (nation === 'Pirate') determined.pirate = true
          if (purpose === 'naval') determined.naval = true
          if (purpose === 'merchant') determined.naval = false
          if (type !== 'random') determined.type = type

          const { captain, details } = await rollShip(determined)
          const ship = await generateShip(details, captain)

          await onComplete(details, ship, captain)
        }
      },
      {
        action: 'cancel',
        label: localize(`${MODULE_ID}.dialog.actions.cancel`),
        callback: async () => {
          await dialog.close()
        }
      }
    ]
  })

  await dialog.render(true)
  const html = dialog.element
  const elements: { nations: NodeListOf<HTMLInputElement>, purposes: HTMLSelectElement, types: HTMLSelectElement } = {
    nations: html.querySelectorAll('input[name="nationality"]') as NodeListOf<HTMLInputElement>,
    purposes: html.querySelector('select[name="purpose"]') as HTMLSelectElement,
    types: html.querySelector('select[name="type"]') as HTMLSelectElement
  }

  const handler = () => filterTypeOptions(elements.nations, elements.purposes, elements.types)
  elements.nations.forEach(input => input.addEventListener('change', handler))
  elements.purposes.addEventListener('change', handler)
  handler()
}

export default openGenerateShipDialog
