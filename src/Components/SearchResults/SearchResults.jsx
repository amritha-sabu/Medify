import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../LandingPage/Navbar";
import './SearchResults.css';
import Card from "./Card";

const SearchResults = () => {
    const location = useLocation();

    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [medicalCenters, setMedicalCenters] = useState(location.state.medicalCenters || []);
    const [selectedState, setSelectedState] = useState(location.state.selectedState || '');
    const [selectedCity, setSelectedCity] = useState(location.state.selectedCity|| '');

    useEffect(() => {
        const fetchState = async() => {
            try{
                const response = await fetch(`https://meddata-backend.onrender.com/states`);
                const data = await response.json();
                setStates(data);
            }catch(error){
                console.error(error);
            }
        };

        fetchState();
    }, []);

    useEffect(() => {
        const fetchCity = async() => {
            try{
                const response = await fetch(`https://meddata-backend.onrender.com/cities/${selectedState}`);
                const data = await response.json();
                setCities(data);
            }catch(error){
                console.error(error);
            }
        };

        if(selectedState)
        fetchCity();
    },[selectedState]);

    const handleStateChange = (e) => {
        setSelectedState(e.target.value);
        setSelectedCity('');
    };

    const handleCityChange = (e) => {
        setSelectedCity(e.target.value);
    }; 

    const findMedicalCenters = async(e) => {
        e.preventDefault();
        try{
            const response = await fetch (`https://meddata-backend.onrender.com/data?state=${selectedState}&city=${selectedCity}`);
            const data = await response.json();
            console.log(data);
            setMedicalCenters(data);
        }catch(error){
            console.error(error);
        }
    };


    return(
        <div className="search-results">
            <Navbar />
            <div className="search-results-box">
                <div className="search-results-form">
                    <form onSubmit={(e) => findMedicalCenters(e)}>
                        <select value={selectedState} onChange={handleStateChange}>
                            <option value="" disabled>State</option>
                            {states.map((state, index) => (
                                <option key={index} value={state}>{state}</option>
                            ))}
                        </select>
                        <select value={selectedCity} onChange={handleCityChange}>
                            <option value="" disabled>City</option>
                            {cities.map((state, index) => (
                                <option key={index} value={state}>{state}</option>
                            ))}
                        </select>
                        <button type='submit'>Search</button>
                    </form>
                </div>
            </div>
            <div className="search-results-body">
                {medicalCenters.length ? 
                (
                    <div>
                        <h2>{medicalCenters.length} Medical Centers available in {selectedState}, {selectedCity}</h2>
                        {medicalCenters.map((medicalCenter, index) => (
                            <Card medicalCenter={medicalCenter} key={index}/>
                        ))}
                    </div>
                ) : (
                    <h2>No Medical Centers Found</h2>
                )}
            </div>
        </div>
    );
};

export default SearchResults;