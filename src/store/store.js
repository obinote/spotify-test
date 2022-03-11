import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import reduxThunk from "redux-thunk";
import spotifyReducer from "./reducers/spotifyReducers";

const rootReducer = combineReducers({
    spotify: spotifyReducer
})

const store = createStore(rootReducer, compose(applyMiddleware(reduxThunk)));

export default store;