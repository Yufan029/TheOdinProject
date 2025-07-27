
import React, { Component } from 'react';

export class TodosCount extends Component {
    constructor(props) {
        super(props);

        this.state = {
            count: this.props.todos.length,
        }
    }

    render() {
        return (
            <p> {this.state.count} todo items</p>
        );
    }
}