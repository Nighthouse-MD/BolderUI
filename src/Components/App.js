import React from 'react';
import './App.scss';

import CssBaseline from "@mui/material/CssBaseline";
import NavigationDrawer from './NavigationDrawer/NavigationDrawer';

function App() {
  return (
    <>
      <CssBaseline enableColorScheme />
      <NavigationDrawer />
    </>
  );
}

export default App;