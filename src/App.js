import Home from "./components/Home/Home";
import Movies from "./components/Movies/Movies";
import TvSeries from "./components/TvSeries/TvSeries";
import EmployeeForm from "./components/EmployeeForm/EmployeeForm";
import { BrowserRouter, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.js";
import Styles from "./assets/styles.css";

function App() {
  return (
    <BrowserRouter>
      <div className={Styles.App}>
        <Navbar />
        <Route exact path="/" component={Home} />
        <Route exact path="/Movies" component={Movies} />
        <Route exact path="/TvSeries" component={TvSeries} />
        <Route exact path="/EmployeeForm" component={EmployeeForm} />
      </div>
    </BrowserRouter>
  );
}

export default App;
