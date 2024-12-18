import watodoAxios from '@/libs/axios/watodoAxios';
import { useState } from 'react'

const useDeleteTask = (taskId?: string) => {
  const [loading, setLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const submit = async () => {
    if (loading || !taskId) {
      return;
    }
    try{
      setLoading(true);
      const { data } = await watodoAxios.delete(`/task/${taskId}`);
      return data;
    }catch{
      setIsFailed(true);
    }finally{
      setLoading(false);
    }
  }

  return {
    loading,
    isFailed,
    submit
  }
}

export default useDeleteTask