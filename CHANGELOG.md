### 1.0.0
* Generate Spanish, British, French, Dutch, or pirate ships.
* Pirate ships are always privateers. Dutch ships can be privateers or merchant vessels. All others can be merchant, privateer, or naval vessels.
* Merchant ships might have improved sails. Privateer and naval vessels might have improved sails, upgraded swivels, extra swivels, upgraded cannons, extra cannons, armored hull, and/or a ram upgrade.
* Number of upgrades tied to captain experience. Highly experienced captains have a 10% chance of also being legendary. HP, morale, and armament tied to captain experience.
* Naval ships are always captained by members of the empire’s dominant culture. Merchant and privateer ships have a 1% chance of having a cross-cultural captain, except for British vessels, which have a 1 in 3 chance of being Scottish, Welsh, or Irish. Pirate captains roll on a separate table for pirate nationalities.
* Any ship could have a strict bosun, master gunner, master of sails, master carpenter, and/or drunk crew. Privateers and naval vessels are much more likely to have a master gunner than merchant vessels, and pirate vessels are much more likely to have a drunk crew than other vessels. Any ship can have a deck sorcerer or a deck priest, but never both. Only pirate ships can have a veteran quartermaster.
* Naval vessels have **superior firepower** (see _Pirate Borg_, p. 112).
* Includes:
  * A **Generate Ship** macro that launches the dialog to generate a new ship.
  * A **Sailor** Actor for a typical sailor on merchant or privateer vessels. See **Naval Crew** on _Pirate Borg_ p. 112 for a better option for naval crew.
  * Specialty crew features that can be added to any vessel.
  * 18 tables to facilitate random generation.
* Documented API methods:
  * `rollShip`
  * `generateShip`
  * `openGenerateShipDialog`
