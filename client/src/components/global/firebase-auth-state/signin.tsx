import { useAuth } from "@/hooks/useAuth";
export const SignedIn: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  if (user) {
    return <>{children}</>;
  }
  return null;
};
