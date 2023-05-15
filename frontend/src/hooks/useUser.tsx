import {useEffect, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import {User} from "../models/MongoUserModel";

export default function useUser() {
    // const [user, setUser] = useState<string>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const initialStateUser = {
        id: "",
        username: "",
        password: "",
        co2Score: 0
    }
    /*const newMongoUser = {
        id: "",
        username: "",

        co2Score: 0
    }*/
    const [user, setUser] = useState<User>(initialStateUser);
    //const [mongoUser, setMongoUser] = useState<MongoUser>(initialStateMongoUser);

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
            .then((response) => {
                setUser(response.data)
            })
            .catch((error) => console.log(error))
    }

    function logout() {
        axios.post("/api/user/logout")
            .then(() => {
                setUser(initialStateUser);
            })
            .catch(error => toast.error("Already logged out!" + error))
    }

    function signIn(newMongoUser: User) {
        return axios.post("/api/user/signin", newMongoUser)
            .then(response => {
                setUser({
                    id: response.data.id,
                    username: response.data.username,
                    password: "",
                    co2Score: response.data.co2Score
                })
            })
            .catch(error => console.log(error))
    }

    return {user, setUser, isLoading, login, logout, signIn}
}