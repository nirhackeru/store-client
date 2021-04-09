import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";

const AdminRoute = ({ user, children, ...rest }) => {
  

  return user && user.isAuthenticated && user.user.role === 1 ? <Route {...rest} /> : <LoadingToRedirect />;
};
const mapStateToProps = (state) => ({
    user: state.user
  });
export default connect(mapStateToProps, null)(AdminRoute);
