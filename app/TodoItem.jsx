import React from 'react';

export default class TodoItem extends React.Component {
    constructor(props) {
        super(props);
        this.ESCAPE_KEY = 27;
        this.ENTER_KEY = 13;
    }

    componentDidUpdate(prevProps) {
        // here is tricky, because this.props === prevPros (same reference)
        // todo try immutablejs later.
        if (this.props.item.onEdit) {
            let node = React.findDOMNode(this.refs.nameInput);
            node.focus();
            node.setSelectionRange(node.value.length, node.value.length);
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
                          onDoubleClick={
                              ()=> {
                                this.props.onEditInto();
                              }
                          }>{this.props.item.text}</span>
                    <input type="text"
                           ref="nameInput"
                           className={this.props.item.onEdit? "edit-mode" : "view-mode"}
                           value={this.props.item.text}
                           onChange={this.props.onEditChange}
                           onBlur={this.props.onEditExit}
                           onKeyDown={
                               (event)=> {
                                   if (event.which === this.ESCAPE_KEY || event.which === this.ENTER_KEY) {
                                       this.props.onEditExit();
                                   }
                               }
                           }
                        />
                    <button style={{float:'right'}}
                            onClick={this.props.onRemove}>X
                    </button>
                </div>
            </li >
        );
    }
};