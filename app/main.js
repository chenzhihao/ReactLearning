import React from 'react';
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

export class App extends React.Component {
    render() {
        return <Provider store={finalCreateStore(todoApp)}>
            <div>
                <TodoApp/>
            </div>
        </Provider>;
    }
}