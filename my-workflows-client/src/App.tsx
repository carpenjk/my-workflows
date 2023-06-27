import './App.css';
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";

import Login from './views/Login';
import Dashboard from './views/Dashboard';
import Manage from './views/Manage';
import Workflows from './views/Workflows';
import Layout from './views/Layout';


function App() {
  return (
    <div className="w-full min-h-screen min-w-screen App bg-slate-900" >
    <BrowserRouter>
    <Routes >
      <Route path="/" element={<Layout />}>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/" element={<Dashboard/>}></Route>
        <Route path="/manage" element={<Manage/>}></Route>
        <Route path="/workflows" element={<Workflows/>}></Route>
      </Route>
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;