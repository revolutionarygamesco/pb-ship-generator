import { scopeLocalizer } from '@revolutionarygamesco/common-foundryvtt'
import { MODULE_ID } from '../../../settings.ts'

import setShipHP from '../hp.ts'
import setHull from '../hull.ts'
import setShipAgility from '../agility.ts'
import setShipSpeed from '../speed.ts'
import setShipCrewSkill from '../crew-skill.ts'
import setBroadsides from '../broadsides.ts'
import setSmallArms from '../small-arms.ts'
import setRamming from '../ram.ts'
import setCrewSize from '../crew-size.ts'
import setCargoCapacity from '../cargo.ts'

const createGalleon = (): Partial<foundry.documents.Actor> => {
  const actor: Partial<foundry.documents.Actor> = {}
  const t = scopeLocalizer([MODULE_ID, 'ships', 'galleon'].join('.'))

  setShipHP(actor, 65)
  setHull(actor, '-d6')
  setShipAgility(actor, -3)
  setShipSpeed(actor, 2)
  setShipCrewSkill(actor, 1)
  setBroadsides(actor, 'd10', 2, t('broadsides'))
  setSmallArms(actor, 'd6', 1)
  setRamming(actor, 'd8', 1)
  setCrewSize(actor, 30 ,60)
  setCargoCapacity(actor, 6)

  actor.system!.description = t('description')
  return actor
}

export default createGalleon
