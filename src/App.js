import Index from "./pages/Index";
import Result from "./pages/Result";
import DetailInfo from "./pages/DetailInfo";
import './App.css';
import {Route, Switch, Redirect} from "react-router-dom";

function App() {
   return (
       <div className="App">
            <Switch>
                <Route path={"/Index"} component={Index}/>
                <Route path={"/Result"} component={Result}/>
                <Route path={"/DetailInfo"} component={DetailInfo}/>
                <Redirect to={"/Index"}/>
            </Switch>
       </div>
  );
}

export default App;
