import './App.css';
import Index from './book/Index';
import Home from './Home';
import AddBook from './book/AddBook'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


function App() {
  return (
    <div >
      <nav>
        <Router>
          <div>
            <Link to="/">Home</Link>{' '}
            <Link to="/book/index">Books</Link>{' '}
            {/* <Link to="/book/add">Add Book</Link>{' '} */}
            {/* <Link to="user/profile">Profile</Link>{' '} */}
            {/* <Link to="/user/logout">Login</Link>{' '} */}
            {/* <Link to="user/login">Logout</Link>{' '} */}
            {/* <Link to="/user/register">Register</Link> */}
          </div>
          <div>
            <Route exact path="/" component={Home}></Route>
            <Route path="/book/index" component={Index}></Route>
            {/* <Route path="/book/add" component={AddBook}></Route> */}
            {/* <Route path="user/profile" component={Profile}></Route> */}
            {/* <Route path="user/logout" component={Login}></Route> */}
            {/* <Route path="user/login" component={Logout}></Route> */}
            {/* <Route path="user/register" component={Register}></Route> */}
          </div>
        </Router>
      </nav>

    </div>
  );
}

export default App;
