import {combineReducers} from 'redux';
import {FETCH_ITEM_BEGIN, FETCH_ITEM_DONE, ADD_ITEM, SELECT_ITEM,REMOVE_ITEM,INTO_EDIT,EDIT_CHANGE,ADD_ITEM_BEGIN,EXIT_EDIT, ADD_ITEM_DONE} from './actions';
import Immutable from 'immutable';
const {List, fromJS} = Immutable;

const initialState = List([]);

function todoItems(state = initialState, action) {
    switch (action.type) {
        case FETCH_ITEM_DONE:
            return state.clear().concat(fromJS(action.items));
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
            return state.filterNot((item)=> {
                return item.get('id') === action.id;
            });
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

function isAddingTodo(state = false, action) {
    switch (action.type) {
        case ADD_ITEM_BEGIN:
            return true;
        case ADD_ITEM_DONE:
            return false;
        default:
            return state;
    }
}

function isFetchingFromBackend(state = false, action) {
    switch (action.type) {
        case FETCH_ITEM_BEGIN:
            return true;
        case FETCH_ITEM_DONE:
            return false;
        default:
            return state;
    }
}

const todoApp = combineReducers({
        todoItems,
        isAddingTodo,
        isFetchingFromBackend
    }
);

export default todoApp;