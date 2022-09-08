import React, { useEffect, useState } from "react";
import TextField from "../common/form/textField";
import validator from "../../utils/validator";
import api from "../../api";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";

const RegisterForm = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        profession: "",
        sex: "male",
        qualities: [],
        license: false
    });
    const [errors, setErrors] = useState({});
    const [qualities, setQualities] = useState({});
    const [professions, setProfessions] = useState([]);
    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
        api.qualities.fetchAll().then((data) => setQualities(data));
    }, []);
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
        console.log(target.name);
    };
    const validatorConfig = {
        email: {
            isRequierd: { message: "Поле обязательно к заполнению" },
            isEmail: { message: "Это не email" }
        },
        password: {
            isRequierd: { message: "Поле обязательно к заполнению" },
            isCapitalSymbol: {
                message: "Пароль должен содержать хотя бы одну заглавную букву"
            },
            isContainDigit: {
                message: "Пароль должен содержать хотя бы одну цифру"
            },
            min: {
                message: "Пароль должен содержать хотя бы 8 символов",
                value: 8
            }
        },
        profession: {
            isRequierd: { message: "Поле обязательно к заполнению" }
        },
        license: {
            isRequierd: {
                message:
                    "Чтобы пользоваться системой необходимо принять лицензию"
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        console.log(data);
    };
    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Электронная почта"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextField
                label="Пароль"
                name="password"
                type="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />
            <SelectField
                label="Выберите Вашу профессию"
                value={data.profession}
                name="profession"
                error={errors.profession}
                defaultOption="Choose..."
                options={professions}
                onChange={handleChange}
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
                label="Выберите пол"
            />
            <MultiSelectField
                options={qualities}
                onChange={handleChange}
                defaultValues={data.qualities}
                name="qualities"
                label="Укажите качества"
            />
            <CheckBoxField
                value={data.license}
                onChange={handleChange}
                name="license"
                error={errors.license}
            >
                Подвтердить <a>лицензионное соглашение</a>
            </CheckBoxField>
            <button
                type="submit"
                className="btn btn-primary w-100 mx-auto"
                disabled={!isValid}
            >
                Submit
            </button>
        </form>
    );
};

export default RegisterForm;
