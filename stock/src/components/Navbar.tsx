import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import Logo from '../assets/stock.jpeg';

interface NavbarProps {
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLogout }) => {
  const handleLogout = () => {
    onLogout();
  };

  return (
    <AppBar position="static" className="bg-gray-800 text-center">
      <Toolbar className="container mx-auto flex justify-between">
        <Typography variant="h6" component="div" className="">
          <img src={Logo} alt="logo" className="h-20 mr-2 p-4" />
        </Typography>
        <div className="flex items-center justify-center space-x-10">
          <Link to="/wishlist" className="text-white font-semibold">
            Watchlist
          </Link>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="logout"
            onClick={handleLogout}
          >
            <LogoutIcon className="text-white" />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;