import React from 'react';
import TodoActions from './actions.js';

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
                           onChange={
                               ()=>{
                                   TodoActions.selectItem(this.props.index);
                               }
                           }/>
                    <span className={this.props.item.onEdit? "edit-mode" : "view-mode"}
                          onDoubleClick={
                              ()=> {
                                TodoActions.intoEdit(this.props.index);
                              }
                          }>{this.props.item.text}</span>
                    <input type="text"
                           ref="nameInput"
                           className={this.props.item.onEdit? "edit-mode" : "view-mode"}
                           value={this.props.item.text}
                           onChange={
                               (event)=> {
                                   // event will be reused by react
                                   TodoActions.editChange(event.target.value, this.props.index);
                               }
                           }
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
                            onClick={
                                ()=>{
                                    TodoActions.removeItem(this.props.index)
                                }
                            }>X
                    </button>
                </div>
            </li >
        );
    }
};