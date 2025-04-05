import { FaUserMd, FaHeartbeat, FaXRay, FaVials, FaPills, FaAmbulance, FaHospitalSymbol } from 'react-icons/fa';
import { MdPsychology, MdLocalPharmacy } from 'react-icons/md';
import { GiTooth, GiMicroscope } from 'react-icons/gi';
import { BiTestTube } from 'react-icons/bi';
import './Specialisation.css';

const Specialisation = () => {
    return(
        <div className="specialisation">
            <h1>Find By Specialisation</h1>
            <div className='specialisation-categories'>
                <div className='specialisation-category'>
                    <GiTooth size={60} style={{ color: 'rgba(42, 167, 255, 1)' }} />
                    <p>Dentistry</p>
                </div>
                <div className='specialisation-category'>
                    <FaUserMd size={60} style={{ color: 'rgba(42, 167, 255, 1)' }} />
                    <p>Primary Care</p>
                </div>
                <div className='specialisation-category'>
                    <FaHeartbeat size={60} style={{ color: 'rgba(42, 167, 255, 1)' }} />
                    <p>Cardiology</p>
                </div>
                <div className='specialisation-category'>
                    <FaHospitalSymbol size={60} style={{ color: 'rgba(42, 167, 255, 1)' }} />
                    <p>MRI Resonance</p>
                </div>
                <div className='specialisation-category'>
                    <BiTestTube size={60} style={{ color: 'rgba(42, 167, 255, 1)' }} />
                    <p>Blood Test</p>
                </div>
                <div className='specialisation-category'>
                    <MdPsychology size={60} style={{ color: 'rgba(42, 167, 255, 1)' }} />
                    <p>Psychology</p>
                </div>
                <div className='specialisation-category'>
                    <GiMicroscope size={60} style={{ color: 'rgba(42, 167, 255, 1)' }} />
                    <p>Laboratory</p>
                </div>
                <div className='specialisation-category'>
                    <FaXRay size={60} style={{ color: 'rgba(42, 167, 255, 1)' }} />
                    <p>X-ray</p>
                </div>
            </div>
        </div>
    );
};

export default Specialisation;