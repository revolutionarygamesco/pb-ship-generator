import { getPronouns, makeLink, type Linkable } from '@revolutionarygamesco/common-foundryvtt'
import { selectRandomElement } from '@revolutionarygamesco/common'
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

const createQuartermaster = async (
  ship: Linkable,
  folder: foundry.documents.Folder | undefined
): Promise<foundry.documents.Actor> => {
  const names = await namePerson('Pirate', 'quartermaster')
  const name = getSailorActorName(names)
  const actor: Partial<foundry.documents.Actor> = {
    name,
    type: 'creature',
    img: `modules/${MODULE_ID}/images/icons/pirate.webp`,
    folder,
    // @ts-ignore
    prototypeToken: {
      texture: {
        src: `modules/${MODULE_ID}/images/tokens/pirate.webp`
      }
    }
  }

  const features: string[] = []

  const range = selectRandomElement(['an average human', 'a tough human or animal'])
  setCharacterHP(actor, range)

  const morale = selectRandomElement(['combat experience', 'military training', 'a brave leader',
    'unwise in their courage'])
  setMorale(actor, morale)

  const clothes = selectRandomElement(['uniform-old', 'clothes',
    'clothes-fine', 'leather-doublet'])
  armor(actor, features, clothes)

  const weapon = selectRandomElement(['cutlass', 'broadsword', 'scimitar',
    'rapier'])
  arm(actor, features, weapon)
  addGun(features, 'flintlock')
  addSpeciality(features, 'quartermaster', undefined, names[0].gender)

  const nationality = indefiniteNationality(names[0].nationality)
  const mister = names.length > 1 && names[0].nationality === 'Irish'
    ? names[1].forms.mister
    : names[0].forms.mister
  const desc = game.i18n.localize(`${MODULE_ID}.crew.specialty.quartermaster.description`, {
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

export default createQuartermaster
