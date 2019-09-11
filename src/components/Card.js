import React from 'react'
import { useDrag, useDrop } from 'react-dnd'
import Api from '../Api'


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
    const { title, id } = props.data

    const [dragObj, dragRef] = useDrag({
        item: { type: 'CARD', id },
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.5 : 1,
            dragMonitor: monitor,
            id
        })
    })

    console.log(dragObj)

    const [{ dropMonitor }, drop] = useDrop({
        accept: 'CARD',
        drop: () => console.log('drop', id),
        collect: monitor => ({
            isOver: !!monitor.isOver(),
            candDrop: !!monitor.canDrop(),
            dropMonitor: monitor,
        })
    })

    // console.log(dragMonitor)
    // console.log(dropMonitor)

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

export default Card
