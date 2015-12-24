import React from 'react';
import TodoItem from './TodoItem.jsx';
import TodoFooter from './TodoFooter.jsx';
import {connect} from 'react-redux';
import {fetchItemBegin ,addItem, addItemAsync, selectItem,removeItem,intoEdit,editChange,exitEdit} from './actions';
import ImmutablePropTypes from 'react-immutable-proptypes';

class TodoApp extends React.Component {
    render() {
        const {dispatch} = this.props;
        return (
            <div>
                <input className="new-todo"
                       type="text"
                       onKeyDown={(e)=>{
                           if (e.keyCode == 13) {
                               let input = document.querySelector('.new-todo').value;
                               document.querySelector('.new-todo').value = '';
                               if (input !== '') {
                                   dispatch(addItemAsync(input));
                               }
                           }
                       }}/>
                {
                    (()=> {
                        if (this.props.isFetchingFromBackend) {
                            return <span>Fetching from backend...</span>;
                        }
                    })()
                }

                {
                    (()=> {
                        if (this.props.isAddingTodo) {
                            return <span>Adding...</span>;
                        }
                    })()
                }

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
                <TodoFooter todoItems={this.props.todoItems}/>
            </div>
        );
    }
    componentWillMount() {
        const {dispatch} = this.props;
        dispatch(fetchItemBegin());
    }
}

TodoApp.propTypes = {
    todoItems: ImmutablePropTypes.listOf(
        ImmutablePropTypes.contains({
            text: React.PropTypes.string.isRequired,
            checked: React.PropTypes.bool
        })
    ),
    isAddingTodo: React.PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        todoItems: state.todoItems,
        isAddingTodo: state.isAddingTodo,
        isFetchingFromBackend: state.isFetchingFromBackend
    }
}

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(TodoApp)