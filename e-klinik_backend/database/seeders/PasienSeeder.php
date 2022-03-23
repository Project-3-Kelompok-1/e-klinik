<?php

namespace Database\Seeders;

use App\Models\Pasien;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PasienSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Pasien::create([
            'nik' => '123456789',
            'id_user' => 4,
            'nama_depan' => "Mar'i",
            'nama_belakang' => 'Adhari',
            'alamat_rumah' => 'Kutagara Utara, RT.04 RW.01, Kecamatan Pekalipan Kelurahan Jagasatru, Kota Cirebon, Jawa Barat',
            'usia' => 21,
            'jenis_kelamin' => 'Laki-laki',
            'tempat_lahir' => 'Cirebon',
            'tgl_lahir' => Carbon::create(2001, 3, 14, 0)
        ]);
    }
}
