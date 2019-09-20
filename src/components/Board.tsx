import React from 'react'
import { CSSProperties } from 'react'
import CardList from './CardList'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import { addCardList } from '../actions/CardListActions'
import * as Types from '../actions/types'


const style: { headerWrapper: CSSProperties, header: CSSProperties, lists: CSSProperties } = {
    headerWrapper: {
        padding: '8px 4px 4px 8px'
    },

    header: {
        color: 'white',
        fontSize: '20px',
        lineHeight: '32px',
        fontWeight: 'bold',
        padding: '0 12px',
        margin: 0,
    },

    lists: {
        display: 'flex',
        flexDirection: 'row'
    }
}


type Props = {
    id: number,
    boards: Types.Dict<Types.Board>
    addCardList(name: string, ownerId: number, boardId: number): void
}


const Board: React.FC<Props> = props => {
    const { id: boardId, boards } = props
    const board: Types.Board | undefined = boards[boardId]

    if (board === undefined) {
        return null
    }

    const boardCardLists = board.cardLists.map((id: number) => {
        return (
            <CardList key={id} id={id} />
        )
    })

    return (
        <DndProvider
            backend={HTML5Backend}
        >
            <div style={style.headerWrapper}>
                <h2 style={style.header}>{board.name}</h2>
            </div>
            <div style={style.lists}>
                {boardCardLists}
                <Button onClick={() => props.addCardList('test', 1, boardId)} variant="outline-light" style={{height: '100%'}}>+ Dodaj kolejną listę</Button>
            </div>
        </DndProvider>
    )
}


const mapStateToProps = (state: Types.RootState) => {
    const { boards, cardLists } = state
    return { boards, cardLists }
}

export default connect(mapStateToProps, {
    addCardList,
})(Board)
