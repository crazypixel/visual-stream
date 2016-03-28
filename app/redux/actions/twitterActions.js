import { ADD_TWEET } from 'constants/action-types';

export function addTweet(tweet) {
    return {
        type: ADD_TWEET,
        payload: { tweet }
    };
}