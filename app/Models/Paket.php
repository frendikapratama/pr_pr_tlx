<?php

namespace App\Models;

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
    }
