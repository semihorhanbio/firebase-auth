import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import { LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const UserButton: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, signOut } = useAuth();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Image
          src={user?.photoURL || ""}
          alt='Profile'
          className='w-8 h-8 rounded-full cursor-pointer hover:border-white hover:border'
          width={32}
          height={32}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        {children}
        <DropdownMenuItem onClick={signOut}>
          <LogOut className='mr-2 h-4 w-4' />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const UserProfileLink = ({
  label,
  url,
  labelIcon,
}: {
  label: string;
  url: string;
  labelIcon: React.ReactNode;
}) => (
  <DropdownMenuItem asChild>
    <a href={url} className='flex items-center'>
      {labelIcon}
      <span className='ml-2'>{label}</span>
    </a>
  </DropdownMenuItem>
);
