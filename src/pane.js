import React from "react";
import PropTypes from "prop-types";
import SplitterStyle from "./splitter.css";

export default class extends React.Component {
    static propTypes = {
        dragging: PropTypes.bool,
        size: PropTypes.number,
        bgColor: PropTypes.string,
        direction: PropTypes.string,
        className: PropTypes.string
    };

    calculate = () => {
        let prefixes = ["-webkit-", "-moz-", "-o-", ""];
        let el;
        for (let i = 0; i < prefixes.length; i++) {
            el = document.createElement("div");
            el.style.cssText = "width:" + prefixes[i] + "calc(9px)";
            if (el.style.length) {
                return prefixes[i];
            }
        }
    };

    render() {
        let prefix = this.calculate().toString();
        let style = {
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

        let className = "";
        if (this.props.dragging) {
            className = SplitterStyle.unselectable;
        }

        return (
            <div style={style} className={className}>
                {this.props.children}
            </div>
        );
    }
}
