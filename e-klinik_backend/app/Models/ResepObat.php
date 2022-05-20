<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ResepObat extends Model
{
    use HasFactory;
    protected $table ='resep_obat';
    protected $filable=[
        'id_obat',
        'id_berobat jalan',
        'jumlah_penggunaan_dosis'
    ];
}
