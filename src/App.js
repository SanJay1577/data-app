
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import { AddUser } from './Components/AddUser';
import Dashboard from './Components/Dashboard';
import EditUser from './Components/EditUser';
import Hooks from './Components/Hooks';
import { Nopage } from './Components/NoPage';
import UserComponent from './Components/UserComponent';
import { UserDetails } from './Components/UserDetails';

function App() {
  //useEffect
  return (
    <div className="App">
      
      <Switch>
        <Route exact path="/">
        <UserComponent/>
        </Route>
        
        <Route path="/add/user">
          <AddUser/>
        </Route>

        <Route path="/edit/:id">
            <EditUser/>
        </Route>

        <Route path="/user/:id">
           <UserDetails/>
        </Route>

        
        <Route path="/dashboard">
           <Dashboard/>
        </Route>


        {/* <Route path="/students">
             <Redirect path= "/"/>
        </Route> */}

        <Route path="/hooks">
          <Hooks/>
        </Route>

        <Route path = "**">
            <Nopage/>
        </Route>
      
      </Switch>
    </div>
  );
}

export default App;

//CRUD --
//Create - done
//Read - done 
//update - done
//delete - done
// router dom - done

//context - cerate a context 
// provider sub cmodel 
// useContext 