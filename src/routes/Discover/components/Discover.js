import React, { Component } from "react";
import DiscoverBlock from "./DiscoverBlock/components/DiscoverBlock";
import "../styles/_discover.scss";

import { connect } from "react-redux";

import { getDataDashboard } from "../../../store/actions";

class Discover extends Component {
    constructor() {
        super();

        this.state = {
            newReleases: [],
            playlists: [],
            categories: [],
        };
    }

    componentDidMount() {
        this.props.getDataDashboard({ country: "ID" });
    }

    componentDidUpdate(prevProps, prevState) {
        let { newReleases, playlists, categories } = this.props.spotify;
        if (newReleases.items && newReleases.items.length > 0) {
            this.setState({ newReleases: newReleases.items });
        }
        if (playlists.items && playlists.items.length > 0) {
            this.setState({ playlists: playlists.items });
        }
        if (categories.items && categories.items.length > 0) {
            this.setState({ categories: categories.items });
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.spotify !== nextProps.spotify) {
            return true;
        }
        if (this.state.categories !== nextState.categories) {
            return true;
        }

        return false;
    }

    render() {
        const { newReleases, playlists, categories } = this.state;
        return (
            <div className="discover">
                <DiscoverBlock text="RELEASED THIS WEEK" id="released" data={newReleases} />
                <DiscoverBlock text="FEATURED PLAYLISTS" id="featured" data={playlists} />
                <DiscoverBlock text="BROWSE" id="browse" data={categories} imagesKey="icons" />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        spotify: state.spotify,
    };
};

const mapDispatchToProps = () => {
    return {
        getDataDashboard,
    };
};

export default connect(mapStateToProps, mapDispatchToProps())(Discover);
