import React, {useState} from 'react';

import './App.css';
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import {Container} from "@mui/material";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import useRoutes from "./hooks/useRoutes";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import RouteCollection from "./components/RouteCollection";
import NavigationBottom from "./components/NavigationBottom";
import RouteDetails from "./components/RouteDetails";

function App() {
    const {
        routes,
        route,
        initialStateRoute,
        setRoute,
        getRouteById,
        addRoute,
        deleteRoute,
        updateRoute
    } = useRoutes();

    const [isEditMode, setIsEditMode] = useState<boolean>(false)

    return (
        <Container maxWidth="lg">
            <main className="App">
                <BrowserRouter>
                    <Header/>
                    <ToastContainer autoClose={3000}/>
                    <Routes>
                        <Route path="/" element={
                            <HomePage setIsEditMode={setIsEditMode}
                                      isEditMode={isEditMode}
                                      initialStateRoute={initialStateRoute}
                                      route={route}
                                      setRoute={setRoute}
                                      addRoute={addRoute}
                                      updateRoute={updateRoute}/>}/>
                        <Route path="/routes" element={
                            <RouteCollection deleteRoute={deleteRoute} routes={routes}/>}/>
                        <Route path="/routes/details/:id" element={
                            <RouteDetails setIsEditMode={setIsEditMode}
                                          setRoute={setRoute}
                                          initialStateRoute={initialStateRoute}
                                          getRouteById={getRouteById}
                                          route={route}/>}/>
                    </Routes>
                    <NavigationBottom
                        setIsEditMode={setIsEditMode}
                        initialStateRoute={initialStateRoute}
                        setRoute={setRoute}/>
                </BrowserRouter>
            </main>
        </Container>
    );
}

export default App;
