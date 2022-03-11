import produce from "immer";

import { SET_NEW_RELEASE, SET_FEATURED_PLAYLIST, SET_CATEGORIES } from "../actions";

const initState = {
    newReleases: {},
    playlists: {},
    categories: {},
};

const spotifyReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_NEW_RELEASE:
            return produce(state, (draft) => {
                draft.newReleases = action.payload;
            });
        case SET_FEATURED_PLAYLIST:
            return produce(state, (draft) => {
                draft.playlists = action.payload;
            });
        case SET_CATEGORIES:
            return produce(state, (draft) => {
                draft.categories = action.payload;
            });
        default:
            return state;
    }
};

export default spotifyReducer;
