import React from 'react'
import Card from './Card'


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
    const { data } = props
    const cards = data.cards.map(data => {
        return (
            <Card key={data.id} data={data} />
        )
    })

    return (
        <div style={style.list}>
            <span style={style.name}>{data.name}</span>
            {cards}
        </div>
    )
}

export default CardList
