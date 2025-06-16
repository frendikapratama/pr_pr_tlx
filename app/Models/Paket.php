<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Paket extends Model
    {
    protected $table = 'paket';
    protected $fillable = [
            'nama_paket',
            'no_resi',
            'alamat_penerima',
            'nama_penerima',
            'no_hp_penerima',
            'nama_pengirim',
            'no_hp_pengirim',
            'status',
        ];
    }
