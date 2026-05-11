<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Task;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        $tasks = Task::where('user_id', Auth::id())->get();

        $completedCount = $tasks->where('is_completed', true)->count();
        $pendingCount = $tasks->where('is_completed', false)->count();

        return Inertia::render('dashboard', compact('completedCount', 'pendingCount'));
    }
}
