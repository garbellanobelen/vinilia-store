const Alert = ({ tipo = "success", mensaje }) => {

    if (!mensaje) return null;

    return (

        <div className={`alert ${tipo}`}>

            {mensaje}

        </div>

    );

};

export default Alert;