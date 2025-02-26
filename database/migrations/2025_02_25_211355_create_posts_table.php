<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('description');
            $table->json('images')->nullable()->default(json_encode([]));
            $table->string('video')->nullable();
            $table->integer('likes')->default(0);
            $table->json('comments')->default(json_encode([]));
            $table->foreignId('poster')->nullable()->constrained('users')->onDelete('set null')->index();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
