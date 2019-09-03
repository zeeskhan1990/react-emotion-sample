import React, {Component} from "react"

export default class ErrorBoundary extends Component {
    state = {
        hasErrors: false,
        errorMessage: 'Something Went Wrong'
    }

    componentDidCatch = (err, info) => {
        this.setState({hasErrors:true, errorMessage: err})
    }

    render() {
        if(this.state.hasErrors) {
            return (
                <div>
                    {this.state.errorMessage}
                </div>
            )
        } else {
            return this.props.children
        }
        
    }
}