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

const createBrigantine = (
  name: string = 'Hispaniola'
): Partial<foundry.documents.Actor> => {
  const actor: Partial<foundry.documents.Actor> = { name, type: 'vehicle' }

  setShipHP(actor, 40)
  setHull(actor, '-d4')
  setShipAgility(actor, 1)
  setShipSpeed(actor, 4)
  setShipCrewSkill(actor, 0)
  setBroadsides(actor, 'd8', 1)
  setSmallArms(actor, 'd4', 1)
  setRamming(actor, 'd6', 1)
  setCrewSize(actor, 15 ,30)
  setCargoCapacity(actor, 3)

  const t = scopeLocalizer([MODULE_ID, 'ships', 'brigantine'].join('.'))
  actor.system!.description = t('description')
  return actor
}

export default createBrigantine
