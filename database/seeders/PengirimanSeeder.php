<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class PengirimanSeeder extends Seeder
{
    public function run(): void
    {
        $statusList = ['dikirim', 'diterima', 'dibatalkan'];

        $availablePaketIds = DB::table('paket')
            ->whereNotIn('id', DB::table('pengiriman')->pluck('paket_id')) // agar tidak duplikat pengiriman
            ->pluck('id')
            ->toArray();

        $kurirIds = DB::table('users')
            ->where('role', 'kurir')
            ->pluck('id')
            ->toArray();

        if (count($availablePaketIds) < 11 || count($kurirIds) < 1) {
            $this->command->error('Seeder gagal: Pastikan tersedia minimal 11 paket unik dan user kurir.');
            return;
        }

        $paketIdsToUse = array_slice($availablePaketIds, 0, 11);

        foreach ($paketIdsToUse as $paketId) {
            $status = fake()->randomElement($statusList);
            $userId = fake()->randomElement($kurirIds);

            // Insert ke tabel pengiriman
            DB::table('pengiriman')->insert([
                'paket_id' => $paketId,
                'user_id' => $userId,
                'foto_bukti_diterima' => $status === 'diterima' ? 'bukti_' . Str::random(8) . '.jpg' : null,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            // Update status paket terkait
            DB::table('paket')
                ->where('id', $paketId)
                ->update([
                    'status' => $status,
                    'updated_at' => now(),
                ]);
        }
    }
}
