import React from 'react';
import TodoItem from './TodoItem.jsx';
import TodoFooter from './TodoFooter.jsx';
import {connect} from 'react-redux';
import {addItem, selectItem,removeItem,intoEdit,editChange,exitEdit} from './actions';

class TodoApp extends React.Component {
    render() {
        const {dispatch} = this.props;
        return (
            <div >
                <input className="new-todo"
                       type="text"
                       onKeyDown={(e)=>{
                           if (e.keyCode == 13) {
                               let input = document.querySelector('.new-todo').value;
                               document.querySelector('.new-todo').value = '';
                               if (input !== '') {
                                   dispatch(addItem(input));
                               }
                           }
                       }}/>

                {
                    this.props.todoItems.toJS().map((item, index)=> {
                        return <TodoItem key={index}
                                         item={item}
                                         onSelect={
                                             ()=> {
                                                dispatch(selectItem(index));
                                             }
                                         }
                                         onRemove={
                                             ()=> {
                                                dispatch(removeItem(index));
                                            }
                                         }
                                         onEditInto={
                                            () => {
                                                 dispatch(intoEdit(index));
                                            }
                                         }
                                         onEditChange={
                                            (e)=> {
                                                 dispatch(editChange(e.target.value, index));
                                            }
                                         }
                                         onEditExit={
                                            (e)=> {
                                                dispatch(exitEdit(e.target.value, index));
                                            }
                                         }
                        />;
                        })
                    }
                <TodoFooter todoItems={this.props.todoItems.toJS()}/>
            </div>
        );
    }
}

function select(state) {
    return {
        todoItems: state.todoItems
    }
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(TodoApp)