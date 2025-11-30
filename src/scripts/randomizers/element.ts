import randomizeBetween from './between.ts'

const randomElement = <T>(arr: T[]): T => {
  return arr[randomizeBetween(0, arr.length - 1)]
}

export default randomElement
