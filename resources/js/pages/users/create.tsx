import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        role: 'user',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/users');
    };

    return (
        <form onSubmit={submit} className="space-y-4 p-6">
            <Input
                placeholder="Name"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
            />

            <Input
                placeholder="Email"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
            />

            <Input
                type="password"
                placeholder="Password"
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
            />

            <select
                value={data.role}
                onChange={(e) => setData('role', e.target.value)}
            >
                <option value="user">User</option>
                <option value="admin">Admin</option>
            </select>

            <Button disabled={processing}>Create User</Button>
        </form>
    );
}
