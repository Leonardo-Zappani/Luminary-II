
import {useEffect, useState} from "react";
import axios from "axios";

interface LoginProps {
  token: string | null;
  setToken: (token: string | null) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  authenticate: (email: string, password: string) => void;
}

interface User {
  token: string | null;
  userName: string | null;
  password: string | null;
  email: string | null;
  profileImage: string | null;

}

export const useLogin = (): LoginProps => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
      // loadUser(token);
    }
  }, []);

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  }

  const loadUser = (token: string) => {
    axios.get("http://localhost:3000/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      setUser(res.data);
    }).catch((err) => {
      console.error(err);
    })
  }

  const authenticate = (email: string, password: string) => {
    fetch("http://localhost:3000/authenticate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }).then((res) => {
      console.log(res)
    })
  }


  return {
    token,
    setToken,
    user,
    setUser,
    logout,
    authenticate,
  };
};
