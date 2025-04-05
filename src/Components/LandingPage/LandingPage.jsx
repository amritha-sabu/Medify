import Hero from "./Hero";
import OffersCarousel from "./OffersCarousel";
import Specialisation from "./Specialisation";

const LandingPage = () => {
    return (
        <div className="landing-page">
            <Hero />
            <OffersCarousel />
            <Specialisation />
        </div>
    );
};

export default LandingPage;