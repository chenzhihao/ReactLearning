import {combineReducers} from 'redux';
import {ADD_ITEM, SELECT_ITEM,REMOVE_ITEM,INTO_EDIT,EDIT_CHANGE,EXIT_EDIT} from './actions';
import Immutable from 'immutable';
const {List, fromJS} = Immutable;

const initialState = List([]);

function todoItems(state = initialState, action) {
    switch (action.type) {
        case ADD_ITEM:
            return state.push(fromJS({
                text: action.text,
                completed: false
            }));
        case SELECT_ITEM:
            return state.update(action.index, (item)=> {
                return item.set('checked', !item.get('checked'));
            });
        case REMOVE_ITEM:
            return state.delete(action.index);
        case EDIT_CHANGE:
            return state.update(action.index, (item)=> {
                return item.set('text', action.text);
            });
        case INTO_EDIT:
            return state.update(action.index, (item)=> {
                return item.set('onEdit', true);
            });
        case EXIT_EDIT:
            if (action.text.trim() === '') {
                return state.delete(action.index);
            }
            return state.update(action.index, (item)=> {
                return item.set('onEdit', false);
            });
        default:
            return state;
    }
}

const todoApp = combineReducers(
    {todoItems}
);

export default todoApp;