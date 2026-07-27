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

const createFluyt = (
  name: string = 'Rommelpot'
): Partial<foundry.documents.Actor> => {
  const actor: Partial<foundry.documents.Actor> = { name, type: 'vehicle' }

  setShipHP(actor, 50)
  setHull(actor, '-d4')
  setShipAgility(actor, -1)
  setShipSpeed(actor, 3)
  setShipCrewSkill(actor, 0)
  setBroadsides(actor, 'd10', 1)
  setSmallArms(actor, 'd6', 1)
  setRamming(actor, 'd6', 1)
  setCrewSize(actor, 10 ,40)
  setCargoCapacity(actor, 5)

  const t = scopeLocalizer([MODULE_ID, 'ships', 'fluyt'].join('.'))
  actor.system!.description = t('description')
  return actor
}

export default createFluyt
