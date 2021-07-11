import Index from "./pages/index";
import Result from "./pages/result";
import './App.css';
import {Route, Switch, Redirect} from "react-router-dom";

function App() {
   return (
       <div className="App">
            <Switch>
                <Route path={"/index"} component={Index}/>
                <Route path={"/result"} component={Result}/>
                <Redirect to={"/index"}/>
            </Switch>
       </div>
  );
}

export default App;
