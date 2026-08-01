# Pirate Borg Ship Generator

![Latest Release](https://img.shields.io/github/v/release/revolutionarygamesco/pb-ship-generator?label=Latest+release&style=for-the-badge)
![Foundry Version](https://img.shields.io/badge/Foundry-v14-informational?label=Foundry+version&style=for-the-badge)
![Test Status](https://img.shields.io/github/actions/workflow/status/revolutionarygamesco/pb-ship-generator/test.yml?label=Test+status&style=for-the-badge)
![License](https://img.shields.io/github/license/revolutionarygamesco/pb-ship-generator?style=for-the-badge)

A module for [Foundry VTT](https://foundryvtt.com/) and
_[Pirate Borg](https://www.limithron.com/pirateborg)_ for generating random
ships, their captains, and specialty crew.

The base stats for sloops, brigantines, and frigates in _Pirate Borg_ are a
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
  of armed merchant vessels. They add the fluyt to the list of ship classes.
* And of course, you can also generate pirate ships.
* Navy vessels have **superior firepower** (all attack dice increased by one
  size; see _Pirate Borg_, p. 112).
* Ships might have improved sails, upgraded or extra swivels, upgraded or extra
  cannons, an armored hull, and/or a ram upgrade.
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

* [Foundry VTT v14](https://foundryvtt.com/)
* [Pirate Borg system](https://foundryvtt.com/packages/pirateborg)
* [Pirate Name Generator](https://foundryvtt.com/packages/revolutionary-piratenames)

## API

### `generateShip`

Generates a ship.

#### Signature

```typescript
type Colors = 'Spanish' | 'British' | 'French' | 'Dutch'  |'Pirate'
type ShipRole = 'Merchantman' | 'Man-of-War'
type ShipClass = 'Sloop' | 'Brigantine' | 'Frigate' | 'Fluyt' | 'Man-of-War'

interface GenerateShipParams {
  colors: Colors
  role: ShipRole
  privateer: boolean
  shipClass: ShipClass
}

async (params?: Partial<GenerateShipParams>) => Promise<{
  ship: foundry.documents.Actor,
  captain: foundry.documents.Actor
}>
```

#### Parameters

##### `params.colors: Colors`

Whether to generate a Spanish, British, French, Dutch, or pirate ship.

_Default:_ `undefined`, randomizes based on relative presence in the Caribbean
in the early 18th century (usually Spain, sometimes England, more rarely
French, and very rarely Dutch or pirate).

##### `params.role: ShipRole`

Whether to generate a merchantman or a man-of-war.

_Default:_ `undefined`, randomizes (overwhelmingly merchant vessels, but a
man-of-war about 1 time in 10).

##### `params.privateer: boolean`

If this is a man-of-war, is it a privateer ship (`true`) or a naval ship
(`false`)? Ignored for merchantmen.

_Default:_ `undefined`, randomizes (2 in 3 chances of `true`).

##### `params.shipClass: ShipClass`

The class of ship to generate. Note that `Fluyt` only works for Dutch ships and
`Man-of-War` only works for naval ships.

_Default:_ `undefined`, randomizes (`Sloop` is most common).

### `openGenerateShipDialog`

This method opens a dialog that allows a user to select the parameters for generating a ship.

#### Signature

```typescript
async (onComplete?: (
  colors: string,
  role: string,
  shipClass: string
) => Promise<void>) => Promise<void>
```

#### Parameters

##### `onComplete`

This is the method that will be called when the user clicks on the
**Generate Ship** button. Passes the `colors`, `role`, and `shipClass` that
the user selected as `string` parameters.

_Default:_ By default, we provide a method that generates the ship whispers it
and its and captain to the user. In most  cases, this is the expected behavior,
but you can override this if necessary.

## Migrating from v1 to v2

If you’ve been using Pirate Borg Ship Generator v1, the biggest upgrade concern
are some changes we’ve made to the folder structure. Instead of putting ships
in one category and captains in another, we now create a folder for each ship
and place the ship, the captain, and all the specialty crew (new to v2; in v1
we assigned the features to the ship, but we didn’t actually create crew
members) all to that folder.

This does mean that you could run into some trouble trying to run the new
version with the old folders. We recommend the following steps:

1. Go to the **Actors** tab in the sidebar.
2. Move any ships or captains you want to keep into another folder.
3. Right click on **Generated Ships**.
4. Select **Delete All**.
5. When the confirmation dialog asks if you’re sure, click **Yes**.
6. Reload the page.