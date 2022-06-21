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
            'nik_pasien' => '1234567890123456',
            'id_jadwal_praktek' => 1,
            'konsultasi' => 'Saya mengalami gangguan tenggorokan',
            'waktu_pesan' => Carbon::now(),
            'status' => 'mendaftar'
        ]);
        Appointment::create([
            'nik_pasien' => '1234567890123456',
            'id_jadwal_praktek' => 1,
            'konsultasi' => 'Saya mengalami sakit mata',
            'waktu_pesan' => Carbon::now(),
            'status' => 'periksa'
        ]);
        Appointment::create([
            'nik_pasien' => '1234567890123456',
            'id_jadwal_praktek' => 1,
            'konsultasi' => 'Saya mengalami sakit kepala',
            'waktu_pesan' => Carbon::now(),
            'status' => 'transaksi'
        ]);
        Appointment::create([
            'nik_pasien' => '1234567890123456',
            'id_jadwal_praktek' => 1,
            'konsultasi' => 'Saya mengalami darah tinggi',
            'waktu_pesan' => Carbon::now(),
            'status' => 'selesai'
        ]);
        Appointment::create([
            'nik_pasien' => '1234567890123456',
            'id_jadwal_praktek' => 1,
            'konsultasi' => 'Saya mengalami gangguan tenggorokan',
            'waktu_pesan' => Carbon::now(),
            'status' => 'mendaftar'
        ]);
        Appointment::create([
            'nik_pasien' => '1234567890123456',
            'id_jadwal_praktek' => 1,
            'konsultasi' => 'Saya mengalami sakit mata',
            'waktu_pesan' => Carbon::now(),
            'status' => 'periksa'
        ]);
        Appointment::create([
            'nik_pasien' => '1234567890123456',
            'id_jadwal_praktek' => 1,
            'konsultasi' => 'Saya mengalami sakit kepala',
            'waktu_pesan' => Carbon::now(),
            'status' => 'transaksi'
        ]);
        Appointment::create([
            'nik_pasien' => '1234567890123456',
            'id_jadwal_praktek' => 1,
            'konsultasi' => 'Saya mengalami darah tinggi',
            'waktu_pesan' => Carbon::now(),
            'status' => 'selesai'
        ]);
        Appointment::create([
            'nik_pasien' => '1234567890123456',
            'id_jadwal_praktek' => 1,
            'konsultasi' => 'Saya mengalami gangguan tenggorokan',
            'waktu_pesan' => Carbon::now(),
            'status' => 'mendaftar'
        ]);
        Appointment::create([
            'nik_pasien' => '1234567890123456',
            'id_jadwal_praktek' => 1,
            'konsultasi' => 'Saya mengalami sakit mata',
            'waktu_pesan' => Carbon::now(),
            'status' => 'periksa'
        ]);
        Appointment::create([
            'nik_pasien' => '1234567890123456',
            'id_jadwal_praktek' => 1,
            'konsultasi' => 'Saya mengalami sakit kepala',
            'waktu_pesan' => Carbon::now(),
            'status' => 'transaksi'
        ]);
        Appointment::create([
            'nik_pasien' => '1234567890123456',
            'id_jadwal_praktek' => 1,
            'konsultasi' => 'Saya mengalami darah tinggi',
            'waktu_pesan' => Carbon::now(),
            'status' => 'selesai'
        ]);
        Appointment::create([
            'nik_pasien' => '1234567890123456',
            'id_jadwal_praktek' => 1,
            'konsultasi' => 'Saya mengalami gangguan tenggorokan',
            'waktu_pesan' => Carbon::now(),
            'status' => 'mendaftar'
        ]);
        Appointment::create([
            'nik_pasien' => '1234567890123456',
            'id_jadwal_praktek' => 1,
            'konsultasi' => 'Saya mengalami sakit mata',
            'waktu_pesan' => Carbon::now(),
            'status' => 'periksa'
        ]);
        Appointment::create([
            'nik_pasien' => '1234567890123456',
            'id_jadwal_praktek' => 1,
            'konsultasi' => 'Saya mengalami sakit kepala',
            'waktu_pesan' => Carbon::now(),
            'status' => 'transaksi'
        ]);
        Appointment::create([
            'nik_pasien' => '1234567890123456',
            'id_jadwal_praktek' => 1,
            'konsultasi' => 'Saya mengalami darah tinggi',
            'waktu_pesan' => Carbon::now(),
            'status' => 'selesai'
        ]);
    }
}
