<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{

 public function index()
    {
      return response()->json(
        User::orderBy('created_at', 'desc')->get()
    );
    }

    public function store(Request $request)
  {
    $validator = Validator::make($request->all(), [
        'fullname'   => 'required|string|max:100',
        'email'      => 'required|email|unique:users,email',
        'password'   => 'required|string|min:6',
        'no_telpon'  => 'required|regex:/^08[0-9]{8,11}$/',
        'role'       => 'required|in:admin,kurir',
    ]);

    if ($validator->fails()) {
        return response()->json([
            'status'  => false,
            'message' => 'Validation error',
            'errors'  => $validator->errors(),
        ], 422);
    }

    $user = User::create([
        'fullname'  => $request->fullname,
        'email'     => $request->email,
        'password'  => Hash::make($request->password),
        'no_telpon' => $request->no_telpon,
        'role'      => $request->role,
    ]);

    return response()->json([
        'status'  => true,
        'message' => 'User created successfully',
        'user'    => $user,
    ], 201);
}
}
