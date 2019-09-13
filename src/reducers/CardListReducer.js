import _ from 'lodash'
import { GET_BOARD, MOVE_CARD, MOVE_CARD_ABOVE_OTHER } from '../actions/types'


const INITIAL_STATE = {}

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_BOARD:
        case MOVE_CARD_ABOVE_OTHER:
            return {
                ...state,
                ...action.payload.cardLists
            }

        case MOVE_CARD:
            const oldListId = _.findKey(state, item => {
                return item.cards.find(item => item == action.payload.id)
            })

            const cards = state[action.payload.cardListId].cards.slice()
            cards.push(action.payload.id)

            return {
                ...state,
                [action.payload.cardListId]: {
                    ...state[action.payload.cardListId],
                    cards,
                },
                [oldListId]: {
                    ...state[oldListId],
                    cards: state[oldListId].cards.filter(id => id != action.payload.id),
                }
            }

        default:
            return state
    }
}

export default reducer

