import { FaHospital, FaThumbsUp  } from 'react-icons/fa';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import 'swiper/css';
import './Card.css';
import { useEffect, useState } from 'react';
// localStorage.clear();

const Card = ({medicalCenter}) => {
    const [showCalendar, setShowCalendar] = useState(false);
    const [tabValue, setTabValue] = useState(0);
    const [selectedTime, setselectedTime] = useState(null);
    const hospitalKey = medicalCenter["Hospital Name"];

    const generateWeekDays = () => {
        const days = [];
        const today = new Date();

        for(let i = 0; i < 7; i ++){
            const date = new Date();
            date.setDate(today.getDate() + i);

            const dayLabel = 
            i === 0 ? 'Today'
            : i === 1 ? 'Tomorrow'
            : date.toLocaleDateString('en-US', {weekday : 'short'});

            const formattedDate = date.toLocaleDateString('en-US', {
                day : 'numeric',
                month : 'short'
            });

            days.push(`${dayLabel}, ${formattedDate}`);
        }

        return days;
    };

    const weekDays = generateWeekDays();
    const [selectedDay, setSelectedDay] = useState(weekDays[0]);
    

    const displayCalendar = () => {
        setShowCalendar(!showCalendar);
    };

    const handleDaySelection = (day, index) => {
        setSelectedDay(day);
        setTabValue(index);
        console.log(day, index);
    }

    const handleTimeSelect = (time) => {
        setselectedTime(time);
        console.log(time);
    };

    const handleBooking = () => {
        if (selectedDay && selectedTime) {
            setTimeSlots((prev) => {
                const updatedSlots = { ...prev };
                const daySlots = { ...updatedSlots[tabValue] };
    
                // Remove time from appropriate slot
                for (let period of ['morning', 'afternoon', 'evening']) {
                    if (daySlots[period].includes(selectedTime)) {
                        daySlots[period] = daySlots[period].filter(t => t !== selectedTime);
                        break;
                    }
                }
    
                updatedSlots[tabValue] = daySlots;
                return updatedSlots;
            });
    
            console.log(`Booked ${selectedTime} on ${selectedDay}`);
            console.log(medicalCenter);
            const datePart = selectedDay.split(',')[1];
            const year = new Date().getFullYear();
            const fullDate = new Date(`${datePart}, ${year}`);
            const formattedDate = fullDate.toISOString().split('T')[0];
            const newBooking = {
                "Hospital Name": medicalCenter["Hospital Name"],
                "City": medicalCenter["City"],
                "State": medicalCenter["State"],
                "Hospital Type": medicalCenter["Hospital Type"],
                "Hospital overall rating": medicalCenter["Hospital overall rating"],
                bookingDate: formattedDate,
                bookingTime: selectedTime,
            }
            setselectedTime(null); // reset selection if needed
            let allBookings = JSON.parse(localStorage.getItem('allBookings')) || {};
            const updatedBookingList = {...allBookings, newBooking};
            console.log(updatedBookingList, newBooking);
            localStorage.setItem('allBookings', JSON.stringify(updatedBookingList));
        }
    };
    

    const [timeSlots, setTimeSlots] = useState({});

    useEffect(() => {
        const storedAllSlots = JSON.parse(localStorage.getItem('timeSlots')) || {};
        if (storedAllSlots[hospitalKey]) {
            setTimeSlots(storedAllSlots[hospitalKey]);
        } else {
            const slots = {};
            weekDays.forEach((_, i) => {
                slots[i] = {
                    morning: ['9:00 AM', '9:30 AM', '10:00 AM'],
                    afternoon: ['1:00 PM', '1:30 PM', '2:00 PM'],
                    evening: ['5:00 PM', '5:30 PM', '6:00 PM'],
                };
            });
            storedAllSlots[hospitalKey] = slots;
            localStorage.setItem('timeSlots', JSON.stringify(storedAllSlots));
            setTimeSlots(slots);
        }
    }, []);
    

    useEffect(() => {
        if (Object.keys(timeSlots).length > 0) {
            const allSlots = JSON.parse(localStorage.getItem('timeSlots')) || {};
            allSlots[hospitalKey] = timeSlots;
            localStorage.setItem('timeSlots', JSON.stringify(allSlots));
        }
    }, [timeSlots])

    return(
        <div className="card" onClick={displayCalendar}>
            <div className='card-content'>
                <section className='icon'>
                    <FaHospital size={90} style={{ 
                        color: 'rgb(255, 255, 255)', 
                        backgroundColor: 'rgba(42, 167, 255, 1)',
                        padding: '17px',
                        borderRadius: '60px' }}/>
                </section>  
                <section className='hospital-details'>
                    <div className='details'>
                        <h2>{medicalCenter["Hospital Name"]}</h2>
                        <p>{medicalCenter["City"]}, {medicalCenter["State"]}</p>
                        <p>{medicalCenter["Hospital Type"]}</p>
                    </div>
                    <div className='booking'>
                        <button className='rating'>
                            <FaThumbsUp style={{ marginRight: '5px' }} />
                            {medicalCenter["Hospital overall rating"]}
                        </button>
                        <button type='submit' className='book-now' onClick={(e) => {
                            e.stopPropagation();
                            handleBooking();
                        }}>Book Free Center Visit</button>
                    </div>
                </section>
            </div>
            {showCalendar && (
                <>
                    <hr className='division'/>
                    <div className='calendar'>
                        <Box sx={{ width: '100%' }}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs
                                value={tabValue}
                                variant="scrollable"
                                scrollButtons="auto"
                                aria-label="scrollable week days tabs">
                                    {weekDays.map((day, index) => (
                                        <Tab 
                                        sx={{width: 250}}
                                        className={selectedDay === day ? 'day selected' : 'day'} 
                                        key={index} 
                                        label={day}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDaySelection(day, index);
                                        }}
                                        />
                                    ))}
                                </Tabs>
                                <Box className='time-slots'>
                                    <div className='slot-group'>
                                        <p>Morning</p>
                                        <div className='slot-buttons'>
                                            {timeSlots[tabValue].morning.map((time, index) => (
                                                <button 
                                                key={index} 
                                                className={selectedTime === time ? 'slot-btn selected' : 'slot-btn'}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleTimeSelect(time);
                                                }}
                                                >{time}</button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className='slot-group'>
                                        <p>Afternoon</p>
                                        <div className='slot-buttons'>
                                            {timeSlots[tabValue].afternoon.map((time, index) => (
                                                <button 
                                                key={index} 
                                                className={selectedTime === time ? 'slot-btn selected' : 'slot-btn'}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleTimeSelect(time);
                                                }}
                                                >{time}</button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className='slot-group'>
                                        <p>Evening</p>
                                        <div className='slot-buttons'>
                                            {timeSlots[tabValue].evening.map((time, index) => (
                                                <button 
                                                key={index} 
                                                className={selectedTime === time ? 'slot-btn selected' : 'slot-btn'}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleTimeSelect(time);
                                                }}
                                                >{time}</button>
                                            ))}
                                        </div>
                                    </div>
                                </Box>
                            </Box>
                        </Box>
                    </div>
                </>
            )}
        </div>
    );
};

export default Card;