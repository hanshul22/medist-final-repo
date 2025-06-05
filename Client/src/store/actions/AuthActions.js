// Authentication actions
export const LOGIN_CONFIRMED_ACTION = 'LOGIN_CONFIRMED_ACTION';
export const LOGOUT_ACTION = 'LOGOUT_ACTION';

// Login confirmation action
export function loginConfirmedAction(payload) {
  return {
    type: LOGIN_CONFIRMED_ACTION,
    payload
  };
}

// Logout action
export function Logout(navigate) {
  localStorage.removeItem('userDetails');
  if (navigate) {
    navigate('/login');
  }
  return {
    type: LOGOUT_ACTION
  };
} 