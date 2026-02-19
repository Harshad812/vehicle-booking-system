import { useQuery } from "@tanstack/react-query";
import VehicleService from "../../services/vehicleService";

export const Home = () => {
  const vehicleServices = new VehicleService();

  const { data: vehicleResponse, isLoading } = useQuery({
    queryKey: ["vehicle"],
    queryFn: vehicleServices.getVehicles,
  });

  console.log("data", vehicleResponse?.data?.data);

  return (
    <div className="container mx-auto flex flex-col gap-6">
      <h2 className="font-semibold text-lg py-4">Vehicle</h2>
      <table>
        <tr className="py-2">
          <th className="border">Name</th>
          <th className="border">Type</th>
          <th className="border">Rent per Day</th>
          <th className="border">Availability</th>
        </tr>
        {vehicleResponse?.data?.data?.map((vehicle, index) => (
          <tr className="py-2">
            <td className="border text-center">{vehicle?.name}</td>
            <td className="border text-center">{vehicle?.type}</td>
            <td className="border text-center">{vehicle?.rentPerDay}</td>
            <td className="border text-center">
              {vehicle?.availability ? "Available" : "Booked"}
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};
