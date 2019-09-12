import React from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { connect } from 'react-redux'
import { moveCard } from '../actions/CardActions'


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
    const { title, id, cardListId } = props.data

    const [dragObj, dragRef] = useDrag({
        item: { type: 'CARD', id },
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.5 : 1,
            dragMonitor: monitor,
            id
        })
    })

    const [{ dropMonitor }, drop] = useDrop({
        accept: 'CARD',
        drop: (item, monitor) => {
            props.moveCard(item.id, cardListId)
            return item
        },
        collect: monitor => ({
            isOver: !!monitor.isOver(),
            candDrop: !!monitor.canDrop(),
            dropMonitor: monitor,
        })
    })

    const cardStyle = {
        ...style.card,
        opacity: dragObj.opacity
    }

    return (
        <div ref={drop}>
            <div ref={dragRef} style={cardStyle}>
                <span style={style.title}>{ title }</span>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {}
}

export default connect(mapStateToProps, { moveCard })(Card)
