import React, { FormEvent } from 'react'
import {
    Modal,
    Form,
    Button,
    FormControlProps,
} from 'react-bootstrap'
import { BsPrefixProps, ReplaceProps } from 'react-bootstrap/helpers'

type Props = {
    cardListId: number
    description: string
    show: boolean
    title: string
    close(): void
    save(title: string, description: string, ownerId: number, cardListId: number): void
    setDescription(description: string): void
    setTitle(title: string): void
}

class CardForm extends React.Component<Props> {
    onChangeTitle = (event: FormEvent<ReplaceProps<"input", BsPrefixProps<"input"> & FormControlProps>>) => {
        let value: string | undefined | string[] | number = event.currentTarget.value

        if (value === undefined) {
            value = ""
        }

        value = value.toString()
        this.props.setTitle(value)
    }

    onChangeDescription = (event: FormEvent<ReplaceProps<"input", BsPrefixProps<"input"> & FormControlProps>>) => {
        let value: string | undefined | string[] | number = event.currentTarget.value

        if (value === undefined) {
            value = ""
        }

        value = value.toString()
        this.props.setDescription(value)
    }

    saveCard = (): void => {
        const { save, close, title, description, cardListId } = this.props
        const ownerId = 1
        save(title, description, ownerId, cardListId)
        close()
    }

    render() {
        const { close, show, title, description } = this.props

        return (
            <Modal size="lg" show={show} onHide={close}>
                <Modal.Header closeButton>
                    <Modal.Title>Edycja karty</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group controlId="title">
                            <Form.Label>Tytuł</Form.Label>
                            <Form.Control onChange={this.onChangeTitle} value={title} type="text" placeholder="tytuł..." />
                        </Form.Group>
                        <Form.Group controlId="description">
                            <Form.Label>Treść</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows="4"
                                onChange={this.onChangeDescription}
                                value={description} type="text"
                                placeholder="tytuł..."
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={close} variant="secondary">Anuluj</Button>
                    <Button onClick={this.saveCard} variant="primary">Zapisz</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default CardForm