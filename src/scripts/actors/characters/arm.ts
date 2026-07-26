import { isString, getObjectRecord } from '@revolutionarygamesco/common'
import { scopeLocalizer } from '@revolutionarygamesco/common-foundryvtt'
import { MODULE_ID } from '../../settings.ts'

export const arms: Map<string, { formula: string, special: boolean }> = new Map()
arms.set('fisticuffs', { formula: 'd2', special: false })
arms.set('bottle', { formula: 'd2', special: false })
arms.set('knife', { formula: 'd4', special: false })
arms.set('dagger', { formula: 'd4', special: false })
arms.set('hook', { formula: 'd4', special: false })
arms.set('bayonet', { formula: 'd4', special: false })
arms.set('belaying-pin', { formula: 'd4', special: false })
arms.set('marlinspike', { formula: 'd4', special: false })
arms.set('plank', { formula: 'd4', special: false })
arms.set('whale-bone', { formula: 'd4', special: false })
arms.set('smallsword', { formula: 'd4', special: false })
arms.set('cudgel', { formula: 'd4', special: false })
arms.set('cat-o-nine-tails', { formula: 'd4', special: true })
arms.set('heavy-club', { formula: 'd6', special: false })
arms.set('chain', { formula: 'd6', special: false })
arms.set('grappling-hook', { formula: 'd6', special: false })
arms.set('machete', { formula: 'd6', special: false })
arms.set('boarding-axe', { formula: 'd6', special: false })
arms.set('hatchet', { formula: 'd6', special: false })
arms.set('tomahawk', { formula: 'd6', special: false })
arms.set('cutlass', { formula: 'd6', special: false })
arms.set('cutlass-fine', { formula: 'd8', special: false })
arms.set('scimitar', { formula: 'd6', special: false })
arms.set('rapier', { formula: 'd6', special: false })
arms.set('rapier-fine', { formula: 'd8', special: false })
arms.set('broadsword', { formula: 'd8', special: false })
arms.set('harpoon', { formula: 'd8', special: false })
arms.set('anchor', { formula: 'd10', special: true })
arms.set('boarding-pike', { formula: 'd10', special: true })
arms.set('throwing-knives', { formula: 'd4', special: false })
arms.set('throwing-axes', { formula: 'd6', special: false })
arms.set('harpoon-gun', { formula: 'd8', special: true })
arms.set('flintlock', { formula: '2d4', special: true })
arms.set('blunderbuss', { formula: 'd4', special: true })
arms.set('musket', { formula: '2d6', special: true })
arms.set('musket-fine', { formula: '2d8', special: true })

export interface Arm {
  name: string,
  formula: string
}

export const isArm = (candidate: unknown): candidate is Arm => {
  const obj = getObjectRecord(candidate)
  if (!obj) return false
  return isString(obj.name) && isString(obj.formula)
}

export interface SpecialArm extends Arm {
  special: string
}

export const isSpecialArm = (candidate: unknown): candidate is SpecialArm => {
  if (!isArm(candidate)) return false
  return isString((candidate as SpecialArm).special)
}

const findStandardArm = (key: string = 'fisticuffs'): Arm | SpecialArm => {
  const k = arms.has(key) ? key : 'fisticuffs'
  const { formula, special: hasSpecial } = arms.get(k)!
  const t = scopeLocalizer([MODULE_ID, 'crew', 'weapons', key].join('.'))
  const arm: Arm = { name: t('name'), formula }
  return hasSpecial
    ? { ...arm, special: t('special') } as SpecialArm
    : arm
}

const arm = (
  actor: Partial<foundry.documents.Actor>,
  features: string[],
  weapon: string | Arm | SpecialArm = 'fisticuffs'
): void => {
  const arm = isString(weapon) ? findStandardArm(weapon) : weapon
  const { name: description, formula } = arm
  const special = isSpecialArm(arm) ? arm.special : null

  if (!actor.system) actor.system = {}
  if (!actor.system.attributes) actor.system.attributes = {}
  actor.system.attributes.attack = { formula, description }

  const feature = special
    ? `<p><strong>${description}:</strong> ${formula}, ${special}.</p>`
    : `<p><strong>${description}:</strong> ${formula}</p>`
  features.push(feature)
}

export default arm
