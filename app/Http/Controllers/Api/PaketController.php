<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Paket;

class PaketController extends Controller
{
    public function index()
    {
      return response()->json(Paket::all());
    }
}
