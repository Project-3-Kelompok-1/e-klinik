<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RawatInap extends Model
{
    use HasFactory;
    protected $table ='rawat_inap';
    protected $fillable = [
        'id_ruang_rawat_inap',
        'id_pemeriksaan',
        'tanggal_masuk',
        'tanggal_keluar',
        'status'
    ];

}
