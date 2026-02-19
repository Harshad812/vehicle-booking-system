import api from "./apiService";

interface QueryType {
  search?: string;
  type?: string;
  minPrice?: string;
  maxPrice?: string;
  availability?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
}

class VehicleService {
  async getVehicles(query: QueryType) {
    const params = {
      search: query.search || undefined,
      type: query.type || undefined,
      minPrice: query.minPrice || undefined,
      maxPrice: query.maxPrice || undefined,
      availability:
        query.availability !== undefined ? query.availability : undefined,
      page: query.page || 1,
      limit: query.limit || 10,
      sortBy: query.sortBy || "createdAt",
      sortOrder: query.sortOrder || "desc",
    };

    return await api.get("/vehicle", { params });
  }
}

export default VehicleService;
