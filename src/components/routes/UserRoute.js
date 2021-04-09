import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";

const UserRoute = ({ user, children, ...rest }) => {
  

  return user && user.isAuthenticated ? <Route {...rest} /> : <LoadingToRedirect />;
};
const mapStateToProps = (state) => ({
    user: state.user
  });
export default connect(mapStateToProps, null)(UserRoute);
