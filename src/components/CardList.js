import React, { useState } from 'react'
import Card from './Card'
import CardForm from './CardForm'
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { useDrop } from 'react-dnd'
import { moveCardToOtherList } from '../actions/CardActions'


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
    const [showForm, setShowForm] = useState(false)

    const { id, cardLists } = props
    const data = cardLists[String(id)]

    const [{ dropMonitor }, drop] = useDrop({
        accept: 'CARD',
        drop: (item, monitor) => {
            if (monitor.didDrop()) {
                return
            }

            props.moveCardToOtherList(item.id, id)
            return item
        },
        collect: monitor => ({
            isOver: !!monitor.isOver(),
            candDrop: !!monitor.canDrop(),
            dropMonitor: monitor,
        })
    })

    const openForm = () => setShowForm(true)
    const closeForm = () => setShowForm(false)

    return (
        <div style={style.list} ref={drop}>
            {data && (
                <span style={style.name}>{data.name}</span>
            )}
            {data && data.cards.map(id => <Card key={id} id={id} />)}
            <Button onClick={openForm}>+ add card</Button>
            {showForm && (
                <CardForm close={closeForm} />
            )}
        </div>
    )
}

const mapStateToProps = state => {
    const { cardLists } = state
    return { cardLists }
}

export default connect(mapStateToProps, { moveCardToOtherList })(CardList)
