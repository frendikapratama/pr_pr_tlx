<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\PaketController;

Route::get('/paket', [PaketController::class, 'index']);

