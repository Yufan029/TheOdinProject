import { Component } from "react";

export class TodoItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isEditing: false,
            inputVal: this.props.todo,
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    handleInputChange(e) {
        this.setState(state => ({
            ...state,
            inputVal: e.target.value,
        }));
    }

    handleSave() {
        this.props.onChange(this.props.todo, this.state.inputVal);
        this.setState(() => ({
            isEditing: false,
            inputVal: '',
        }));
    }

    handleEdit() {
        this.setState(() => ({
            isEditing: true,
            inputVal: this.props.todo,
        }));
    }

    render() {
        return (
            this.state.isEditing ? (
                <>
                    <input
                        key={this.props.todo}
                        type="text"
                        name="task-entry"
                        value={this.state.inputVal}
                        onChange={(e) => this.handleInputChange(e)}/>
                    <button
                        key={`${this.props.todo}-save`}
                        onClick={this.handleSave}>
                            Save
                    </button>
                </>
            ) : (
                <>
                    {this.props.todo}
                    <button
                        key={`${this.state.inputVal}-edit`}
                        onClick={this.handleEdit}>
                            Edit
                    </button>
                </>
            )
        )
    }
}