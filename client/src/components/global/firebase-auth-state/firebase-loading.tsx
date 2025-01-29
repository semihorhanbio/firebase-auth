import { useAuth } from "@/hooks/useAuth";
import Loader from "../loader";
export const FirebaseLoading: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { loading } = useAuth();
  if (loading) {
    return <Loader state={loading}>{children}</Loader>;
  }
  return <>{children}</>;
};
