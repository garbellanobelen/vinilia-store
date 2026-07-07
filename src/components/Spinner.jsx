const Spinner = ({ texto = "Cargando..." }) => {

    return (

        <div className="spinner-container">

            <div className="spinner"></div>

            <p>{texto}</p>

        </div>

    );

};

export default Spinner;