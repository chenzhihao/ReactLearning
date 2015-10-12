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
            text: label,
            checked: false
        }].concat(this.list));
    },

    onSelectItem(index) {
        this.list[index].checked = !this.list[index].checked;
        this.updateList(this.list);
    },

    onRemoveItem(index) {
        this.list.splice(index, 1);
        this.updateList(this.list);
    },

    updateList: function (list) {
        this.list = list;
        this.trigger(list);
    }
});