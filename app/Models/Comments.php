<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comments extends Model
{
    use HasFactory;

    // Specify the table name if it's not the default
    protected $table = 'comments';

    // Define the fillable attributes for mass assignment
    protected $fillable = [
        'context',
    ];

    public function poster()
    {
        return $this->belongsTo(User::class, 'poster');
    }
}
