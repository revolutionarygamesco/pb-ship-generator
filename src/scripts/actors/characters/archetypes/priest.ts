import { getPronouns, makeLink, type Linkable } from '@revolutionarygamesco/common-foundryvtt'
import { selectRandomElement } from '@revolutionarygamesco/common'
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

const createDeckPriest = async (
  colors: Colors,
  ship: Linkable,
  folder: foundry.documents.Folder | undefined,
  naval: boolean = false
): Promise<foundry.documents.Actor> => {
  const names = await namePerson(colors, 'priest')
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

  setCharacterHP(actor, selectRandomElement(['a weak human', 'an average human']))

  const morale = ['fearful, but willing to fight', 'untrained, average human',
    'combat experience', 'military training', 'a brave leader',
    'unwise in their courage']
  let moraleStart = 0
  let moraleEnd = 5
  if (naval) { moraleStart = 3 }
  if (colors === 'Pirate') { moraleStart = 2 }
  setMorale(actor, selectRandomElement(morale.slice(moraleStart, moraleEnd)))

  const clothes = colors === 'Pirate'
    ? selectRandomElement(['uniform-old', 'clothes', 'clothes-fine'])
    : 'uniform'
  armor(actor, features, clothes)

  const weapon = naval
    ? 'cutlass'
    : selectRandomElement(['knife', 'dagger', 'smallsword', 'cudgel'])
  arm(actor, features, weapon)
  addSpeciality(features, 'priest')

  const nationality = indefiniteNationality(names[0].nationality)
  const priest = names.length > 1 && names[0].nationality === 'Irish'
    ? names[1].forms.priest
    : names[0].forms.priest
  const desc = game.i18n.localize(`${MODULE_ID}.crew.specialty.priest.description`, {
    ...getPronouns(`${MODULE_ID}.pronouns`, names[0].gender),
    priest,
    ship: makeLink(ship),
    nationality
  })

  actor.system!.description = `<p><em>${desc}</em></p>${features.join('')}`
  const created = await foundry.documents.Actor.create(actor)
  if (!created) throw new Error('Failed to create actor')
  return created
}

export default createDeckPriest
