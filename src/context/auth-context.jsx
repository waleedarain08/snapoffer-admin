import { createContext, useReducer, useContext } from "react";

const userstring = localStorage.getItem('user');
const user = userstring?.length ? JSON.parse(userstring): null; 

export const initialAuthState = {
  user: user,
  isLoggedIn: user != null,
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'login': {
      const userstring = JSON.stringify(action.payload)
      localStorage.setItem('user', userstring);
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
      }
    }
    case 'logout': {
      localStorage.removeItem('user');
      return {
        ...state,
        user: null,
        isLoggedIn: false,
      }
    }
    default: {
      return state;
    }
  }
}

export const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children, reducer, initialState }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <AuthContext.Provider value={[state, dispatch]}>
    {children}
  </AuthContext.Provider>

}
