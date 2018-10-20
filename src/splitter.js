import React from "react";
import Pane from "./pane.js";
import ReactDOM from "react-dom";
import md5 from "md5";
import $ from "jquery";
import _isEqual from "lodash/isEqual";
import _cloneDeep from "lodash/cloneDeep";
import PropTypes from "prop-types";

export default class extends React.Component {
    static propTypes = {
        //the size of the gutter
        gutterSize: PropTypes.number,

        //the min size of the first (top or left) pane
        minSizeFirst: PropTypes.number,

        //the min size of the second (bottom or right) pane
        minSizeSecond: PropTypes.number,

        //the number of pixels before the minSize to start snap
        snapOffset: PropTypes.number,

        //direction of the split pane (vertical|horizontal)
        direction: PropTypes.string,

        //container bg color
        containerBackground: PropTypes.string,

        //starting size of the first (top or left) pane
        defaultSizeFirst: PropTypes.number,

        //background color of the panes
        paneBackground: PropTypes.string
    };

    static defaultProps = {
        gutterSize: 10,
        minSizeFirst: 100,
        minSizeSecond: 100,
        snapOffset: 30,
        direction: "horizontal",
        containerBackground: "#eee",
        defaultSizeFirst: 50,
        // name: "",
        paneBackground: "#ffffff"
    };

    constructor(props) {
        super(props);
        // let settings = this._getSettings();

        let gutterHalf = this.props.gutterSize / 2;

        let dimension = "width";
        let clientDimension = "clientWidth";
        let clientAxis = "clientX";
        let position = "left";
        let paddingA = "paddingLeft";
        let paddingB = "paddingRight";

        if (this.props.direction == "vertical") {
            dimension = "height";
            clientDimension = "clientHeight";
            clientAxis = "clientY";
            position = "top";
            paddingA = "paddingTop";
            paddingB = "paddingBottom";
        }

        this.state = {
            dragging: false,
            gutterHalf,
            Asize: settings.Asize,
            Bsize: settings.Bsize,
            dimension,
            clientDimension,
            clientAxis,
            position,
            paddingA,
            paddingB
        };
    }

    componentDidMount = () => {
        //generate unique hash for this splitter
        this.hash = this._generateHash();

        document.addEventListener("mouseup", this.onMouseUp);
        document.addEventListener("mousemove", this.onMouseMove);

        //stop selection from happening
        document.addEventListener("selectstart", this.preventSelection);
        document.addEventListener("dragstart", this.preventSelection);
        document.addEventListener("selectstart", this.preventSelection);
        document.addEventListener("dragstart", this.preventSelection);
    };

    componentDidUpdate = () => {
        this._saveSettings();
    };

    componentWillUnmount = () => {
        document.removeEventListener("mouseup", this.onMouseUp);
        document.removeEventListener("mousemove", this.onMouseMove);
    };

    _getSettings = () => {
        let settings = {};
        let gutterHalf = this.props.gutterSize / 2;

        //size
        if (this.props.defaultSizeFirst) {
            let Asize =
                "calc(" +
                this.props.defaultSizeFirst +
                "% - " +
                (41 + gutterHalf) +
                "px)";
            vletBsize =
                "calc(" +
                (100 - this.props.defaultSizeFirst) +
                "% - " +
                gutterHalf +
                "px)";
        } else {
            let Asize = "calc(50% - " + (41 + gutterHalf) + "px)";
            let Bsize = "calc(50% - " + gutterHalf + "px)";
        }

        settings = {
            Asize: Asize,
            Bsize: Bsize
        };

        return settings;
    };

    preventSelection = () => {
        return false;
    };

    onMouseDown = event => {
        this.setState({
            dragging: true
        });
    };

    onMouseMove = event => {
        if (this.state.dragging) {
            event.preventDefault();

            // Calculate the pairs size, and percentage of the parent size
            let splitter = this.splitter;
            let a = this.first;
            let b = this.second;
            let computedStyle = global.getComputedStyle(splitter);

            let parentSize =
                splitter[this.state.clientDimension] -
                parseFloat(computedStyle[this.state.paddingA]) -
                parseFloat(computedStyle[this.state.paddingB]);

            let size =
                a.getBoundingClientRect()[this.state.dimension] +
                b.getBoundingClientRect()[this.state.dimension] +
                this.state.gutterHalf +
                this.state.gutterHalf;
            let percentage = Math.min(size / parentSize * 100, 100);
            let start = a.getBoundingClientRect()[this.state.position];

            let offset = event[this.state.clientAxis] - start;

            // If within snapOffset of min or max, set offset to min or max

            if (offset <= this.props.minSizeFirst + this.props.snapOffset) {
                offset = this.props.minSizeFirst;
            } else if (
                offset >=
                size - this.props.minSizeSecond - this.props.snapOffset
            ) {
                offset = size - this.props.minSizeSecond;
            }

            this.setState({
                Asize:
                    "calc(" +
                    offset / size * percentage +
                    "% - " +
                    this.state.gutterHalf +
                    "px)",
                Bsize:
                    "calc(" +
                    (percentage - offset / size * percentage) +
                    "% - " +
                    this.state.gutterHalf +
                    "px)"
            });
        }
    };

    onMouseUp = () => {
        this.setState({
            dragging: false
        });
    };

    render() {
        let direction = this.props.direction;
        let splitter = {
            backgroundColor: this.props.containerBackground,
            height: "inherit",
            padding: "10px",
            border: "1px solid #c0c0c0"
        };

        let paneStyle = {
            backgroundColor: this.props.paneBackground
        };

        if (this.props.direction == "vertical") {
            let paneClass = "vertical";
            let gutterClass = "gutter gutter-vertical";
            let gutterStyle = {
                cursor: "ns-resize",
                height: this.props.gutterSize
            };
        } else {
            let paneClass = "horizontal";
            paneStyle.float = "left";
            paneStyle.height = "100%";
            let gutterClass = "gutter gutter-horizontal";
            let gutterStyle = {
                cursor: "ew-resize",
                width: this.props.gutterSize,
                float: "left",
                height: "100%"
            };
        }
        return (
            <div
                ref={input => (this.splitter = input)}
                className="splitter"
                style={splitter}
            >
                <Pane
                    ref={input => (this.first = input)}
                    dragging={this.state.dragging}
                    size={this.state.Asize}
                    bgColor={this.props.paneBackground}
                    direction={this.props.direction}
                    className={paneClass}
                >
                    {this.props.children[0]}
                </Pane>
                <div
                    className={gutterClass}
                    style={gutterStyle}
                    onMouseDown={this.onMouseDown}
                />
                <Pane
                    ref={input => (this.second = input)}
                    dragging={this.state.dragging}
                    size={this.state.Bsize}
                    bgColor={this.props.paneBackground}
                    direction={this.props.direction}
                    className={paneClass}
                >
                    {this.props.children[1]}
                </Pane>
            </div>
        );
    }
}
