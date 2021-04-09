import  {REGISTER_SUCCESS,LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT_FAIL,LOGOUT_SUCCESS,REGISTER_FAIL,USER_LOADED,AUTH_ERROR} from '../actions/types'

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user:null
}


export const user = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
      case USER_LOADED:
        return {
            ...state,
            isAuthenticated: true,
            loading: false,
            user: payload
        };
      case REGISTER_SUCCESS:
      case LOGIN_SUCCESS:
          localStorage.setItem('token',payload.token)
          localStorage.setItem('user',payload.user.email)
        return {
            ...state,
            ...payload,
            isAuthenticated:true,
            loading:false
        }
        
        case REGISTER_FAIL:
        case LOGIN_FAIL:
            localStorage.removeItem('token')
            localStorage.removeItem('user')
          return {
              ...state,
              token:null,
              isAuthenticated:false,
              loading:false,
              user:null
          };
      case LOGOUT_SUCCESS:
        localStorage.removeItem('token')
        return {
          ...state,
          token: null,
          isAuthenticated: false,
          loading: false,
          user: null
        };
      default:
        return state;
    }
  };


  