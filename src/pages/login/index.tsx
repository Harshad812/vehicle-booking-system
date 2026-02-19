import { useFormik } from "formik";
import { TextInput } from "../../components";
import AuthConstant from "../../utils/authConstant";
import { useMutation } from "@tanstack/react-query";
import UserServices from "../../services/userServices";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();

  const userServices = new UserServices();

  const loginMutation = useMutation({
    mutationFn: userServices.login,
    onSuccess: (response) => {
      const token = response?.data?.data?.token;
      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem(
          "user",
          JSON.stringify(response?.data?.data?.user),
        );
        navigate("/");
      }
    },
    onError: (error) => {
      console.error("Login failed", error);
    },
  });

  const formik = useFormik({
    initialValues: AuthConstant.loginInitialValue,
    validationSchema: AuthConstant.loginSchema,
    async onSubmit(values) {
      loginMutation.mutate(values);
    },
  });

  return (
    <div className="container mx-auto flex flex-col justify-center items-center h-full gap-6">
      <h2 className="font-semibold">Login</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col bg-gray-300 p-4 rounded-lg min-w-sm gap-2">
          <TextInput
            label="Email"
            name="email"
            onChange={formik.handleChange}
          />
          <TextInput
            type="password"
            label="Password"
            name="password"
            onChange={formik.handleChange}
            isPassword
          />
          <Link to={"/register"} className="text-xs underline">
            Redirect to Register
          </Link>
          <button
            type="submit"
            className="bg-gray-500 rounded-lg p-1 text-white"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};
