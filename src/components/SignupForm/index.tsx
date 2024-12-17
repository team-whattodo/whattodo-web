"use client";

import React from "react";
import styles from "./style.module.css";
import { useRouter } from "next/navigation";
import useSignup from "@/hooks/auth/useSignup";

const SignupForm = () => {
  const { ...signup } = useSignup();
  const router = useRouter();

  const onEnter = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.nativeEvent.isComposing) {
      signup.submit();
    }
  };

  return (
    <div className={styles.container}>
      <p className={styles.title}>왓투두 회원가입</p>
      <div className={styles.inputWrap}>
        <p className={styles.label}>이메일</p>
        <input
          type="text"
          className={`${styles.input} ${
            (!signup.emailValid || signup.emailDuplicated) && styles.wrong
          }`}
          placeholder="example@watodo.kr"
          name="email"
          onChange={signup.handleData}
          value={signup.signupData.email}
          onKeyDown={onEnter}
        />
        <div className={styles.warning}>
          {!signup.emailValid
            ? "이메일 형식이 올바르지 않습니다."
            : signup.emailDuplicated && "이미 사용 중인 이메일 입니다."}
        </div>
        <p className={styles.label}>아이디</p>
        <input
          type="text"
          className={`${styles.input} ${
            (!signup.usernameValid || signup.usernameDuplicated) && styles.wrong
          }`}
          placeholder="3글자 이상 입력해주세요."
          name="username"
          onChange={signup.handleData}
          value={signup.signupData.username}
          onKeyDown={onEnter}
        />
        <div className={styles.warning}>
          {!signup.usernameValid
            ? "3글자 이상 입력해주세요."
            : signup.usernameDuplicated && "이미 사용 중인 아이디 입니다."}
        </div>
        <p className={styles.label}>닉네임</p>
        <input
          type="text"
          className={`${styles.input} ${!signup.nicknameValid && styles.wrong}`}
          placeholder="3글자 이상 입력해주세요."
          name="nickname"
          onChange={signup.handleData}
          value={signup.signupData.nickname}
          onKeyDown={onEnter}
        />
        <div className={styles.warning}>
          {!signup.nicknameValid && "3글자 이상 입력해주세요."}
        </div>
        <p className={styles.label}>비밀번호</p>
        <input
          type="password"
          className={`${styles.input} ${!signup.passwordValid && styles.wrong}`}
          placeholder="영문, 숫자, 특수문자 포함 8글자 이상"
          name="password"
          onChange={signup.handleData}
          value={signup.signupData.password}
          onKeyDown={onEnter}
        />
        <div className={styles.warning}>
          {!signup.passwordValid && "비밀번호 형식이 올바르지 않습니다."}
        </div>
        <input
          type="password"
          className={`${styles.input} ${
            !signup.passwordCheckValid && styles.wrong
          }`}
          placeholder="비밀번호를 한번 더 입력해주세요."
          onChange={signup.handlePasswordCheck}
          value={signup.passwordCheck}
          onKeyDown={onEnter}
        />
        <div className={styles.warning}>
          {!signup.passwordCheckValid && "비밀번호가 일치하지 않습니다."}
        </div>
        <p className={styles.label}>깃허브 Personal Access Token</p>
        <input
          type="password"
          className={`${styles.input} ${
            (!signup.patValid || signup.patDuplicated) && styles.wrong
          }`}
          placeholder="깃허브 토큰을 입력해주세요. (필수 권한: repo)"
          name="pat"
          onChange={signup.handleData}
          value={signup.signupData.pat}
          onKeyDown={onEnter}
        />
        <div className={styles.warning}>
          {!signup.patValid
            ? "올바르지 않은 토큰입니다."
            : signup.patDuplicated && "이미 사용중인 토큰입니다."}
        </div>
      </div>
      <div className={styles.spacer}></div>
      <div className={styles.navWrap}>
        <p className={styles.nav} onClick={() => router.push("/login")}>
          회원이신가요?
        </p>
      </div>
      <button
        className={styles.button}
        onClick={signup.submit}
        disabled={signup.buttonDisabled}
      >
        {signup.loading ? "회원가입 중..." : "회원가입"}
      </button>
    </div>
  );
};

export default SignupForm;
