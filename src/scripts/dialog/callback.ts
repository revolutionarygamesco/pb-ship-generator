import { chance } from '@revolutionarygamesco/common'
import { type Colors, isColors, selectRandomColors } from '../types/enums/colors.ts'
import { isShipClass, selectRandomShipClass, type ShipClass } from '../types/enums/class.ts'
import { selectRandomShipRole, type ShipRole } from '../types/enums/role.ts'
import generateShip from '../generator'
import whisperGeneratedShip from '../whisper.ts'

const defaultOnComplete = async (
  c: string,
  r: string,
  s: string
): Promise<void> => {
  const colors: Colors = isColors(c) ? c : await selectRandomColors()
  const shipClass: ShipClass = isShipClass(s) ? s : selectRandomShipClass()
  let role: ShipRole
  let privateer: boolean

  if (['merchant', 'privateer', 'naval'].includes(r)) {
    role = r === 'merchant' ? 'Merchantman' : 'Man-of-War'
    privateer = r === 'privateer'
  } else {
    role = selectRandomShipRole()
    privateer = role === 'Man-of-War' && chance(2, 3)
  }

  const { ship, captain } = await generateShip({ colors, role, privateer, shipClass })
  await whisperGeneratedShip(colors, role, privateer, shipClass, ship, captain, [game.user.id])
}

export default defaultOnComplete
