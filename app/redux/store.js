import { createStore, applyMiddleware, compose } from 'redux';
import { browserHistory } from 'react-router';
import persistState from 'redux-localstorage';
import Immutable from 'immutable';
import { syncHistory } from 'react-router-redux';

// reducers
import rootReducer from 'reducers/root';

const storeEnhancers = compose(
    applyMiddleware(
        syncHistory(browserHistory)
    )
);

const store = createStore(rootReducer, storeEnhancers);

export default store;


