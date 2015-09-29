import React from 'react';
import TodoApp from './TodoApp.jsx';
import './sass/index.scss';
import '../bower_components/normalize-css/normalize.css';


function main() {
    React.render(<TodoApp />, document.getElementById('app'));
}
main();