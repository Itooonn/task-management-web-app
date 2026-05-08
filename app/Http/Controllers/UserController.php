<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        if (auth()->user()->role !== 'admin') {
            abort(403);
        }

        return Inertia::render('users/index', [
            'users' => User::all(),
        ]);
    }
}
