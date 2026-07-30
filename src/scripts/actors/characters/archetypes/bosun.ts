import { getPronouns, makeLink, type Linkable } from '@revolutionarygamesco/common-foundryvtt'
import { chance, selectRandomElement, stockArray } from '@revolutionarygamesco/common'
import { type Colors } from '../../../types/enums/colors.ts'
import { MODULE_ID } from '../../../settings.ts'
import { indefiniteNationality } from '../../../types/enums/nationality.ts'
import namePerson from '../../../names/person.ts'
import getSailorActorName from '../../../names/selectors/sailor-actor.ts'
import arm from '../arm.ts'
import armor from '../armor.ts'
import setCharacterHP from '../hp.ts'
import setMorale from '../morale.ts'
import addSpeciality from '../specialty.ts'

const createBosun = async (
  colors: Colors,
  ship: Linkable,
  folder: foundry.documents.Folder | undefined,
  naval: boolean = false
): Promise<foundry.documents.Actor> => {
  const names = await namePerson(colors, 'bosun')
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
  const isFighter = chance(1, 4)

  let range = 'an average human or animal'
  if (isFighter) range = selectRandomElement(['an average human', 'a tough human or animal'])
  setCharacterHP(actor, range)

  const morale = ['fearful, but willing to fight', 'untrained, average human',
    'combat experience', 'military training', 'a brave leader', 'unwise in their courage']
  let moraleStart = 0
  let moraleEnd = 2
  if (isFighter || colors === 'Pirate') { moraleStart = 2; moraleEnd = 5 }
  if (naval) { moraleStart = 3; moraleEnd = 5 }
  setMorale(actor, selectRandomElement(morale.slice(moraleStart, moraleEnd)))

  const clothes = colors === 'Pirate' ? selectRandomElement(['uniform-old', 'clothes']) : 'uniform'
  armor(actor, features, clothes)

  const weapons = stockArray<string>([
    { n: 1, item: 'belaying-pin' },
    { n: 1, item: 'marlinspike' },
    { n: 1, item: 'smallsword' },
    { n: 1, item: 'cudgel' },
    { n: 10, item: 'cat-o-nine-tails' },
    { n: 1, item: 'heavy-club' },
    { n: 1, item: 'machete' },
    { n: 1, item: 'hatchet' },
    { n: 1, item: 'tomahawk' },
    { n: 1, item: 'cutlass' },
    { n: 1, item: 'broadsword' }
  ])
  const disallowed: string[] = []
  if (colors === 'Pirate') { disallowed.push('cat-o-nine-tails') }
  if (isFighter) { disallowed.push('belaying-pin', 'marlinspike', 'cudgel', 'cat-o-nine-tails', 'heavy-club') }
  const weapon = selectRandomElement(weapons.filter(weapon => !disallowed.includes(weapon)))
  arm(actor, features, weapon)

  const options = isFighter ? ['c'] : ['a', 'b', 'd']
  addSpeciality(features, 'bosun', options)

  const nationality = indefiniteNationality(names[0].nationality)
  const mister = names.length > 1 && names[0].nationality === 'Irish'
    ? names[1].forms.mister
    : names[0].forms.mister
  const desc = game.i18n.localize(`${MODULE_ID}.crew.specialty.bosun.description`, {
    ...getPronouns(MODULE_ID, names[0].gender),
    mister,
    ship: makeLink(ship),
    nationality
  })

  actor.system!.description = `<p><em>${desc}</em></p>${features.join('')}`
  const created = await foundry.documents.Actor.create(actor)
  if (!created) throw new Error('Failed to create actor')
  return created
}

export default createBosun
