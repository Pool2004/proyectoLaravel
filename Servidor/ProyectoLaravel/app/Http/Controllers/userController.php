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
            'token' => $token,
            'user' => $user,
            'user_id' => $user->id,
        ]);
    }

    public function logoutUser(Request $request){

    
        $request->user()->tokens()->delete();


        return response()->json([
            'status' => 200,
            'message' => 'Usuario deslogueado correctamente.'
        ]);
    }


    public function deleteUser($id){

        

        if($id == null){
            return response()->json([
                'status' => 500,
                'message' => 'El id no puede ser nulo.'
            ]);
        }

        $user = User::find($id);

        if($user == null){
            return response()->json([
                'status' => 500,
                'message' => 'El usuario no existe con dichos datos.'
            ]);
        }

        $user->delete();

        // Eliminamos el token

        $user->tokens()->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Usuario eliminado correctamente.'
        ]);
    }

    public function updateUser(Request $request, $id){
        

        $contrasena = null;

        if($id == null){
            return response()->json([
                'status' => 500,
                'message' => 'El id no puede ser nulo.'
            ]);
        }

        $user = User::find($id);

        if($user == null){
            return response()->json([
                'status' => 500,
                'message' => 'El usuario no existe con dichos datos.'
            ]);
        }

        if($request->contrasena == "" || $request->contrasena == null){
            $contrasena = $user->contrasena;
        }else{
            $contrasena = Hash::make($request->contrasena);
        }

        $user->update([
            'nombre' => $request->nombre,
            'apellido' => $request->apellido,
            'correo' => $request->correo,
            'telefono' => $request->telefono,
            'contrasena' => $contrasena,
        ]);

        return response()->json([
            'status' => 200,
            'message' => 'Usuario actualizado correctamente.'
        ]);
    }

    public function getUser($id){
        
        if($id == null){
            return response()->json([
                'status' => 500,
                'message' => 'El id no puede ser nulo.'
            ]);
        }

        $user = User::find($id);

        if($user == null){
            return response()->json([
                'status' => 500,
                'message' => 'El usuario no existe con dichos datos.'
            ]);
        }

        return response()->json([
            'status' => 200,
            'message' => 'Usuario encontrado correctamente.',
            'user' => $user
        ]);
    }
}
