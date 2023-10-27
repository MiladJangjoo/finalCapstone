import { Dispatch, createContext, useReducer } from 'react';

import { LoggedUserDetailsType } from '../types';

interface UserContextValues {
  user: LoggedUserDetailsType
  setUser: Dispatch<LoggedUserDetailsType>
}

export const UserContext = createContext({} as UserContextValues);

export default function UserProvider({ children }: {
  children: JSX.Element | JSX.Element[];
}) {

  const reducer = (user: LoggedUserDetailsType, newUser: LoggedUserDetailsType) => {
    if (!newUser.token && !user.username) {
      localStorage.clear()
      return newUser
    }
    if (user.token !== newUser.token) {
      localStorage.setItem('token', newUser.token);
    }
    if (user.username !== newUser.username) {
      localStorage.setItem('username', newUser.username);
    }
    return newUser;
  }

  const [user, setUser] = useReducer(reducer, {
    username: localStorage.getItem('username') || '',
    token: localStorage.getItem('token') || ''
  });


  const value = {
    user,
    setUser,
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}
