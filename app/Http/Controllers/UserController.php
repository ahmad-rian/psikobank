<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        // Super Admin can see all users
        if (auth()->user()->isSuperAdmin()) {
            $users = User::latest()->paginate(10);
        }
        // Admin can see all users except super admin
        else if (auth()->user()->isAdmin()) {
            $users = User::where('role', '!=', 'super_admin')
                ->latest()
                ->paginate(10);
        }
        // Regular users can only see their own account
        else {
            $users = User::where('id', auth()->id())->paginate(10);
        }

        return response()->json([
            'status' => 'success',
            'data' => $users
        ]);
    }

    public function store(Request $request)
    {
        // Only super_admin and admin can create users
        if (!auth()->user()->isSuperAdmin() && !auth()->user()->isAdmin()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized'
            ], 403);
        }

        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8'],
            'role' => [
                'required',
                Rule::in(
                    auth()->user()->isSuperAdmin()
                        ? ['admin', 'user']
                        : ['user']
                )
            ],
            'status' => ['required', Rule::in(['active', 'inactive'])]
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'status' => $request->status
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'User created successfully',
            'data' => $user
        ], 201);
    }

    public function show(User $user)
    {
        // Check if user has permission to view this user
        if (
            !auth()->user()->isSuperAdmin() &&
            auth()->user()->isAdmin() &&
            $user->isSuperAdmin()
        ) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized'
            ], 403);
        }

        if (auth()->user()->isUser() && auth()->id() !== $user->id) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized'
            ], 403);
        }

        return response()->json([
            'status' => 'success',
            'data' => $user
        ]);
    }

    public function update(Request $request, User $user)
    {
        // Prevent modifying super_admin users unless you're a super_admin
        if ($user->isSuperAdmin() && !auth()->user()->isSuperAdmin()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized to modify super admin users'
            ], 403);
        }

        // Regular users can only update their own profile
        if (auth()->user()->isUser() && auth()->id() !== $user->id) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized'
            ], 403);
        }

        $request->validate([
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'email' => [
                'sometimes',
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique('users')->ignore($user->id)
            ],
            'password' => ['sometimes', 'required', 'string', 'min:8'],
            'role' => [
                'sometimes',
                'required',
                Rule::in(
                    auth()->user()->isSuperAdmin()
                        ? ['admin', 'user']
                        : ['user']
                )
            ],
            'status' => ['sometimes', 'required', Rule::in(['active', 'inactive'])]
        ]);

        // Only super_admin can modify roles
        if ($request->has('role') && !auth()->user()->isSuperAdmin()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized to modify user roles'
            ], 403);
        }

        $userData = array_filter([
            'name' => $request->name,
            'email' => $request->email,
            'role' => $request->role,
            'status' => $request->status
        ]);

        if ($request->has('password')) {
            $userData['password'] = Hash::make($request->password);
        }

        $user->update($userData);

        return response()->json([
            'status' => 'success',
            'message' => 'User updated successfully',
            'data' => $user
        ]);
    }

    public function destroy(User $user)
    {
        // Only super_admin can delete users
        if (!auth()->user()->isSuperAdmin()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized to delete users'
            ], 403);
        }

        // Prevent deleting super_admin users
        if ($user->isSuperAdmin()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Super admin users cannot be deleted'
            ], 403);
        }

        $user->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'User deleted successfully'
        ]);
    }
}
