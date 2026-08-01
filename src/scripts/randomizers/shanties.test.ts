import { beforeEach, describe, expect, it, vi, type Mock } from 'vitest'
import * as findPBItemModule from '../utilities/find-pb-item.ts'
import addShanties from './shanties.ts'

describe('addShanties', () => {
  let findPBItemSpy: Mock
  let createEmbeddedDocumentsSpy: Mock
  let actor: foundry.documents.Actor

  beforeEach(() => {
    createEmbeddedDocumentsSpy = vi.fn()
    actor = { createEmbeddedDocuments: createEmbeddedDocumentsSpy } as unknown as foundry.documents.Actor

    findPBItemSpy = vi.spyOn(findPBItemModule, 'default').mockImplementation(
      async (_compendium: string, name: string) => ({ id: name }) as unknown as foundry.documents.Item
    )
  })

  it('gets the requested number of shanties', async () => {
    await addShanties(actor, 3)
    const names = findPBItemSpy.mock.calls.map(call => call[1])
    expect(findPBItemSpy).toHaveBeenCalledTimes(3)
    expect(createEmbeddedDocumentsSpy).toHaveBeenCalledWith('Item', names.map(name => ({ id: name })))
    for (const call of findPBItemSpy.mock.calls) {
      expect(call[0]).toBe('ships-mystic-shanties')
      expect(typeof call[1]).toBe('string')
    }
  })

  it('won’t request the same shanty twice', async () => {
    await addShanties(actor, 5)
    const names = findPBItemSpy.mock.calls.map(call => call[1])
    expect(new Set(names).size).toBe(names.length)
  })

  it('requests nothing if no shanties requested', async () => {
    await addShanties(actor, 0)
    expect(findPBItemSpy).not.toHaveBeenCalled()
    expect(createEmbeddedDocumentsSpy).toHaveBeenCalledWith('Item', [])
  })
})
