import React from "react";
import { Select, TextInput } from "../common";

interface FilterState {
  search: string;
  type: string;
  minPrice: string;
  maxPrice: string;
  availability: string;
}

interface FilterSectionProps {
  filters: FilterState;
  setFilter: (key: keyof FilterState, value: string) => void;
  onFilterChange: () => void;
}

export const FilterSection: React.FC<FilterSectionProps> = ({
  filters,
  setFilter,
  onFilterChange,
}) => {
  const handleChange = (key: keyof FilterState, value: string) => {
    setFilter(key, value);
    onFilterChange();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      <div className="w-full">
        <TextInput
          placeholder="Search vehicles..."
          className="h-[38px]"
          value={filters.search}
          onChange={(e) => handleChange("search", e.target.value)}
        />
      </div>
      <div className="w-full">
        <Select
          options={[
            { label: "All Types", value: "" },
            { label: "Petrol", value: "petrol" },
            { label: "Electric", value: "electric" },
            { label: "Diesel", value: "diesel" },
          ]}
          value={filters.type}
          onChange={(e) => handleChange("type", e.target.value)}
        />
      </div>
      <div className="w-full">
        <Select
          options={[
            { label: "All Status", value: "" },
            { label: "Available", value: "true" },
            { label: "Booked", value: "false" },
          ]}
          value={filters.availability}
          onChange={(e) => handleChange("availability", e.target.value)}
        />
      </div>
      <div className="w-full">
        <TextInput
          type="number"
          placeholder="Min Price"
          className="h-[38px] border border-gray-200 rounded-lg"
          value={filters.minPrice}
          onChange={(e) => handleChange("minPrice", e.target.value)}
        />
      </div>
      <div className="w-full">
        <TextInput
          type="number"
          placeholder="Max Price"
          className="h-[38px] border border-gray-200 rounded-lg"
          value={filters.maxPrice}
          onChange={(e) => handleChange("maxPrice", e.target.value)}
        />
      </div>
    </div>
  );
};
