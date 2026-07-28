import { scopeLocalizer } from '@revolutionarygamesco/common-foundryvtt'
import { MODULE_ID } from '../../../settings.ts'
import { getIcon, getToken } from '../../../premium.ts'

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

const createFrigate = (
  name: string = 'Hispaniola'
): Partial<foundry.documents.Actor> => {
  const t = scopeLocalizer([MODULE_ID, 'ships', 'frigate'].join('.'))
  const actor: Partial<foundry.documents.Actor> = {
    name,
    type: 'vehicle',
    img: getIcon('Frigate'),
    // @ts-ignore
    prototypeToken: {
      texture: {
        src: getToken('Frigate')
      }
    }
  }

  setShipHP(actor, 60)
  setHull(actor, '-d4')
  setShipAgility(actor, 0)
  setShipSpeed(actor, 4)
  setShipCrewSkill(actor, 1)
  setBroadsides(actor, 'd8', 2, t('broadsides'))
  setSmallArms(actor, 'd6', 1)
  setRamming(actor, 'd6', 1)
  setCrewSize(actor, 24 ,48)
  setCargoCapacity(actor, 4)

  return actor
}

export default createFrigate
