<?php

namespace Database\Seeders;

use App\Models\Dokter;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DokterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Dokter::create([
            'nama_depan' => 'Rezka',
            'jenis_kelamin' => 'laki-laki',
            'tempat_lahir' => 'Indramayu',
            'alamat' => 'Jl. Mayor Dasuki, Jatibarang, Kabupaten Indramayu, Jawa Barat 45273, Indonesia.',
            'tgl_lahir' => Carbon::createFromFormat('Y-m-d', '1999-03-01'),
            'no_hp' => '083890282306',
        ]);
        Dokter::create([
            'nama_depan' => 'Noni',
            'jenis_kelamin' => 'perempuan',
            'tempat_lahir' => 'Indramayu',
            'alamat' => 'Jl. Mayor Dasuki, Jatibarang, Kabupaten Indramayu, Jawa Barat 45273, Indonesia.',
            'tgl_lahir' => Carbon::createFromFormat('Y-m-d', '1999-03-01'),
            'no_hp' => '083890282306',
        ]);
    }
}
