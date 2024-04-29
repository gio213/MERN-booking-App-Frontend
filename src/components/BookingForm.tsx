import { useForm } from "react-hook-form";
import { UserType } from "../types/User";

type Props = {
  currentUser: UserType;
};

export type BookingFormData = {
  firstName: string;
  lastName: string;
  email: string;
};

const BookingForm = ({ currentUser }: Props) => {
  // todo here in useForm need to add handleSubmit function
  const { register } = useForm<BookingFormData>({
    defaultValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
    },
  });

  return (
    <form className="grid grid-cols-1 gap-5 p-5 border rounded-lg border-slate-300">
      <span className="text-3xl font-bold">Confirm Your Details</span>
      <div className="grid grid-cols-2 gap-6">
        <label className="flex-1 text-sm font-bold text-gray-700">
          First Name
          <input
            className="w-full px-3 py-2 mt-1 font-normal text-gray-700 bg-gray-200 border rounded"
            type="text"
            readOnly
            disabled
            {...register("firstName")}
          />
        </label>
        <label className="flex-1 text-sm font-bold text-gray-700">
          Last Name
          <input
            className="w-full px-3 py-2 mt-1 font-normal text-gray-700 bg-gray-200 border rounded"
            type="text"
            readOnly
            disabled
            {...register("lastName")}
          />
        </label>
        <label className="flex-1 text-sm font-bold text-gray-700">
          Email
          <input
            className="w-full px-3 py-2 mt-1 font-normal text-gray-700 bg-gray-200 border rounded"
            type="text"
            readOnly
            disabled
            {...register("email")}
          />
        </label>
      </div>
      <button className="p-2 font-bold text-white bg-blue-500 w-fit hover:bg-blue-300">
        Order
      </button>
    </form>
  );
};

export default BookingForm;
