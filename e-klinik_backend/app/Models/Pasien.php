<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pasien extends Model
{
    use HasFactory;

    protected $table ='pasien';
    protected $filable=[
        'nik',
        'id_user',
        'nama_depan',
        'nama_belakang',
        'alamat_rumah',
        'usia',
        'jenis_kelamin',
        'tempat_lahir',
        'tgl_lahir'

    ];
}
