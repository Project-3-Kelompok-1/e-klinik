<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'username' => 'rezka123',
            'password' => Hash::make('rezka123'),
            'role' => 'dokter'
        ]);
        User::create([
            'username' => 'resepsionis123',
            'password' => Hash::make('resepsionis123'),
            'role' => 'resepsionis'
        ]);
        User::create([
            'username' => 'apoteker123',
            'password' => Hash::make('apoteker123'),
            'role' => 'apoteker'
        ]);
        User::create([
            'username' => 'pasien123',
            'password' => 'pasien123',
            'role' => 'pasien'
        ]);
    }
}
