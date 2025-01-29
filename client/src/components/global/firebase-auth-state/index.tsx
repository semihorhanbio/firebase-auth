import { FirebaseLoading } from "./firebase-loading";
import { SignedIn } from "./signin";
import { SignedOut } from "./signout";
import { SignInButton } from "./signin-button";
import { UserButton, UserProfileLink } from "./user-button";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";

const FireBaseAuthState = () => {
  return (
    <>
      <FirebaseLoading>
        <></>
      </FirebaseLoading>
      <SignedOut>
        <SignInButton>
          <Button
            className='rounded-xl 
              bg-[#252525] 
              text-white 
              hover:bg-[#252525]/70
              '
          >
            <User />
            Login
          </Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton>
          <UserProfileLink
            label='Dashboard'
            url={`/dashboard`}
            labelIcon={<User size={16} />}
          />
        </UserButton>
      </SignedIn>
    </>
  );
};

export default FireBaseAuthState;
