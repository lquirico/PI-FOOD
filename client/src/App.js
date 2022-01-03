import './App.css';
import { Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import RecipeCreated from './components/RecipeCreate';
import Details from "./components/Details";
import NavBar from './components/Navbar';


function App() {
  return (
    <div className="App">
    <Route exact path='/home' render={() =><NavBar/>}/>
       <Route exact path='/' render={()=><LandingPage/>} />
      <Route exact path='/home' render={()=><Home/>} />
      <Route exact path='/recipes' render={()=><RecipeCreated/>} />
      <Route exact path='/recipes/:id' render={()=><Details/>} />

      
    </div>
    
  );
}

export default App;
