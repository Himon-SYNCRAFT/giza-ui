import { GET_BOARD, MOVE_CARD, MOVE_CARD_ABOVE_OTHER } from '../actions/types'


const INITIAL_STATE = {}

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_BOARD:
        case MOVE_CARD_ABOVE_OTHER:
            return {
                ...state,
                ...action.payload.cards
            }

        case MOVE_CARD:
            return {
                ...state,
                [action.payload.id]: {
                    ...state[action.payload.id],
                    cardListId: action.payload.cardListId
                }
            }

        default:
            return state

    }
}

export default reducer
