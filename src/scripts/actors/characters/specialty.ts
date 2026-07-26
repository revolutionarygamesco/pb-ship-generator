export const specialties: Array<[string, string[]]> = [
  ['legendary captain', [
    '<p><strong>Legendary Captain:</strong> While in command, the ship can take an extra crew action each round, even if it has already been taken.</p>',
    '<p><strong>Issue Command:</strong> The captain can take an action to give another member of the crew an action.</p>'
  ]],
  ['veteran quartermaster', [
    '<p><strong>Veteran Quartermaster:</strong> While on board the ship, crew morale tests are +3. Cargo sells for 50% more in port.</p>',
    '<p><strong>Trusted Leader:</strong> Allies are +2 DR to defend.</p>'
  ]],
  ['strict bosun', [
    '<p><strong>Strict Bosun:</strong> While serving as bosun, once per combat the ship can reroll one Crew Action test.</p>',
    '<p><strong>Threaten:</strong> The bosun can take an action to give nearby allies -2 DR to attack for the next round.</p>'
  ]],
  ['master gunner', [
    '<p><strong>Master Gunner:</strong> While serving as master gunner, ship attacks are -2 DR.</p>',
    '<p><strong>Black Powder Poet:</strong> The gunner has [[d4]] bombs, and is -2 DR when throwing them.</p>'
  ]],
  ['master of sails', [
    '<p><strong>Master of Sails:</strong> While serving as sailing master, the  ship’s Agility tests are -2 DR.</p>',
    '<p><strong>Skylarker:</strong> When attacking from the rigging, target is +2 DR to defend.</p>'
  ]],
  ['deck sorcerer', [
    '<p><strong>Deck Sorcerer:</strong> Once per naval combat, change the speed and direction of the wind.</p>',
    '<p><strong>Wither:</strong> One creature the sorcerer can see tests Toughness DR 14 or takes [[/r d8]] damage.</p>'
  ]],
  ['deck priest', [
    '<p><strong>Deck Priest:</strong> Once per naval combat, change the speed and direction of the wind.</p>',
    '<p><strong>Lay on Hands:</strong> Touch one creature to heal [[/r d4]] HP.</p>'
  ]],
  ['master carpenter', [
    '<p><strong>Master Carpenter:</strong> While serving as master carpenter, the ship’s repair actions are -5 DR.</p>',
    '<p><strong>Hole-Plugger:</strong> While sinking, roll twice and take the lower result.</p>'
  ]]
]

const addSpeciality = (
  features: string[],
  specialty?: string
): void => {
  if (!specialty) return
  const found = specialties.find(([label, _]) => label === specialty)
  if (!found) return
  features.push(...found[1])
}

export default addSpeciality
