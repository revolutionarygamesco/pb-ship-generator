import { type ShipClass } from './types/enums/class.ts'

export const premiumRoot = 'modules/pirate-borg-premium/'
export const standardIcon = 'systems/pirateborg/icons/misc/ship.png'

const tokens: Record<ShipClass, string> = {
  Brigantine: 'Tokens/Brigantine-Original-Token.webp',
  Fluyt: 'Tokens/Fluyt-Original-Token.webp',
  Frigate: 'Tokens/Frigate-Original-Token.webp',
  'Man-of-War': 'Tokens/Man-of-War-Navy-Token.webp',
  Sloop: 'Tokens/Bermuda-Sloop-Original-Token.webp'
}

const icons: Record<ShipClass, string> = {
  Brigantine: 'Icons/brigantine-icon.webp',
  Fluyt: 'Icons/fluyt-icon.webp',
  Frigate: 'Icons/frigate-icon.webp',
  'Man-of-War': 'Icons/man-of-war-icon.webp',
  Sloop: 'Icons/sloop-icon.webp'
}

export const isPremium = (): boolean => {
  if (!game) return false
  const mod = game.modules.get('pirate-borg-premium')
  return Boolean(mod)
}

export const getToken = (
  shipClass: ShipClass
): string => {
  if (isPremium()) return premiumRoot + tokens[shipClass]
  return standardIcon
}

export const getIcon = (
  shipClass: ShipClass
): string => {
  if (isPremium()) return premiumRoot + icons[shipClass]
  return standardIcon
}
