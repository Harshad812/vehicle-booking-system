import api from "./apiService";

interface BookingData {
  vehicleId: string;
  startDate: string | Date;
  endDate: string | Date;
  totalPrice: number;
  userId?: string;
}

const BookingService = {
  create: async (data: BookingData) => {
    return await api.post("/bookings", data);
  },

  getAllBookings: async (userId: string) => {
    return await api.get(`/bookings/my-bookings?userId=${userId}`);
  },

  cancelBooking: async (id: string) => {
    return await api.patch(`/bookings/${id}/cancel`);
  },
};

export default BookingService;
