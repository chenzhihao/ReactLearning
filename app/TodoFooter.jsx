import React from 'react';

export default class TodoFooter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data: {todoItems: props.todoItems}};
    }

    // another way is to use this.props directly, because the constructor will only execute once.
    componentWillReceiveProps(nextProps, nextState) {
        this.setState({data: {todoItems: nextProps.todoItems}});
    }

    render() {
        return (
            <footer>
                <span>{this.getItemInfoStr()}</span>
            </footer>
        );
    }

    getItemInfoStr() {
        let leftCount = this.state.data.todoItems.length;
        this.state.data.todoItems.forEach((todoItem)=> {
            if (todoItem.checked) {
                leftCount--;
            }
        });

        return leftCount === 1 ? '1 item left' : leftCount + ' items left';
    }
};
