type Props = {
  selectedStart: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const StarRatingFilter = ({ selectedStart, onChange }: Props) => {
  return (
    <div className="pb-5 border-b border-slate-300">
      <h4 className="mb-2 font-semibold text-md">Property Rating</h4>
      {["5", "4", "3", "2", "1"].map((star, index) => (
        <label key={index} className="flex items-center space-x-2">
          <input
            type="checkbox"
            value={star}
            checked={selectedStart.includes(star)}
            onChange={onChange}
          />
          <span>{star} Stars</span>
        </label>
      ))}
    </div>
  );
};

export default StarRatingFilter;
