import { getPronouns, makeLink, type Linkable } from '@revolutionarygamesco/common-foundryvtt'
import { selectRandomElement } from '@revolutionarygamesco/common'
import { type Colors } from '../../../types/enums/colors.ts'
import { MODULE_ID } from '../../../settings.ts'
import { indefiniteNationality } from '../../../types/enums/nationality.ts'
import namePerson from '../../../names/person.ts'
import getSailorActorName from '../../../names/selectors/sailor-actor.ts'
import arm from '../arm.ts'
import armor from '../armor.ts'
import addGun from '../gun.ts'
import setCharacterHP from '../hp.ts'
import setMorale from '../morale.ts'
import addSpeciality from '../specialty.ts'

const createMasterGunner = async (
  colors: Colors,
  ship: Linkable,
  folder: foundry.documents.Folder | undefined,
  naval: boolean = false
): Promise<foundry.documents.Actor> => {
  const names = await namePerson(colors, 'gunner')
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

  const morale = ['combat experience', 'military training', 'a brave leader',
    'unwise in their courage']
  let moraleStart = 0
  let moraleEnd = 3
  if (naval) { moraleStart = 1 }
  setMorale(actor, selectRandomElement(morale.slice(moraleStart, moraleEnd)))

  const clothes = colors === 'Pirate' ? selectRandomElement(['uniform-old', 'clothes']) : 'uniform'
  armor(actor, features, clothes)

  const weapon = naval
    ? 'cutlass'
    : selectRandomElement(['knife', 'dagger', 'bayonet', 'smallsword',
      'machete', 'hatchet', 'tomahawk', 'cutlass', 'broadsword'])
  arm(actor, features, weapon)
  addGun(features, 'flintlock')
  addSpeciality(features, 'gunner', undefined, names[0].gender)

  const nationality = indefiniteNationality(names[0].nationality)
  const mister = names.length > 1 && names[0].nationality === 'Irish'
    ? names[1].forms.mister
    : names[0].forms.mister
  const desc = game.i18n.localize(`${MODULE_ID}.crew.specialty.gunner.description`, {
    ...getPronouns(MODULE_ID, names[0].gender),
    mister,
    ship: makeLink(ship),
    nationality
  })

  actor.system!.description = `<p><em>${desc}</em></p>${features.join('')}`
  const created = await foundry.documents.Actor.create(actor)
  if (!created) throw new Error('Failed to create actor')
  await created.setFlag(MODULE_ID, 'names', JSON.stringify(names))
  return created
}

export default createMasterGunner
