import React from 'react';
import ReactDOM from 'react-dom';
import TodoApp from './TodoApp.jsx';
import './sass/index.scss';
import '../bower_components/normalize-css/normalize.css';


function main() {
    ReactDOM.render(<TodoApp />, document.getElementById('app'));
}
main();