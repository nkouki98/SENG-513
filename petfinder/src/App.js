import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage';

import { PostCard } from './PostCard';
import LoginPage from './pages/LoginPage';
import PrivateRoutes from './utils/PrivateRoute';
import Navbar from './Navbar';
function App() {
  return (
    <div className="App">
    
        <Router>

        <Navbar/>
          
          <Routes>  
            <Route element={<PrivateRoutes />}>
                <Route element={<LoginPage/>} path="/" exact/>
                <Route element={<HomePage/>} path="/Home" exact/>
                <Route element={<PostCard/>} path="/Feed" exact/>
            </Route>
            
            <Route element={<LoginPage/>} path="/login"/>
          </Routes>
      
      </Router>

    </div>
  );
}

export default App;