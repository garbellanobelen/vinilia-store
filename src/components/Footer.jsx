import {FaInstagram, FaFacebookF, FaTiktok } from "react-icons/fa";

const Footer = () =>{
    return(
        <footer>

            <div className="footer-container">

                <div className="footer-left">
                    {/*IZQUIERDA*/}
                <p>&copy; Vinilia Store - 2026</p>
                <p>Equipo:</p>
                <ul>
                    <li>Belén - Dueña</li>
                    <li>Nicolás - Encargado</li>
                    <li>Tomás - Atención al cliente</li>
                </ul>
                </div>

                <div className="footer-right">
                    <h3>GRACIAS</h3>
                    <p>Por ser parte de esta historia.</p>
                    <div className="redes">
                    <FaInstagram />
                    <FaFacebookF />
                    <FaTiktok />

                    <p className="marca">Vinilia.arg</p>

                </div>

                </div>
                

            </div>
            

            <div>
                
            </div>

             

        </footer>
    );
};

export default Footer;