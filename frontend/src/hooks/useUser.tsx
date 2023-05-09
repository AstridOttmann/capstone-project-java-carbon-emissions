import {useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";

export default function useUser() {
    const [user, setUser] = useState<string>();

    function login(username: string, password: string) {
        return axios.post("/api/user/login", undefined, {auth: {username, password}})
            .then(response => setUser(response.data))
            .catch((error) => toast.error("Unknown User! " + error))
    }

    function logout() {
        return axios.post("/api/user/logout")
            .then(() => {
                setUser(undefined);
            })
    }

    return {user, login, logout}
}