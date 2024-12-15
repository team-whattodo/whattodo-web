import React from 'react'
import styles from './loading.module.css';
import Spinner from '@/components/Spinner';

const JoinLoading = () => {
  return (
    <div className={styles.loadingContainer}>
      <Spinner />
    </div>
  )
}

export default JoinLoading