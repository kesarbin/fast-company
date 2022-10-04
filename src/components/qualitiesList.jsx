import React from "react";
import PropTypes from "prop-types";
import Qualitie from "./qualitie";
import { useQuality } from "../hooks/useQualities";

const QualitiesList = ({ qualities }) => {
    const { isLoading, getQuality } = useQuality();
    const qual = getQuality(qualities);
    if (!isLoading) {
        return (
            <>
                {qual.map((qual) => (
                    <Qualitie key={qual._id} {...qual} />
                ))}
            </>
        );
    } else {
        return "loading...";
    }
};

QualitiesList.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesList;
