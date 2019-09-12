import { combineReducers } from 'redux'
import boards from './BoardReducer'
import customers from './CustomerReducer'
import cards from './CardReducer'
import cardLists from './CardListReducer'


const reducers = combineReducers({
    boards,
    customers,
    cards,
    cardLists
})

export default reducers

