const defaultCulture: Record<Nationality, Culture> = {
  Spanish: 'Spanish',
  British: 'English',
  French: 'French',
  Dutch: 'Dutch'
}

const createShipDetails = (
  overrides: Partial<ShipDetails> = {}
): ShipDetails => {
  const nationality = overrides.nationality ?? 'Spanish'
  return {
    nationality,
    use: 'Merchant',
    type: 'Sloop',
    pirate: false,
    upgrades: [],
    specialty: [],
    name: 'Santa Maria (Hispaniola)',
    crewSize: 'Medium',
    captain: {
      culture: defaultCulture[nationality],
      xp: overrides.captain?.xp ?? 'Medium'
    },
    ...overrides
  }
}

export default createShipDetails
