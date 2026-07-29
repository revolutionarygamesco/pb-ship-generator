import { getPronouns, makeLink, type Linkable } from '@revolutionarygamesco/common-foundryvtt'
import { selectRandomElement, stockArray } from '@revolutionarygamesco/common'
import { type Colors } from '../../../types/enums/colors.ts'
import { type CaptainExperience } from '../descriptions/captain.ts'
import { MODULE_ID } from '../../../settings.ts'
import namePerson from '../../../names/person.ts'
import getSailorActorName from '../../../names/selectors/sailor-actor.ts'
import arm from '../arm.ts'
import armor from '../armor.ts'
import addGun from '../gun.ts'
import setCharacterHP from '../hp.ts'
import setMorale from '../morale.ts'
import addSpeciality from '../specialty.ts'

const moraleFloor: Record<CaptainExperience, number> = {
  low: 0,
  medium: 1,
  high: 2,
  legendary: 3
}

const armory: Record<CaptainExperience, string[]> = {
  low: stockArray<string>([
      { n: 3, item: 'cutlass' },
      { n: 3, item: 'rapier' },
      { n: 1, item: 'cutlass-fine' },
      { n: 1, item: 'rapier-fine' }
    ]),
  medium: ['cutlass', 'rapier', 'cutlass-fine', 'rapier-fine'],
  high: ['cutlass-fine', 'rapier-fine'],
  legendary: ['cutlass-fine', 'rapier-fine']
}

const createCaptain = async (
  colors: Colors,
  privateer: boolean,
  experience: CaptainExperience,
  ship: Linkable,
  shipType: string,
  folder: foundry.documents.Folder | undefined,
  naval: boolean = false
): Promise<foundry.documents.Actor> => {
  const names = await namePerson(colors, 'captain')
  const name = getSailorActorName(names)
  const actor: Partial<foundry.documents.Actor> = {
    name,
    type: 'creature',
    img: `modules/${MODULE_ID}/images/icons/${colors.toLowerCase()}.webp`,
    folder,
    // @ts-ignore
    prototypeToken: {
      texture: {
        src: `modules/${MODULE_ID}/images/tokens/${colors.toLowerCase()}.webp`
      }
    }
  }

  const features: string[] = []

  const range = ['a weak human', 'an average human', 'a tough human or animal']
  let rangeStart = 0
  let rangeEnd = 2
  if (colors === 'Pirate') rangeStart = 1
  setCharacterHP(actor, selectRandomElement(range.slice(rangeStart, rangeEnd)))

  const morale = ['fearful, but willing to fight', 'untrained, average human',
    'combat experience', 'military training', 'a brave leader',
    'unwise in their courage']
  let moraleStart = moraleFloor[experience]
  let moraleEnd = 5
  if (colors === 'Pirate') moraleStart = Math.max(2, moraleStart)
  if (naval) { moraleStart = Math.max(3, moraleStart) }
  setMorale(actor, selectRandomElement(morale.slice(moraleStart, moraleEnd)))

  const clothes = colors === 'Pirate' ? 'clothes-fine' : 'uniform'
  armor(actor, features, clothes)

  arm(actor, features, selectRandomElement(armory[experience]))
  addGun(features, 'flintlock')
  addSpeciality(features, 'captain', undefined, experience === 'legendary')

  let path = 'merchant'
  if (colors === 'Dutch') path = 'dutch'
  if (colors === 'Pirate') path = 'pirate'
  if (privateer) path = 'privateer'
  if (naval) path = 'naval'

  const sovereign = game.i18n.localize(`${MODULE_ID}.sovereigns.${colors}`)
  const navy = game.i18n.localize(`${MODULE_ID}.navies.${colors}`)
  const title = names.length > 1 && names[0].nationality === 'Irish'
    ? names[1].forms.title
    : names[0].forms.title
  const desc = game.i18n.localize(`${MODULE_ID}.crew.specialty.captain.description.${path}.${experience}`, {
    ...getPronouns(`${MODULE_ID}.pronouns`, names[0].gender),
    captain: title,
    ship: makeLink(ship),
    nationality: names[0].nationality,
    colors,
    sovereign,
    navy,
    class: shipType,
  })

  actor.system!.description = `<p><em>${desc}</em></p>${features.join('')}`
  const created = await foundry.documents.Actor.create(actor)
  if (!created) throw new Error('Failed to create actor')
  return created
}

export default createCaptain
