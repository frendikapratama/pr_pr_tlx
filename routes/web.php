<?php

use Illuminate\Support\Facades\Route;

Route::get('/{any}', function () {
    return view('app'); // atau nama view blade-mu yang memuat React
})->where('any', '.*');
