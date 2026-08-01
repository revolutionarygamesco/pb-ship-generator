import { type SpecialtyCrewGenerationParams } from './params.ts'
import generateCaptain from './captain.ts'
import generateBosun from './bosun.ts'
import generateCarpenter from './carpenter.ts'
import generateGunner from './gunner.ts'
import generateMagician from './magician.ts'
import generateMaster from './master.ts'
import generateQuartermaster from './quartermaster.ts'
import generateDrunks from './drunk.ts'

interface Crew {
  captain: foundry.documents.Actor
  features: string[]
  crews: string[]
}

const generateCrew = async (
  params: SpecialtyCrewGenerationParams
): Promise<Crew> => {
  const captain = await generateCaptain(params)
  await generateQuartermaster(params)
  await generateMaster(params)
  await generateBosun(params)
  await generateCarpenter(params)
  await generateGunner(params)
  await generateMagician(params)
  await generateDrunks(params)
  const { features, crews } = params
  return { captain, features, crews }
}

export default generateCrew
