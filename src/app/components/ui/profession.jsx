import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import {
    getProfessionsByIds,
    getProfessionsLoadingStatus,
    loadProfessionsList
} from "../../store/professions";

const Profession = ({ id }) => {
    const dispatch = useDispatch();
    const prof = useSelector(getProfessionsByIds(id));
    const isLoading = useSelector(getProfessionsLoadingStatus());
    useEffect(() => {
        dispatch(loadProfessionsList());
    });
    if (!isLoading) {
        return <p>{prof.name}</p>;
    } else return "Loading...";
};
Profession.propTypes = {
    id: PropTypes.string
};
export default Profession;
