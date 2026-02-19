import { useFormik } from "formik";
import { TextInput } from "../../components";
import AuthConstant from "../../utils/authConstant";
import { useMutation } from "@tanstack/react-query";
import UserServices from "../../services/userServices";
import { Link, useNavigate } from "react-router-dom";

export const Register = () => {
  const navigate = useNavigate();
  const userServices = new UserServices();

  const register = useMutation({
    mutationFn: userServices.register,
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
  });

  const formik = useFormik({
    initialValues: AuthConstant.registerInitialValue,
    validationSchema: AuthConstant.RegisterSchema,
    async onSubmit(values) {
      await register.mutate(values);
    },
  });

  return (
    <div className="container mx-auto flex flex-col justify-center items-center h-full gap-6">
      <h2 className="font-semibold">Register</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col bg-gray-300 p-4 rounded-lg min-w-sm gap-2">
          <TextInput label="Name" name="name" onChange={formik.handleChange} />
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
          <Link to={"/login"} className="text-xs underline">
            Redirect to Login
          </Link>
          <button
            type="submit"
            className="bg-gray-500 rounded-lg p-1 text-white"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};
