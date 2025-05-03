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
                        <div id='state'>
                            <select value={selectedState} onChange={handleStateChange}>
                                <option value="" disabled>State</option>
                                {states.map((state, index) => (
                                    <option key={index} value={state}>{state}</option>
                                ))}
                            </select>
                        </div>
                        <div id='city'>
                            <select value={selectedCity} onChange={handleCityChange}>
                                <option value="" disabled>City</option>
                                {cities.map((state, index) => (
                                    <option key={index} value={state}>{state}</option>
                                ))}
                            </select>
                        </div>
                        <button type='submit' id='searchBtn'>Search</button>
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