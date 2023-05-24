import {useEffect, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import {User} from "../models/MongoUserModel";

export default function useUser() {
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const initialStateUser = {
        id: "",
        username: "",
        password: "",
        co2Score: 0
    }

    const [user, setUser] = useState<User>(initialStateUser);

    useEffect(() => {
        function checkLoggedInUser() {
            axios
                .get("/api/user/me")
                .then((response) => {
                    if (response.data.username !== "" && response.data.username !== "anonymousUser") {
                        setUser(response.data);
                    }
                })
                .catch(() => {
                    toast.error("Please Sign Up or Login");
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }

        checkLoggedInUser();
        //eslint-disable-next-line
    }, []);

    function login(username: string, password: string) {
        return axios.post("/api/user/login", undefined, {auth: {username, password}})
            .then((response) => {
                setUser({
                    id: response.data.id,
                    username: response.data.username,
                    password: "",
                    co2Score: response.data.co2Score
                })
                return user
            })
            .catch((error) => {
                toast.error("You have already an account? Check your name and password! No account? Please sign up")
                throw error;
            })
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

    function updateScore(id: string, bonus: number) {
        axios.put(`/api/user/score/${id}?bonus=${bonus}`)
            .then((response) => {
                const updatedUser = response.data;
                setUser((user) => {
                    if (id === updatedUser.id) {
                        return updatedUser;
                    }
                    return user;
                });
                return updatedUser;
            })
            .catch((error) =>
                toast.error("error", error))
    }

    function resetScore(id: string) {
        axios.post(`/api/user/score/reset/${id}`)
            .then((response) =>
                setUser(response.data))
            .catch((error) =>
                toast.error("Reset failed!", error))
    }


    return {user, setUser, isLoading, setIsLoading, login, logout, signIn, updateScore, resetScore}
}