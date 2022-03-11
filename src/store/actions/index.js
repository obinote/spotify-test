import axios from "axios";
import config from "../../config";

export const FETCH_DATA = "FETCH_DATA";
export const FETCH_DATA_FAILURE = "FETCH_DATA_FAILURE";
export const SET_NEW_RELEASE = "SET_NEW_RELEASE";
export const SET_FEATURED_PLAYLIST = "SET_FEATURED_PLAYLIST";
export const SET_CATEGORIES = "SET_CATEGORIES";

export const getDataDashboard = (payload) => {
    return (dispatch) => {
        axios
            .post(config.api.authUrl, "grant_type=client_credentials", {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization:
                        "Basic " + new Buffer(config.api.clientId + ":" + config.api.clientSecret).toString("base64"),
                },
            })
            .then((res) => {
                dispatch(
                    fetchAllData({
                        country: payload.country,
                        token: res.data.access_token,
                    })
                );
            })
            .catch((e) => {
                dispatch(fetchAllFailure(e));
            });
    };
};

export const fetchAllData = (payload) => {
    let params = {
        params: { country: payload.country },
        headers: { Authorization: `Bearer ${payload.token}` },
    };

    return (dispatch) => {
        let released = axios.get(`${config.api.baseUrl}/browse/new-releases`, params);
        let featured = axios.get(`${config.api.baseUrl}/browse/featured-playlists`, params);
        let categories = axios.get(`${config.api.baseUrl}/browse/categories`, params);

        axios
            .all([released, featured, categories])
            .then(
                axios.spread((...allData) => {
                    dispatch(setReleased(allData[0].data.albums));
                    dispatch(setFeatured(allData[1].data.playlists));
                    dispatch(setCategories(allData[2].data.categories));
                })
            )
            .catch((e) => {
                dispatch(fetchAllFailure(e));
            });
    };
};

export const setReleased = (data) => {
    return {
        type: SET_NEW_RELEASE,
        payload: data,
    };
};

export const setFeatured = (data) => {
    return {
        type: SET_FEATURED_PLAYLIST,
        payload: data,
    };
};

export const setCategories = (data) => {
    return {
        type: SET_CATEGORIES,
        payload: data,
    };
};

export const fetchAllFailure = (error) => {
    return { type: FETCH_DATA_FAILURE, payload: error };
};
