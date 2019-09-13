import axios from 'axios'


const gql = axios.create({
    baseURL: 'http://localhost:8080/graphql',
})

gql.interceptors.response.use(response => {
    const hasErrors = response.data.errors.length > 0

    if (hasErrors) {
        const error = response.data.errors.join(', ')
        return Promise.reject(error)
    }

    return response.data
}, error => {
    return Promise.reject(error)
})

const getBoards = (id) =>  `
{
    board(id: ${id}) {
        id
        name
        owner {
            id
            firstName
            lastName
            email
            login
        }
        cardLists {
            id
            name
            cards {
                id
                title
                description
                cardListId
                owner {
                    id
                    firstName
                    lastName
                    email
                    login
                }
            }
            owner {
                id
                firstName
                lastName
                email
                login
            }
        }
    }
}
`

const moveCard = (cardId, listId) => `mutation {
    moveCardToOtherList(cardId: ${cardId}, cardListId: ${listId}) { id, cardListId }
}`

const moveCardAboveOtherCard = (sourceId, targetId) => `mutation {
    moveCardAboveOtherCard(sourceId: ${sourceId}, targetId: ${targetId}) {
        id
        name
        owner {
            id
            firstName
            lastName
            email
            login
        }
        cardLists {
            id
            name
            cards {
                id
                title
                description
                cardListId
                owner {
                    id
                    firstName
                    lastName
                    email
                    login
                }
            }
            owner {
                id
                firstName
                lastName
                email
                login
            }
        }
    }
}`

const Api = {
    getBoard: (id) => {
        return gql.post('', { query: getBoards(id) })
    },

    moveCard: (cardId, listId) => {
        return gql.post('', { query: moveCard(cardId, listId) })
    },

    moveCardAboveOtherCard: (sourceId, targetId) => {
        return gql.post('', { query: moveCardAboveOtherCard(sourceId, targetId) })
    }
}


export default Api
