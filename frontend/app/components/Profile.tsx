import { useNavigate } from "@remix-run/react";
import { getStrapiMedia } from "~/lib/api-helpers";
import LogoutButton from "~/components/LogoutButton";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Logout } from "~/routes/logout";

interface UserProps {
  image: { url: string };
  username: string;
}

const Profile = ({ user, url }: { user: UserProps; url: string }) => {
  const navigate = useNavigate();

  const imageUrl = user?.image
    ? getStrapiMedia(user.image.url, url)
    : "https://picsum.photos/200";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={imageUrl as string} />
          <AvatarFallback>AVA</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="space-y-1">
        <DropdownMenuLabel>Logged as {user?.username}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate("/dashboard")}>
          Dashboard
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("/dashboard/events")}>
          My Events
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("/dashboard/profile")}>
          Profile
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="p-0">
          <Logout>
            <LogoutButton />
          </Logout>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Profile;
