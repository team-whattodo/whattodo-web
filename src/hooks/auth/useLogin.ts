import { TokenResponse } from "@/types/api/token";
import { LoginData } from "@/types/auth/login";
import axios from "axios";
import { useEffect, useState } from "react";

const useLogin = () => {
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [emailValid, setEmailValid] = useState(
    loginData.email.trim().length === 0
  );
  const [passwordValid, setPasswordValid] = useState(
    loginData.email.trim().length === 0
  );
  const [loading, setLoading] = useState(false);

  const handleData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (!emailValid) {
      setEmailValid(true);
    }
  }, [loginData.email]);

  useEffect(() => {
    if (!passwordValid) {
      setPasswordValid(true);
    }
  }, [loginData.password]);

  const submit = async () => {
    if (loading || !emailValid || !passwordValid) {
      return;
    }
    try {
      const { data } = await axios.post(
        `${process.env.API_URL}/auth/login`,
        loginData
      );
      return data;
    } catch (err: any) {
      if(err.response && err.response.status === 404) {
        setEmailValid(false);
      }
      if (err.response && err.response.status === 401) {
        setEmailValid(false);
      }
      Promise.reject(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    handleData,
    loginData,
    loading,
    submit,
    emailValid,
    passwordValid,
  }
};

export default useLogin;
