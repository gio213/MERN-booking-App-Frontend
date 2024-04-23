import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const ImagesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Images</h2>
      <div className="border rounded p-4 flex flex-col gap-4">
        <input
          type="file"
          multiple
          accept="image/*"
          className="w-full text-gray-700 font-normal"
          {...register("imageUrls", {
            validate: (imageUrls) => {
              const totalLenght = imageUrls.length;
              if (totalLenght === 0) {
                return "At least one image should be added";
              }
              if (totalLenght > 6) {
                return "Total number of images cannot be more than 6";
              }
            },
          })}
        />
      </div>
      {errors.imageUrls && (
        <span className="text-red-500 text-sm font-bold">
          {errors.imageUrls.message}
        </span>
      )}
    </div>
  );
};

export default ImagesSection;
