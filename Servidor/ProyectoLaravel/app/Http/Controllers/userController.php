<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;

use Illuminate\Support\Facades\Hash;

class userController extends Controller
{
    public function createUser(Request $request){

        $validate = $request->validate([
            'nombre' => 'required|string|max:255',
            'apellido' => 'required|string|max:255',
            'correo' => 'required|string|email|max:255|unique:users',
            'telefono' => 'required|integer|unique:users',
            'contrasena' => 'required|string|min:8|confirmed',
        ]);

        $user = User::where('correo', $request->correo)->first();

        if($user){
            return response()->json([
                'status' => 500,
                'message' => 'El usuario ya existe con dichos datos.'
            ]);
        }

        $user = User::create([
            'nombre' => $request->nombre,
            'apellido' => $request->apellido,
            'correo' => $request->correo,
            'telefono' => $request->telefono,
            'contrasena' => Hash::make($request->contrasena),
        ]);

        return response()->json([
            'status' => 201,
            'message' => 'Usuario creado correctamente.'
        ]);


    }
}
