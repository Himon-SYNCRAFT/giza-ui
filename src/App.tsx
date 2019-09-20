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

type Props = {
    getBoard(boardId: number): void
}

type State = {
    boardId: number
}

class App extends React.Component<Props, State> {
    readonly state: State = {
        boardId: 2
    }

    componentDidMount = () => {
        this.props.getBoard(this.state.boardId)
    }

    render() {
        const { boardId } = this.state

        return (
            <div className="App" style={style.main}>
                <Container fluid={true} style={{paddingLeft: 0, paddingRight: 0}}>
                    {boardId && (
                        <Board id={boardId} />
                    )}
                </Container>
            </div>
        )
    }
}

const dispatchProps = {
    getBoard
}

export default connect(null, dispatchProps)(App)
