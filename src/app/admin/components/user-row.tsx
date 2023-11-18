import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";

export default function UserRow({ user }: { user: User }) {
  return (
    <TableRow>
      <TableCell className="font-medium overflow-hidden w-9 text-ellipsis whitespace-nowrap">{user.user_id}</TableCell>
      <TableCell>
        {user.firstname} {user.lastname}
      </TableCell>
      <TableCell>{user.role}</TableCell>
      <TableCell className="flex gap-1">
        <Button size="sm" variant="outline">
          Accept
        </Button>
        <Button size="sm" variant="destructive">
          refuse
        </Button>
      </TableCell>
    </TableRow>
  );
}
