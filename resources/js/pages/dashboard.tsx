import { Head, Link, usePage } from '@inertiajs/react';
import { dashboard } from '@/routes';
import { Button } from '@/components/ui/button';

interface DashboardProps {
    completedCount: number;
    pendingCount: number;
}

export default function Dashboard() {
    const { completedCount, pendingCount } = usePage().props as DashboardProps;
    
    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className=''>
                <div className='flex items-center justify-between m-2 '>
                    <div className='flex flex-col gap-2'>
                        <h1 className='text-3xl font-bold tracking-tight'>Dashboard</h1>
                        <p className='text-muted-foreground text-sm'>Welcome to your dashboard!
                            Here is your task overview.
                        </p>
                    </div>
                {/* <div className='m-2 justify-end flex'>
                    <Link href="/tasks/index"><Button>Task</Button></Link>
                </div> */}
                </div>
            </div>

                <div className="grid gap-4 md:grid-cols-2">
                    {/* Pending Tasks */}
                    <div className="flex flex-col gap-2 rounded-xl border border-sidebar-border/70 p-6 dark:border-sidebar-border">
                        <h2 className='text-2xl font-bold'>Pending Tasks</h2>
                        <p className='text-5xl font-bold text-blue-500'>{pendingCount}</p>
                        <p className='text-muted-foreground text-sm'>Tasks awaiting completion</p>
                    </div>

                    {/* Completed Tasks */}
                    <div className="flex flex-col gap-2 rounded-xl border border-sidebar-border/70 p-6 dark:border-sidebar-border">
                        <h2 className='text-2xl font-bold'>Completed Tasks</h2>
                        <p className='text-5xl font-bold text-green-500'>{completedCount}</p>
                        <p className='text-muted-foreground text-sm'>Tasks you've finished</p>
                    </div>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
