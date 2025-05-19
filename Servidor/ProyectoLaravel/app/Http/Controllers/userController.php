<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;

use Illuminate\Support\Facades\Hash;

class userController extends Controller
{
    public function createUser(Request $request){

    
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

    public function loginUser(Request $request){

        $user = User::where('correo', $request->correo)->first();

        if(!$user){
            return response()->json([
                'status' => 500,
                'message' => 'El usuario no existe con dichos datos.'
            ]);
        }

        if(!Hash::check($request->contrasena, $user->contrasena)){
            return response()->json([
                'status' => 500,
                'message' => 'La contraseña es incorrecta.'
            ]);
        }

        $token = $user->createToken('token')->plainTextToken;

        return response()->json([
            'status' => 200,
            'message' => 'Usuario logueado correctamente.',
            'token' => $token
        ]);
    }

    public function logoutUser(Request $request){

    
        $token = $request->bearerToken();
        if(!$token){
            return response()->json([
                'status' => 500,
                'message' => 'No se ha proporcionado un token.'
            ]);
        }

        $user = User::where('remember_token', $token)->first();
        if(!$user){
            return response()->json([
                'status' => 500,
                'message' => 'El token no es válido.'
            ]);
        }

        $user->tokens()->where('id', $token)->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Usuario deslogueado correctamente.'
        ]);
    }
}
