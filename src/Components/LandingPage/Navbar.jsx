import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/my-bookings');
    }

    return(
        <div className="navbar">
            <section className="top-header">
                <p>The health and well-being of our patients and their health care team will always be our priority, so we follow the best practices for cleanliness.</p>
            </section>
            <section className='bottom-nav'>
                <div className='icon'>
                    <h1 className='site-name'>Medify</h1>
                </div>
                <div className='nav-links'>
                    <a href='#'>Find Doctors</a>
                    <a href='#'>Hospitals</a>
                    <a href='#'>Medicines</a>
                    <a href='#'>Surgeries</a>
                    <a href='#'>Software for Provider</a>
                    <a href='#'>Facilities</a>
                </div>
                <div className='booking-button'>
                    <button onClick={handleClick}>My Bookings</button>
                </div>
            </section>
        </div>
    );
};

export default Navbar;