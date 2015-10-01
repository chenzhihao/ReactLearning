import React from 'react';
import TodoItem from './TodoItem.jsx';
import TodoFooter from './TodoFooter.jsx';


export default class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data: {todoItems: []}};
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
                                         onSelect={
                                             () => {
                                                 let data = this.state.data;
                                                 data.todoItems[index].checked = !data.todoItems[index].checked ;
                                                 this.setState({data: data});
                                             }
                                         }
                                         onRemove={
                                             ()=> {
                                                 let data = this.state.data;
                                                 data.todoItems.splice(index, 1) ;
                                                 this.setState({data: data});
                                            }
                                         }
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
                                                 data.todoItems[index].text =  e.target.value;                                                 this.setState(data);
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
                this.setState((state) => {
                    return {
                        data: {
                            todoItems: state.data.todoItems.concat({
                                checked: false,
                                text: input
                            })
                        }
                    };
                });
            }
        }
    }
};
