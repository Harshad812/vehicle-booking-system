import api from "./apiService";

interface RegisterPayload {
    name: string;
    email: string;
    password: string;
}

interface LoginPayload extends Omit<RegisterPayload, "name"> {
}


class UserServices {
    async register(payload: RegisterPayload) {
        return await api.post("/auth/register", payload)
    }

    async login(payload: LoginPayload) {
        return await api.post("/auth/login", payload)
    }
}

export default UserServices