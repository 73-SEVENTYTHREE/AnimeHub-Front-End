import Index from "./pages/Index";
import Result from "./pages/Result";
import DetailInfo from "./pages/DetailInfo";
import './App.css';
import {Route, Switch, Redirect} from "react-router-dom";

function App() {
   return (
       <div className="App">
            <Switch>
                <Route path={"/index"} component={Index}/>
                <Route path={"/result"} component={Result}/>
                <Route path={"/detailInfo"} component={DetailInfo}/>
                <Redirect to={"/Index"}/>
            </Switch>
       </div>
  );
}

export default App;
