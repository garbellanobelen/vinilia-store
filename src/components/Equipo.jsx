const equipo = [

    {
        nombre: "Belén",
        cargo: "Fundadora & Desarrolladora Web",
        descripcion:
            "Apasionada por la música y el desarrollo web. Creó Vinilia para acercar los mejores vinilos a los coleccionistas.",
        foto: "https://i.pravatar.cc/300?img=32"
    },

    {
        nombre: "Nicolás",
        cargo: "Encargado",
        descripcion:
            "Se ocupa de la logística, el stock y de que cada pedido llegue en perfectas condiciones.",
        foto: "https://i.pravatar.cc/300?img=15"
    },

    {
        nombre: "Tomás",
        cargo: "Atención al Cliente",
        descripcion:
            "Siempre listo para ayudarte a encontrar el vinilo ideal y responder cualquier consulta.",
        foto: "https://i.pravatar.cc/300?img=12"
    }

];

const Equipo = () => {

    return (

        <section className="equipo">

            <h2>Nuestro Equipo</h2>

            <p className="equipo-subtitulo">
                Detrás de cada vinilo hay personas apasionadas por la música.
            </p>

            <div className="equipo-grid">

                {equipo.map((persona) => (

                    <article
                        className="equipo-card"
                        key={persona.nombre}
                    >

                        <img
                            src={persona.foto}
                            alt={persona.nombre}
                        />

                        <h3>{persona.nombre}</h3>

                        <span>{persona.cargo}</span>

                        <p>{persona.descripcion}</p>

                    </article>

                ))}

            </div>

        </section>

    );

};

export default Equipo;