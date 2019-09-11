import React from 'react'
import CardList from './CardList'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'


const style = {
    lists: {
        display: 'flex',
        flexDirection: 'row'
    }
}


function Board(props) {
    const { board } = props
    const cardLists = board.cardLists.map(data => {
        return (
            <CardList key={data.id} data={data} />
        )
    })

    return (
        <DndProvider
            backend={HTML5Backend}
        >
            <h2>{board.name}</h2>
            <div style={style.lists}>
                {cardLists}
            </div>
        </DndProvider>
    )
}

export default Board
