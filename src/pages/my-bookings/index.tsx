import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import BookingService from "../../services/bookingServices";
import { LoadingIndicator, StatusBadge } from "../../components";

interface Booking {
  _id: string;
  vehicleId: {
    name: string;
    type: string;
    rentPerDay: number;
  };
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: "pending" | "confirmed" | "cancelled" | "completed";
}

export const MyBookings = () => {
  const queryClient = useQueryClient();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const {
    data: response,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["myBookings", user._id],
    queryFn: () => BookingService.getAllBookings(user._id),
  });

  const cancelMutation = useMutation({
    mutationFn: BookingService.cancelBooking,
    onSuccess: () => {
      alert("Booking cancelled successfully");
      queryClient.invalidateQueries({ queryKey: ["myBookings", user._id] });
    },
    onError: (error: Error) => {
      console.error(error);
      alert("Failed to cancel booking");
    },
  });

  const bookings: Booking[] = response?.data?.data || [];

  const handleCancel = (id: string) => {
    if (confirm("Are you sure you want to cancel this booking?")) {
      cancelMutation.mutate(id);
    }
  };

  if (isLoading) return <LoadingIndicator />;
  if (error)
    return (
      <div className="text-center text-red-500 py-8">
        Error loading bookings
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">My Bookings</h2>

      {bookings.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No bookings found.</p>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vehicle
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dates
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bookings.map((booking) => (
                  <tr key={booking._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {booking.vehicleId?.name || "Unknown Vehicle"}
                      </div>
                      <div className="text-sm text-gray-500">
                        {booking.vehicleId?.type}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>
                        {new Date(booking.startDate).toLocaleDateString()}
                      </div>
                      <div>
                        to {new Date(booking.endDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      ₹{booking.totalPrice}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge
                        variant={
                          booking.status === "confirmed"
                            ? "success"
                            : booking.status === "cancelled"
                              ? "error"
                              : "default"
                        }
                      >
                        {booking.status.charAt(0).toUpperCase() +
                          booking.status.slice(1)}
                      </StatusBadge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {booking.status === "confirmed" && (
                        <button
                          onClick={() => handleCancel(booking._id)}
                          disabled={cancelMutation.isPending}
                          className="text-red-600 hover:text-red-900"
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
