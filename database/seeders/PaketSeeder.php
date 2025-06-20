<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Faker\Factory as Faker;

class PaketSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create('id_ID');
        $usedResi = [];
        for ($i = 1; $i <= 20; $i++) {

            do {
                $noResi = strtoupper('RESI' . $faker->unique()->bothify('###??'));
            } while (in_array($noResi, $usedResi));

            $usedResi[] = $noResi;

            DB::table('paket')->insert([
                'nama_paket' => 'Paket ' . ucfirst($faker->word),
                'no_resi' => $noResi,
                'alamat_penerima' => $faker->address,
                'nama_penerima' => $faker->name,
                'no_hp_penerima' => $faker->phoneNumber,
                'nama_pengirim' => $faker->name,
                'no_hp_pengirim' => $faker->phoneNumber,
                'status' => "proses",
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
