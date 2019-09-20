import React, { CSSProperties } from 'react'
import { useDrag, useDrop, DragObjectWithType } from 'react-dnd'
import { connect } from 'react-redux'
import { moveCardAboveOtherCard } from '../actions/CardActions'
import * as Types from '../actions/types'


const style: { card: CSSProperties, title: CSSProperties } = {
    card: {
        borderRadius: '3px',
        cursor: 'pointer',
        boxShadow: '0 1px 0 rgba(9,30,66,.25)',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#fff',
        marginBottom: '8px',
    },
    title: {
        padding: '6px 8px',
        display: 'block',
        lineHeight: '20px',
        fontSize: '15px',
        letterSpacing: '0.01em',
        textDecorationColor: 'rgb(23, 43, 77)',
        textDecorationLine: 'none',
        textDecorationStyle: 'solid',
        textSizeAdjust: '100%',
    }
}

type DragObject = DragObjectWithType & { id: number }

type Props = {
    id: number,
    cards: Types.Dict<Types.Card>,
    moveCardAboveOtherCard(sourceId: number, targetId: number): void
    onClick(): void
}


const Card: React.FC<Props> = (props) => {
    const { id, cards, onClick } = props
    const data: Types.Card | undefined = cards[id]

    const [dragObj, dragRef] = useDrag({
        item: { type: 'CARD', id, cardListId: cards[id].cardListId },
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.5 : 1,
            dragMonitor: monitor,
            id,
            cardListId: cards[id].cardListId
        })
    })

    const [{ dropId, dropMonitor, isOver, isOverCurrent }, drop] = useDrop({
        accept: 'CARD',
        drop: (item: DragObject, monitor) => {
            console.log(item.id, id)
            props.moveCardAboveOtherCard(item.id, id)
            return item
        },
        collect: monitor => ({
            isOver: !!monitor.isOver(),
            isOverCurrent: !!monitor.isOver({ shallow: true }),
            candDrop: !!monitor.canDrop(),
            dropMonitor: monitor,
            dropId: id,
        })
    })

    const cardStyle = {
        ...style.card,
        opacity: dragObj.opacity
    }

    if (isOver) {
        cardStyle.marginTop = "20px"
    }

    return (
        <>
            <div ref={drop}>
                <div ref={dragRef} style={cardStyle}>
                    {data && (
                        <div onClick={onClick}>
                            <span style={style.title}>{ data.title }</span>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

const mapStateToProps = (state: Types.RootState) => {
    const { cards } = state
    return { cards }
}

export default connect(mapStateToProps, { moveCardAboveOtherCard })(Card)