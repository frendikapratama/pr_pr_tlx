<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\PaketController;
use App\Http\Controllers\Api\AuthController;

Route::get('/paket', [PaketController::class, 'index']);
Route::post('/paket', [PaketController::class, 'store']);
Route::put('/paket/{id}', [PaketController::class, 'update']);
Route::delete('/paket/{id}', [PaketController::class, 'destroy']);


Route::get('/user', [AuthController::class, 'index']);
Route::post('/user', [AuthController::class, 'store']);
