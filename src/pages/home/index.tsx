import {
  keepPreviousData,
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import VehicleService from "../../services/vehicleService";
import BookingService from "../../services/bookingServices";
import {
  StatusBadge,
  Pagination,
  Select,
  BookingModal,
} from "../../components/common";
import { LoadingIndicator, FilterSection } from "../../components";
import { useState } from "react";
import { useDebounceValue } from "../../hooks/useDebounceValue";

interface Vehicle {
  _id: string;
  name: string;
  type: string;
  rentPerDay: number;
  availability: boolean;
  popularity: number;
}

export const Home = () => {
  const vehicleServices = new VehicleService();
  const queryClient = useQueryClient();
  const [filters, setFilters] = useState({
    search: "",
    type: "",
    minPrice: "",
    maxPrice: "",
    availability: "",
  });

  const [page, setPage] = useState(1);
  const [limit] = useState(10); // Standard limit
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  const debouncedFilters = useDebounceValue(filters, 300);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const {
    data: vehicleResponse,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["vehicle", debouncedFilters, page, limit, sortBy, sortOrder],
    queryFn: () =>
      vehicleServices.getVehicles({
        search: debouncedFilters.search,
        type: debouncedFilters.type,
        minPrice: debouncedFilters.minPrice,
        maxPrice: debouncedFilters.maxPrice,
        availability: debouncedFilters.availability || undefined,
        page,
        limit,
        sortBy,
        sortOrder,
      }),
    placeholderData: keepPreviousData,
  });

  const bookingMutation = useMutation({
    mutationFn: BookingService.create,
    onSuccess: () => {
      alert("Booking confirmed successfully!");
      setSelectedVehicle(null);
      queryClient.invalidateQueries({ queryKey: ["vehicle"] });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      alert(
        error.response?.data?.message || "Booking failed. Please try again.",
      );
    },
  });

  const vehicles = vehicleResponse?.data?.data || [];
  const meta = vehicleResponse?.data?.meta || {};

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const setFilter = (key: keyof typeof filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleBookClick = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
  };

  const handleConfirmBooking = (
    startDate: Date,
    endDate: Date,
    totalPrice: number,
  ) => {
    if (selectedVehicle && selectedVehicle._id) {
      bookingMutation.mutate({
        vehicleId: selectedVehicle._id,
        startDate,
        endDate,
        totalPrice,
        userId: user._id,
      });
    }
  };

  if (error) {
    return (
      <div className="text-center text-red-500 py-10 font-medium">
        Error loading vehicles. Please try again later.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 relative">
      <div className="mb-8 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-800">
            Available Vehicles
          </h2>
        </div>

        <FilterSection
          filters={filters}
          setFilter={setFilter}
          onFilterChange={() => setPage(1)}
        />

        <div className="flex justify-end gap-2 text-sm text-gray-500">
          <span className="self-center mr-2">Sort by:</span>
          <Select
            options={[
              { label: "Date Added", value: "createdAt" },
              { label: "Price", value: "rentPerDay" },
              { label: "Name", value: "name" },
            ]}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          />
          <Select
            options={[
              { label: "Desc", value: "desc" },
              { label: "Asc", value: "asc" },
            ]}
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          />
        </div>
      </div>

      {isLoading ? (
        <LoadingIndicator />
      ) : vehicles.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-xl">
          <p className="text-gray-500 text-lg">No vehicles found.</p>
        </div>
      ) : (
        <>
          <div className="overflow-hidden bg-white rounded-lg shadow-sm border border-gray-100">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vehicle
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ">
                    Rent per Day
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Availability
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Popularity
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Book</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {vehicles.map((vehicle: Vehicle, index: number) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900">
                          {vehicle.name}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge variant="default">
                        {vehicle.type}
                      </StatusBadge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold text-center">
                      ₹{vehicle.rentPerDay}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge
                        variant={vehicle.availability ? "success" : "error"}
                      >
                        {vehicle.availability ? "Available" : "Booked"}
                      </StatusBadge>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {vehicle.popularity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleBookClick(vehicle)}
                        disabled={!vehicle.availability}
                        className={`px-4 py-2 rounded-md text-white font-medium transition-colors ${
                          vehicle.availability
                            ? "bg-indigo-600 hover:bg-indigo-700"
                            : "bg-gray-300 cursor-not-allowed"
                        }`}
                      >
                        {vehicle.availability ? "Book Now" : "Unavailable"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6">
            <Pagination
              currentPage={meta.page || 1}
              totalPages={meta.totalPages || 1}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      )}

      {selectedVehicle && (
        <BookingModal
          vehicle={selectedVehicle}
          onClose={() => setSelectedVehicle(null)}
          onConfirm={handleConfirmBooking}
          isLoading={bookingMutation.isPending}
        />
      )}
    </div>
  );
};
