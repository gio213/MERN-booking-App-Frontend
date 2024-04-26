import { hotelFacilities } from "../config/hotel-options-config";

type Props = {
  selectedFacility: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const FacilitiesFilter = ({ selectedFacility, onChange }: Props) => {
  return (
    <div className="pb-5 border-b border-slate-300">
      <h4 className="mb-2 font-semibold text-md">Facilities</h4>
      {hotelFacilities.map((faiclity, index) => (
        <label key={index} className="flex items-center space-x-2">
          <input
            type="checkbox"
            value={faiclity}
            checked={selectedFacility.includes(faiclity)}
            onChange={onChange}
          />
          <span>{faiclity}</span>
        </label>
      ))}
    </div>
  );
};

export default FacilitiesFilter;
