<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Faker\Factory as Faker;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create('id_ID');

        for ($i = 1; $i <= 2; $i++) {
            DB::table('users')->insert([
                'fullname' => 'Admin ' . $i,
                'email' => 'admin' . $i . '@example.com',
                'password' => Hash::make('password'), 
                'no_telpon' => '08' . rand(100000000, 999999999),
                'role' => 'admin',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        for ($i = 1; $i <= 5; $i++) {
            DB::table('users')->insert([
                'fullname' => $faker->name,
                'email' => 'kurir' . $i . '@example.com',
                'password' => Hash::make('password'), 
                'no_telpon' => '08' . rand(100000000, 999999999),
                'role' => 'kurir',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
