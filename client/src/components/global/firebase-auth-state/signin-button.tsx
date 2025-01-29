import { useAuth } from "@/hooks/useAuth";
export const SignInButton: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { signInWithGoogle } = useAuth();
  return <div onClick={signInWithGoogle}>{children}</div>;
};
