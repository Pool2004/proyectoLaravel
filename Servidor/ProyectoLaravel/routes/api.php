<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\userController;


Route::post('/create/user', [userController::class, 'createUser']);

Route::post('/login/user', [userController::class, 'loginUser']);

Route::post('/logout/user', [userController::class, 'logoutUser'])->middleware('auth:sanctum');

Route::get('/test', function () {
    return response()->json([
        'status' => 200,
        'message' => 'API funcionando correctamente.'
    ]);
})->middleware('auth:sanctum');

