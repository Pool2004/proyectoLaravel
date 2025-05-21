<?php

namespace App\Http\Controllers;
use App\Models\Producto;
use Illuminate\Http\Request;

class ProductoController extends Controller
{
    // Controller for CRUD

    public function getProduct($id){
        if($id == null){
            return response()->json([
                'status' => 500,
                'message' => 'El id no puede ser nulo.'
            ]);
        }

        $producto = Producto::find($id);

        if($producto ==  null){
            return response()->json([
                'status' => 500,
                'message' => 'El producto no existe con dicho id.'
            ]);
        }

        return response()->json([
            'status' => 200,
            'message' => 'Producto encontrado.',
            'data' => $producto
        ]);
    }


    public function getProducts(){

        $productos = Producto::all();
        
        if($productos ==  null){
            return response()->json([
                'status' => 500,
                'message' => 'No hay productos registrados.'
            ]);
        }

        return response()->json([
            'status' => 200,
            'message' => 'Productos encontrados.',
            'data' => $productos
        ]);
    }

    public function deleteProduct($id){

        if($id == null){
            return response()->json([
                'status' => 500,
                'message' => 'El id no puede ser nulo.'
            ]);
        }

        $producto = Producto::find($id);

        if($producto == null){
            return response()->json([
                'status' => 500,
                'message' => 'El producto no existe con dicho id.'
            ]);
        }

        $producto->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Producto eliminado correctamente.'
        ]);
    }

    public function createProduct(Request $request){

        $producto = Producto::create([
            'nombre' => $request->nombre,
            'descripcion' => $request->descripcion,
            'precio' => $request->precio,
            'stock' => $request->stock
        ]);
        return response()->json([
            'status' => 201,
            'message' => 'Producto creado correctamente.',
            'data' => $producto
        ]);
    }

    public function updateProduct(Request $request){


        $id = $request->id;
        
        if($id == null){
            return response()->json([
                'status' => 500,
                'message' => 'El id no puede ser nulo.'
            ]);
        }

        $producto = Producto::find($id);

        if($producto == null){
            return response()->json([
                'status' => 500,
                'message' => 'El producto no existe con dicho id.'
            ]);
        }

        $producto->update([
            'nombre' => $request->nombre,
            'descripcion' => $request->descripcion,
            'precio' => $request->precio,
            'stock' => $request->stock
        ]);

        return response()->json([
            'status' => 200,
            'message' => 'Producto actualizado correctamente.',
            'data' => $producto
        ]);

    }
        
}
