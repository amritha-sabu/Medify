import { FaHospital, FaThumbsUp  } from 'react-icons/fa';
import './Card.css';

const Card = ({medicalCenter}) => {
    return(
        <div className="card">
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
        </div>
    );
};

export default Card;