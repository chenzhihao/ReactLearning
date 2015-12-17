import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

export default class TodoFooter extends React.Component {
    render() {
        return (
            <footer>
                <span>{this.getItemInfoStr()}</span>
            </footer>
        );
    }

    getItemInfoStr() {
        let totalCount = this.props.todoItems.count();
        let checkedCount = this.props.todoItems.filter((todoItem)=> {
            return todoItem.get('checked') === true;
        }).count();

        let leftCount = totalCount - checkedCount;

        return leftCount === 1 ? '1 item left' : leftCount + ' items left';
    }
};

TodoFooter.propTypes = {
    todoItems: ImmutablePropTypes.listOf(
        ImmutablePropTypes.contains({
            text: React.PropTypes.string.isRequired,
            checked: React.PropTypes.bool
        })
    )
};