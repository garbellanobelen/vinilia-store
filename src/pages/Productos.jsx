import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";

import { db } from "../firebase/config";
import Item from "../components/Item";
import Spinner from "../components/Spinner";

const Productos = () => {

    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const obtenerProductos = async () => {

            try {

                const productosRef = collection(db, "productos");

                const resp = await getDocs(productosRef);

                const listaProductos = resp.docs.map((doc) => ({

                    ...doc.data(),

                    id: doc.id

                }));

                setProductos(listaProductos);

            } catch (error) {

                console.log(error);

                setError("No se pudieron cargar los productos.");

            } finally {

                setLoading(false);

            }

        };

        obtenerProductos();

    }, []);

    if (loading) {

        return <Spinner texto="Cargando productos..." />;

    }

    if (error) {

        return <h2>{error}</h2>;

    }

    return (

        <section>

            <h2>PRODUCTOS</h2>

            <div className="productos-grid">

                {productos.map((producto) => (

                    <Item
                        key={producto.id}
                        producto={producto}
                    />

                ))}

            </div>

        </section>

    );

};

export default Productos;