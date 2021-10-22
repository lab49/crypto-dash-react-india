import Header from "../src/components/Header";
import Body from "../src/components/Body";
import Footer from "../src/components/Footer";

const Home = () => {
    return (
        <div className="container-fluid px-0 text-white">
            <Header/>
            <Body/>
            <Footer/>
        </div>
    )
}

export default Home;