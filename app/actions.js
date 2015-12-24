import fetch from './libs/fetch';

export const FETCH_ITEM_BEGIN = 'fetchItemBegin';
export const FETCH_ITEM_DONE = 'fetchItemDone';
export const ADD_ITEM = 'addItem';
export const SELECT_ITEM = 'selectItem';
export const REMOVE_ITEM_BEGIN = 'removeItemBegin';
export const REMOVE_ITEM = 'removeItem';
export const INTO_EDIT = 'intoEdit';
export const EDIT_CHANGE = 'editChange';
export const EXIT_EDIT = 'exitEdit';
export const ADD_ITEM_BEGIN = 'addItemBegin';
export const ADD_ITEM_DONE = 'addItemDone';

export function fetchItemBegin() {
    return (dispatch) => {
        dispatch({
            type: FETCH_ITEM_BEGIN
        });
        fetch('//localhost:8888/rest/todos').then((res)=> {
            dispatch(fetchItemDone(res.data));
        });
    };
}

export function fetchItemDone(items) {
    return {type: FETCH_ITEM_DONE, items: items};
}

export function addItem(item) {
    return {type: ADD_ITEM, ...item};
}

export function addItemBegin(text) {
    return (dispatch) => {
        dispatch({
            type: ADD_ITEM_BEGIN
        });
        fetch('//localhost:8888/rest/todos', {
            method: 'post',
            body: JSON.stringify({
                text
            })
        }).then((res)=> {
            dispatch(addItem(res.data));
            dispatch(addItemDone());
        });
    };
}

export function addItemDone() {
    return {type: ADD_ITEM_DONE};
}

export function selectItem(index) {
    return {type: SELECT_ITEM, index};
}

export function removeItemBegin(id) {
    return (dispatch)=> {
        dispatch({
            type: REMOVE_ITEM_BEGIN,
            id: id
        });
        fetch('//localhost:8888/rest/todos/' + id, {
            method: 'delete'
        }).then(()=> {
            dispatch(removeItem(id));
        });
    };
}

export function removeItem(id) {
    return {
        type: REMOVE_ITEM,
        id: id
    };
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