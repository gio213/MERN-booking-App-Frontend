import { useEffect } from "react";

type ToastPorps = {
  message: string;
  type: "SUCCESS" | "ERROR";
  onClose: () => void;
};

const Toast = ({ message, type, onClose }: ToastPorps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);
  const styles =
    type === "SUCCESS"
      ? "fixed top-4 right-4 z-50 rounded-md bg-green-600 text-white max-w-md shadow-md border border-green-700 px-4 py-2 transform -translate-y-2 transition-all duration-300 ease-in-out"
      : "fixed top-4 right-4 z-50 rounded-md bg-red-600 text-white max-w-md shadow-md border border-red-700 px-4 py-2 transform -translate-y-2 transition-all duration-300 ease-in-out";

  return (
    <div className={styles}>
      <div className="flex justify-center items-center">
        <span className="text-lg font-semibold">{message}</span>
      </div>
    </div>
  );
};

export default Toast;
