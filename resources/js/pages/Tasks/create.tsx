
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { InfoIcon } from 'lucide-react';

CreateTask.layout = {
    breadcrumbs: [
        {
            title: 'Create New Task',
            href: '/tasks/create',
        },
    ],
};

export default function CreateTask() {

    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        due_date: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/tasks');
    }

    return (
        <>
            <Head title="Create Task" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4 ">
            
                <form onSubmit={handleSubmit} className='space-y-4'>
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
                    
                    <div className='flex gap-2'>
                        <Button type='button' variant="outline" onClick={() => window.history.back()}>
                            Cancel
                        </Button>

                        <Button disabled={processing} type='submit'>
                            Add Task
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}


