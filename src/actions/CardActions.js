import Api from '../Api'
import { MOVE_CARD, MOVE_CARD_ABOVE_OTHER } from './types'
import { boardSchema } from '../Schema'
import { normalize } from 'normalizr'


export const moveCardToOtherList = (cardId, cardListId) => dispatch => {
    Api.moveCard(cardId, cardListId)
        .then(response => {
            dispatch({
                type: MOVE_CARD,
                payload: response.data.moveCardToOtherList
            })
        })
}

export const moveCardAboveOtherCard = (sourceId, targetId) => dispatch => {
    Api.moveCardAboveOtherCard(sourceId, targetId)
        .then(response => {
            const payload = normalize(response.data.moveCardAboveOtherCard, boardSchema).entities

            dispatch({
                type: MOVE_CARD_ABOVE_OTHER,
                payload,
            })
        })

}
