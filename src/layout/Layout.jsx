import Header from "../components/Header";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <NavBar />
            <main>{children}</main>
            <Footer />
        </>
    );
};

export default Layout;