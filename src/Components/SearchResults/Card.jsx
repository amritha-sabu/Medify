import { FaHospital, FaThumbsUp  } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './Card.css';
import { useState } from 'react';

const Card = ({medicalCenter}) => {
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);

    const displayCalendar = () => {
        setShowCalendar(!showCalendar);
    };

    const handleDaySelection = (index) => {
        setSelectedIndex(index);
    }

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
                        <button className='book-now'>Book Free Center Visit</button>
                    </div>
                </section>
            </div>
            {showCalendar && (
                <>
                    <hr className='division'/>
                    <div className='calendar'>
                        <Swiper
                        spaceBetween={50}
                        slidesPerView={3}
                        onSlideChange={() => console.log('slide change')}
                        onSwiper={(swiper) => console.log(swiper)}
                        >
                            {weekDays.map((day, index) => (
                                <SwiperSlide className={selectedIndex !== index ? 'day' : 'day selected'}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDaySelection(index, day);
                                }} 
                                key={index}>{day}</SwiperSlide>
                            ))}
                        </Swiper>
                        <section className='slots'>
                            <div className='morning-slot'></div>
                            <div className='afternoon-slot'></div>
                            <div className='evening-slot'></div>
                        </section>
                    </div>
                </>
            )}
        </div>
    );
};

export default Card;