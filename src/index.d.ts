declare class ChatMessage {
  create(data?: any, operation?: any): Promise<any>
}

declare class ApplicationV2 {
  render: (options: boolean) => Promise<ApplicationV2>
  close: (options?: any) => Promise<ApplicationV2>
  _onRender(context: any, options: any): Promise<void>
  _onClose(options: any): void
}

declare class DialogV2 extends ApplicationV2 {
  element: HTMLElement
  constructor(options?: any)
  close: (options?: any) => Promise<DialogV2>
}

interface Collection<K, V> extends Map<K, V> {
  find(predicate: (value: V, key: K, collection: this) => boolean): V | undefined
  filter(predicate: (value: V, key: K, collection: this) => boolean): V[]
  map<T>(callback: (value: V, key: K, collection: this) => T): T[]
  some(predicate: (value: V, key: K, collection: this) => boolean): boolean
  every(predicate: (value: V, key: K, collection: this) => boolean): boolean
  reduce<T>(callback: (accumulator: T, value: V, key: K, collection: this) => T, initial: T): T
  getName(name: string): V | undefined
  contents: V[]
}

interface Document {
  id: string
  name: string
  img: string
  type: string
  system?: Record<string, any>
  parent?: Document
  parentCollection?: string
  toObject(source?: boolean): any
  getFlag<T>(scope: string, key: string): T
  setFlag<T>(scope: string, key: string, value: T): void
  update(data?: any, operation?: any): Promise<Document | undefined>
  createEmbeddedDocuments(type: string, data?: any, operation?: any): Promise<Document>
  deleteEmbeddedDocuments(type: string, ids: string[], operation?: any): Promise<Document>
}

interface Actor extends Document {
  collections: {
    items: Collection<string, Document>
  },
  system?: {
    attributes: {
      armor?: {
        formula: string
        description: string
      }
      attack?: {
        formula: string
        description: string
      }
      hp?: {
        max: number
        value: number
      }
      morale?: number
      special?: string
      speed?: {
        max: number
        min: number
        value: number
      }
      crew?: {
        min: number
        max: number
        value: number
      }
      featureType?: string
    },
    description?: string,
    captain?: string,
    crews?: string[]
  }
  create(data?: any, operation?: any): Promise<Actor>
}

interface Folder extends Document {
  folder?: Folder
  create(data?: any, operation?: any): Promise<Folder>
}

interface User {
  id: string
}

interface Module {
  api: Record<string, Function>
}

declare const Hooks: {
  on: (name: string, callback: (...args: any[]) => void) => number
  once: (name: string, callback: (...args: any[]) => void) => number
  off: (name: string, fn: number | Function) => void
}

declare const game: {
  i18n: {
    format: (key: string, data?: Record<string, any>) => string
    localize: (key: string) => string
  },
  folders: Collection<string, Folder>,
  modules: Collection<string, Module>,
  user: User
}

declare const foundry: {
  documents: {
    Actor: Actor
    Folder: Folder
  }
}

type Nationality = 'Spanish' | 'British' | 'French' | 'Dutch'

interface RollTableResult {
  type?: string
  img?: string
  name?: string
  description?: string
  document?: string
}

interface RollTableOptions {
  displayChat?: boolean
  recursive?: boolean
  results?: any
  roll?: any
  rollMode?: string
}

interface ShipDetails {
  nationality: Nationality
  naval: boolean
  pirate: boolean
  upgrades: string[]
  specialty: string[]
  name: string
  type: string
  crewSize: string
}
