import React from 'react';
import ReactDOM from 'react-dom';
import TodoApp from './TodoApp.jsx';
import './sass/index.scss';
import '../bower_components/normalize-css/normalize.css';
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {Provider} from 'react-redux';
import todoApp from './reducer';

const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware
)(createStore);

function main() {
    ReactDOM.render(
        <Provider store={createStoreWithMiddleware(todoApp)}>
            <TodoApp/>
        </Provider>, document.getElementById('app'));
}
main();