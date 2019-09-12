import React from 'react'
import Card from './Card'
import { connect } from 'react-redux'


const style = {
    list: {
        flexDirection: 'column',
        borderRadius: '3px',
        backgroundColor: '#ebecf0',
        flexBasis: '15%',
        padding: '6px 8px',
        margin: '4px 8px',
    },

    name: {
        height: '28px',
        fontWeight: 'bold',
        minHeight: '20px',
        padding: '4px 8px',
        display: 'block',
    }
}


function CardList(props) {
    const { id, cardLists } = props
    const cardList = cardLists[id]

    if (!cardList) {
        return null
    }

    const cards = cardList.cards.map(id => {
        return (
            <Card key={id} id={id} />
        )
    })

    return (
        <div style={style.list}>
            <span style={style.name}>{cardList.name}</span>
            {cards}
        </div>
    )
}

const mapStateToProps = state => {
    const { cardLists } = state
    return { cardLists }
}

export default connect(mapStateToProps)(CardList)
