import { Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Trash, SquarePen } from 'lucide-react';

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
        <div className="p-6">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-3xl font-bold">User Management</h1>

                <Link href="/users/create">
                    <Button>Create User</Button>
                </Link>
            </div>

            <div className="overflow-hidden rounded-lg border border-gray-700">
                <table className="w-full">
                    <thead className="bg-gray-900">
                        <tr>
                            <th className="p-4 text-left">Name</th>
                            <th className="p-4 text-left">Email</th>
                            <th className="p-4 text-left">Role</th>
                            <th className="p-4 text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user) => (
                            <tr
                                key={user.id}
                                className="border-t border-gray-700"
                            >
                                <td className="p-4">{user.name}</td>

                                <td className="p-4">{user.email}</td>

                                <td className="p-4">{user.role}</td>

                                <td className="space-x-2 p-4 text-center">
                                    <Link href={`/users/${user.id}/edit`}>
                                        <Button size="sm">
                                            <SquarePen className="h-4 w-4" />
                                        </Button>
                                    </Link>

                                    <Button
                                        size="sm"
                                        variant="destructive"
                                        onClick={() => handleDelete(user.id)}
                                    >
                                        <Trash className="h-4 w-4" />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
