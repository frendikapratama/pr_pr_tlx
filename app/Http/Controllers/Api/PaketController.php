<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Paket;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;

class PaketController extends Controller
{
    public function __construct()
{
    $this->middleware('auth:sanctum');
}


    public function index()
    {
        $user = auth()->user();
        if (!$user->isAdmin()) {
                return response()->json([
                    'status' => false,
                    'message' => 'Forbidden',
                ], 403);
            }
        return response()->json(
            Paket::orderBy('created_at', 'desc')->get()
        );
    }

    public function store(Request $request)
    {
        $user = Auth::user();

        if (!$user->isAdmin()) {
            return response()->json([
                'status' => false,
                'message' => 'Forbidden',
            ], 403);
        }
        $validator = Validator::make($request->all(), [
            'nama_paket'     => 'required|string|max:100',
            'nama_pengirim'    => 'required|string|max:100',
            'no_hp_pengirim' => 'required|string|max:20',
            'nama_penerima' => 'required|string|max:100',
            'no_hp_penerima' => 'required|string|max:20',
            'alamat_penerima' => 'required|string|max:200',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status'  => false,
                'message' => 'Validation error',
                'errors'  => $validator->errors(),
            ], 422);
        }

        $paket = Paket::create([
            'no_resi'           => now()->timestamp . strtoupper(Str::random(4)),
            'nama_paket'     => $request->nama_paket,
            'nama_pengirim'    => $request->nama_pengirim,
            'no_hp_pengirim'    => $request->no_hp_pengirim,
            'nama_penerima'    => $request->nama_penerima,
            'no_hp_penerima'    => $request->no_hp_pengirim,
            'alamat_penerima'    => $request->alamat_penerima,
        ]);

        return response()->json([
            'status'  => true,
            'message' => 'paket created successfully',
            'paket'    => $paket,
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $user = Auth::user();

        if (!$user->isAdmin()) {
            return response()->json([
                'status' => false,
                'message' => 'Forbidden',
            ], 403);
        }
        $paket = Paket::find($id);

        if (!$paket) {
            return response()->json([
                'status' => false,
                'message' => 'Paket not found',
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'nama_paket'      => 'sometimes|string|max:100',
            'nama_pengirim'   => 'sometimes|string|max:100',
            'no_hp_pengirim'  => 'sometimes|string|max:20',
            'nama_penerima'   => 'sometimes|string|max:100',
            'no_hp_penerima'  => 'sometimes|string|max:20',
            'alamat_penerima' => 'sometimes|string|max:200',
            'status'          => 'sometimes|string|in:proses,dikirim,diterima,dibatalkan',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status'  => false,
                'message' => 'Validation error',
                'errors'  => $validator->errors(),
            ], 422);
        }

        $paket->update($validator->validated());

        return response()->json([
            'status'  => true,
            'message' => 'Paket updated successfully',
            'paket'   => $paket,
        ]);
    }


    public function destroy($id)
    {
        $user = Auth::user();

        if (!$user->isAdmin()) {
            return response()->json([
                'status' => false,
                'message' => 'Forbidden',
            ], 403);
        }
        $paket = Paket::find($id);

        if (!$paket) {
            return response()->json([
                'status' => false,
                'message' => 'Paket not found',
            ], 404);
        }

        $paket->delete();

        return response()->json([
            'status' => true,
            'message' => 'Paket deleted successfully',
        ]);
    }


}
