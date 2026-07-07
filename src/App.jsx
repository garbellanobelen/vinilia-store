import {BrowserRouter, Routes, Route} from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Productos from "./pages/Productos";
import ProductoDetalle from "./pages/ProductoDetalle";
import Carrito from "./pages/Carrito";
import NewProductContainer from "./components/NewProductContainer";
import ProductosBD from "./components/ProductosBD/ProductosBD";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EditarProducto from "./pages/EditarProducto";
//import NuevoProducto from "./pages/NuevoProducto";
import ProtectedRoute from "./components/ProtectedRoute";

function App () {
  return(
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/producto/:id" element={<ProductoDetalle />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/nuevo-producto" element={
            <ProtectedRoute>
              <NewProductContainer/>
            </ProtectedRoute>
          }
          />
          <Route path="/productosBD" element={
            <ProtectedRoute>
              <ProductosBD/>
            </ProtectedRoute>
          }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/editar-producto/:id" element={
            <ProtectedRoute>
              <EditarProducto/>
            </ProtectedRoute>
          } />
          
          
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;