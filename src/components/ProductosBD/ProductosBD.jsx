import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    collection,
    getDocs,
    deleteDoc,
    doc
} from "firebase/firestore";

import { db } from "../../firebase/config";

import ConfirmModal from "../ConfirmModal";
import Spinner from "../Spinner";

const ProductosBD = () => {

    const navigate = useNavigate();

    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [modalOpen, setModalOpen] = useState(false);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);

    useEffect(() => {

        const cargarProductos = async () => {

            try {

                const productosRef = collection(db, "productos");

                const resp = await getDocs(productosRef);

                const productosFirebase = resp.docs.map((doc) => ({

                ...doc.data(),
                id: doc.id

            }));

                setProductos(productosFirebase);

            } catch (err) {

                console.log(err);

                setError("Ocurrió un error al cargar los productos.");

            } finally {

                setLoading(false);

            }

        };

        cargarProductos();

    }, []);

    const eliminarProducto = async () => {

        if (!productoSeleccionado) return;

        try {

            await deleteDoc(
                doc(db, "productos", productoSeleccionado.id)
            );

            setProductos(
                productos.filter(
                    (prod) => prod.id !== productoSeleccionado.id
                )
            );

            setModalOpen(false);
            setProductoSeleccionado(null);

        } catch (error) {

            console.log(error);

            alert("No se pudo eliminar el producto.");

        }

    };

    if (loading) {

        return <Spinner texto="Cargando productos..." />;

    }

    if (error) {

        return <h2>{error}</h2>;

    }

    return (

        <section className="productosBD-container">

            <div className="admin-header">

                <div>

                    <h2>Panel de Administración</h2>

                    <p>
                        Gestioná el catálogo de Vinilia Store.
                    </p>

                </div>

                <button
                    className="btn-nuevo-producto"
                    onClick={() => navigate("/nuevo-producto")}
                >
                    + Nuevo Vinilo
                </button>

            </div>

            <div className="productos-grid">

                {productos.map((prod) => (

                    <div
                        className="card"
                        key={prod.id}
                    >

                        <img
                            src={prod.imagen}
                            alt={prod.nombre}
                        />

                        <h3>{prod.nombre}</h3>

                        <p>
                            <strong>Categoría:</strong> {prod.categoria}
                        </p>

                        <p>
                            <strong>Precio:</strong> ${prod.precio}
                        </p>

                        <p>
                            <strong>Stock:</strong> {prod.stock}
                        </p>

                        <p className="estado-stock">

                            {prod.stock > 5 && "🟢 En stock"}

                            {prod.stock > 0 && prod.stock <= 5 && "🟠 Últimas unidades"}

                            {prod.stock === 0 && "🔴 Sin stock"}

                        </p>

                        <div className="admin-buttons">

                            <button
                                className="btn-editar-producto"
                                onClick={() =>
                                    navigate(`/editar-producto/${prod.id}`)
                                }
                            >
                                ✏️ Editar
                            </button>

                            <button
                                className="btn-eliminar-producto"
                                onClick={() => {

                                    setProductoSeleccionado(prod);

                                    setModalOpen(true);

                                }}
                            >
                                🗑 Eliminar
                            </button>

                        </div>

                    </div>

                ))}

            </div>

            <ConfirmModal
                isOpen={modalOpen}
                title="Eliminar producto"
                message="¿Estás seguro de eliminar este vinilo? Esta acción no se puede deshacer."
                onCancel={() => {

                    setModalOpen(false);

                    setProductoSeleccionado(null);

                }}
                onConfirm={eliminarProducto}
            />

        </section>

    );

};

export default ProductosBD;