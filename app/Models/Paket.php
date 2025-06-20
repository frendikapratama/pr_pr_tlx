<?php

namespace App\Models;

use App\Models\Pengiriman;
use Illuminate\Database\Eloquent\Model;

class Paket extends Model
{
    protected $table = 'paket';
    protected $fillable = [
        'nama_paket',
        'no_resi',
        'nama_pengirim',
        'no_hp_pengirim',
        'nama_penerima',
        'no_hp_penerima',
        'alamat_penerima',
        'status',
    ];

    public function pengiriman()
{
    return $this->hasOne(Pengiriman::class);
}

}
