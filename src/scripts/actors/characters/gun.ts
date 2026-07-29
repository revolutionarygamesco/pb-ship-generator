import arm, { type Arm, type SpecialArm } from './arm.ts'

const addGun = (
  features: string[] = [],
  gun: Arm | SpecialArm | string = 'flintlock'
): void => {
  arm({}, features, gun)
}

export default addGun
