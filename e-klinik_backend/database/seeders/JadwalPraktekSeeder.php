<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\JadwalPraktek;
use Carbon\Carbon;

class JadwalPraktekSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        JadwalPraktek::create([
            'id_dokter' => 1,
            'title' => 'Kerja Lembur',
            'tgl_praktek' => Carbon::now()->format('Y-m-d'),
            'jam_mulai' => Carbon::now()->format('H:i:s'),
            'jam_selesai' => Carbon::now()->format('H:i:s'),
            'status' => 'kerja'
        ]);
        JadwalPraktek::create([
            'id_dokter' => 2,
            'title' => 'Hari minggu',
            'tgl_praktek' => Carbon::now()->format('Y-m-d'),
            'jam_mulai' => Carbon::now()->format('H:i:s'),
            'jam_selesai' => Carbon::now()->format('H:i:s'),
            'status' => 'libur'
        ]);
    }
}
