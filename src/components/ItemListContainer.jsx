import { useEffect, useState } from "react";
import ItemList from "./ItemList";

const ItemListContainer = () => {
    const [productos, setProductos] = useState([]);

    useEffect(() =>{
        fetch("/data/productos.json")
        .then(res => res.json())
        .then(data => setProductos(data));
    }, []);

    return <ItemList productos={productos} />
};

export default ItemListContainer;