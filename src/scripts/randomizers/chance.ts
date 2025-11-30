import shuffleArray from './shuffle.ts'
import randomElement from './element.ts'

const getTickets = (n: number, value: boolean): boolean[] => {
  const tickets: boolean[] = []
  for (let i = 0; i < n; i++) tickets.push(value)
  return tickets
}

const randomChance = (
  chances: number = 1,
  total: number = 1
): { check: boolean, data: boolean[] } => {
  const greens: boolean[] = getTickets(chances, true)
  const reds: boolean[] = getTickets(Math.max(total - chances, 0), false)
  const data = shuffleArray([...greens, ...reds])
  const check = randomElement(data)
  return { check, data }
}

export default randomChance
