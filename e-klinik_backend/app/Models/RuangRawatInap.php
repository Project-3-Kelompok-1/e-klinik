<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RuangRawatInap extends Model
{
    use HasFactory;
    protected $table ='ruang_rawat_inap';
    protected $filable=[
        'nama_ruangan'
    ];
}
