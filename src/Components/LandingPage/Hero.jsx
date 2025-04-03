import Navbar from "./Navbar";
import Search from "./Search";
import heroImage from '../../assets/hero_image.png';
import './Hero.css';

const Hero = () => {
    return(
        <div className="hero">
            <Navbar />
            <div className="hero-content">
                <div className="hero-title">
                    <h3>Skip the Travel! Find Online</h3>
                    <h1>Medical <span>Centers</span></h1>
                    <p>Connect instantly with a 24x7 specialist or choose to video visit a particular doctor.</p>
                    <button className="find-center-button">Find Centers</button>
                </div>
                <div className="hero-image">
                    <img src={heroImage} alt="Hero Image"/>
                </div>
            </div>
            <Search />
        </div>
    );
};

export default Hero;