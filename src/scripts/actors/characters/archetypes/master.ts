import { getPronouns, makeLink, type Linkable } from '@revolutionarygamesco/common-foundryvtt'
import { selectRandomElement } from '@revolutionarygamesco/common'
import { type Colors } from '../../../types/enums/colors.ts'
import { type PersonalNameData } from '../../../names/person.ts'
import { MODULE_ID } from '../../../settings.ts'
import { indefiniteNationality } from '../../../types/enums/nationality.ts'
import namePerson from '../../../names/person.ts'
import getSailorActorName from '../../../names/selectors/sailor-actor.ts'
import arm from '../arm.ts'
import armor from '../armor.ts'
import setCharacterHP from '../hp.ts'
import setMorale from '../morale.ts'
import addSpeciality from '../specialty.ts'

const createSailingMaster = async (
  colors: Colors,
  ship: Linkable,
  folder: foundry.documents.Folder | undefined,
  naval: boolean = false
): Promise<{ actor: Partial<foundry.documents.Actor>, names: PersonalNameData[] }> => {
  const names = await namePerson(colors, 'master')
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

  setCharacterHP(actor, selectRandomElement(['an average human', 'a tough human or animal']))

  const morale = ['fearful, but willing to fight', 'untrained, average human',
    'combat experience', 'military training', 'a brave leader',
    'unwise in their courage']
  let moraleStart = 0
  let moraleEnd = 5
  if (naval) { moraleStart = 4 }
  setMorale(actor, selectRandomElement(morale.slice(moraleStart, moraleEnd)))

  const clothes = colors === 'Pirate'
    ? selectRandomElement(['uniform-old', 'clothes', 'clothes-fine'])
    : 'uniform'
  armor(actor, features, clothes)

  const weapon = naval
    ? 'cutlass'
    : selectRandomElement(['knife', 'dagger', 'smallsword', 'hatchet',
      'machete', 'cutlass'])
  arm(actor, features, weapon)
  addSpeciality(features, 'master', undefined, names[0].gender)

  const nationality = indefiniteNationality(names[0].nationality)
  const mister = names.length > 1 && names[0].nationality === 'Irish'
    ? names[1].forms.mister
    : names[0].forms.mister
  const desc = game.i18n.localize(`${MODULE_ID}.crew.specialty.master.description`, {
    ...getPronouns(MODULE_ID, names[0].gender),
    mister,
    ship: makeLink(ship),
    nationality
  })

  actor.system!.description = `<p><em>${desc}</em></p>${features.join('')}`
  return { actor, names }
}

export default createSailingMaster
