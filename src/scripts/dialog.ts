import { MODULE_ID } from './settings.ts'
import { localize } from './wrapper.ts'
import { tables } from './ids.ts'
import rollShip from './roll.ts'
import generateShip from './ship.ts'
import rollTable from './roll-table.ts'

const isNationality = (candidate: unknown): candidate is Nationality => {
  if (typeof candidate !== 'string') return false
  const valid = ['Spanish', 'British', 'French', 'Dutch']
  return valid.includes(candidate)
}

const isUse = (candidate: unknown): candidate is Use => {
  if (typeof candidate !== 'string') return false
  const valid = ['Merchant', 'Naval', 'Privateer']
  return valid.includes(candidate)
}

const setOption = (opt: HTMLOptionElement, hide: boolean = false) => {
  opt.hidden = hide
  opt.disabled = hide
}

const filterTypeOptions = (
  nationalities: NodeListOf<HTMLInputElement>,
  uses: HTMLSelectElement,
  types: HTMLSelectElement
) => {
  const nation = Array.from(nationalities).find(input => input.checked)?.value
  const use = uses.value
  const options = Array.from(types.options)

  for (const use of Array.from(uses.options)) {
    let hide = false
    if (nation === 'Dutch' && use.value === 'Naval') hide = true
    if (nation === 'Pirate' && use.value !== 'Privateer') hide = true
    setOption(use, hide)
  }

  for (const type of Array.from(types.options)) {
    const requirements = {
      nation: type.dataset.nationality,
      use: type.dataset.use
    }

    let hide = false
    if (requirements.nation && requirements.nation !== nation) hide = true
    if (requirements.use && requirements.use !== use) hide = true
    setOption(type, hide)

    if (hide && type.selected) {
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
    : localize(`${MODULE_ID}.message.content.${details.nationality.toLowerCase()}.${details.use.toLowerCase()}`, links)

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

  const uses = ['Random', 'Merchant', 'Privateer', 'Naval'].map(t => {
    const value = localize(`${MODULE_ID}.dialog.use.options.${t}`)
    return t === 'random'
      ? `<option value="${t}" selected>${value}</option>`
      : `<option value="${t}">${value}</option>`
  }).join('\n')

  const types = ['random', 'brigantine', 'fluyt', 'frigate', 'manowar', 'sloop'].map(t => {
    const data: Record<string, string> = {}
    if (t === 'fluyt') data.nationality = 'Dutch'
    if (t === 'manowar') data.use = 'Naval'
    let attrs = Object.keys(data)
      .map(key => `data-${key}="${data[key]}"`)
      .join(' ')

    const value = localize(`${MODULE_ID}.dialog.type.options.${t}`)
    if (t === 'random') attrs += ' selected'
    return attrs.length > 0
      ? `<option value="${value}" ${attrs}>${value}</option>`
      : `<option value="${value}">${value}</option>`
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
          <label for="generate-ship-dialog-use">
            ${localize(`${MODULE_ID}.dialog.use.label`)}
          </label>
          <p class="hint">
            ${localize(`${MODULE_ID}.dialog.use.hint`)}
          </p>
          <select name="use" id="generate-ship-dialog-use">
            ${uses}
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
          const use: string | undefined = (coll.namedItem('use') as HTMLSelectElement).value
          const type: string | undefined = (coll.namedItem('type') as HTMLSelectElement).value

          let nationality: Nationality = isNationality(nation) ? nation : 'British'
          if (nation === 'Pirate') {
            nationality = 'British'
          } else if (nation === 'Random') {
            const result = await rollTable(tables.colors, { displayChat: false })
            if (result && isNationality(result[0].description)) { nationality = result[0].description }
          }

          let usage: Use = isUse(use) ? use : 'Merchant'
          if (nation === 'Pirate') {
            usage = 'Privateer'
          } else if (use === 'Random') {
            const result = await rollTable(tables.uses, { displayChat: false })
            if (result && isUse(result[0].name)) { usage = result[0].name }
          }

          if (nation === 'Pirate' && usage !== 'Privateer') { usage = 'Privateer' }
          if (nation === 'Dutch' && usage === 'Naval') { usage = 'Merchant' }

          const determined: Partial<ShipDetails> = { nationality, use: usage, pirate: nation === 'Pirate' }
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
  const elements: { nations: NodeListOf<HTMLInputElement>, uses: HTMLSelectElement, types: HTMLSelectElement } = {
    nations: html.querySelectorAll('input[name="nationality"]') as NodeListOf<HTMLInputElement>,
    uses: html.querySelector('select[name="use"]') as HTMLSelectElement,
    types: html.querySelector('select[name="type"]') as HTMLSelectElement
  }

  const handler = () => filterTypeOptions(elements.nations, elements.uses, elements.types)
  elements.nations.forEach(input => input.addEventListener('change', handler))
  elements.uses.addEventListener('change', handler)
  handler()
}

export default openGenerateShipDialog
