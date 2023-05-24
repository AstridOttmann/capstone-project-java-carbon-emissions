import React, {useContext, useEffect, useState} from 'react';

import './App.css';
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import {Container, createTheme, ThemeProvider,} from "@mui/material";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import RouteCollection from "./components/routes/RouteCollection";
import NavigationBottom from "./components/NavigationBottom";
import RouteDetails from "./components/routes/RouteDetails";
import useCompareRoutes from "./hooks/useCompareRoutes";
import CompareRoutesCollection from "./components/compare/CompareRoutesCollection";
import LoginPage from "./components/LoginPage";
import useUser from "./hooks/useUser";
import ProtectedRoutes from "./components/ProtectedRoutes";
import UserAccount from "./components/UserAccount";
import {RoutesContext} from "./contexts/RoutesContextProvider";

export const theme = createTheme({
    components: {
        MuiDivider: {
            styleOverrides: {
                root: {
                    backgroundColor: "#cd5300"
                }
            }
        },
        MuiBadge: {
            styleOverrides: {
                badge: {
                    fontSize: "1rem",
                    minWidth: "25px",
                }
            }
        }
    },
    palette: {
        mode: 'dark',
        primary: {
            main: '#008d0d',
            light: '#00f923',
        },
        secondary: {
            main: '#cd5300',
        },
        error: {
            main: '#ff0000'
        },
        info: {
            main: '#fff',
            dark: '#B3BDB3'
        },
        text: {
            primary: '#fff'
        },
        background: {
            paper: '#000'
        }
    },
    typography: {
        fontFamily: "Roboto mono",
        fontSize: 14,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700,
        button: {
            textTransform: "none"
        }
    }
})

function App() {
    const {user, setUser, isLoading, login, logout, signIn, updateScore, resetScore} = useUser()
    const {getAllRoutesByUserId} = useContext(RoutesContext)
    const {
        compareRoutes,
        compareRoutesList,
        setCompareRoutes,
        getAllComparisonByUserId,
        addComparison,
        updateComparison,
        deleteComparisonById,
        resetAllUsages
    } = useCompareRoutes();
    const [isEditMode, setIsEditMode] = useState<boolean>(false)

    useEffect(() => {
        if (user) {
            getAllComparisonByUserId(user.id)
            getAllRoutesByUserId(user.id)
        }
        //eslint-disable-next-line
    }, [user.id])

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="lg">
                <main className="App">
                    <BrowserRouter>
                        <Header user={user} onLogout={logout}/>
                        <ToastContainer autoClose={5000}/>
                        <Routes>
                            <Route path="/login"
                                   element={<LoginPage
                                       onLogin={login}
                                       onSignIn={signIn}
                                       user={user}
                                       setUser={setUser}
                                   />}
                            />

                            <Route element={<ProtectedRoutes user={user}
                                                             isLoading={isLoading}/>}>
                                <Route element={<Navigate to="/"/>}/>
                                <Route path="/" element={
                                    <HomePage
                                        user={user}
                                        getAllComparisonByUserId={getAllComparisonByUserId}
                                        addComparison={addComparison}
                                        setIsEditMode={setIsEditMode}
                                        isEditMode={isEditMode}
                                        compareRoutes={compareRoutes}
                                        setCompareRoutes={setCompareRoutes}
                                    />}/>
                                <Route path="/routes" element={
                                    <RouteCollection/>}/>
                                <Route path="/compared" element={
                                    <CompareRoutesCollection user={user}
                                                             updateScore={updateScore}
                                                             compareRoutes={compareRoutes}
                                                             compareRoutesList={compareRoutesList}
                                                             updateComparison={updateComparison}
                                                             getAllComparisonByUserId={getAllComparisonByUserId}
                                                             deleteComparisonById={deleteComparisonById}/>}
                                />
                                <Route path="/routes/details/:id" element={
                                    <RouteDetails setIsEditMode={setIsEditMode}/>}/>
                                <Route path="/account" element={<UserAccount user={user}
                                                                             resetScore={resetScore}
                                                                             resetAllUsages={resetAllUsages}/>}/>

                            </Route>
                        </Routes>
                        <NavigationBottom user={user} setIsEditMode={setIsEditMode}/>
                    </BrowserRouter>
                </main>
            </Container>
        </ThemeProvider>
    );
}

export default App;
