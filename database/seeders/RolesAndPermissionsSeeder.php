<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class RolesAndPermissionsSeeder extends Seeder
{
    public function run(): void
    {
        // Create Super Admin User
        User::create([
            'name' => 'Super Admin',
            'email' => 'superadmin@psikobank.com',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
            'status' => 'active',
            'role' => 'super_admin'
        ]);

        // Create Admin User
        User::create([
            'name' => 'Admin',
            'email' => 'admin@psikobank.com',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
            'status' => 'active',
            'role' => 'admin'
        ]);

        // Create Regular User
        User::create([
            'name' => 'User',
            'email' => 'user@psikobank.com',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
            'status' => 'active',
            'role' => 'user'
        ]);
    }
}
