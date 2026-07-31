import { scopeLocalizer } from '@revolutionarygamesco/common-foundryvtt'
import { MODULE_ID } from '../settings.ts'
import { colors } from '../types/enums/colors.ts'
import { shipClasses } from '../types/enums/class.ts'
import initUpdateOptions from './update.ts'
import defaultOnComplete from './callback.ts'

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

  Hooks.once('renderDialogV2', initUpdateOptions)
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
