type Props = {
  selectedPrice?: number;
  onChande: (valule?: number) => void;
};

const PriceFilter = ({ selectedPrice, onChande }: Props) => {
  return (
    <div>
      <h4 className="mb-2 font-semibold text-md">Max Price</h4>
      <select
        className="w-full p-2 border rounded-md cursor-pointer"
        value={selectedPrice}
        onChange={(event) =>
          onChande(
            event.target.value ? parseInt(event.target.value) : undefined
          )
        }
      >
        <option value="">Select Max Price</option>
        {[50, 100, 200, 300, 500].map((price, index) => (
          <option key={index}>{price}</option>
        ))}
      </select>
    </div>
  );
};

export default PriceFilter;
