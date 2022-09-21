import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import CardDetail from './components/CardDetail';
import Formulario from './components/Formulario';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
    <Route exact path='/' component={LandingPage} />
    <Route  path = '/home' component={Home}/>  
    <Route path = '/recipes' component={Formulario} />
    <Route  path= '/recipe/:id' component={CardDetail} />
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
