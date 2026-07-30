import { chance } from '@revolutionarygamesco/common'
import { scopeLocalizer } from '@revolutionarygamesco/common-foundryvtt'
import { MODULE_ID } from './settings.ts'
import { colors, isColors, selectRandomColors, type Colors } from './types/enums/colors.ts'
import { selectRandomShipRole, type ShipRole } from './types/enums/role.ts'
import {isShipClass, selectRandomShipClass, type ShipClass, shipClasses} from './types/enums/class.ts'
import generateShip from './ship.ts'

export const defaultOnComplete = async (
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

  await generateShip({ colors, role, privateer, shipClass })
}

const openGenerateShipDialog = async (
  onComplete: (colors: string, role: string, shipClass: string) => Promise<void> = defaultOnComplete
): Promise<void> => {
  const t = scopeLocalizer([MODULE_ID, 'dialog'].join('.'))

  const colorsOptions = ['Random', ...colors].map(option => ({
    value: option,
    label: t(['colors', 'options', option]),
    flag: `modules/revolutionary-piratenames/images/${option.toLowerCase()}.webp`,
    checked: option === 'Random'
  }))

  const colorsSelection = await foundry.applications.handlebars.renderTemplate(
    `modules/${MODULE_ID}/templates/colors.hbs`,
    {
      options: colorsOptions,
      colorsLabel: t(['colors', 'label'])
    }
  )

  const roleSelector = foundry.applications.fields.createSelectInput({
    name: 'role',
    options: ['random', 'merchant', 'privateer', 'naval'].map(option => ({
      value: option,
      label: t(['role', 'options', option])
    }))
  })

  const role = foundry.applications.fields.createFormGroup({
    input: roleSelector,
    label: t(['role', 'label']),
    hint: t(['role', 'hint'])
  })

  const classSelector = foundry.applications.fields.createSelectInput({
    name: 'class',
    options: ['Random', ...shipClasses].map(option => ({
      value: option,
      label: t(['class', 'options', option])
    }))
  })

  const shipClass = foundry.applications.fields.createFormGroup({
    input: classSelector,
    label: t(['class', 'label']),
    hint: t(['class', 'hint'])
  })

  const data = await foundry.applications.api.DialogV2.input({
    window: { title: t('title') },
    position: { width: 500 },
    content: `${colorsSelection}\n${role.outerHTML}\n${shipClass.outerHTML}`,
    ok: { label: t(['actions', 'generate']) }
  })

  if (!data) return
  await onComplete(data.colors as string, data.role as string, data.class as string)
}

export default openGenerateShipDialog
