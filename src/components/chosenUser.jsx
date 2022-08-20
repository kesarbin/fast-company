import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getById } from "../api/fake.api/user.api";
import Qualitie from "./qualitie";

const ChosenUser = ({ match }) => {
    const id = match.params.userId;
    const [user, setUser] = useState();
    useEffect(() => {
        getById(id).then((data) => setUser(data));
    }, []);
    if (user) {
        return (
            <>
                <h1>{user.name}</h1>
                {user.qualities.map((qual) => (
                    <Qualitie key={qual._id} {...qual} />
                ))}
                <h2>Профессия: {user.profession.name}</h2>
                <h2>Встреч: {user.completedMeetings}</h2>
                <h2>Оценка: {user.rate} /5</h2>
            </>
        );
    }
    return <h3>Loading</h3>;
};

ChosenUser.propTypes = {
    match: PropTypes.object
};

export default ChosenUser;
