import slugify from 'slugify'
import { isString } from '@revolutionarygamesco/common'

export interface Armor {
  id: string
  name: string
  formula: string
  special?: string
}

export const armors: Map<string, Armor> = new Map<string, Armor>()

const data: Array<Omit<Armor, 'id'>> = [
  { name: 'No Armor', formula: '0' },
  { name: 'Rags', formula: '0' },
  { name: 'Common Clothes', formula: '0' },
  { name: 'Old Uniform', formula: '0' },
  { name: 'Fancy Clothes', formula: '0' },
  { name: 'Leather Armor', formula: '-d2' },
  { name: 'Hide Armor', formula: '-d2' },
  { name: 'Chain Shirt', formula: '-d4', special: 'DR +2 on Agility tests including defense' },
  { name: 'Conquistador Plate', formula: '-d6', special: 'DR +4 on Agility tests, defense is DR +2. You’ll most likely sink and drown in water.' }
]

for (const armor of data) {
  const id = slugify(armor.name, { strict: true }).toLowerCase()
  armors.set(id, { id, ...armor })
}

const armor = (
  actor: Partial<foundry.documents.Actor>,
  features: string[],
  equipment: string | Armor = 'no-armor'
): void => {
  const a = isString(equipment) ? armors.get(equipment) : equipment
  if (!a) return

  if (!actor.system) actor.system = {}
  if (!actor.system.attributes) actor.system.attributes = {}
  if (!actor.system.attributes.armor) actor.system.attributes.armor = { formula: '0', description: 'No Armor' }

  const { name, formula, special } = a
  actor.system.attributes.armor.formula = formula
  actor.system.attributes.armor.description = name

  if (formula === '0' && !special) {
    features.push(`<p><strong>${name}</strong></p>`)
  } else if (formula === '0') {
    features.push(`<p><strong>${name}:</strong> ${special}</p>`)
  } else if (special) {
    features.push(`<p><strong>${name}:</strong> ${formula}, ${special}</p>`)
  } else {
    features.push(`<p><strong>${name}:</strong> ${formula}</p>`)
  }
}

export default armor
