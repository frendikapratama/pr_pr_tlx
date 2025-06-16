<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Paket extends Model
    {
    protected $table = 'paket';
    protected $fillable = ['nama_pengirim', 'nama_penerima', 'alamat_penerima', 'status'];
    }
