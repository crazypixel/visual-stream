import { combineReducers } from 'redux-immutablejs';
import { routeReducer } from 'react-router-redux';
import twitter from 'reducers/twitter';

const rootReducer = combineReducers({
    routing: routeReducer,
    twitter
});

export default rootReducer;
