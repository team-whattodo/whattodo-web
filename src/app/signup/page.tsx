import React from 'react'
import styles from './page.module.css';
import SignupForm from '@/components/SignupForm';

const SignupPage = () => {
  return (
    <div className={styles.container}>
      <SignupForm />
    </div>
  )
}

export default SignupPage