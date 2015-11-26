export const ADD_ITEM = 'addItem';
export const SELECT_ITEM = 'selectItem';
export const REMOVE_ITEM = 'removeItem';
export const INTO_EDIT = 'intoEdit';
export const EDIT_CHANGE = 'editChange';
export const EXIT_EDIT = 'exitEdit';


export function addItem(text) {
    return {type: ADD_ITEM, text};
}

export function selectItem(index) {
    return {type: SELECT_ITEM, index};
}

export  function removeItem(index) {
    return {type: REMOVE_ITEM, index};
}

export function intoEdit(index) {
    return {type: INTO_EDIT, index};
}

export function editChange(text, index){
    return {type: EDIT_CHANGE, text, index};
}

export function exitEdit(text, index) {
    return {type: EXIT_EDIT, text, index};
}