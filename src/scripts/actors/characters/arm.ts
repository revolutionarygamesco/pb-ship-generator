import slugify from 'slugify'
import { isString } from '@revolutionarygamesco/common'

export interface Arms {
  id: string
  name: string
  formula: string
  special?: string
}

export const arms: Map<string, Arms> = new Map<string, Arms>()

const data: Array<Omit<Arms, 'id'>> = [
  { name: 'Fisticuffs', formula: 'd2' },
  { name: 'Broken Bottle', formula: 'd2' },
  { name: 'Knife', formula: 'd4' },
  { name: 'Dagger', formula: 'd4' },
  { name: 'Hook', formula: 'd4' },
  { name: 'Bayonet', formula: 'd4' },
  { name: 'Belaying Pin', formula: 'd4' },
  { name: 'Marlinspike', formula: 'd4' },
  { name: 'Wood Plank', formula: 'd4' },
  { name: 'Whale Bone', formula: 'd4' },
  { name: 'Smallsword', formula: 'd4' },
  { name: 'Cudgel', formula: 'd4' },
  { name: 'Cat o’ Nine Tails', formula: 'd4', special: '10\' reach' },
  { name: 'Heavy Club', formula: 'd6' },
  { name: 'Chain', formula: 'd6' },
  { name: 'Grappling Hook', formula: 'd6' },
  { name: 'Machete', formula: 'd6' },
  { name: 'Boarding Axe', formula: 'd6' },
  { name: 'Hatchet', formula: 'd6' },
  { name: 'Tomahawk', formula: 'd6' },
  { name: 'Cutlass', formula: 'd6' },
  { name: 'Scimitar', formula: 'd6' },
  { name: 'Rapier', formula: 'd6' },
  { name: 'Broadsword', formula: 'd8' },
  { name: 'Officer’s Cutlass', formula: 'd8' },
  { name: 'Harpoon', formula: 'd8' },
  { name: 'Finely Crafted Rapier', formula: 'd8' },
  { name: 'Anchor', formula: 'd10', special: 'two-handed' },
  { name: 'Boarding Pike', formula: 'd10', special: 'two-handed, 10\' reach' },
  { name: 'Throwing Knives', formula: 'd4' },
  { name: 'Throwing Axes', formula: 'd6' },
  { name: 'Harpoon Gun', formula: 'd8', special: 'Strength DR12 or pulled to shooter' },
  { name: 'Flintlock', formula: '2d4', special: 'reload 2 actions, range 30\'' },
  { name: 'Blunderbuss', formula: 'd4', special: 'reload 2 actions, range 30\', d1o damage under 10\'' },
  { name: 'Musket', formula: '2d6', special: 'reload 2 actions, range 150\'' },
  { name: 'Buccaneer Musket', formula: '2d8', special: 'reload 2 actions, range 150\'' }
]

for (const weapon of data) {
  const id = slugify(weapon.name, { strict: true }).toLowerCase()
  arms.set(id, { id, ...weapon })
}

const arm = (
  actor: Partial<foundry.documents.Actor>,
  features: string[],
  weapon: string | Arms = 'fisticuffs'
): void => {
  const w = isString(weapon) ? arms.get(weapon) : weapon
  if (!w) return

  if (!actor.system) actor.system = {}
  if (!actor.system.attributes) actor.system.attributes = {}
  if (!actor.system.attributes.attack) actor.system.attributes.attack = { formula: 'd2', description: 'Fisticuffs' }

  const { name, formula, special } = w
  actor.system.attributes.attack.formula = formula
  actor.system.attributes.attack.description = name

  const description = special
    ? `<p><strong>${name}:</strong> ${formula}, ${special}.</p>`
    : `<p><strong>${name}:</strong> ${formula}</p>`
  features.push(description)
}

export default arm
