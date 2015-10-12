import Reflux from 'Reflux';
import TodoActions from './actions.js';

let todoCounter = 0;

export default Reflux.createStore({
    listenables: [TodoActions],
    init () {
        this.list = [];
    },
    onAddItem(label) {
        this.updateList([{
            key: todoCounter++,
            text: label
        }].concat(this.list));
    },

    updateList: function (list) {
        this.list = list;
        this.trigger(list); // sends the updated list to all listening components (TodoApp)
    }
});