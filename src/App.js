import './App.css';
import Home from './components/pages/Home';
import Movies from './components/pages/Movies';
import TvSeries from './components/pages/TvSeries';
import EmployeeForm from './components/pages/EmployeeForm';
import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom';
import Navbar from './components/navbarComponent/Navbar.js';
import Styles from './assets/styles.css'

function App() {
  return (
    <BrowserRouter>
    <div className="App">
        <Navbar />
          <Route exact path='/' component={Home} />
          <Route exact path='/Movies' component={Movies}/>
          <Route exact path='/TvSeries' component={TvSeries} />
          <Route exact path='/EmployeeForm' component={EmployeeForm} />
    </div>
    </BrowserRouter>

  );
}

export default App;
