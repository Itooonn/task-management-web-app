
import { Head, Link, useForm } from '@inertiajs/react';
import { InfoIcon } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

EditTask.layout = {
    breadcrumbs: [
        {
            title: 'Edit Task',
            href: '/tasks/edit',
        },
    ],
};

interface Task {
    id: number;
    title: string;
    description: string;
    due_date: string;
}

interface Props {
    task: Task;
}

export default function EditTask({task} : Props) {

    const { data, setData, put, processing, errors } = useForm({
        title: task.title,
        description: task.description,
        due_date: task.due_date,
        is_completed: false,
    });

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/tasks/${task.id}`);
    }

    return (
        <>
            <Head title="Update Task"/>
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <form onSubmit={handleUpdate} className='space-y-4'>
                    {/* Display errors */}
                    {Object.keys(errors).length > 0 && (
                        <Alert>
                            <InfoIcon />
                            <AlertTitle>Error!</AlertTitle>
                                <AlertDescription>
                                    <ul>
                                        {Object.entries(errors).map(([key, message]) =>
                                            <li key={key}>{message as string}</li>
                                        )}
                                    </ul>
                                </AlertDescription>
                        </Alert>
                        )}
                    
                    <div className='flex flex-col gap-2'>
                        <Label htmlFor='task title' className='text-lg'>Title</Label>
                        <Input placeholder="Task Title" className='text-lg h-12' value={data.title} onChange={(e) => setData('title', e.target.value)}></Input>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <Label htmlFor='task description' className='text-lg'>Description</Label>
                        <Textarea placeholder="Description" className='text-lg min-h-32' value={data.description} onChange={(e) => setData('description', e.target.value)}></Textarea>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <Label htmlFor='task due date' className='text-lg'>Due Date</Label>
                        <Input type="date" placeholder="Due Date" className='text-lg h-12' value={data.due_date} onChange={(e) => setData('due_date', e.target.value)}></Input>
                    </div>

                    <div className='flex items-center gap-2'>                            
                        <Input id='task-status' type="checkbox" className='h-6 w-6' checked={data.is_completed} onChange={(e) => setData('is_completed', e.target.checked)}></Input>
                        <Label htmlFor='task-status' className='text-lg cursor-pointer'>Completed</Label>
                    </div>

                    <div className='flex gap-2'>
                        <Button type='button' variant="outline" onClick={() => window.history.back()}>
                            Cancel
                        </Button>

                        <Button disabled={processing} type='submit'>
                            Update Task
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}
