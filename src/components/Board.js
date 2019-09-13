import React from 'react'
import CardList from './CardList'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { connect } from 'react-redux'


const style = {
    lists: {
        display: 'flex',
        flexDirection: 'row'
    }
}


function Board(props) {
    const { id: boardId, boards } = props
    const board = boards[String(boardId)]

    if (!board) {
        return null
    }

    const boardCardLists = board.cardLists.map(id => {
        return (
            <CardList key={id} id={id} />
        )
    })

    return (
        <DndProvider
            backend={HTML5Backend}
        >
            <h2>{board.name}</h2>
            <div style={style.lists}>
                {boardCardLists}
            </div>
        </DndProvider>
    )
}


const mapStateToProps = state => {
    const { boards } = state
    return { boards }
}

export default connect(mapStateToProps)(Board)
