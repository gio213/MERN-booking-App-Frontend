import { useForm } from "react-hook-form";
import { UserType } from "../types/User";
import { PaymentIntentResponse } from "@/types/PaymentIntent";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";
import { useSearchContext } from "../context/SearchContext";
import { useParams } from "react-router-dom";
import { useMutation } from "react-query";
import * as apiClient from "../api/api-client";
import { useAppContext } from "../context/AppContext";

type Props = {
  currentUser: UserType;
  paymentIntent: PaymentIntentResponse;
};

export type BookingFormData = {
  firstName: string;
  lastName: string;
  email: string;
  hotelId: string;
  adultCount: number;
  childCount: number;
  checkIn: string;
  checkOut: string;
  paymentIntentId: string;
  totalCost: number;
};

const BookingForm = ({ currentUser, paymentIntent }: Props) => {
  const stripe = useStripe();
  const elements = useElements();

  const search = useSearchContext();
  const { hotelId } = useParams();

  const { showToast } = useAppContext();

  const { mutate: bookRoom, isLoading } = useMutation(apiClient.createBooking, {
    onSuccess: () => {
      showToast({ message: "Booking Successful", type: "SUCCESS" });
      //
    },
    onError: () => {
      showToast({ message: "Booking Failed", type: "ERROR" });
      //
    },
  });

  const { handleSubmit, register } = useForm<BookingFormData>({
    defaultValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
      adultCount: search.adultCount,
      childCount: search.childCount,
      checkIn: search.checkIn.toISOString(),
      checkOut: search.checkOut.toISOString(),
      hotelId: hotelId,
      totalCost: paymentIntent.totalCost,
      paymentIntentId: paymentIntent.paymentIntentId,
    },
  });

  const onSubmit = async (formData: BookingFormData) => {
    if (!stripe || !elements) {
      return;
    }
    const result = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement) as StripeCardElement,
      },
    });
    if (result.paymentIntent?.status === "succeeded") {
      bookRoom({ ...formData, paymentIntentId: result.paymentIntent.id });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-5 p-5 border rounded-lg border-slate-300"
    >
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
      <div className="space-y-2">
        <h2 className="text-xl font-semibold ">Your Price Summary</h2>
        <div className="p-4 bg-blue-200 rounded-md">
          <div className="text-lg font-semibold">
            Total Cost: €{paymentIntent.totalCost.toFixed(2)}
          </div>
          <div className="text-xs">Includes taxes and charges</div>
        </div>
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">Payment Details</h3>
        <CardElement id="payment-element" className="p-2 text-sm border-md" />
      </div>
      <div className="flex justify-end">
        <button
          disabled={isLoading}
          type="submit"
          className="p-2 font-bold text-white bg-blue-600 hover:bg-blue-500 text-md disabled:bg-gray-500"
        >
          {isLoading ? "Booking..." : "Confirm Booking"}
        </button>
      </div>
    </form>
  );
};

export default BookingForm;
