<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\userController;
use App\Http\Controllers\productoController;


Route::post('/create/user', [userController::class, 'createUser']);

Route::post('/login/user', [userController::class, 'loginUser']);

Route::post('/logout/user', [userController::class, 'logoutUser'])->middleware('auth:sanctum');

// Routes for CRUD

Route::middleware('auth:sanctum')->group(function () {

    Route::get('/get/product/{id}', [ProductoController::class, 'getProduct']);
    Route::get('/get/products', [ProductoController::class, 'getProducts']);
    Route::delete('/delete/product/{id}', [ProductoController::class, 'deleteProduct']);
    Route::post('/create/product', [ProductoController::class, 'createProduct']);
    Route::put('/update/product', [ProductoController::class, 'updateProduct']);


    // User endpoints

    Route::delete('/delete/user/{id}', [userController::class, 'deleteUser']);
    Route::get('/user/get/{id}', [userController::class, 'getUser']);
    Route::put('/user/update/{id}', [userController::class, 'updateUser']);


});




