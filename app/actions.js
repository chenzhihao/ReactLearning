import Fetch from './libs/fetch';

export const FETCH_ITEM_BEGIN = 'fetchItemBegin';
export const FETCH_ITEM_DONE = 'fetchItemDone';
export const ADD_ITEM = 'addItem';
export const SELECT_ITEM = 'selectItem';
export const REMOVE_ITEM = 'removeItem';
export const INTO_EDIT = 'intoEdit';
export const EDIT_CHANGE = 'editChange';
export const EXIT_EDIT = 'exitEdit';
export const IS_ADDING = 'isAdding';

export const ADD_ITEM_DONE_ASYNC = 'addItemDoneAsync';


export function fetchItemBegin() {
    return (dispatch) => {
        dispatch({
            type: FETCH_ITEM_BEGIN
        });
        Fetch.fetch('//localhost:8888/rest/todos').then((res)=> {
            dispatch(fetchItem(res.data));
        });
    };
}

export function fetchItem(items) {
    return {type: FETCH_ITEM_DONE, items: items};
}

export function addItem(text) {
    return {type: ADD_ITEM, text};
}

export function isAdding() {
    return {type: IS_ADDING};
}
export function addItemAsync(text) {
    return (dispatch) => {
        dispatch(isAdding());
        setTimeout(()=> {
            Promise.resolve(text).then((text)=> {
                dispatch(addItem(text));
            });
        }, 1200);
    };
}

export function addItemDoneAsync(text) {
    return {type: ADD_ITEM_DONE_ASYNC, text};
}

export function selectItem(index) {
    return {type: SELECT_ITEM, index};
}

export function removeItem(index) {
    return {type: REMOVE_ITEM, index};
}

export function intoEdit(index) {
    return {type: INTO_EDIT, index};
}

export function editChange(text, index) {
    return {type: EDIT_CHANGE, text, index};
}

export function exitEdit(text, index) {
    return {type: EXIT_EDIT, text, index};
}