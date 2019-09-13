import React from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { connect } from 'react-redux'
import { moveCardAboveOtherCard } from '../actions/CardActions'


const style = {
    card: {
        borderRadius: '3px',
        cursor: 'pointer',
        boxShadow: '0 1px 0 rgba(9,30,66,.25)',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#fff',
        marginBottom: '8px',
        '&:hover': {
            backgroundColor: '#f4f5f7'
        }
    },
    title: {
        padding: '6px 8px',
        display: 'block'
    }
}


function Card(props) {
    const { id, cards } = props
    const data = cards[id]
    const { title, cardListId } = data

    const [dragObj, dragRef] = useDrag({
        item: { type: 'CARD', id },
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.5 : 1,
            dragMonitor: monitor,
            id
        })
    })

    const [{ dropId, dropMonitor, isOver, isOverCurrent }, drop] = useDrop({
        accept: 'CARD',
        drop: (item, monitor) => {
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
                    <span style={style.title}>{ title }</span>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = state => {
    const { cards } = state
    return { cards }
}

export default connect(mapStateToProps, { moveCardAboveOtherCard })(Card)
