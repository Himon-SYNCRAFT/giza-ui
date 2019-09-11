import React from 'react'
import Api from './Api'
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
            board: null
        }
    }

    componentDidMount() {
        Api.getBoards(2).then(result => {
            console.log(result.data)
            this.setState({board: result.data.data.board})
        })
    }

    render() {
        return (
            <div className="App" style={style.main}>
                <h1>{TITLE}</h1>
                {this.state.board && (
                    <Board board={this.state.board} />
                )}
            </div>
        )
    }
}

export default App
