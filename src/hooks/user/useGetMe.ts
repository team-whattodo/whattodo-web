import watodoAxios from "@/libs/axios/watodoAxios";
import { useRouter } from "next/navigation";

const useGetMe = (loading: boolean, setLoading: (loading: boolean) => void) => {
  const router = useRouter();

  const getMe = async () => {
    if (loading) {
      return;
    }
    try {
      setLoading(true);
      const { data } = await watodoAxios.get("/users/me");
      if (data) {
        return data;
      }
    } catch {
      router.push("/login");
    }finally{
      setLoading(false);
    }
  };

  return getMe;
};

export default useGetMe;
