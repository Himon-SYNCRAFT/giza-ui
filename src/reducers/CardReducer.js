import { GET_BOARD, MOVE_CARD } from '../actions/types'


const INITIAL_STATE = {}

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_BOARD:
            return {
                ...state,
                ...action.payload.cards
            }

        default:
            return state

    }
}

export default reducer
