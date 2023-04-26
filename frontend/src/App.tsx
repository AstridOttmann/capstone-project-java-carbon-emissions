import React from 'react';

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
    const {routes, route, setRoute, getRouteById, addRoute, initialStateRoute} = useRoutes();
    return (
        <Container maxWidth="lg">
            <main className="App">
                <BrowserRouter>
                    <Header/>
                    <ToastContainer autoClose={3000}/>
                    <Routes>
                        <Route path="/" element={<HomePage initialStateRoute={initialStateRoute}
                                                           route={route}
                                                           setRoute={setRoute}
                                                           addRoute={addRoute}/>}/>
                        <Route path="/routes" element={<RouteCollection routes={routes}/>}/>
                        <Route path="/routes/details/:id" element={<RouteDetails getRouteById={getRouteById} route={route}/>}/>
                    </Routes>
                    <NavigationBottom/>
                </BrowserRouter>
            </main>
        </Container>
    );
}

export default App;
