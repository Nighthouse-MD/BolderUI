import React from 'react';
import '../App.scss';
import { Container } from '@mui/material';
import { MenuItem } from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";

import { AppBar, DrawerHeader, Main } from './StyledComponents';

import { NavLink, useLocation } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import routes from './Routes';

const drawerWidth = 240;

function NavigationDrawer({ props }) {
  const [open, setOpen] = React.useState(false);
  let location = useLocation();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const activeRoute = (routeName) => {
    return location.pathname === routeName ? true : false;
  }

  return (<Box sx={{ display: "flex" }}>
    <AppBar position="fixed" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mr: 2, ...(open && { display: "none" }) }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Bolder Explorer
        </Typography>
      </Toolbar>
    </AppBar>
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box"
        }
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </DrawerHeader>
      <Divider />
      {/* <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider /> */}
      <List>
        {routes.map((prop, key) => {
          return (
            <NavLink to={prop.path} style={{ textDecoration: 'none' }} key={key}>
              <MenuItem selected={activeRoute(prop.path)}>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={prop.sidebarName} />
              </MenuItem>
            </NavLink>
          );
        })}
      </List>
    </Drawer>
    <Main open={open}>
      <DrawerHeader />
      <Container maxWidth="lg" className="App">
        {/* <Paper className="paperOverride">
          <img src={logo} className="App-logo" alt="logo" />
          <Typography variant="h4" component="h1" gutterBottom>
            Create React App + Material-UI
          </Typography>
          <Button className="buttonOverride" variant="contained" color="primary">
            Primary Button
          </Button>
          <Button className="buttonOverride" variant="contained" color="secondary">
            Secondary Button
          </Button>
        </Paper> */}
        <Routes>
          {routes.map((route) => (
            <Route exact path={route.path} key={route.path} element={route.component} />
          ))}
        </Routes>
        {/* <ChartTest /> */}
      </Container >
    </Main >
  </Box >
  );
}

export default NavigationDrawer;