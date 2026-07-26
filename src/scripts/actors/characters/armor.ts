import { isString } from '@revolutionarygamesco/common'
import { scopeLocalizer } from '@revolutionarygamesco/common-foundryvtt'
import { MODULE_ID } from '../../settings.ts'
import { isSpecialArm, type Arm, type SpecialArm } from './arm.ts'

export const armors: Map<string, { formula: string, special: boolean }> = new Map()
armors.set('none', { formula: '0', special: false })
armors.set('rags', { formula: '0', special: false })
armors.set('clothes', { formula: '0', special: false })
armors.set('clothes-fine', { formula: '0', special: true })
armors.set('uniform', { formula: '0', special: false })
armors.set('uniform-old', { formula: '0', special: false })
armors.set('leather', { formula: '-d2', special: false })
armors.set('leather-doublet', { formula: '-d2', special: false })
armors.set('hide', { formula: '-d2', special: false })
armors.set('chain', { formula: '-d4', special: true })
armors.set('plate', { formula: '-d6', special: true })

const findStandardArmor = (key: string = 'none'): Arm | SpecialArm => {
  const k = armors.has(key) ? key : 'none'
  const { formula, special: hasSpecial } = armors.get(k)!
  const t = scopeLocalizer([MODULE_ID, 'crew', 'armor', key].join('.'))
  const arm: Arm = { name: t('name'), formula }
  return hasSpecial
    ? { ...arm, special: t('special') } as SpecialArm
    : arm
}

const armor = (
  actor: Partial<foundry.documents.Actor>,
  features: string[],
  equipment: string | Arm | SpecialArm = 'none'
): void => {
  const arm = isString(equipment) ? findStandardArmor(equipment) : equipment
  const { name: description, formula } = arm
  const special = isSpecialArm(arm) ? arm.special : null

  if (!actor.system) actor.system = {}
  if (!actor.system.attributes) actor.system.attributes = {}
  if (!actor.system.attributes.armor) actor.system.attributes.armor = { formula, description }

  const texts = []
  if (formula !== '0') texts.push(formula)
  if (special) texts.push(special)
  const text = texts.join(', ')
  const feature = text.length > 0
    ? `<p><strong>${description}:</strong> ${text}</p>`
    : `<p><strong>${description}</strong></p>`
  features.push(feature)
}

export default armor
