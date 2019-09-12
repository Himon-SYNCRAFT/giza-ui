import { schema } from 'normalizr'


export const customerSchema = new schema.Entity('customers')
export const cardSchema = new schema.Entity('cards', {
    owner: customerSchema
})
export const cardListSchema = new schema.Entity('cardLists', {
    owner: customerSchema,
    cards: [cardSchema],
})
export const boardSchema = new schema.Entity('boards', {
    cardLists: [cardListSchema],
    owner: customerSchema,
})
