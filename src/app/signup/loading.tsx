import React from 'react'
import styles from './loading.module.css';
import Spinner from '@/components/Spinner';

const SignupLoading = () => {
  return (
    <div className={styles.loadingContainer}>
      <Spinner />
    </div>
  )
}

export default SignupLoading