import watodoAxios from "@/libs/axios/watodoAxios";
import { useRouter } from "next/navigation";

const useGetMe = () => {
  const router = useRouter();

  const getMe = async () => {
    try {
      const { data } = await watodoAxios.get("/users/me");
      if (data) {
        return data;
      }
    } catch {
      router.push("/login");
    }
  };

  return getMe;
};

export default useGetMe;
