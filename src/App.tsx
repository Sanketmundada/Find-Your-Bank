import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import styles from "./App.module.css";
import { Navbar, Sidebar } from "./components";
import AppProvider from "./context";
import { AllBanks, Bank, Favorite } from "./views";

function App() {
  return (
    <AppProvider>
      <Router>
        <Navbar />
        <div className={styles.wrapper}>
          <Sidebar />
          <Switch>
            <Route exact path="/">
              <Redirect to="/allbanks" />
            </Route>
            <Route exact path="/allbanks" component={AllBanks} />
            <Route exact path="/bankdetails/:ifsc" component={Bank} />
            <Route exact path="/favorites" component={Favorite} />
          </Switch>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
