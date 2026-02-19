import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DateRangePickerProps {
  startDate: Date | null;
  endDate: Date | null;
  onChange: (update: [Date | null, Date | null] | null) => void;
  error?: string;
  label?: string;
}

export const DateRangePicker = ({
  startDate,
  endDate,
  onChange,
  error,
  label = "Select Dates",
}: DateRangePickerProps) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="flex flex-col space-y-2">
        <div className="relative">
          <ReactDatePicker
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={onChange}
            isClearable={true}
            placeholderText="Select start and end date"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-gray-700 placeholder-gray-400"
            wrapperClassName="w-full"
            dateFormat="MMM d, yyyy"
            minDate={new Date()} // Prevent past dates
          />
        </div>
        {error && <p className="text-red-500 text-xs">{error}</p>}
      </div>
    </div>
  );
};
