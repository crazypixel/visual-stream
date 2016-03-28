import 'css/reset.css';
import 'css/grid.css';
import 'css/style.css';

import 'three';

// init all react components and app
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from 'store';
import { Router, Route, browserHistory } from 'react-router';

// components
import Root from 'root';
import Content from 'layouts/content';
import Saturn from 'pages/saturn';
import Globe from 'pages/globe';

render(
    <Provider store={ store }>
        <Router history={ browserHistory }>
            <Route path="/" component={ Root }>
                <Route component={ Content }>
                    <Route path="/saturn" component={ Saturn }/>
                    <Route path="/globe" component={ Globe }/>
                </Route>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
);
