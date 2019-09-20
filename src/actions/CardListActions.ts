import Api from '../Api'
import { ADD_CARD_LIST } from './types'
import { cardListSchema, boardSchema } from '../Schema'
import { normalize } from 'normalizr'
import { Dispatch } from 'redux'


export const addCardList = (name: string, ownerId: number, boardId: number) => (dispatch: Dispatch) => {
    Api.addCardList(name, ownerId, boardId)
        .then(response => {
            dispatch({
                type: ADD_CARD_LIST,
                payload: response.data.addCardList
            })
        })
}