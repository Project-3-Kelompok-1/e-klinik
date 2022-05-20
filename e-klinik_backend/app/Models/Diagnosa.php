<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Diagnosa extends Model
{
    use HasFactory;

    protected $table ='diagnosa';
    protected $filable=[
        'id_pemeriksaan',
        'diagnosa_pasien',
    ];
}
