import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../../api";
import { getById, update } from "../../api/fake.api/user.api";
import Qualitie from "../ui/qualities/qualitie";
import { Link, useParams } from "react-router-dom";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import MultiSelectField from "../common/form/multiSelectField";

const ChosenUser = ({ match }) => {
    const { type } = useParams();
    const [data, setData] = useState({
        name: "",
        profession: "",
        qualities: ""
    });
    const [formType, setFormType] = useState(type === "edit" ? type : "user");
    const [qualities, setQualities] = useState([]);
    const [professions, setProfessions] = useState([]);
    useEffect(() => {
        api.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfessions(professionsList);
        });
        api.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                label: data[optionName].name,
                value: data[optionName]._id,
                color: data[optionName].color
            }));
            setQualities(qualitiesList);
        });
    }, []);
    const saveEdit = () => {
        setUser((prevState) => ({
            ...prevState,
            name: data.name,
            profession: {
                _id: data.profession,
                name: professions.find((item) => item.value === data.profession)
                    .label
            },
            qualities: data.qualities.map((item) => {
                return {
                    name: item.label,
                    color: item.color,
                    _id: item._value
                };
            })
        }));
        update(id, {
            name: data.name,
            profession: {
                _id: data.profession,
                name: professions.find((item) => item.value === data.profession)
                    .label
            },
            qualities: data.qualities.map((item) => {
                return {
                    name: item.label,
                    color: item.color,
                    _id: item._value
                };
            })
        });
        console.log(user);
    };
    const toggleFormType = () => {
        setFormType((prevstate) => {
            if (prevstate === "edit") {
                saveEdit();
                return "user";
            } else {
                return "edit";
            }
        });
    };
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
        console.log(target.name);
    };
    const id = match.params.userId;
    const [user, setUser] = useState();
    useEffect(() => {
        getById(id).then((data) => {
            setUser(data);
            setData({
                ...data,
                profession: data.profession._id,
                qualities: data.qualities.map((item) => {
                    return {
                        label: item.name,
                        color: item.color,
                        value: item._id
                    };
                })
            });
        });
    }, []);
    if (user) {
        return formType === "edit" ? (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3 shadow p-4">
                        <TextField
                            label="Имя"
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                        />
                        <SelectField
                            label="Выберите Вашу профессию"
                            value={data.profession}
                            name="profession"
                            defaultOption={user.profession.name}
                            options={professions}
                            onChange={handleChange}
                        />
                        <MultiSelectField
                            options={qualities}
                            onChange={handleChange}
                            defaultValue={data.qualities}
                            name="qualities"
                            label="Укажите качества"
                        />
                        <button>
                            <Link
                                onClick={toggleFormType}
                                to={`/users/${user._id}/`}
                            >
                                Сохранить
                            </Link>
                        </button>
                    </div>
                </div>
            </div>
        ) : (
            <>
                <h1>{user.name}</h1>
                {user.qualities.map((qual) => (
                    <Qualitie key={qual._id} {...qual} />
                ))}
                <h2>Профессия: {user.profession.name}</h2>
                <h2>Встреч: {user.completedMeetings}</h2>
                <h2>Оценка: {user.rate} /5</h2>
                <button>
                    <Link
                        onClick={toggleFormType}
                        to={`/users/${user._id}/edit`}
                    >
                        Изменить
                    </Link>
                </button>
            </>
        );
    }
    return <h3>Loading</h3>;
};

ChosenUser.propTypes = {
    match: PropTypes.object
};

export default ChosenUser;
