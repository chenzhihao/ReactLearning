import React from 'react';
import TodoItem from './TodoItem.jsx';
import TodoFooter from './TodoFooter.jsx';
import TodoActions from './actions.js';
import ListStore from './store.js';


export default class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data: {todoItems: []}};
    }

    componentDidMount() {
        this.unsubscribe = ListStore.listen(this.onStatusChange.bind(this));
    }

    onStatusChange (status) {
        this.setState({
            data: {todoItems: status}
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        return (
            <div >
                <input className="new-todo"
                       type="text"
                       onKeyDown={this.addTodoItem.bind(this)}/>
                {
                    this.state.data.todoItems.map((item, index)=> {
                        return <TodoItem key={index}
                                         item={item}
                                         index={index}
                                         onEditInto={
                                            (e) => {
                                                 let data = this.state.data;
                                                 data.todoItems[index].onEdit = true;
                                                 this.setState(data);
                                            }
                                         }
                                         onEditChange={
                                            (e)=> {
                                                 let data = this.state.data;
                                                 data.todoItems[index].text =  e.target.value;
                                                 this.setState(data);
                                            }
                                         }
                                         onEditExit={
                                            (e)=> {
                                                 let data = this.state.data;
                                                 data.todoItems[index].onEdit = false;
                                                 data.todoItems = data.todoItems.filter((item)=> {
                                                    return item.text.trim() !=='';
                                                 });
                                                 this.setState(data);
                                            }
                                         }
                            />;

                    })
                }
                <TodoFooter todoItems={this.state.data.todoItems}/>
            </div>
        );
    }

    addTodoItem(e) {
        if (e.keyCode == 13) {
            let input = document.querySelector('.new-todo').value;
            document.querySelector('.new-todo').value = '';
            if (input !== '') {
                TodoActions.addItem(input);
            }
        }
    }
};
