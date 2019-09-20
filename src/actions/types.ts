import CardList from '../components/CardList'


export const GET_BOARD = 'GET_BOARD'
export const MOVE_CARD_TO_OTHER_LIST = 'MOVE_CARD_TO_OTHER_LIST'
export const MOVE_CARD_ABOVE_OTHER = 'MOVE_CARD_ABOVE_OTHER'
export const ADD_CARD = 'ADD_CARD'
export const UPDATE_CARD = 'UPDATE_CARD'
export const ADD_CARD_LIST = 'ADD_CARD_LIST'


export type Customer = {
    readonly id: number,
    readonly firstName: string,
    readonly lastName: string,
    readonly email: string,
    readonly login: string,
}

export type Card = {
    readonly id: number,
    readonly title: string,
    readonly description: string,
    readonly cardListId: number,
    readonly owner: number,
}

export type CardList = {
    readonly id: number,
    readonly name: string,
    readonly cards: Array<number>
}

export type Board = {
    readonly id: number,
    readonly name: string,
    readonly owner: number,
    readonly cardLists: Array<number>
}

export interface Dict<T> {
    [key: number]: T
}

export type RootState = {
    readonly boards: Dict<Board>
    readonly customers: Dict<Customer>
    readonly cards: Dict<Card>
    readonly cardLists: Dict<CardList>
}

export interface Action {
    type: string,
    payload?: any,
}