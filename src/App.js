import React from 'react'
import { connect } from 'react-redux'
import { getBoard } from './actions/BoardActions'
import { Container } from 'react-bootstrap'

import Board from './components/Board'


const TITLE = 'GraphQL Demo App'

const style = {
    main: {
        backgroundColor: 'rgb(0, 174, 204)',
    }
}


class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            boardId: 2
        }
    }

    componentDidMount() {
        this.props.getBoard(this.state.boardId)
    }

    render() {
        const { boardId } = this.state

        return (
            <div className="App" style={style.main}>
                <Container fluid>
                    <h1>{TITLE}</h1>
                    {boardId && (
                        <Board id={boardId} />
                    )}
                </Container>
            </div>
        )
    }
}

export default connect(null, { getBoard })(App)
