import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Edit({ user }: any) {
    const { data, setData, put, processing } = useForm({
        name: user.name,
        email: user.email,
        role: user.role,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/users/${user.id}`);
    };

    return (
        <form onSubmit={submit} className="space-y-4 p-6">
            <Input
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
            />

            <Input
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
            />

            <select
                value={data.role}
                onChange={(e) => setData('role', e.target.value)}
            >
                <option value="user">User</option>
                <option value="admin">Admin</option>
            </select>

            <Button disabled={processing}>Update User</Button>
        </form>
    );
}
