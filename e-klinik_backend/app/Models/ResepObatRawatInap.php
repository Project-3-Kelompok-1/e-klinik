<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ResepObatRawatInap extends Model
{
    use HasFactory;
    protected $table ='resep_obat_rawat_inap';
    protected $filable=[
        'berobat_rawat_inap',
        'id_obat',
        'jumlah_penggunaan_dosis'
    ];
}
