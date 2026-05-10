<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable(['user_id', 'title', 'description', 'status', 'due_date'])]
class Task extends Model
{
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
