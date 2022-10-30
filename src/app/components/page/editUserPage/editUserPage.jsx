import React, { useEffect, useState } from "react";
import { validator } from "../../../utils/validator";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import BackHistoryButton from "../../common/backButton";
import { useAuth } from "../../../hooks/useAuth";
import professionService from "../../../services/profession.service";
import qualityService from "../../../services/quality.service";
import { useHistory } from "react-router-dom";

const EditUserPage = () => {
    const { currentUser, updateUser } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory();
    const [data, setData] = useState({
        name: "",
        email: "",
        profession: "",
        sex: "male",
        qualities: []
    });
    const [professions, setProfession] = useState([]);
    const [qualities, setQualities] = useState([]);
    const [errors, setErrors] = useState({});
    async function getProfessions() {
        try {
            const { content } = await professionService.get();
            const professionsList = Object.keys(content).map(
                (professionName) => ({
                    label: content[professionName].name,
                    value: content[professionName]._id
                })
            );
            setProfession(professionsList);
        } catch (error) {}
    }
    async function getQualities() {
        try {
            const { content } = await qualityService.fetchAll();
            const qualitiesList = Object.keys(content).map((optionName) => ({
                label: content[optionName].name,
                value: content[optionName]._id
                // color: content[optionName].color
            }));
            setQualities(qualitiesList);
        } catch (error) {}
    }
    const transformData = (data) => {
        return data.map((qual) => ({
            label: qualities.find((q) => q.value === qual).label,
            value: qual
        }));
    };
    useEffect(() => {
        getProfessions();
        getQualities();
        if (history.location.pathname !== `/users/${currentUser._id}/edit`) {
            history.push(`/users/${currentUser._id}/edit`);
        }
    }, []);
    useEffect(() => {
        Object.keys(qualities).length > 0 &&
            setData({
                ...currentUser,
                qualities: transformData(currentUser.qualities)
            });
    }, [currentUser, qualities]);
    useEffect(() => {
        if (data._id) setIsLoading(false);
    }, [data]);
    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        name: {
            isRequired: {
                message: "Введите ваше имя"
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        try {
            await updateUser({
                ...data,
                qualities: data.qualities.map((qual) => qual.value)
            });
            history.push(`/users/${currentUser._id}`);
        } catch (error) {
            setErrors(error);
        }
    };
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;
    return (
        <div className="container mt-5">
            <BackHistoryButton />
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {!isLoading &&
                    Object.keys(professions).length > 0 &&
                    Object.keys(qualities).length > 0 ? (
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Имя"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                error={errors.name}
                            />
                            <TextField
                                label="Электронная почта"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                error={errors.email}
                            />
                            <SelectField
                                label="Выбери свою профессию"
                                defaultOption="Choose..."
                                options={professions}
                                name="profession"
                                onChange={handleChange}
                                value={data.profession}
                                error={errors.profession}
                            />
                            <RadioField
                                options={[
                                    { name: "Male", value: "male" },
                                    { name: "Female", value: "female" },
                                    { name: "Other", value: "other" }
                                ]}
                                value={data.sex}
                                name="sex"
                                onChange={handleChange}
                                label="Выберите ваш пол"
                            />
                            <MultiSelectField
                                /* defaultValue={data.qualities.map((qual) => ({
                                    label: qualities.find(
                                        (q) => q.value === qual
                                    ).label,
                                    value: qual
                                }))} */
                                defaultValue={data.qualities}
                                options={{ ...qualities }}
                                onChange={handleChange}
                                name="qualities"
                                label="Выберите ваши качества"
                            />
                            <button
                                type="submit"
                                disabled={!isValid}
                                className="btn btn-primary w-100 mx-auto"
                            >
                                Обновить
                            </button>
                        </form>
                    ) : (
                        "Loading..."
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditUserPage;
