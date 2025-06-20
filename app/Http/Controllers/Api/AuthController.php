<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
class AuthController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:sanctum')->except(['login']);
    }
    
    public function login(Request $request)
        {
            $credentials = $request->validate([
                'email' => ['required', 'email'],
                'password' => ['required'],
            ]);

            if (!Auth::attempt($credentials)) {
                return response()->json(['message' => 'Invalid credentials'], 401);
            }

            $user = Auth::user(); 
            $token = $user->createToken('api_token')->plainTextToken;

            return response()->json([
                'access_token' => $token,
                'token_type' => 'Bearer',
                'user' => $user,
            ]);
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
            User::orderBy('created_at', 'desc')->get()
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
    
    public function update(Request $request, $id)
    {
            $user = User::find($id);

            if (!$user) {
                return response()->json([
                    'status'  => false,
                    'message' => 'User not found',
                ], 404);
            }

            $validator = Validator::make($request->all(), [
                'fullname'   => 'sometimes|required|string|max:100',
                'email'      => 'sometimes|required|email|unique:users,email,' . $id,
                'password'   => 'sometimes|required|string|min:6',
                'no_telpon'  => 'sometimes|required|regex:/^08[0-9]{8,11}$/',
                'role'       => 'sometimes|required|in:admin,kurir',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status'  => false,
                    'message' => 'Validation error',
                    'errors'  => $validator->errors(),
                ], 422);
            }

            $updateData = [];
            
            if ($request->has('fullname')) {
                $updateData['fullname'] = $request->fullname;
            }
            
            if ($request->has('email')) {
                $updateData['email'] = $request->email;
            }
            
            if ($request->has('password')) {
                $updateData['password'] = Hash::make($request->password);
            }
            
            if ($request->has('no_telpon')) {
                $updateData['no_telpon'] = $request->no_telpon;
            }
            
            if ($request->has('role')) {
                $updateData['role'] = $request->role;
            }

            $user->update($updateData);

            return response()->json([
                'status'  => true,
                'message' => 'User updated successfully',
                'user'    => $user->fresh(),
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

        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'status'  => false,
                'message' => 'User not found',
            ], 404);
        }

        $user->delete();

        return response()->json([
            'status'  => true,
            'message' => 'User deleted successfully',
        ]);
    }

}
