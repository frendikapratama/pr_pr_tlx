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
        Schema::create('paket', function (Blueprint $table) {
            $table->id(); 
            $table->string('nama_paket');
            $table->string('no_resi')->unique();
            $table->string('alamat_penerima');
            $table->string('nama_penerima');
            $table->string('no_hp_penerima');
            $table->string('nama_pengirim');
            $table->string('no_hp_pengirim');
            $table->enum('status', ['proses', 'dikirim', 'diterima', 'dibatalkan'])->default('proses');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('paket');
    }
};
