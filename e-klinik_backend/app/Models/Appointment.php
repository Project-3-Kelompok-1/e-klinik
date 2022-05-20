<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    use HasFactory;

    protected $table ='appointment';
    protected $filable=[
        'id_pasien',
        'id_jadwal_praktek',
        'konsultasi',
        'waktu_pesan',
        'status'
    ];

}
