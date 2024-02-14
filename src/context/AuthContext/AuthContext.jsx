import axios from "axios";
import jwtDecode from "jwt-decode";
import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [authToken, setAuthToken] = useState(null);

  const userLogin = async (data) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_IP}/auth/login`, data);
      const token = response.data;
      const decodedToken = jwtDecode(token);
      const userInfo = {
        id: decodedToken.id,
        first_name: decodedToken.first_name,
        last_name: decodedToken.last_name,
        email: decodedToken.email
      }

      localStorage.setItem('token', token);
      localStorage.setItem('userInfo', JSON.stringify(userInfo));

      setAuthToken(token)
      setUser(userInfo);
      return null;
    }
    catch (err) {
      return err;
    }
  }

  const userLogout = () => {
    setAuthToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
  };

  const updateUser = async () => {

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${process.env.REACT_APP_IP}/account`, { headers: { Authorization: `Bearer ${token}` } });
      const userInfo = {
        id: response.data.id,
        first_name: response.data.first_name,
        last_name: response.data.last_name,
        email: response.data.email
      }

      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      setUser(userInfo);
      return null;
    }
    catch (err) {
      return err;
    }
  }

  return (
    <AuthContext.Provider value={{ authToken, user, userLogin, userLogout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}