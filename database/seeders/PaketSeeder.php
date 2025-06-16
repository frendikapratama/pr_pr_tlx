<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Paket;
use Illuminate\Support\Str;

class PaketSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
  public function run(): void
    {
        Paket::create([
            'id' => Str::uuid(), 
            'nama_paket' => 'Paket A',
            'no_resi' => time() . strtoupper(Str::random(5)),
            'alamat_penerima' => 'Jl. Merdeka No.1',
            'nama_penerima' => 'Budi',
            'no_hp_penerima' => '081234567890',
            'nama_pengirim' => 'Andi',
            'no_hp_pengirim' => '089876543210',
            'status' => 'diproses',
        ]);
    }
}
