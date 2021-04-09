import React, {useState} from 'react'
import {signup} from '../../actions/user'
import { connect } from 'react-redux';
import { toast } from "react-toastify";
import { Redirect } from 'react-router-dom';

const Register = ({signup, isAuthenticated}) => {

    const [values, setValues] = useState({
        name:'',
        email: '',
        password: '',
        check:'',
        
      });

      const {
        name,
        email,
        password,
        check,
        
      } = values;

      if (isAuthenticated) {
        return <Redirect to="/" />;
      }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('submit',values)
        if (password !== check){
            console.log('not match')
            toast.error('not match');

        } else {
            console.log('good!')
            await signup(values)
            
        }
    }

    const onChange = (e) => {
        setValues({ ...values, error: false, [e.target.name]: e.target.value });
      };


    const registerForm = () => (
        <form onSubmit={handleSubmit}>
            <input
            type="string"
            name="name"
            className="form-control"
            value={name}
            onChange={(e) => onChange(e)}
            placeholder="Name"
            autoFocus
          />
          <br/>
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
          <input
            type="password"
            name="check"
            className="form-control"
            value={check}
            onChange={(e) => onChange(e)}
            placeholder="Confirm Password"
            autoFocus
          />
    
          <br />
          <button type="submit" className="btn btn-raised">
            Register
          </button>
        </form>
      );


    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Register</h4>
                    {registerForm()}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated
});

export default connect(mapStateToProps, {  signup })(Register);

