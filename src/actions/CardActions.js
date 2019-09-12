import Api from '../Api'
import { MOVE_CARD } from './types'


export const moveCard = (cardId, cardListId) => dispatch => {
    Api.moveCard(cardId, cardListId)
        .then(response => {
            dispatch({
                type: MOVE_CARD,
                payload: response.data.moveCardToOtherList
            })
        })

}
