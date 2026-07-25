export {}

declare global {
  namespace foundry {
    interface Game {
      pirateborg: {
        api: {
          compendium: {
            findCompendiumItem: (compendiumName: string, itemName: string) => Promise<foundry.abstract.Document | null | undefined>
          }
        }
      }
    }
  }
}