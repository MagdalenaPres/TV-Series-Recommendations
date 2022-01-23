import Home from "./components/Home/Home";
import TvSeries from "./components/TvSeries/TvSeries";
import EmployeeForm from "./components/EmployeeForm/EmployeeForm";
import Products from "./components/Products/Products";
import Cart from "./components/Cart/Cart";
import { BrowserRouter, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.js";
import Footer from "./components/Footer/Footer.js";
import Styles from "./assets/styles.css";

const App = () => (
    <BrowserRouter>
      <div className={Styles.App}>
        <Navbar />
        <Route exact path="/" component={Home} />
        <Route exact path="/TvSeries" component={TvSeries} />
        <Route exact path="/EmployeeForm" component={EmployeeForm} />
        <Route exact path="/Products" component={Products} />
        <Route exact path="/Cart" component={Cart} />
        <div className="footer">
          <Footer />
        </div>
      </div>
    </BrowserRouter>
);
export default App;
