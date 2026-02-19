import * as Yup from 'yup';

const loginSchema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
    password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
});

const RegisterSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
    password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
});

const loginInitialValue = {
    email: "",
    password: ""
}

const registerInitialValue = {
    name: "",
    email: "",
    password: ""
}

const AuthConstant = {
    loginSchema,
    loginInitialValue,
    RegisterSchema,
    registerInitialValue
}

export default AuthConstant