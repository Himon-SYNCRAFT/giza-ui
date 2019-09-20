import {
    Action,
    RootState,
    GET_BOARD,
    MOVE_CARD_ABOVE_OTHER,
    MOVE_CARD_TO_OTHER_LIST,
    ADD_CARD,
    UPDATE_CARD,
    ADD_CARD_LIST,
} from '../actions/types'
import _ from 'lodash'


const INITIAL_STATE: RootState = {
    boards: {},
    customers: {},
    cards: {},
    cardLists: {},
}

const reducer = (state = INITIAL_STATE, action: Action) => {
    console.log(action.type)

    let cardLists = {
        ...state.cardLists
    }

    let boards = {
        ...state.boards
    }

    let cards = {
        ...state.cards
    }

    let customer = {
        ...state.customers
    }

    switch (action.type) {
        case ADD_CARD_LIST:
            cardLists[action.payload.id] = action.payload
            boards[action.payload.boardId].cardLists.push(action.payload.id)

            return {
                ...state,
                boards,
                cardLists,
            }

        case ADD_CARD:
            cards[action.payload.id] = action.payload
            const cardsInList = cardLists[action.payload.cardListId].cards.slice()
            cardsInList.push(action.payload.id)

            cardLists[action.payload.cardListId] = {
                ...cardLists[action.payload.cardListId],
                cards: cardsInList
            }

            return {
                ...state,
                cardLists,
                cards,
            }

        case UPDATE_CARD:
            cards[action.payload.id] = action.payload

            return {
                ...state,
                cards,
            }

        case GET_BOARD:
        case MOVE_CARD_ABOVE_OTHER:
            const result = {
                ...state,
                ...action.payload
            }
            
            return result

        case MOVE_CARD_TO_OTHER_LIST:
            let key = _.findKey(state.cardLists, item => {
                return !!Array.from(item.cards.values()).find(id => id === action.payload.id)
            })

            let oldCardListId: number | undefined = undefined
            let newCardListId: number = action.payload.cardListId

            if (key !== undefined) {
                oldCardListId = parseInt(key)
            }

            if (newCardListId == oldCardListId) {
                return state
            }

            const newCards = state.cardLists[action.payload.cardListId].cards.slice()
            newCards.push(action.payload.id)

            cardLists = {
                ...state.cardLists,
                [action.payload.cardListId]: {
                    ...state.cardLists[action.payload.cardListId],
                    cards: newCards
                },
            }

            if (oldCardListId !== undefined) {
                cardLists[oldCardListId] = {
                    ...state.cardLists[oldCardListId],
                    cards: state.cardLists[oldCardListId].cards.filter(id => id !== action.payload.id)
                }
            }

            return {
                ...state,
                cardLists,
            }

        default:
            return state
    }
}

export default reducer