import Api from '../Api'
import { GET_BOARD } from './types'
import { boardSchema } from '../Schema'
import { normalize } from 'normalizr'


export const getBoard = boardId => dispatch => {
    Api.getBoard(boardId)
        .then(response => {
            const payload = normalize(response.data.board, boardSchema).entities

            dispatch({
                type: GET_BOARD,
                payload,
            })
        })

}
