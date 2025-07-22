import React, { useState } from 'react';
import { Menu, MenuItem, IconButton, Avatar } from '@mui/material';
import { Dashboard, Person, ExitToApp, ListAlt, ShoppingBag } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userActions';

const Useroptions = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const { cartItems } = useSelector((state) => state.cart);
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (path) => {
    navigate(path);
    handleMenuClose();
  };

  const handleLogout = () => {
    dispatch(logout());
    handleMenuClose();
  };

  return (
    <>
      <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
        <Avatar alt={user.name} src="/assets/image.png" sx={{width:30, height:28, bgcolor:'#F9AAAD'}} />
      </IconButton>
      <Menu sx={{m:0}}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {user.role === 'admin' && (
          <MenuItem onClick={() => handleClick('/admin/dashboard')}>
            <Dashboard fontSize="small" sx={{ mr: 1 }} />
            Dashboard
          </MenuItem>
        )}
        <MenuItem onClick={() => handleClick('/orders')}>
          <ListAlt fontSize="small" sx={{ mr: 1 }} />
          Orders
        </MenuItem>
        <MenuItem onClick={() => handleClick('/account')}>
          <Person fontSize="small" sx={{ mr: 1 }} />
          Profile
        </MenuItem>
        <MenuItem onClick={() => handleClick('/cart')}>
          <ShoppingBag fontSize="small" sx={{ mr: 1 }} />
          Cart  <span className='text-red-500'>  ({cartItems.length})</span>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ExitToApp fontSize="small" sx={{ mr: 1 }} />
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default Useroptions;
