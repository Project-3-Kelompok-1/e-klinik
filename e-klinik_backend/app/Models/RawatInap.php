<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RawatInap extends Model
{
    use HasFactory;
    protected $table ='rawat_inap';
    protected $fillable = [
        'ruang_rawat_inap',
        'pemeriksaan',
        'tanggal_masuk',
        'tanggal_keluar',
        'status'
    ];

}
