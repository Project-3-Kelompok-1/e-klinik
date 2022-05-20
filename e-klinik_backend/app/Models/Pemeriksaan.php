<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pemeriksaan extends Model
{
    use HasFactory;

    protected $table ='pemeriksaan';
    protected $fillable = [
        'id_appointment',
        'tgl_periksa',
        'jam_periksa',
        'amnanesa',
        'planning',
        'keputusan',

    ];
}
