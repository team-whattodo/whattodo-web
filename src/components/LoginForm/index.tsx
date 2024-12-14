"use client";

import React from "react";
import styles from "./loginForm.module.css";
import useLogin from "@/hooks/auth/useLogin";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const { ...login } = useLogin();
  const router = useRouter();

  const onEnter = (e: React.KeyboardEvent) => {
    if(e.key === "Enter" && !e.nativeEvent.isComposing) {
      login.submit();
    }
  }

  return (
    <div className={styles.container}>
      <p className={styles.title}>왓투두 로그인</p>
      <div className={styles.inputWrap}>
        <p className={styles.label}>이메일</p>
        <input
          type="text"
          className={`${styles.input} ${!login.emailValid && styles.wrong}`}
          placeholder="example@watodo.kr"
          name="email"
          onChange={login.handleData}
          value={login.loginData.email}
          onKeyDown={onEnter}
        />
        <div className={styles.warning}>
          {!login.emailValid && "존재하지 않는 회원입니다."}
        </div>
        <p className={styles.label}>비밀번호</p>
        <input
          type="password"
          className={`${styles.input} ${!login.passwordValid && styles.wrong}`}
          placeholder="비밀번호를 입력해주세요."
          name="password"
          onChange={login.handleData}
          value={login.loginData.password}
          onKeyDown={onEnter}
        />
        <div className={styles.warning}>
          {!login.passwordValid && "비밀번호가 올바르지 않습니다."}
        </div>
      </div>
      <div className={styles.spacer}></div>
      <div className={styles.navWrap}>
        <p className={styles.nav} onClick={() => router.push("/signup")}>
          회원이 아니신가요?
        </p>
      </div>
      <button
        className={styles.button}
        onClick={login.submit}
        disabled={login.buttonDisabled}
      >
        {login.loading ? "로그인 중..." : "로그인"}
      </button>
    </div>
  );
};

export default LoginForm;
