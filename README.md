# Pirate Borg Ship Generator

![Latest Release](https://img.shields.io/github/v/release/revolutionarygamesco/pb-ship-generator?label=Latest+release&style=for-the-badge)
![Foundry Version](https://img.shields.io/badge/Foundry-v13-informational?label=Foundry+version&style=for-the-badge)
![Test Status](https://img.shields.io/github/actions/workflow/status/revolutionarygamesco/pb-ship-generator/test.yml?label=Test+status&style=for-the-badge)
![License](https://img.shields.io/github/license/revolutionarygamesco/pb-ship-generator?style=for-the-badge)

A module for [Foundry VTT](https://foundryvtt.com/) and
_[Pirate Borg](https://www.limithron.com/pirateborg)_ for generating random
ships and their captains.

The base stats for sloops, brigantines, and frigates in _Pirate Borg_ is a
great start, but wouldn’t it be cool if the ships your pirates sight at sea
had evocative names, statted-out captains, varying crew sizes, varying
upgrades, and varying specialty crew members, to make each one a little bit
unique? And wouldn’t it be nice if you could get all that through a simple
dialog box that let you set the things you want, randomize the rest, generate
the actors into your Actors tab, and send a whisper to you in chat with the
details? That’s exactly what the _Pirate Borg Ship Generator_ does.

* Generate merchant, naval, or privateer vessels for the Spanish Empire, the
  British Empire, or the Kingdom of France.
* You wouldn’t normally see ships from any of the Five Admiralties of the Dutch
  Republic in the Caribbean, but the Dutch West India Company has its own fleet
  of privateers to protect its merchant vessels. Both merchant and privateer
  Dutch vessels add the fluyt as a possible ship type.
* And of course, you can also generate pirate ships.
* Merchant ships might have improved sails.
* Navy vessels have **superior firepower** (all attack dice increased by one
  size; see _Pirate Borg_, p. 112).
* Navy and privateeer vessels might have improved sails, upgraded or extra
  swivels, upgraded or extra cannons, an armored hull, and/or a ram upgrade.
* Any vessel could have a legendary captain, a strict bosun, a master gunner,
  a master of sails, and/or a master carpenter. Any ship might have a deck
  sorcerer or deck priest, but never both.
* …but only pirate ships have veteran quartermasters.
* Any ship could have a drunk crew (but a pirate crew is much more likely
  to be drunk).
* Captains can have low, medium, or high experience, and some highly
  experienced captains may even be legendary. More experienced captains
  are better armed and tend to command more upgraded ships.

***This is not an official Pirate Borg module.*** It’s a ship generator **for**
_Pirate Borg_. We’re fans and supporters of [Limithron](https://www.limithron.com/),
but we have no other relationship with them.

## Requirements

* [Foundry VTT v13](https://foundryvtt.com/)
* [Pirate Borg system](https://foundryvtt.com/packages/pirateborg)
* [Pirate Name Generator](https://foundryvtt.com/packages/revolutionary-piratenames)

## API

### `rollShip`

Uses included tables to randomize the details for a ship to generate.

#### Signature

```typescript
type Culture = 'Spanish' | 'English' | 'Scottish' | 'Welsh' | 'Irish' | 'French' | 'Dutch'
type Nationality = 'Spanish' | 'British' | 'French' | 'Dutch'
interface ShipDetails {
  nationality: Nationality
  use: Use
  pirate: boolean
  upgrades: string[]
  specialty: string[]
  name: string
  type: string
  crewSize: string
  captain: {
    culture: Culture,
    xp: string
  }
}

async (details?: Partial<ShipDetails>) => Promise<{ details: ShipDetails, captain: Actor }>
```

#### Parameters

##### `details`

Set as many or as few details about the ship as you like. The function will
fill in any that you don’t provide with randomized values (some may be based
on values that you do provide, e.g., specifying `nationality: 'Dutch'` will
mean that `type` could be `Fluyt`).

_Default:_ `undefined`

### `generateShip`

Generates a ship based on the details provided. Intended to be used with
`rollShip` (note that the parameters you pass in to this method are precisely
what `rollShip` returns).

#### Signature

```typescript
type Culture = 'Spanish' | 'English' | 'Scottish' | 'Welsh' | 'Irish' | 'French' | 'Dutch'
type Nationality = 'Spanish' | 'British' | 'French' | 'Dutch'
interface ShipDetails {
  nationality: Nationality
  use: Use
  pirate: boolean
  upgrades: string[]
  specialty: string[]
  name: string
  type: string
  crewSize: string
  captain: {
    culture: Culture,
    xp: string
  }
}

async (details: ShipDetails, captain: Actor) => Promise<Actor>
```

#### Parameters

##### `details`

Details on the ship to generate.

#### `captain`

The ship’s captain.

### `openGenerateShipDialog`

This method opens a dialog that allows a user to select the parameters for generating a ship.

#### Signature

```typescript
async (onComplete?: (details: ShipDetails, ship: Actor, captain: Actor) => Promise<void>) => Promise<void>
```

#### Parameters

##### `onComplete`

This is the method that will be called when the user clicks on the
**Generate Ship** button.

_Default:_ By default, we provide a method that whispers the ship and captain
generated to the user. In most  cases, this is the expected behavior, but you
can override this if necessary.
