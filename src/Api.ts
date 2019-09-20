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

const getBoards = (id: number) =>  `
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

const addCardList = (name: string, ownerId: number, boardId: number) => `mutation {
    addCardList(input: {name: "${name}", ownerId: ${ownerId}, boardId: ${boardId}}) {
        id
        name
        boardId
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
}`

const moveCard = (cardId: number, listId: number) => `mutation {
    moveCardToOtherList(cardId: ${cardId}, cardListId: ${listId}) { id, cardListId }
}`

const addCard = (title: string, description: string, ownerId: number, cardListId: number) => `mutation {
    addCard(input: {title: "${title}", description: "${description}", ownerId: ${ownerId}, cardListId: ${cardListId}}) {
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
}`

const updateCard = (id: number, title: string, description: string, ownerId: number, cardListId: number) => `mutation {
    updateCard(id: ${id}, input: {title: "${title}", description: "${description}", ownerId: ${ownerId}, cardListId: ${cardListId}}) {
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
}`

const moveCardAboveOtherCard = (sourceId: number, targetId: number) => `mutation {
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
    getBoard: (id: number) => {
        return gql.post('', { query: getBoards(id) })
    },

    moveCardToOtherList: (cardId: number, listId: number) => {
        return gql.post('', { query: moveCard(cardId, listId) })
    },

    moveCardAboveOtherCard: (sourceId: number, targetId: number) => {
        return gql.post('', { query: moveCardAboveOtherCard(sourceId, targetId) })
    },

    addCard: (title: string, description: string, cardListId: number, ownerId: number) => {
        return gql.post('', { query: addCard(title, description, ownerId, cardListId)})
    },

    updateCard: (id: number, title: string, description: string, cardListId: number, ownerId: number) => {
        return gql.post('', { query: updateCard(id, title, description, ownerId, cardListId)})
    },

    addCardList: (name: string, ownerId: number, boardId: number) => {
        return gql.post('', { query: addCardList(name, ownerId, boardId)})
    },
}


export default Api
