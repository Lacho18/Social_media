<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    // Specify the table name if it's not the default
    protected $table = 'posts';

    // Define the fillable attributes for mass assignment
    protected $fillable = [
        'name',
        'description',
        'images',
        'poster',
    ];

    protected $casts = [
        'images' => 'array',
        'comments' => 'array',
    ];

    public function poster()
    {
        return $this->belongsTo(User::class, 'poster');
    }
}
