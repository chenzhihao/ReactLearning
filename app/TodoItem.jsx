import React from 'react';

export default class TodoItem extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.item.onEdit) {
            React.findDOMNode(this.refs.nameInput).focus();
        }
    }

    render() {
        return (
            <li className="todo-item">
                <div>
                    <input type="checkbox"
                           checked={this.props.item.checked}
                           onChange={this.props.onSelect}/>
                    <span className={this.props.item.onEdit? "edit-mode" : "view-mode"}
                          onDoubleClick={()=> {
                            this.props.onEditInto();
                          }}>{this.props.item.text}</span>
                    <input type="text"
                           ref="nameInput"
                           className={this.props.item.onEdit? "edit-mode" : "view-mode"}
                           value={this.props.item.text}
                           onChange={this.props.onEditChange}
                           onBlur={this.props.onEditExit}
                        />
                    <button style={{float:'right'}}
                            onClick={this.props.onRemove}>X
                    </button>
                </div>
            </li >
        );
    }
};