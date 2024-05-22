import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api/api-client";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

export type PasswordResetFormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

const PasswordReset = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordResetFormData>();

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  const mutation = useMutation(apiClient.resetPassword, {
    onSuccess: async () => {
      showToast({ message: "Password Reset Success!", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
      navigate("/sign-in");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold">Create an Account</h2>
      <div className="flex flex-col gap-5 md:flex-row"></div>
      <label className="flex-1 text-sm font-bold text-gray-700">
        Email
        <input
          type="email"
          className="w-full px-2 py-1 font-normal border rounded"
          {...register("email", { required: "This field is required" })}
        ></input>
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </label>
      <div />
      <label className="flex-1 text-sm font-bold text-gray-700">
        New Password
        <input
          type="password"
          className="w-full px-2 py-1 font-normal border rounded"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        ></input>
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </label>
      <label className="flex-1 text-sm font-bold text-gray-700">
        Confrim Password
        <input
          type="password"
          className="w-full px-2 py-1 font-normal border rounded"
          {...register("confirmPassword", {
            validate: (val) => {
              if (!val) {
                return "This field is requierd";
              } else if (watch("password") !== val) {
                return "Your password do not match";
              }
            },
          })}
        ></input>
        {errors.confirmPassword && (
          <span className="text-red-500">{errors.confirmPassword.message}</span>
        )}
      </label>
      <span>
        <button
          type="submit"
          className="p-2 text-xl font-bold text-white bg-blue-600 hover:bg-blue-500"
        >
          Reset Password
        </button>
      </span>
    </form>
  );
};

export default PasswordReset;
