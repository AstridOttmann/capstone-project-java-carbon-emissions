import React from 'react';

import './App.css';
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import {Container} from "@mui/material";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import useRoutes from "./components/hooks/useRoutes";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import RouteCollection from "./components/RouteCollection";
import NavigationBottom from "./components/NavigationBottom";

function App() {
    const {routes, addRoute} = useRoutes();
    return (
        <Container maxWidth="lg">
            <main className="App">
                <BrowserRouter>
                    <Header/>
                    <ToastContainer autoClose={3000}/>
                    <Routes>
                        <Route path="/" element={<HomePage addRoute={addRoute}/>}/>
                        <Route path="/routes" element={<RouteCollection routes={routes}/>}/>
                    </Routes>
                    <NavigationBottom/>
                </BrowserRouter>
            </main>
        </Container>
    );
}

export default App;
