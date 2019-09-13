import React from 'react'
import {
    Modal,
    Form,
    Button,
} from 'react-bootstrap'


class CardForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            description: ''
        }
    }

    onChangeTitle = title => this.setState({title})

    onChangeDescription = description => this.setState({description})

    render() {
        const { title, description } = this.state
        const { save, close } = this.props

        return (
            <Modal show={true}>
                <Modal.Dialog>
                    <Modal.Header closeButton>
                        <Modal.Title>Edycja karty</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="title">
                                <Form.Label>Tytuł</Form.Label>
                                <Form.Control onChange={this.onChangeTitle} type="text" placeholder="tytuł..." />
                            </Form.Group>
                            <Form.Group controlId="description">
                                <Form.Label>Treść</Form.Label>
                                <Form.Control onChange={this.onChangeDescription} type="text" placeholder="tytuł..." />
                            </Form.Group>
                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={close} variant="secondary">Close</Button>
                        <Button onClick={save} variant="primary">Save changes</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </Modal>
        )
    }
}

export default CardForm
