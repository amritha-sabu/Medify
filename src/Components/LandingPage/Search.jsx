import { FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import { FaUserMd, FaVials, FaHospital, FaPills, FaAmbulance } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import {useNavigate } from 'react-router-dom';
import './Search.css';

const Search = () => {
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [medicalCenters, setMedicalCenters] = useState([]);
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const navigate = useNavigate();

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
            navigate('/medical-centers', { state: { medicalCenters: data, 
                selectedState : selectedState,
                selectedCity : selectedCity } });
        }catch(error){
            console.error(error, `cannot fetch ${medicalCenters}`);
        }
    };

    return(
        <div className="search">
            <div className='search-container'>
                <div className='search-form'>
                    <form onSubmit={(e) => findMedicalCenters(e)}>
                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <InputLabel id="state-label">State</InputLabel>
                            <Select
                            id="state"
                            value={selectedState}
                            label="State"
                            onChange={handleStateChange}
                            sx={{width: 220}}
                            >
                            {states.map((state, index) => (
                                <MenuItem key={index} value={state}>{state}</MenuItem>
                            ))}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth sx={{ mb: 2 }} disabled={!selectedState}>
                            <InputLabel id="city-label">City</InputLabel>
                            <Select
                            id="city"
                            value={selectedCity}
                            label="City"
                            onChange={handleCityChange}
                            sx={{width: 220}}
                            >
                            {cities.map((city, index) => (
                                <MenuItem key={index} value={city}>{city}</MenuItem>
                            ))}
                            </Select>
                        </FormControl>

                        <Button
                            type="submit"
                            variant="contained"
                            id='searchBtn'
                            className='searchBtn'
                        >
                            Search
                        </Button>
                    </form>
                </div>
                <div className='search-categories'>
                    <p>You may be looking for</p>
                    <div className='categories'>
                        <div className='category'>
                            <FaUserMd size={60} style={{ color: 'rgba(42, 167, 255, 1)' }} />
                            <p>Doctor</p>
                        </div>
                        <div className='category'>
                            <FaVials size={60} style={{ color: 'rgba(42, 167, 255, 1)' }} />
                            <p>Labs</p>
                        </div>
                        <div className='category'>
                            <FaHospital size={60} style={{ color: 'rgba(42, 167, 255, 1)' }} />
                            <p>Hospitals</p>
                        </div>
                        <div className='category'>
                            <FaPills size={60} style={{ color: 'rgba(42, 167, 255, 1)' }} />
                            <p>Medical Store</p>
                        </div>
                        <div className='category'>
                            <FaAmbulance size={60} style={{ color: 'rgba(42, 167, 255, 1)' }} />
                            <p>Ambulance</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Search;