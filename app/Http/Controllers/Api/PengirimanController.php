<?php

namespace App\Http\Controllers\Api;

use App\Models\Pengiriman;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Controller;
use App\Models\Paket;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
class PengirimanController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    public function index()
    {
        $user = auth()->user();

        $query = Pengiriman::with(['paket', 'kurir'])
            ->orderBy('created_at', 'desc');

        if (!$user->isAdmin()) {
            $query->where('user_id', $user->id); 
        }

        return response()->json($query->get());
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
            'paket_id' => 'required|exists:paket,id',
            'user_id' => 'required|exists:users,id',
            'foto_bukti_diterima' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        $path = null;
        if ($request->hasFile('foto_bukti_diterima')) {
            $path = $request->file('foto_bukti_diterima')->store('bukti_pengiriman', 'public');
        }

        $pengiriman = Pengiriman::create([
            'paket_id' => $request->paket_id,
            'user_id' => $request->user_id,
            'foto_bukti_diterima' => $path,
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Pengiriman berhasil dibuat.',
            'data' => $pengiriman->load('paket', 'kurir'),
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $pengiriman = Pengiriman::with('paket')->findOrFail($id);

         if (!auth()->user()->isAdmin() && auth()->id() !== $pengiriman->user_id) {
            return response()->json([
                'status' => false,
                'message' => 'forbiden',
            ], 403);
        }
        $validator = Validator::make($request->all(), [
            'paket_id' => 'sometimes|exists:paket,id',
            'user_id' => 'sometimes|exists:users,id',
            'foto_bukti_diterima' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'status' => 'sometimes|in:proses,dikirim,diterima,dibatalkan', 
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        if ($request->hasFile('foto_bukti_diterima')) {
            if ($pengiriman->foto_bukti_diterima) {
                Storage::disk('public')->delete($pengiriman->foto_bukti_diterima);
            }
            $pengiriman->foto_bukti_diterima = $request->file('foto_bukti_diterima')->store('bukti_pengiriman', 'public');
        }

        $pengiriman->update($request->only(['paket_id', 'user_id']));

        if ($request->has('status')) {
            $pengiriman->paket->status = $request->status;
            $pengiriman->paket->save();
        }

        return response()->json([
            'status' => true,
            'message' => 'Pengiriman dan status paket berhasil diperbarui.',
            'data' => $pengiriman->load('paket', 'kurir'),
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
        $pengiriman = Pengiriman::findOrFail($id);
        if ($pengiriman->foto_bukti_diterima) {
            Storage::disk('public')->delete($pengiriman->foto_bukti_diterima);
        }
        $pengiriman->delete();

        return response()->json(['message' => 'Data pengiriman dihapus.']);
    }
}
