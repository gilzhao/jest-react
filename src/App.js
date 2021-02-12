import { BrowserRouter, Route, Switch } from 'react-router-dom';
import TodoListPage from './containers/TodoListPage';
import NotFoundPage from './containers/NotFoundPage';

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={TodoListPage}></Route>
                <Route component={NotFoundPage}></Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
