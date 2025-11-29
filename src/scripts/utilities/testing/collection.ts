class Collection<K, V> extends Map<K, V> {
  find(predicate: (value: V, key: K, collection: this) => boolean): V | undefined {
    for (const [key, value] of this.entries()) {
      if (predicate(value, key, this)) return value
    }
    return undefined
  }

  filter(predicate: (value: V, key: K, collection: this) => boolean): V[] {
    const results: V[] = []
    for (const [key, value] of this.entries()) {
      if (predicate(value, key, this)) results.push(value)
    }
    return results
  }

  map<T>(callback: (value: V, key: K, collection: this) => T): T[] {
    const results: T[] = []
    for (const [key, value] of this.entries()) {
      results.push(callback(value, key, this))
    }
    return results
  }

  some(predicate: (value: V, key: K, collection: this) => boolean): boolean {
    for (const [key, value] of this.entries()) {
      if (predicate(value, key, this)) return true
    }
    return false
  }

  every(predicate: (value: V, key: K, collection: this) => boolean): boolean {
    for (const [key, value] of this.entries()) {
      if (!predicate(value, key, this)) return false
    }
    return true
  }

  reduce<T>(callback: (accumulator: T, value: V, key: K, collection: this) => T, initial: T): T {
    let accumulator = initial
    for (const [key, value] of this.entries()) {
      accumulator = callback(accumulator, value, key, this)
    }
    return accumulator
  }

  getName(name: string): V | undefined {
    return this.find(v => (v as any).name === name)
  }

  get contents(): V[] {
    return Array.from(this.values())
  }
}

;(global as any).Collection = Collection

export default Collection
