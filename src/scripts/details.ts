const createShipDetails = (
  overrides: Partial<ShipDetails> = {}
): ShipDetails => {
  return {
    nationality: 'Spanish',
    naval: false,
    pirate: false,
    upgrades: [],
    specialty: [],
    name: 'Santa Maria (Hispaniola)',
    type: 'Sloop',
    crewSize: 'Medium',
    ...overrides
  }
}

export default createShipDetails
