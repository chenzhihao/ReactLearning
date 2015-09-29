import React from 'react';

export default class TodoItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li className="todo-item">
                <div>
                    <input type="checkbox" checked={this.props.item.checked} onChange={this.props.onSelect}/>
                    <span className={this.props.item.checked? "checked" : "not-checked"}>{this.props.item.text}</span>
                    <button style={{float:'right'}} onClick={this.props.onRemove}>X</button>
                </div>
            </li>
        );
    }
};