import React from 'react';
import { render } from 'react-dom';

import '!style!css!bootstrap/dist/css/bootstrap.css';
import '!style!css!bootstrap/dist/css/bootstrap-theme.css';
import '!style!css!./styles/main.css';

import Root from './components/Root';

render(<Root />, document.getElementById('app'));
