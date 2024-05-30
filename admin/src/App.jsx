import React from 'react'
import { Navbar } from './components/Navbar/Navbar';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Route, Routes } from 'react-router-dom';
import { Add } from './pages/Add/Add';
import { Orders } from './pages/Orders/Orders';
import { List } from './pages/List/List';

function App() {
  return (
    <div>
      <Navbar/>
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path='/add' element={<Add/>} />
          <Route path='/list' element={<List/>} />
          <Route path='/orders' element={<Orders/>} />
        </Routes>
      </div>
    </div>
  )
}

export default App;
