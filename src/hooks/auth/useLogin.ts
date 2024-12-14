import { API_URL } from "@/constants/api";
import { LoginData } from "@/types/auth/login";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const useLogin = () => {
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
      const { data } = await axios.post(`${API_URL}/auth/login`, loginData);
      if (data) {
        localStorage.setItem("ACCESS_TOKEN", data.accessToken);
        localStorage.setItem("REFRESH_TOKEN", data.refreshToken);
        router.push("/");
      }
    } catch (err: any) {
      if (err.response && err.response.status === 404) {
        setEmailValid(false);
      }
      if (err.response && err.response.status === 401) {
        setPasswordValid(false);
      }
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
    buttonDisabled:
      loading ||
      !emailValid ||
      !passwordValid ||
      loginData.email.trim().length === 0 ||
      loginData.password.trim().length === 0,
  };
};

export default useLogin;
