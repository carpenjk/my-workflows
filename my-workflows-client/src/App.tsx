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
    <div className="App min-w-full min-h-screen bg-gradient-to-r from-slate-800 via-slate-900 to-gray-900" >
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