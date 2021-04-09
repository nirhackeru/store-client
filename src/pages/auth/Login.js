import React, {useState, useEffect} from 'react'
import {signin} from '../../actions/user'
import { connect } from 'react-redux';
import { toast } from "react-toastify";
import { Redirect } from 'react-router-dom';

const Login = ({signin, isAuthenticated, history,user}) => {

    const [values, setValues] = useState({
        email: '',
        password: ''
      });

      const {
        email,
        password,  
      } = values;






      const roleBasedRedirect = (res) => {
        // check if intended
        
        let intended = history.location.state;
        if (intended) {
          history.push(intended.from);
        } else {
          if (res.role === 1) {
            history.push("/admin/dashboard");
          } else {
            history.push("/user/history");
          }
        }
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const res = await signin(values)
        if (res ){
          roleBasedRedirect(res)
        }
    }

    const onChange = (e) => {
        setValues({ ...values, error: false, [e.target.name]: e.target.value });
      };


    const loginForm = () => (
        <form onSubmit={handleSubmit}> 
           <input
            type="string"
            name="email"
            className="form-control"
            value={email}
            onChange={(e) => onChange(e)}
            placeholder="Email"
          />
            <br/>
          <input
            type="password"
            name="password"
            className="form-control"
            value={password}
            onChange={(e) => onChange(e)}
            placeholder="Password"
            autoFocus
          />
            <br/>
          
          <button type="submit" className="btn btn-raised">
            Login
          </button>
        </form>
      );


    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Login</h4>
                    {loginForm()}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
  user: state.user.user
});

export default connect(mapStateToProps, { signin })(Login);

