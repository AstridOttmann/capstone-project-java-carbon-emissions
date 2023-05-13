import {useEffect, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import {MongoUser} from "../models/MongoUserModel";

export default function useUser() {
    // const [user, setUser] = useState<string>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const initialState = {
        id: "",
        username: "",
        password: ""
    }
    const [user, setUser] = useState<MongoUser>(initialState);

    useEffect(() => {
        function checkLoggedInUser() {
            axios
                .get("/api/user/me")
                .then((response) => {
                    if (response.data.username !== "" && response.data.username !== "anonymousUser") {
                        setUser(response.data);
                        console.log("user", user)
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
                setUser(initialState);
            })
            .catch(error => toast.error("Already logged out!" + error))
    }

    function signIn(user: MongoUser) {
        return axios.post("/api/user/signin", user)
            .then(response => {
                console.log("Created an account!")
                console.log("sign", response.data);
            })
            .catch(error => toast.error("Sign in not possible. Invalid Input " + error))
    }

    return {user, setUser, isLoading, login, logout, signIn}
}