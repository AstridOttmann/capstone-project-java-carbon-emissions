import {useEffect, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";

export default function useUser() {
    const [user, setUser] = useState<string>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        function checkLoggedInUser() {
            axios
                .get("/api/users/me")
                .then((response) => {
                    if (response.data && response.data !== "anonymousUser") {
                        setUser(response.data);
                    }
                })
                .catch(() => {
                    toast.error("Error checking logged-in user:");
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }

        //eslint-disable-next-line
        checkLoggedInUser();
    }, []);

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
            .catch(error => toast.error("Already logged out!" + error))
    }

    return {user, isLoading, login, logout}
}