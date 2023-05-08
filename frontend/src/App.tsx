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
import CompareRoutesDetails from "./components/CompareRoutesDetails";


function App() {
    const [isEditMode, setIsEditMode] = useState<boolean>(false)

    const {
        comparedRoutes,
        comparedRoutesList,
        setComparedRoutes,
        getAllComparison,
        getComparisonById,
        addComparison,
        updateComparison,
        deleteComparisonById
    } = useCompareRoutes();

    return (
        <Container maxWidth="lg">
            <main className="App">
                <BrowserRouter>
                    <Header/>
                    <ToastContainer autoClose={3000}/>
                    <Routes>
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
                            <CompareRoutesDetails getComparisonById={getComparisonById} comparedRoutes={comparedRoutes}
                                                  setIsEditMode={setIsEditMode}/>}/>
                    </Routes>
                    <NavigationBottom setIsEditMode={setIsEditMode}/>
                </BrowserRouter>
            </main>
        </Container>
    );
}

export default App;
