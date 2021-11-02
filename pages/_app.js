import '../styles/globals.scss'
import 'bootstrap/dist/css/bootstrap.css'
import SideBar from '../src/components/sideBar';

function MyApp({ Component, pageProps }) {
  return (
    <div className="app-background">
      <div className="container-fluid text-white row app-body">
        <SideBar />
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
