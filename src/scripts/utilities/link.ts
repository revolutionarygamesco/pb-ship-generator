export const linkActor = (actor: Actor): string => {
  return `@UUID[Actor.${actor.id}]{${actor.name}}`
}
