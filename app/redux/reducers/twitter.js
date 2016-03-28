import Immutable from 'immutable';
import { ADD_TWEET } from 'constants/action-types';

const initialState = Immutable.fromJS([]);

function twitterReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_TWEET:
            return state.push(action.payload.tweet);
        default:
            return state;
    }
}

export default twitterReducer;

