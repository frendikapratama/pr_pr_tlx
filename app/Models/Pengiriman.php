<?php

namespace App\Models;

use App\Models\Paket;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class Pengiriman extends Model
{
    
 use HasFactory;

    protected $table = 'pengiriman';
    protected $fillable = ['paket_id', 'user_id', 'foto_bukti_diterima'];
    public function paket()
    {
        return $this->belongsTo(Paket::class);
    }

    public function kurir()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

}
