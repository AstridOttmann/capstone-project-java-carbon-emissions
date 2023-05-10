import React, {useState} from 'react';

import './App.css';
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import {Container} from "@mui/material";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import RouteCollection from "./components/RouteCollection";
import NavigationBottom from "./components/NavigationBottom";
import RouteDetails from "./components/RouteDetails";
import useCompareRoutes from "./hooks/useCompareRoutes";
import CompareRoutesCollection from "./components/CompareRoutesCollection";
import CompareRoutesDetails from "./components/CompareRoutesDetails";
import LoginPage from "./components/LoginPage";
import useUser from "./hooks/useUser";
import ProtectedRoutes from "./components/ProtectedRoutes";


function App() {
    const {user, isLoading, login, logout} = useUser()
    const {
        comparedRoutes,
        comparedRoutesList,
        setComparedRoutes,
        getAllComparison,
        getComparisonById,
        addComparison,
        deleteComparisonById
    } = useCompareRoutes();
    const [isEditMode, setIsEditMode] = useState<boolean>(false)

    return (
        <Container maxWidth="lg">
            <main className="App">
                <BrowserRouter>
                    <Header user={user} onLogout={logout}/>
                    <ToastContainer autoClose={3000}/>
                    <Routes>
                        <Route path="/login"
                               element={<LoginPage
                                   getAllComparison={getAllComparison}
                                   onLogin={login}/>}/>

                        <Route element={<ProtectedRoutes user={user} isLoading={isLoading}/>}>
                            <Route element={<Navigate to="/"/>}/>
                            <Route path="/" element={
                                <HomePage
                                    getAllComparison={getAllComparison}
                                    addComparison={addComparison}
                                    setIsEditMode={setIsEditMode}
                                    isEditMode={isEditMode}
                                    comparedRoutes={comparedRoutes}
                                    setComparedRoutes={setComparedRoutes}
                                />}/>
                            <Route path="/routes" element={
                                <RouteCollection/>}/>
                            <Route path="/compared" element={
                                <CompareRoutesCollection comparedRoutesList={comparedRoutesList}
                                                         deleteComparisonById={deleteComparisonById}/>}/>
                            <Route path="/routes/details/:id" element={
                                <RouteDetails setIsEditMode={setIsEditMode}/>}/>
                            <Route path="/compared/details/:id" element={
                                <CompareRoutesDetails getComparisonById={getComparisonById}
                                                      comparedRoutes={comparedRoutes}
                                                      setIsEditMode={setIsEditMode}/>}/>

                        </Route>
                    </Routes>
                    <NavigationBottom user={user} setIsEditMode={setIsEditMode}/>
                </BrowserRouter>
            </main>
        </Container>
    );
}

export default App;
