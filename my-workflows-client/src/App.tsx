import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import 'animate.css';

import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";

import Login from 'routes/Login';
import Dashboard from 'routes/Dashboard';
import Manage from 'routes/Manage';
import Workflows from 'routes/Workflows';
import Layout from 'features/ui/layout/Layout';
import ProtectedRoute from 'routes/ProtectedRoute';
import Logout from 'routes/Logout';
import Register from 'routes/Register';


function App() {
  return (
    <div className="w-full min-h-screen min-w-screen App dark:bg-dk-primary-9 bg-primary-8" >
    <BrowserRouter>
    <Routes >
      <Route path="/" element={<Layout />}>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/logout" element={<Logout/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route element={<ProtectedRoute/>}>
          <Route path="/" element={<Dashboard/>}></Route>
          <Route path="/manage" element={<Manage/>}></Route>
          <Route path="/workflows" element={<Workflows/>}></Route>
        </Route>
      </Route>
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;