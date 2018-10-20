"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _pane = require("./pane.js");

var _pane2 = _interopRequireDefault(_pane);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _md = require("md5");

var _md2 = _interopRequireDefault(_md);

var _jquery = require("jquery");

var _jquery2 = _interopRequireDefault(_jquery);

var _isEqual2 = require("lodash/isEqual");

var _isEqual3 = _interopRequireDefault(_isEqual2);

var _cloneDeep2 = require("lodash/cloneDeep");

var _cloneDeep3 = _interopRequireDefault(_cloneDeep2);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_React$Component) {
    _inherits(_class, _React$Component);

    function _class(props) {
        _classCallCheck(this, _class);

        // let settings = this._getSettings();

        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

        _initialiseProps.call(_this);

        var gutterHalf = _this.props.gutterSize / 2;

        var dimension = "width";
        var clientDimension = "clientWidth";
        var clientAxis = "clientX";
        var position = "left";
        var paddingA = "paddingLeft";
        var paddingB = "paddingRight";

        if (_this.props.direction == "vertical") {
            dimension = "height";
            clientDimension = "clientHeight";
            clientAxis = "clientY";
            position = "top";
            paddingA = "paddingTop";
            paddingB = "paddingBottom";
        }

        _this.state = {
            dragging: false,
            gutterHalf: gutterHalf,
            Asize: settings.Asize,
            Bsize: settings.Bsize,
            dimension: dimension,
            clientDimension: clientDimension,
            clientAxis: clientAxis,
            position: position,
            paddingA: paddingA,
            paddingB: paddingB
        };
        return _this;
    }

    _createClass(_class, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            var direction = this.props.direction;
            var splitter = {
                backgroundColor: this.props.containerBackground,
                height: "inherit",
                padding: "10px",
                border: "1px solid #c0c0c0"
            };

            var paneStyle = {
                backgroundColor: this.props.paneBackground
            };

            if (this.props.direction == "vertical") {
                var _paneClass = "vertical";
                var _gutterClass = "gutter gutter-vertical";
                var _gutterStyle = {
                    cursor: "ns-resize",
                    height: this.props.gutterSize
                };
            } else {
                var _paneClass2 = "horizontal";
                paneStyle.float = "left";
                paneStyle.height = "100%";
                var _gutterClass2 = "gutter gutter-horizontal";
                var _gutterStyle2 = {
                    cursor: "ew-resize",
                    width: this.props.gutterSize,
                    float: "left",
                    height: "100%"
                };
            }
            return _react2.default.createElement(
                "div",
                {
                    ref: function ref(input) {
                        return _this2.splitter = input;
                    },
                    className: "splitter",
                    style: splitter
                },
                _react2.default.createElement(
                    _pane2.default,
                    {
                        ref: function ref(input) {
                            return _this2.first = input;
                        },
                        dragging: this.state.dragging,
                        size: this.state.Asize,
                        bgColor: this.props.paneBackground,
                        direction: this.props.direction,
                        className: paneClass
                    },
                    this.props.children[0]
                ),
                _react2.default.createElement("div", {
                    className: gutterClass,
                    style: gutterStyle,
                    onMouseDown: this.onMouseDown
                }),
                _react2.default.createElement(
                    _pane2.default,
                    {
                        ref: function ref(input) {
                            return _this2.second = input;
                        },
                        dragging: this.state.dragging,
                        size: this.state.Bsize,
                        bgColor: this.props.paneBackground,
                        direction: this.props.direction,
                        className: paneClass
                    },
                    this.props.children[1]
                )
            );
        }
    }]);

    return _class;
}(_react2.default.Component);

_class.propTypes = {
    //the size of the gutter
    gutterSize: _propTypes2.default.number,

    //the min size of the first (top or left) pane
    minSizeFirst: _propTypes2.default.number,

    //the min size of the second (bottom or right) pane
    minSizeSecond: _propTypes2.default.number,

    //the number of pixels before the minSize to start snap
    snapOffset: _propTypes2.default.number,

    //direction of the split pane (vertical|horizontal)
    direction: _propTypes2.default.string,

    //container bg color
    containerBackground: _propTypes2.default.string,

    //starting size of the first (top or left) pane
    defaultSizeFirst: _propTypes2.default.number,

    //background color of the panes
    paneBackground: _propTypes2.default.string
};
_class.defaultProps = {
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

var _initialiseProps = function _initialiseProps() {
    var _this3 = this;

    this.componentDidMount = function () {
        //generate unique hash for this splitter
        _this3.hash = _this3._generateHash();

        document.addEventListener("mouseup", _this3.onMouseUp);
        document.addEventListener("mousemove", _this3.onMouseMove);

        //stop selection from happening
        document.addEventListener("selectstart", _this3.preventSelection);
        document.addEventListener("dragstart", _this3.preventSelection);
        document.addEventListener("selectstart", _this3.preventSelection);
        document.addEventListener("dragstart", _this3.preventSelection);
    };

    this.componentDidUpdate = function () {
        _this3._saveSettings();
    };

    this.componentWillUnmount = function () {
        document.removeEventListener("mouseup", _this3.onMouseUp);
        document.removeEventListener("mousemove", _this3.onMouseMove);
    };

    this._getSettings = function () {
        var settings = {};
        var gutterHalf = _this3.props.gutterSize / 2;

        //size
        if (_this3.props.defaultSizeFirst) {
            var _Asize = "calc(" + _this3.props.defaultSizeFirst + "% - " + (41 + gutterHalf) + "px)";
            vletBsize = "calc(" + (100 - _this3.props.defaultSizeFirst) + "% - " + gutterHalf + "px)";
        } else {
            var _Asize2 = "calc(50% - " + (41 + gutterHalf) + "px)";
            var _Bsize = "calc(50% - " + gutterHalf + "px)";
        }

        settings = {
            Asize: Asize,
            Bsize: Bsize
        };

        return settings;
    };

    this.preventSelection = function () {
        return false;
    };

    this.onMouseDown = function (event) {
        _this3.setState({
            dragging: true
        });
    };

    this.onMouseMove = function (event) {
        if (_this3.state.dragging) {
            event.preventDefault();

            // Calculate the pairs size, and percentage of the parent size
            var splitter = _this3.splitter;
            var a = _this3.first;
            var b = _this3.second;
            var computedStyle = global.getComputedStyle(splitter);

            var parentSize = splitter[_this3.state.clientDimension] - parseFloat(computedStyle[_this3.state.paddingA]) - parseFloat(computedStyle[_this3.state.paddingB]);

            var size = a.getBoundingClientRect()[_this3.state.dimension] + b.getBoundingClientRect()[_this3.state.dimension] + _this3.state.gutterHalf + _this3.state.gutterHalf;
            var percentage = Math.min(size / parentSize * 100, 100);
            var start = a.getBoundingClientRect()[_this3.state.position];

            var offset = event[_this3.state.clientAxis] - start;

            // If within snapOffset of min or max, set offset to min or max

            if (offset <= _this3.props.minSizeFirst + _this3.props.snapOffset) {
                offset = _this3.props.minSizeFirst;
            } else if (offset >= size - _this3.props.minSizeSecond - _this3.props.snapOffset) {
                offset = size - _this3.props.minSizeSecond;
            }

            _this3.setState({
                Asize: "calc(" + offset / size * percentage + "% - " + _this3.state.gutterHalf + "px)",
                Bsize: "calc(" + (percentage - offset / size * percentage) + "% - " + _this3.state.gutterHalf + "px)"
            });
        }
    };

    this.onMouseUp = function () {
        _this3.setState({
            dragging: false
        });
    };
};

exports.default = _class;