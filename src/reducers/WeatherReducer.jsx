import { FETCH_WEATHER } from '../actions/index';

export default function(state = {}, action) {
    const weather = action.payload;
    
    switch(action.type) {
        case FETCH_WEATHER:
            return {weather, ...state};
        default:
            return {...state};
    }
}