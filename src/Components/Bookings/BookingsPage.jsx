import { useEffect, useState } from "react";
import { FaHospital, FaThumbsUp  } from 'react-icons/fa';
import Navbar from "../LandingPage/Navbar";
import './BookingPage.css';

const BookingPage = () => {
    const [allBookings, setAllBookings] = useState([]);

    useEffect(() => {
        const stored = localStorage.getItem('bookings');
        if (stored) {
            setAllBookings(JSON.parse(stored));
        }
    }, []);

    return(
        <div className="bookings-page">
            <Navbar />
            <div className="booking-search-box">
                <h1>My Bookings</h1>
                <div className="booking-search-box-form">
                    <form>
                        <input type="text" placeholder="Search By Hospital" />
                        <button type='submit'>Search</button>
                    </form>
                </div>
            </div>
            <div className="all-bookings">
                {allBookings.length > 0 ? (
                    allBookings.map((booking, index) => (
                        <div className='booked-card'>
                            <div key={index} className='booked-card-content'>
                                <section className='icon'>
                                    <FaHospital size={90} style={{ 
                                        color: 'rgb(255, 255, 255)', 
                                        backgroundColor: 'rgba(42, 167, 255, 1)',
                                        padding: '17px',
                                        borderRadius: '60px' }}/>
                                </section>  
                                <section className='booked-hospital-details'>
                                    <div className='booked-details'>
                                        <div className='booked-details-1'>
                                            <h3>{booking["Hospital Name"]}</h3>
                                            <p>{booking["City"]}, {booking["State"]}</p>
                                            <p>{booking["Hospital Type"]}</p>
                                        </div>
                                        <div className='booked-details-2'>
                                            <p className='time'>{booking["bookingTime"]}</p>
                                            <p className='date'>{booking["bookingDate"]}</p>
                                        </div>
                                    </div>
                                    <div className='booking'>
                                        <button className='rating'>
                                            <FaThumbsUp style={{ marginRight: '5px' }} />
                                            {booking["Hospital overall rating"]}
                                        </button>
                                    </div>
                                </section>
                            </div>
                        </div>
                    ))
                ):(
                    <div className="no-bookings">
                        <h1>No Bookings</h1>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookingPage;