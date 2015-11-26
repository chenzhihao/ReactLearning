import React from 'react';
import ReactDOM from 'react-dom';
import TodoApp from './TodoApp.jsx';
import './sass/index.scss';
import '../bower_components/normalize-css/normalize.css';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import todoApp from './reducer';

function main() {
    ReactDOM.render(
        <Provider store={createStore(todoApp)}>
            <TodoApp/>
        </Provider>, document.getElementById('app'));
}
main();