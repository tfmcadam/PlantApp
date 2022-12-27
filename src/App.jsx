import { Routes, Route } from 'react-router-dom'
import './App.css';
import { AllPlants } from './views/AllPLants';
import { AddAPlant } from './views/AddAPlant';
import { CommonName } from './components/CommonName'
import { MyPlants } from './views/MyPlants';
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="container1 plant ">
      <header>
        <nav className='navbar navbar-expand-lg navbar-light d-flex justify-content-around leaves'>
          <div className='d-flex align-items-center'>
            <h1 className='color'> House Plant Finder</h1>
            <Link className='btn color' to="/users/plants">My Plants</Link>
            <Link className='btn' to="/">All Plants</Link>
          </div>

          <div>
            <a href="*" className='color m-1' >Login</a>
            <a href="*" className='color m-1'>Register</a>
          </div>
        </nav>
      </header>
      <Routes>
        <Route path='/' element={<AllPlants />} />
        <Route path="/common/:name" element={<CommonName />} />
        <Route path="users/new/common/:name" element={<AddAPlant />} />
        <Route path="/users/plants" element={<MyPlants />} />
      </Routes>
    </div>
  );
}

export default App;
