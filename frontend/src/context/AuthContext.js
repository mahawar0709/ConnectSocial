import { createContext,useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  user:{
    _id:"64b3d8aa498f43a357e68808",
    username:"test2",
    email:"test2@gmail.com",
    password:"$2b$10$YzhJmpMNrrvhC8NBsmso5O0cUiW8/8XimXoWXLNDB7.Yn7w9VZeWC",
    profilePicture:"",
    coverPicture:"",
    followers:[],
    followings:[],
    isAdmin:false,
    createdAt:"2023-07-16T11:46:50.350+00:00",
    updatedAt:"2023-07-23T12:24:25.697+00:00",
    city:"Paris",
    description:"Hey from test2",
    from:"Australia",
    relationship:1
  },
  isFetching: false,
  error: false,
};


export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);  
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};