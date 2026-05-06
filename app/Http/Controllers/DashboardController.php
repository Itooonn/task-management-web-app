<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Task;

class DashboardController extends Controller
{
    public function index()
    {
        $tasks = Task::all();
        $completedCount = $tasks->where('is_completed', true)->count();
        $pendingCount = $tasks->where('is_completed', false)->count();

        return Inertia::render('dashboard', compact('completedCount', 'pendingCount'));
    }
}
