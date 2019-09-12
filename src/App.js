import React from 'react'
import Api from './Api'
import Board from './components/Board'
import { connect } from 'react-redux'
import { getBoard } from './actions/BoardActions'


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
                <h1>{TITLE}</h1>
                {boardId && (
                    <Board id={boardId} />
                )}
            </div>
        )
    }
}

const mapStateToProps = state => {
    const { boards } = state
    return { boards }
}


export default connect(mapStateToProps, { getBoard })(App)
