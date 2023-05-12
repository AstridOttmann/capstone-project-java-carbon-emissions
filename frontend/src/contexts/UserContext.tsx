import React, {createContext, ReactElement, useEffect, useMemo, useState} from "react";
import {MongoUser} from "../models/MongoUserModel";
import axios from "axios";
import {toast} from "react-toastify";

export type UserContextType = {
    mongoUser?: MongoUser,
    setMongoUser: (mongoUser: MongoUser) => void,
    user?: string,
    setUser: (user: string) => void,
    isLoading: boolean,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    login: (username: string, password: string) => Promise<string | number | void>,
    logout: () => Promise<string | number | void>,
    signIn: (username: string, password: string) => Promise<string | number | void>


}
type UserContextProps = {
    children: ReactElement
}
export const UserContext = createContext<UserContextType>({
    mongoUser: undefined,
    setMongoUser: () => {
    },
    user: undefined,
    setUser: () => {
    },
    isLoading: true,
    setIsLoading: () => {
    },
    login: () => Promise.reject(),
    logout: () => Promise.reject(),
    signIn: () => Promise.reject()
})

export default function UserContextProvider(props: UserContextProps) {
    const initialState = {
        username: "",
        password: "",
        userId: ""
    }

    const [mongoUser, setMongoUser] = useState<MongoUser>(initialState);
    const [user, setUser] = useState<string>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const contextValue = useMemo(() => ({
        mongoUser,
        setMongoUser,
        user,
        setUser,
        isLoading,
        setIsLoading,
        login,
        logout,
        signIn
        //eslint-disable-next-line
    }), []);

    useEffect(() => {
        function checkLoggedInUser() {
            axios
                .get("/api/users/me")
                .then((response) => {
                    if (response.data && response.data !== "anonymousUser") {
                        setUser(response.data);
                        console.log(user)
                    }
                })
                .catch(() => {
                    toast.error("Error checking logged-in user:");
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

    function signIn(username: string, password: string) {
        return axios.post("/api/user/signin", {username, password})
            .then(response => {
                setMongoUser(response.data)
            })
            .catch(error => toast.error("Sign in not possible. Invalid Input " + error))
    }

    return (
        <UserContext.Provider
            value={contextValue}>
            {props.children}
        </UserContext.Provider>
    )

}