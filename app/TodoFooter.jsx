import React from 'react';

export default class TodoFooter extends React.Component {
    render() {
        return (
            <footer>
                <span>{this.getItemInfoStr()}</span>
            </footer>
        );
    }

    getItemInfoStr() {
        let leftCount = this.props.todoItems.length;
        this.props.todoItems.forEach((todoItem)=> {
            if (todoItem.checked) {
                leftCount--;
            }
        });

        return leftCount === 1 ? '1 item left' : leftCount + ' items left';
    }
};
