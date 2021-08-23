import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
      <Switch>
        {/* <Redirect exact from='/' to='' /> */}
        {/* <Route path="/" component={Photo} />
        <Route component={NotFound} /> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
