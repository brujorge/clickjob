import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required(),
  password: Yup.string().required()
});

export default LoginSchema;
