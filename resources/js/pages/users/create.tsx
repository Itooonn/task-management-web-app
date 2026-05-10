import { Head, Link, useForm } from '@inertiajs/react';
import { UserPlus } from 'lucide-react';
import type { FormEvent } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        role: 'user',
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        post('/users');
    };

    return (
        <>
            <Head title="Create User" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="m-2 flex flex-col gap-3">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-3xl font-bold tracking-tight">
                            Create User
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Add a new account and assign the right access level.
                        </p>
                    </div>
                </div>

                <form
                    onSubmit={submit}
                    className="m-4 space-y-6 rounded-xl border border-sidebar-border/70 bg-card p-6 shadow-xs dark:border-sidebar-border"
                >
                    <div className="grid gap-5 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-lg">
                                Name
                            </Label>
                            <Input
                                id="name"
                                className="h-12 text-lg"
                                value={data.name}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                                placeholder="Jane Doe"
                                autoComplete="name"
                            />
                            <InputError message={errors.name} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-lg">
                                Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                className="h-12 text-lg"
                                value={data.email}
                                onChange={(e) =>
                                    setData('email', e.target.value)
                                }
                                placeholder="jane@example.com"
                                autoComplete="email"
                            />
                            <InputError message={errors.email} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-lg">
                                Password
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                className="h-12 text-lg"
                                value={data.password}
                                onChange={(e) =>
                                    setData('password', e.target.value)
                                }
                                placeholder="Minimum 8 characters"
                                autoComplete="new-password"
                            />
                            <InputError message={errors.password} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="role" className="text-lg">
                                Role
                            </Label>
                            <Select
                                value={data.role}
                                onValueChange={(value) =>
                                    setData('role', value)
                                }
                            >
                                <SelectTrigger
                                    id="role"
                                    className="h-12 w-full text-lg"
                                >
                                    <SelectValue placeholder="Select a role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="user">User</SelectItem>
                                    <SelectItem value="admin">Admin</SelectItem>
                                </SelectContent>
                            </Select>
                            <InputError message={errors.role} />
                        </div>
                    </div>

                    <div className="flex flex-col-reverse gap-2 border-t pt-6 sm:flex-row sm:justify-end">
                        <Button asChild type="button" variant="outline">
                            <Link href="/users">Cancel</Link>
                        </Button>
                        <Button disabled={processing}>
                            <UserPlus className="h-4 w-4" />
                            Create User
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}

Create.layout = {
    breadcrumbs: [
        {
            title: 'Create User',
            href: '/users/create',
        },
    ],
};
