import Api from '../Api'
import {
    MOVE_CARD_TO_OTHER_LIST,
    MOVE_CARD_ABOVE_OTHER,
    ADD_CARD,
    UPDATE_CARD,
} from './types'
import { boardSchema } from '../Schema'
import { normalize } from 'normalizr'
import { Dispatch, AnyAction } from 'redux'


export const moveCardToOtherList = (cardId: number, cardListId: number) => (dispatch: Dispatch) => {
    Api.moveCardToOtherList(cardId, cardListId)
        .then(response => {
            const payload: { id: number, cardListId: number} = response.data.moveCardToOtherList
            console.log('payload', payload)
            dispatch({
                type: MOVE_CARD_TO_OTHER_LIST,
                payload,
            })
        })
}

export const addCard = (title: string, description: string, cardListId: number, ownerId: number) => (dispatch: Dispatch) => {
    Api.addCard(title, description, cardListId, ownerId)
        .then(response => {
            dispatch({
                type: ADD_CARD,
                payload: response.data.addCard
            })
        })
}

export const updateCard = (id: number, title: string, description: string, cardListId: number, ownerId: number) => (dispatch: Dispatch) => {
    Api.updateCard(id, title, description, cardListId, ownerId)
        .then(response => {
            dispatch({
                type: UPDATE_CARD,
                payload: response.data.updateCard
            })
        })
}

export const moveCardAboveOtherCard = (sourceId: number, targetId: number) => (dispatch: Dispatch) => {
    Api.moveCardAboveOtherCard(sourceId, targetId)
        .then(response => {
            const payload = normalize(response.data.moveCardAboveOtherCard, boardSchema).entities

            dispatch({
                type: MOVE_CARD_ABOVE_OTHER,
                payload,
            })
        })

}
