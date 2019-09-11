import axios from 'axios'


const gql = axios.create({
    baseURL: 'http://localhost:8080/graphql',
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

const moveCard = (cardId, listId) =>  `mutation {
    moveCardToOtherList(cardId: ${cardId}, cardListId: ${listId})
}
`

const Api = {
    getBoards(id) {
        return gql.post('', { query: getBoards(id) })
    }
}


export default Api
