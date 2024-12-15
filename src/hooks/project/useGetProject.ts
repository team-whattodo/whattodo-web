import watodoAxios from "@/libs/axios/watodoAxios";
import { useRouter } from "next/navigation";

const useGetProject = (
  loading: boolean,
  setLoading: (loading: boolean) => void
) => {
  const router = useRouter();
  const getProject = async (projectId: string) => {
    if (loading) {
      return;
    }
    try {
      setLoading(true);
      const { data } = await watodoAxios.get(`/project/${projectId}`);
      if (data) {
        return data;
      }
    } catch {
      router.push("/login");
    } finally {
      setTimeout(() => setLoading(false), 1000);
    }
  };

  return getProject;
};

export default useGetProject;
