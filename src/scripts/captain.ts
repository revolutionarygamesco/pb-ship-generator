import randomizeBetween from './randomizers/between.ts'
import randomChance from './randomizers/chance.ts'

const generateCaptainHP = (
  xp: string,
  legendary: boolean = false
): number => {
  const ranges: Record<string, [number, number]> = {
    Low: [4, 10],
    Medium: [4, 12],
    High: [8, 12]
  }
  const index = xp in ranges ? xp : 'Medium'
  const [min, max] = ranges[index]
  return legendary
    ? randomizeBetween(min, max) + randomizeBetween(1, 12)
    : randomizeBetween(min, max)
}

const generateCaptainMorale = (
  xp: string,
  legendary: boolean = false
): number => {
  const ranges: Record<string, [number, number]>  = {
    Low: [2, 8],
    Medium: [6, 9],
    High: [7, 10]
  }
  const index = xp in ranges ? xp : 'Medium'
  const [min, max] = ranges[index]
  return legendary
    ? randomizeBetween(min, max) + 1
    : randomizeBetween(min, max)
}

const getWeapon = (xp: string): {
  description: string,
  formula: string
} => {
  const { check: prefersRapier} = randomChance(1, 4)
  if (prefersRapier && xp === 'High') {
    return { description: 'Finely-crafted rapier', formula: 'd8' }
  } else if (prefersRapier) {
    return { description: 'Rapier', formula: 'd6' }
  } else if (xp === 'High') {
    return { description: 'Officer’s cutlass', formula: 'd8' }
  } else {
    return { description: 'Cutlass', formula: 'd6' }
  }
}

const generateCaptain = async (
  nation: Nationality,
  xp: string,
  legendary: boolean = false
): Promise<Actor> => {
  const namer = game.modules.get('revolutionary-piratenames')
  const name = namer
    ? `Captain ${await namer.api.generateName(nation, 'Masculine')}`
    : 'Captain'

  const capt = await foundry.documents.Actor.create({ name, type: 'creature' })
  const hp = generateCaptainHP(xp, legendary)
  const morale = generateCaptainMorale(xp, legendary)
  const weapon = getWeapon(xp)

  const descriptions = [
    `<p><strong>HP</strong> ${hp}</p>`,
    `<p><strong>Morale</strong> ${morale}</p>`,
    '<p><strong>No Armor</strong></p>',
    `<p><strong>${weapon.description}</strong> ${weapon.formula}</p>`,
    '<p><strong>Flintlock</strong> 2d4 (reload 2)'
  ]

  if (legendary) descriptions.push(`<p><strong>Legendary Captain</strong>: Take an extra crew action each round in naval combat, even if it has already been taken.</p>`)
  if (xp === 'High') descriptions.push(`<p><strong>Experienced Leader</strong>: Nearby allies are +2 DR to attack or defend against.</p>`)

  await capt.update({
    'system.attributes.hp.max': hp,
    'system.attributes.hp.value': hp,
    'system.attributes.morale': morale,
    'system.attributes.speed.max': 6,
    'system.attributes.speed.min': 0,
    'system.attributes.speed.value': 6,
    'system.attributes.armor.formula': '0',
    'system.attributes.armor.description': 'No armor',
    'system.attributes.attack.formula': weapon.formula,
    'system.attributes.attack.description': weapon.description,
    'system.description': descriptions.join('')
  })

  return capt
}

export default generateCaptain
