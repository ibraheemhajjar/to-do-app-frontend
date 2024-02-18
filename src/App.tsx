import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar'; 
import { Home } from './components/Home';
import { Register } from './auth/Register';
import { Login } from './auth/Login'; 
import { TodoList } from './features/todos/TodoList'; 

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/todos" element={<TodoList />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
