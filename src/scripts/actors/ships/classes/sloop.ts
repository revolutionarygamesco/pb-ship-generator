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

const createSloop = (): Partial<foundry.documents.Actor> => {
  const actor: Partial<foundry.documents.Actor> = {}

  setShipHP(actor, 30)
  setHull(actor, '-d2')
  setShipAgility(actor, 2)
  setShipSpeed(actor, 5)
  setShipCrewSkill(actor, -1)
  setBroadsides(actor, 'd6', 1)
  setSmallArms(actor, 'd4', 1)
  setRamming(actor, 'd4', 1)
  setCrewSize(actor, 3 ,10)
  setCargoCapacity(actor, 2)

  const t = scopeLocalizer([MODULE_ID, 'ships', 'sloop'].join('.'))
  actor.system!.special = t('special')
  actor.system!.description = t('description')
  return actor
}

export default createSloop
