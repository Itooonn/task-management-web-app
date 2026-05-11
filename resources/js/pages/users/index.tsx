import { Head, Link, router } from '@inertiajs/react';
import { SquarePen, Trash } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

type User = {
    id: number;
    name: string;
    email: string;
    role: string;
};

export default function Index({ users }: { users: User[] }) {
    const handleDelete = (id: number) => {
        if (confirm('Delete this user?')) {
            router.delete(`/users/${id}`);
        }
    };

    return (
        <>
            <Head title="User Management" />

            <div className="flex h-full flex-1 flex-col gap-1.5 overflow-x-auto rounded-xl p-4">
                <div className="m-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-3xl font-bold tracking-tight">
                            User Management
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Create, update, and manage application accounts.
                        </p>
                    </div>

                    <div className="m-2 flex justify-end">
                        <Button asChild>
                            <Link href="/users/create">Create User</Link>
                        </Button>
                    </div>
                </div>

                <div className="m-4 flex flex-1 flex-col">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="px-4">Name</TableHead>
                                <TableHead className="px-4">Email</TableHead>
                                <TableHead className="px-4">Role</TableHead>
                                <TableHead className="px-4 text-center">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {users.length > 0 ? (
                                users.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell className="px-4 font-medium">
                                            {user.name}
                                        </TableCell>
                                        <TableCell className="px-4 text-muted-foreground">
                                            {user.email}
                                        </TableCell>
                                        <TableCell className="px-4">
                                            <Badge
                                                variant={
                                                    user.role === 'admin'
                                                        ? 'default'
                                                        : 'secondary'
                                                }
                                                className="capitalize"
                                            >
                                                {user.role}
                                            </Badge>
                                        </TableCell>

                                        <TableCell className="px-4 text-center">
                                            <div className="flex justify-center gap-2">
                                                <Button
                                                    asChild
                                                    size="icon"
                                                    variant="outline"
                                                    className="bg-blue-500 hover:bg-blue-600"
                                                    aria-label={`Edit ${user.name}`}
                                                >
                                                    <Link
                                                        href={`/users/${user.id}/edit`}
                                                    >
                                                        <SquarePen className="h-4 w-4" />
                                                    </Link>
                                                </Button>

                                                <Button
                                                    size="icon"
                                                    variant="outline"
                                                    className="bg-red-500 hover:bg-red-600"
                                                    aria-label={`Delete ${user.name}`}
                                                    onClick={() =>
                                                        handleDelete(user.id)
                                                    }
                                                >
                                                    <Trash className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={4}
                                        className="h-24 text-center text-muted-foreground"
                                    >
                                        No users found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </>
    );
}

Index.layout = {
    breadcrumbs: [
        {
            title: 'User Management',
            href: '/users',
        },
    ],
};
