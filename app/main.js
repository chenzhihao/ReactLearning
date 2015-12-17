import React from 'react';
import ReactDOM from 'react-dom';
import TodoApp from './TodoApp.jsx';
import './sass/index.scss';
import '../bower_components/normalize-css/normalize.css';
import {createStore, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import DevTools from './DevTool';
import {Provider} from 'react-redux';
import todoApp from './reducer';


const finalCreateStore = compose(
    applyMiddleware(thunkMiddleware),
    DevTools.instrument()
)(createStore);

function main() {
    ReactDOM.render(
        <Provider store={finalCreateStore(todoApp)}>
            <div>
                <TodoApp/>
                <DevTools/>
            </div>
        </Provider>, document.getElementById('app'));
}
main();