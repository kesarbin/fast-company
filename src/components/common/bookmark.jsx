import React from "react";
import PropTypes from "prop-types";

const BookMark = ({ status, ...rest }) => {
    return (
        <button {...rest}>
            <i
                className={
                    "bi bi-arrow-through-heart" + (status ? "-fill" : "")
                }
            ></i>
        </button>
    );
};

BookMark.propTypes = {
    status: PropTypes.bool.isRequired
};

export default BookMark;
