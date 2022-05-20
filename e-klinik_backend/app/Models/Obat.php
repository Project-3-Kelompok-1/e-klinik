<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Obat extends Model
{
    use HasFactory;

    protected $table ='obat';
    protected $filable=[
        'nama_obat',
        'dosis_obat',
        'stok_obat',
        'jenis_obat',
        'harga_jual',
        'tipe_obat'
    ];

}
