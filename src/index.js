import React from 'react';
import ReactDOM from 'react-dom';

import App from './Components/App/App';

import Database from './Database/Database'

const url = 'http://localhost:3001/';
const database = new Database(url);

ReactDOM.render(<App />, document.getElementById('root'));

