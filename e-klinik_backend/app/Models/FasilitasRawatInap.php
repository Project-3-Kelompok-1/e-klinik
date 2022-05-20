<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FasilitasRawatInap extends Model
{
    use HasFactory;
    protected $table ='fasilitas_rawat_inap';
    protected $filable=[
        'id_rawat_inap',
        'nama_fasilitas',
        'jumlah'
    ];
}
