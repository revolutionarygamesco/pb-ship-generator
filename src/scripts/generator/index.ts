import { chance } from '@revolutionarygamesco/common'
import { type GenerateShipParams } from './ship/params.ts'
import { selectRandomColors } from '../types/enums/colors.ts'
import { selectRandomShipRole } from '../types/enums/role.ts'
import { selectRandomShipClass } from '../types/enums/class.ts'
import selectRandomThreatProfile from '../randomizers/threat.ts'
import addShanties from '../randomizers/shanties.ts'
import createShipBase from './ship/base.ts'
import generateCrew from './crew/all.ts'
import updateShip from './ship/update.ts'

const generateShip = async (
  params?: Partial<GenerateShipParams>
): Promise<{ ship: foundry.documents.Actor, captain: foundry.documents.Actor }> => {
  const colors = params?.colors ?? await selectRandomColors()
  const role = params?.role ?? selectRandomShipRole()
  const privateer = params?.privateer ?? chance(2, 3)
  const shipClass = params?.shipClass ?? selectRandomShipClass()
  const isNaval = role === 'Man-of-War' && !privateer
  const { upgrades, shanties, experience } = selectRandomThreatProfile()
  const { ship, folder } = await createShipBase({ colors, privateer, shipClass, role }, upgrades)
  await addShanties(ship, shanties)

  const { captain, features, crews } = await generateCrew({
    colors,
    privateer: role === 'Man-of-War' && privateer,
    role,
    experience,
    ship,
    shipClass,
    folder,
    isNaval,
    features: [],
    crews: []
  })

  await updateShip(ship, captain, colors, role, privateer, shipClass, features, crews)
  return { ship, captain }
}

export default generateShip
