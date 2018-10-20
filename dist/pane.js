"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _splitter = require("./splitter.css");

var _splitter2 = _interopRequireDefault(_splitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_React$Component) {
    _inherits(_class, _React$Component);

    function _class() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, _class);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = _class.__proto__ || Object.getPrototypeOf(_class)).call.apply(_ref, [this].concat(args))), _this), _this.calculate = function () {
            var prefixes = ["-webkit-", "-moz-", "-o-", ""];
            var el = void 0;
            for (var i = 0; i < prefixes.length; i++) {
                el = document.createElement("div");
                el.style.cssText = "width:" + prefixes[i] + "calc(9px)";
                if (el.style.length) {
                    return prefixes[i];
                }
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(_class, [{
        key: "render",
        value: function render() {
            var prefix = this.calculate().toString();
            var style = {
                border: "1px solid #ddd",
                boxShadow: "inset 0 1px 2px #e4e4e4",
                backgroundColor: this.props.bgColor,
                padding: "20px",
                overflowX: "hidden",
                overflowY: "auto"
            };

            if (this.props.direction === "vertical") {
                style.height = prefix + this.props.size;
            } else {
                style.width = prefix + this.props.size;
                style.height = "100%";
                style.float = "left";
            }

            var className = "";
            if (this.props.dragging) {
                className = _splitter2.default.unselectable;
            }

            return _react2.default.createElement(
                "div",
                { style: style, className: className },
                this.props.children
            );
        }
    }]);

    return _class;
}(_react2.default.Component);

_class.propTypes = {
    dragging: _propTypes2.default.bool,
    size: _propTypes2.default.number,
    bgColor: _propTypes2.default.string,
    direction: _propTypes2.default.string,
    className: _propTypes2.default.string
};
exports.default = _class;