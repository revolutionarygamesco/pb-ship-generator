import { type Colors } from '../../types/enums/colors.ts'

const getSpanishShipActorName = (
  names: Record<string, string>
): string => {
  const religious = names.religious ?? 'San Erasmo'
  const secular = names.spanish ?? 'Sevilla'
  return `${religious} (${secular})`
}

const getShipActorName = (
  colors: Colors,
  names: Record<string, string>
): string => {
  if (colors === 'Spanish') return getSpanishShipActorName(names)
  return names[colors.toLowerCase()] ?? 'Hispaniola'
}

export default getShipActorName
