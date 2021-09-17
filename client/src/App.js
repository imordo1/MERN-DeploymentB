
import './App.css';
import { Link, Route, Switch, Redirect} from 'react-router-dom'
import NewPet from './Components/NewPet'
import PetList from './Components/PetList';
import OnePet from './Components/OnePet';
import EditPet from './Components/EditPet';
// import NotFound from "./views/NotFound";

function App() {
  return (
    <div className="container">
      <nav className=" d-flex col col-8 flex-column container p-3 my-3 bg-dark text-white rounded shadow">
        <h1 className="fs-1 navbar-brand mb-0 mx-auto">Pet Shelter</h1>
        <div className="d-flex justify-content-center text-justify">
          <Link
            to="/pets/"
            className="col col-2 btn btn-sm btn-success m-2 btn-outline "
          >
            All Pets
          </Link>

          <Link
            to="/pets/new"
            className="col col-3 btn btn-sm btn-success m-2 btn-outline"
          >
            Add New Pet
          </Link>
        </div>
      </nav>

      <Switch>
 
        <Redirect exact from="/" to="/pets" />
        <Route exact path="/pets/new">
          <NewPet />
        </Route>
        <Route exact path="/pets/">
          <PetList />
        </Route>
        <Route exact path="/pets/:id">
          <OnePet />
        </Route>
        <Route exact path="/pets/:id/edit">
          <EditPet />
        </Route>
        {/* <Route component={NotFound} /> */}
      </Switch>
    </div>
  );
}

export default App;