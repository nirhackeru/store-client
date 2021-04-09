import React, { useState } from "react";
import { Menu, Badge } from "antd";
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { connect } from 'react-redux';
import {signout} from '../../actions/user'

import Search from "../forms/Search";

import {Link} from 'react-router-dom'

const { SubMenu, Item } = Menu;

const Header = ({isAuthenticated,user,signout, cart}) => {
  const [current, setCurrent] = useState("home");

  const handleClick = (e) => {
    // console.log(e.key);
    setCurrent(e.key);
  };

  const logout = () => {
    console.log('logout')
    signout()
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      {console.log('header user',user)}
      <Item key="home" icon={<AppstoreOutlined />}>
          <Link to="/">
        Home
        </Link>
      </Item>
      <Item key="shop" icon={<ShoppingOutlined />}>
        <Link to="/shop">Shop</Link>
      </Item>

      <Item key="cart" icon={<ShoppingCartOutlined />}>
        <Link to="/cart">
          <Badge count={cart.length} offset={[9, 0]}>
            Cart
          </Badge>
        </Link>
      </Item>

      {!isAuthenticated && 
      <Item key="register" icon={<UserAddOutlined />} className="float-right">
      <Link to="/Register">
        Register
        </Link>
      </Item>
      }
      {!isAuthenticated && 
      <Item key="login" icon={<UserOutlined />} className="float-right">
      <Link to="/Login">

        Login
        </Link>
      </Item>
      }
      
        {isAuthenticated && (
        <SubMenu
          icon={<SettingOutlined />}
          title={user && user.name}
          className="float-right"
        >
          {user && user.role === 0 && (
            <Item>
              <Link to="/user/history">Dashboard</Link>
            </Item>
          )}

          {user && user.role === 1 && (
            <Item>
              <Link to="/admin/dashboard">Dashboard</Link>
            </Item>
          )}

          <Item icon={<LogoutOutlined />} onClick={logout}>
            Logout
          </Item>
        </SubMenu>
      )}

      <span className="float-right p-1">
        <Search />
      </span>
    </Menu>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
  user: state.user.user,
  cart: state.cart,
});

export default connect(mapStateToProps,{signout})(Header);
