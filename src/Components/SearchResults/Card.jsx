const Card = ({medicalCenters}) => {
    return(
        <div className="card">
            {medicalCenters.map((center, index) => (
                <div key={index}>{center["Hospital Name"]}</div>
            ))}
        </div>
    );
};

export default Card;