import api from "./apiService"

class VehicleService {

    async getVehicles() {
        return await api.get("/vehicle")
    }
}

export default VehicleService