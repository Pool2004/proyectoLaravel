<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\userController;


Route::post('/create/user', [userController::class, 'createUser']);