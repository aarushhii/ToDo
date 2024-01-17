

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Signup from './Signup';
import Signin from './Signin';
import TodoApp from './TodoApp';
import ProtectedRoute from './routes/ProtectedRoute';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/todoapp" element={<ProtectedRoute element={<TodoApp />} />} />
          <Route path ="/" element = {<Signup />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
