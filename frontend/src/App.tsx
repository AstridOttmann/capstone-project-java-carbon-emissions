import React, {useState} from 'react';

import './App.css';
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import {Container} from "@mui/material";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import RouteCollection from "./components/RouteCollection";
import NavigationBottom from "./components/NavigationBottom";
import RouteDetails from "./components/RouteDetails";
import useCompareRoutes from "./hooks/useCompareRoutes";
import CompareRoutesCollection from "./components/CompareRoutesCollection";


function App() {
    const [isEditMode, setIsEditMode] = useState<boolean>(false)
    const {routesToCompare, comparedRoute, setComparedRoute, addComparison} = useCompareRoutes();

    return (
        <Container maxWidth="lg">
            <main className="App">
                <BrowserRouter>
                    <Header/>
                    <ToastContainer autoClose={3000}/>
                    <Routes>
                        <Route path="/" element={
                            <HomePage
                                addComparison={addComparison}
                                setIsEditMode={setIsEditMode}
                                isEditMode={isEditMode}
                                comparedRoute={comparedRoute}
                                setComparedRoute={setComparedRoute}
                            />}/>
                        <Route path="/routes" element={
                            <RouteCollection/>}/>
                        <Route path="/compared" element={
                            <CompareRoutesCollection routesToCompare={routesToCompare}/>}/>
                        <Route path="/routes/details/:id" element={
                            <RouteDetails setIsEditMode={setIsEditMode}/>}/>
                    </Routes>
                    <NavigationBottom setIsEditMode={setIsEditMode}/>
                </BrowserRouter>
            </main>
        </Container>
    );
}

export default App;
