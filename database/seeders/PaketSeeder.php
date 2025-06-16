<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class PaketSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
   DB::table('paket')->insert([
            [
                'nama_pengirim' => 'Andi',
                'nama_penerima' => 'Budi',
                'alamat_penerima' => 'Jl. Merdeka No.1',
                'status' => 'diproses',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama_pengirim' => 'Sinta',
                'nama_penerima' => 'Rina',
                'alamat_penerima' => 'Jl. Kemerdekaan No.2',
                'status' => 'dikirim',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
