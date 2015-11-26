import {combineReducers} from 'redux';
import {ADD_ITEM, SELECT_ITEM,REMOVE_ITEM,INTO_EDIT,EDIT_CHANGE,EXIT_EDIT} from './actions';

function todoItems(state = [], action) {
    switch (action.type) {
        case ADD_ITEM:
            return [...state, {
                text: action.text,
                completed: false
            }];
        case SELECT_ITEM:
            return [
                ...state.slice(0, action.index),
                Object.assign({}, state[action.index], {
                    checked: !state[action.index].checked
                }),
                ...state.slice(action.index + 1)
            ];
        case REMOVE_ITEM:
            return [
                ...state.slice(0, action.index),
                ...state.slice(action.index + 1)
            ];
        case EDIT_CHANGE:
            return [
                ...state.slice(0, action.index),
                Object.assign({}, state[action.index], {
                    text: action.text
                }),
                ...state.slice(action.index + 1)
            ];
        case INTO_EDIT:
            return [
                ...state.slice(0, action.index),
                Object.assign({}, state[action.index], {
                    onEdit: true
                }),
                ...state.slice(action.index + 1)
            ];
        case EXIT_EDIT:
            if (action.text.trim() === '') {
                return [
                    ...state.slice(0, action.index),
                    ...state.slice(action.index + 1)
                ];
            }

            return [
                ...state.slice(0, action.index),
                Object.assign({}, state[action.index], {
                    onEdit: false
                }),
                ...state.slice(action.index + 1)
            ];
        default:
            return state;
    }
}

const todoApp = combineReducers(
    {todoItems}
);

export default todoApp;