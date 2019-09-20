import React, { useState, CSSProperties } from 'react'
import Card from './Card'
import CardForm from './CardForm'
import { Button, DropdownButton, Dropdown } from 'react-bootstrap'
import { connect } from 'react-redux'
import { useDrop, DragObjectWithType } from 'react-dnd'
import { moveCardToOtherList, addCard, updateCard } from '../actions/CardActions'
import * as Types from '../actions/types'


const style: {list: CSSProperties, name: CSSProperties} = {
    list: {
        flexDirection: 'column',
        borderRadius: '3px',
        backgroundColor: '#ebecf0',
        flexBasis: '15%',
        padding: '6px 8px',
        margin: '0px 8px',
        height: '100%'
    },

    name: {
        height: '28px',
        fontWeight: 'bold',
        minHeight: '20px',
        padding: '4px 8px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: '8px'
    }
}

type Props = {
    id: number
    cardLists: Types.Dict<Types.CardList>
    cards: Types.Dict<Types.Card>
    moveCardToOtherList(sourceId: number, targetId: number): void
    addCard(title: string, description: string, cardListId: number, ownerId: number): void
    updateCard(id: number, title: string, description: string, cardListId: number, ownerId: number): void
}

type DragObject = DragObjectWithType & { id: number }

const CardList: React.FC<Props> = (props) => {
    const { id, cardLists, cards } = props
    const [showForm, setShowForm] = useState(false)
    const [inEdit, setInEdit] = useState<number | undefined>(undefined)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const data = cardLists[id]

    const [dropObj, drop] = useDrop({
        accept: 'CARD',
        drop: (item: DragObject, monitor) => {
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

    const onCardClick = (id: number) => {
        const card = cards[id]
        setInEdit(id)
        setDescription(card.description)
        setTitle(card.title)
        setShowForm(true)
    }
    const openForm = () => setShowForm(true)
    const closeForm = () => setShowForm(false)
    const save = (id: number | undefined) => (title: string, description: string, ownerId: number, cardListId: number) => {
        if (id === undefined) {
            props.addCard(title, description, cardListId, ownerId)
        } else {
            props.updateCard(id, title, description, cardListId, ownerId)
        }
    }
    return (
        <div style={style.list} ref={drop}>
            {data && (
                <div style={style.name}>
                    <span style={{flexDirection: 'column'}}>{data.name}</span>
                    <Dropdown style={{flexDirection: 'column'}}>
                        <Dropdown.Toggle
                            id="split"
                            as="a"
                            split
                            style={{
                                padding: 0,
                                backgroundColor: 'rgba(0, 0, 0, 0)',
                                border: 'none',
                                fontSize: '16px',
                                lineHeight: '24px',
                                color: '#6b778c',
                                cursor: 'pointer',
                            }}
                        />
                        <Dropdown.Menu>
                            <Dropdown.Header>Akcje listy</Dropdown.Header>
                            <Dropdown.Divider />
                            <Dropdown.Item as="button">Usuń</Dropdown.Item>
                            <Dropdown.Item as="button">Dodaj karte</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            )}
            {data && data.cards.map(id => <Card onClick={() => onCardClick(id)} key={id} id={id} />)}
            <Button variant="dark" block onClick={openForm}>+ add card</Button>
            <CardForm
                cardListId={props.id}
                description={description}
                show={showForm}
                title={title}
                close={closeForm}
                save={save(inEdit)}
                setDescription={setDescription}
                setTitle={setTitle}
            />
        </div>
    )
}

const mapStateToProps = (state: Types.RootState) => {
    const { cardLists, cards } = state
    return { cardLists, cards }
}

export default connect(mapStateToProps, {
    moveCardToOtherList,
    addCard,
    updateCard,
})(CardList)