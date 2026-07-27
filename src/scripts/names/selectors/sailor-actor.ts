import { type PersonalNameData } from '../person.ts'

const getSailorActorName = (
  names: PersonalNameData[]
): string => {
  if (names[0].forms.short) return names[0].forms.short
  if (names[0].nationality === 'Irish') return `${names[0].forms.full} (${names[1].forms.full})`
  return names[0].forms.full ?? names[0].forms.personal
}

export default getSailorActorName
