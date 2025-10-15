// src/App.jsx
import React from 'react';
// Import AppRouter, bukan LoginPage
import AppRouter from './components/AppRouter'; 

function App() {
  // HARUS MERENDER APP ROUTER
  return (
    <AppRouter />
  );
}

export default App;