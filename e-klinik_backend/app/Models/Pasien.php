<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pasien extends Model
{
    use HasFactory;

    protected $table = 'pasien';
    protected $primaryKey = 'nik';
    protected $fillable = [
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
    public function user()
    {
        return $this->belongsTo(User::class, 'id_user', 'id');
    }
}
