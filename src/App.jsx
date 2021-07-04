import { HashRouter as Router, Route } from 'react-router-dom'
import { Home } from './pages/Home';
import './App.css';
import { CarApp } from './pages/CarApp';

function App() {
  return (
    <Router>
      <Route path='/cars' component={CarApp} />
      <Route path='/' exact component={Home} />
    </Router>
  );
}

export default App;
