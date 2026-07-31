import getValidOptions from './valid.ts'

export const updateOptions = (html: HTMLElement): void => {
  const colors = html.querySelector<HTMLInputElement>('input[name="colors"]:checked')?.value ?? 'Random'
  const roleSelector = html.querySelector<HTMLSelectElement>('select[name="role"]')
  const role = roleSelector?.value ?? 'random'
  const classSelector = html.querySelector<HTMLSelectElement>('select[name="class"]')
  if (roleSelector === null || classSelector == null) return

  const valid = getValidOptions(colors, role)

  for (const option of Array.from(roleSelector.options)) {
    option.disabled = !valid.roles.includes(option.value)
  }

  for (const option of Array.from(classSelector.options)) {
    option.disabled = !valid.shipClasses.includes(option.value)
  }

  if (roleSelector.selectedOptions[0]?.disabled === true) roleSelector.value = 'random'
  if (classSelector.selectedOptions[0]?.disabled === true) classSelector.value = 'Random'
}

const initUpdateOptions = (
  _app: foundry.applications.api.DialogV2,
  html: HTMLElement
) => {
  updateOptions(html)

  html.querySelectorAll<HTMLInputElement>('input[name="colors"]').forEach(input => {
    input.addEventListener('change', () => updateOptions(html))
  })

  html.querySelector<HTMLSelectElement>('select[name="role"]')?.addEventListener('change', () => updateOptions(html))
}

export default initUpdateOptions
