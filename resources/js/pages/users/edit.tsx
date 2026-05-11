import { Head, Link, useForm } from '@inertiajs/react';
import { Save } from 'lucide-react';
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

type User = {
    id: number;
    name: string;
    email: string;
    role: string;
};

export default function Edit({ user }: { user: User }) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name,
        email: user.email,
        role: user.role,
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        put(`/users/${user.id}`);
    };

    return (
        <>
            <Head title={`Edit ${user.name}`} />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="m-2 flex flex-col gap-3">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-3xl font-bold tracking-tight">
                            Edit User
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Update profile details and account permissions for{' '}
                            {user.name}.
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
                                autoComplete="email"
                            />
                            <InputError message={errors.email} />
                        </div>

                        <div className="space-y-2 sm:col-span-2">
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
                                    className="h-12 w-full text-lg sm:max-w-xs"
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
                            <Save className="h-4 w-4" />
                            Save Changes
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}

Edit.layout = {
    breadcrumbs: [
        {
            title: 'Edit User',
            href: '/users',
        },
    ],
};
