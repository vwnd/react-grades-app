import React from "react";

export default function Action(props) {
    const { id, type, onActionClick } = props;

    const handleIconClick = () => {
        onActionClick(id, type);
    };

    return (
        <span>
            <i
                className="small material-icons"
                onClick={handleIconClick}
                style={{ cursor: "pointer" }}
            >
                {type}
            </i>
        </span>
    );
}
