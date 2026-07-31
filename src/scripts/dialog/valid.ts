const getValidOptions = (
  colors: string = 'Spanish',
  role: string = 'merchant'
): { roles: string[], shipClasses: string[] } => {
  let roles = ['random', 'merchant', 'privateer', 'naval']
  if (colors === 'Dutch') roles = ['random', 'merchant']
  if (colors === 'Pirate') roles = ['random', 'privateer']

  let shipClasses = ['Random', 'Sloop', 'Brigantine', 'Frigate']
  if (colors === 'Dutch') shipClasses.push('Fluyt')
  if (role === 'naval') shipClasses.push('Man-of-War')

  return { roles, shipClasses }
}

export default getValidOptions
