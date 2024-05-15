
import {useState} from "react";

interface LoginProps {
  token: string | null;
  setToken: (token: string | null) => void;
  user: User | null;
  setUser: (user: User | null) => void;
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


  return {
    token,
    setToken,
    user,
    setUser,
  };
};
