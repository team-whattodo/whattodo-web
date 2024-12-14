import watodoAxios from "@/libs/axios/watodoAxios";
import { useRouter } from "next/navigation";

const useGetMyProject = (loading: boolean, setLoading: (loading: boolean) => void) => {
  const router = useRouter();

  const getMyProject = async () => {
    if (loading) {
      return;
    }
    try {
      setLoading(true);
      const { data } = await watodoAxios.get("/users/me/projects");
      if (data) {
        return data;
      }
    } catch {
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  return getMyProject;
};

export default useGetMyProject;
