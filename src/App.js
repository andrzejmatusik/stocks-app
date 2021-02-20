import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Content from "./components/layout/Content";
import SignUp from "./components/forms/SignUp";
import SignIn from "./components/forms/SignIn";
import Settings from "./components/layout/Settings";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Content} />
          <Route path="/signup" component={SignUp} />
          <Route path="/signin" component={SignIn} />
          <Route path="/settings" component={Settings} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
