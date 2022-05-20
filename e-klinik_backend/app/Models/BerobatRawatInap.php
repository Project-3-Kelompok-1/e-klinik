<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BerobatRawatInap extends Model
{
    use HasFactory;
    protected $table ='berobat_rawat_inap';
    protected $filable=[
        'id_rawat_inap' ,
        'resep_obat_lainnya',
        'dosis_konsumsi_obat',
        'catatan_peracikan_obat'
    ];
}
