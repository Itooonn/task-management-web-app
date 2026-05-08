type User = {
    id: number;
    name: string;
    email: string;
    role: string;
};

export default function Index({ users }: { users: User[] }) {
    return (
        <div className="p-6">
            <h1 className="mb-6 text-3xl font-bold">User Management</h1>

            <div className="overflow-hidden rounded-lg border border-gray-700">
                <table className="w-full">
                    <thead className="bg-gray-900">
                        <tr>
                            <th className="p-4 text-left">Name</th>
                            <th className="p-4 text-left">Email</th>
                            <th className="p-4 text-left">Role</th>
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
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
