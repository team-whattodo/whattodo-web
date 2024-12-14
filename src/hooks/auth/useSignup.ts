import { API_URL } from "@/constants/api";
import { EMAIL_REGEX, PASSWORD_REGEX } from "@/constants/regex";
import { SignupData } from "@/types/auth/signup";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const useSignup = () => {
  const [signupData, setSignupData] = useState<SignupData>({
    email: "",
    password: "",
    nickname: "",
    username: "",
  });
  const [emailValid, setEmailValid] = useState(true);
  const [emailDuplicated, setEmailDuplicated] = useState(false);
  const [passwordValid, setPasswordValid] = useState(true);
  const [usernameValid, setUsernameValid] = useState(true);
  const [usernameDuplicated, setUsernameDuplicated] = useState(false);
  const [nicknameValid, setNicknameValid] = useState(true);
  const [loading, setLoading] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordCheckValid, setPasswordCheckValid] = useState(true);
  const router = useRouter();

  const handleData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({ ...prev, [name]: value.trim() }));
  };

  const handlePasswordCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordCheck(e.target.value);
  }

  useEffect(() => {
    if(emailDuplicated) {
      setEmailDuplicated(false);
    }
    if (
      signupData.email.trim().length > 0 &&
      !EMAIL_REGEX.test(signupData.email)
    ) {
      setEmailValid(false);
    } else {
      setEmailValid(true);
    }
  }, [signupData.email]);

  useEffect(() => {
    if (
      signupData.password.trim().length > 0 &&
      !PASSWORD_REGEX.test(signupData.password)
    ) {
      setPasswordValid(false);
    } else {
      setPasswordValid(true);
    }
    if(passwordCheck !== signupData.password && passwordCheck.trim().length > 0) {
      setPasswordCheckValid(false);
    }else{
      setPasswordCheckValid(true);
    }
  }, [signupData.password, passwordCheck]);

  useEffect(() => {
    if (usernameDuplicated) {
      setUsernameDuplicated(false);
    }
    if (
      signupData.username.trim().length > 0 &&
      signupData.username.trim().length < 3
    ) {
      setUsernameValid(false);
    } else {
      setUsernameValid(true);
    }
  }, [signupData.username]);

  useEffect(() => {
    if (
      signupData.nickname.trim().length > 0 &&
      signupData.nickname.trim().length < 3
    ) {
      setNicknameValid(false);
    } else {
      setNicknameValid(true);
    }
  }, [signupData.nickname]);

  const submit = async () => {
    if (loading || !emailValid || !passwordValid || !nicknameValid || !usernameValid || !passwordCheckValid) {
      return;
    }
    try {
      await axios.post(
        `${API_URL}/auth/signup`,
        signupData
      );
      router.push('/login');
    } catch (err: any) {
      if (err.response && err.response.status === 409) {
        if (err.response.data.message === "Email is already in use") {
          setEmailDuplicated(true);
        }
        if (err.response.data.message === "Username is already in use") {
          setUsernameDuplicated(true);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    handleData,
    signupData,
    loading,
    submit,
    emailValid,
    passwordValid,
    usernameDuplicated,
    emailDuplicated,
    nicknameValid,
    usernameValid,
    passwordCheck,
    passwordCheckValid,
    handlePasswordCheck,
    buttonDisabled:
      loading ||
      !emailValid ||
      !passwordValid ||
      !nicknameValid ||
      !usernameValid ||
      signupData.email.trim().length === 0 ||
      signupData.password.trim().length === 0 ||
      signupData.nickname.trim().length === 0 ||
      signupData.username.trim().length === 0 ||
      emailDuplicated ||
      usernameDuplicated,
  };
};

export default useSignup;
