<?php

namespace Database\Seeders;

use App\Models\Appointment;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AppointmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Appointment::create([
            'nik_pasien' => '123456789',
            'id_jadwal_praktek' => 1,
            'konsultasi' => 'Saya mengalami gangguan tenggorokan',
            'waktu_pesan' => Carbon::now(),
            'status' => 'mendaftar'
        ]);
    }
}
