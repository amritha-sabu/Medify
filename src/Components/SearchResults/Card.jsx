const Card = ({medicalCenters}) => {
    console.log(medicalCenters);
    return(
        <div className="card">
            {medicalCenters.map((center, index) => (
                <div key={index}>
                    <h2>{center["Hospital Name"]}</h2>
                    <p>{center["City"]}</p>
                </div>
            ))}
        </div>
    );
};

export default Card;