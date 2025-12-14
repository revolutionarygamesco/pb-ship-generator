export const icons = {
  brigantine: 'icons/brigantine-icon.webp',
  fluyt: 'icons/fluyt-icon.webp',
  frigate: 'icons/frigate-icon.webp',
  manowar: 'icons/man-of-war-icon.webp',
  sloop: 'icons/sloop-icon.webp',
}

export const tokens = {
  brigantine: 'Tokens/Brigantine-3x3.png',
  frigate: 'Tokens/Frigate-3x3.png',
  manowar: 'Tokens/ManOfWar-Guns-3x3.png',
  sloop: 'Tokens/Sloop-3x3.png',
}

export const isPremium = (): boolean => {
  if (!game) return false
  const mod = game.modules.get('pirate-borg-premium')
  return Boolean(mod)
}
