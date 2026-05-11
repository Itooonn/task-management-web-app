import { Head, Link, usePage, useForm, router } from '@inertiajs/react';
import {
    BellDot,
    ChevronLeft,
    ChevronRight,
    Trash,
    SquarePen,
    CircleCheckBig,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

interface PageProps extends Record<string, unknown> {
    flash: {
        message?: string;
    };
    tasks: Task[];
}

interface Task {
    id: number;
    title: string;
    description: string;
    due_date: string;
    is_completed: boolean;
    created_at: string;
    updated_at: string;
}

type StatusFilter = 'all' | 'pending' | 'completed';

const DESCRIPTION_LIMIT = 20;
const TASKS_PER_PAGE = 6;

const getShortDescription = (description: string) => {
    if (!description) {
        return '';
    }

    return description.length > DESCRIPTION_LIMIT
        ? `${description.slice(0, DESCRIPTION_LIMIT)}...`
        : description;
};

Index.layout = {
    breadcrumbs: [
        {
            title: 'Tasks',
            href: '/tasks',
        },
    ],
};

export default function Index() {
    const { tasks, flash } = usePage<PageProps>().props;

    const { processing } = useForm();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
    const [currentPage, setCurrentPage] = useState(1);

    const filteredTasks = useMemo(() => {
        const normalizedSearch = searchTerm.trim().toLowerCase();

        return tasks.filter((task) => {
            const matchesSearch =
                normalizedSearch === '' ||
                task.title.toLowerCase().startsWith(normalizedSearch);

            const matchesStatus =
                statusFilter === 'all' ||
                (statusFilter === 'completed' && task.is_completed) ||
                (statusFilter === 'pending' && !task.is_completed);

            return matchesSearch && matchesStatus;
        });
    }, [tasks, searchTerm, statusFilter]);

    const totalPages = Math.max(
        1,
        Math.ceil(filteredTasks.length / TASKS_PER_PAGE),
    );

    const paginatedTasks = useMemo(() => {
        const startIndex = (currentPage - 1) * TASKS_PER_PAGE;

        return filteredTasks.slice(startIndex, startIndex + TASKS_PER_PAGE);
    }, [filteredTasks, currentPage]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, statusFilter]);

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);

    const handleDelete = (id: number, title: string) => {
        if (confirm(`Do you want to delete the task "${title}"?`)) {
            router.delete(`/tasks/${id}`);
        }
    };

    return (
        <>
            <Head title="Tasks" />
            <div className="flex h-full flex-1 flex-col gap-1.5 overflow-x-auto rounded-xl p-4">
                <div className="">
                    <div className="m-2 flex items-center justify-between">
                        <div className="flex flex-col gap-2">
                            <h1 className="text-3xl font-bold tracking-tight">
                                Your Tasks
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Manage your tasks and stay organized.
                            </p>
                        </div>
                        <div className="m-2 flex justify-end">
                            <Link href="/tasks/create">
                                <Button>Create Task</Button>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="">
                    <div>
                        {flash.message && (
                            <Alert>
                                <BellDot />
                                <AlertTitle>Notification</AlertTitle>
                                <AlertDescription>
                                    {flash.message}
                                </AlertDescription>
                            </Alert>
                        )}
                    </div>
                </div>
                <div className="m-4 flex flex-1 flex-col">
                    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <Input
                            type="search"
                            placeholder="Search tasks..."
                            value={searchTerm}
                            onChange={(event) =>
                                setSearchTerm(event.target.value)
                            }
                            className="sm:max-w-sm"
                        />

                        <Select
                            value={statusFilter}
                            onValueChange={(value) =>
                                setStatusFilter(value as StatusFilter)
                            }
                        >
                            <SelectTrigger className="w-full sm:w-[180px]">
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All tasks</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="completed">
                                    Completed
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Table>
                        {/* <TableCaption className='text-center'>A list of your tasks.</TableCaption> */}

                        <TableHeader>
                            <TableRow>
                                {/* <TableHead className="w-[100px]">Title</TableHead> */}
                                <TableHead>Title</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Due Date</TableHead>
                                <TableHead className="text-center">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {paginatedTasks.length > 0 ? (
                                paginatedTasks.map((task) => (
                                    <TableRow
                                        key={task.id}
                                        className={
                                            task.is_completed
                                                ? 'line-through opacity-60'
                                                : ''
                                        }
                                    >
                                        <TableCell>{task.title}</TableCell>
                                        <TableCell>
                                            <span title={task.description}>
                                                {getShortDescription(
                                                    task.description,
                                                )}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            {task.is_completed
                                                ? 'Completed'
                                                : 'Pending'}
                                        </TableCell>
                                        <TableCell>{task.due_date}</TableCell>
                                        <TableCell className="space-x-2 text-center">
                                            <Link
                                                href={`/tasks/${task.id}/edit`}
                                            >
                                                <Button
                                                    className="bg-blue-500 hover:bg-blue-600"
                                                    variant="outline"
                                                    size="sm"
                                                >
                                                    <SquarePen className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className={
                                                    task.is_completed
                                                        ? 'bg-green-500 hover:bg-green-600'
                                                        : 'bg-yellow-500 hover:bg-yellow-600'
                                                }
                                                onClick={() =>
                                                    router.patch(
                                                        `/tasks/${task.id}/complete`,
                                                    )
                                                }
                                            >
                                                <CircleCheckBig className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                disabled={processing}
                                                onClick={() =>
                                                    handleDelete(
                                                        task.id,
                                                        task.title,
                                                    )
                                                }
                                                className="bg-red-500 hover:bg-red-600"
                                                variant="outline"
                                                size="sm"
                                            >
                                                <Trash className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={5}
                                        className="py-4 text-center"
                                    >
                                        {tasks.length > 0
                                            ? 'No tasks match your search or filter.'
                                            : 'No tasks yet. Create one to get started!'}
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>

                    {filteredTasks.length > TASKS_PER_PAGE && (
                        <div className="mt-auto flex flex-col gap-3 pt-4 sm:flex-row sm:items-center sm:justify-between">
                            <p className="text-sm text-muted-foreground">
                                Page {currentPage} of {totalPages}
                            </p>

                            <div className="flex items-center gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    disabled={currentPage === 1}
                                    onClick={() =>
                                        setCurrentPage((page) => page - 1)
                                    }
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                    Previous
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    disabled={currentPage === totalPages}
                                    onClick={() =>
                                        setCurrentPage((page) => page + 1)
                                    }
                                >
                                    Next
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
