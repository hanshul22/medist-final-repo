import { LOGIN_CONFIRMED_ACTION, LOGOUT_ACTION } from '../actions/AuthActions';

const initialState = {
  auth: {
    isLoggedIn: false,
    user: null,
    token: null
  }
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_CONFIRMED_ACTION:
      return {
        ...state,
        auth: {
          isLoggedIn: true,
          user: action.payload,
          token: action.payload.idToken || action.payload.token
        }
      };
    case LOGOUT_ACTION:
      return initialState;
    default:
      return state;
  }
} 