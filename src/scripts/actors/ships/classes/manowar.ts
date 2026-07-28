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

const createManOfWar = (
  name: string = 'Hispaniola'
): Partial<foundry.documents.Actor> => {
  const t = scopeLocalizer([MODULE_ID, 'ships', 'manowar'].join('.'))
  const actor: Partial<foundry.documents.Actor> = {
    name,
    type: 'vehicle',
    img: getIcon('Man-of-War'),
    // @ts-ignore
    prototypeToken: {
      texture: {
        src: getToken('Man-of-War')
      }
    }
  }

  setShipHP(actor, 75)
  setHull(actor, '-d6')
  setShipAgility(actor, -2)
  setShipSpeed(actor, 3)
  setShipCrewSkill(actor, 2)
  setBroadsides(actor, 'd8', 3, t('broadsides'))
  setSmallArms(actor, 'd8', 1)
  setRamming(actor, 'd8', 1)
  setCrewSize(actor, 50 ,150)
  setCargoCapacity(actor, 4)

  return actor
}

export default createManOfWar
