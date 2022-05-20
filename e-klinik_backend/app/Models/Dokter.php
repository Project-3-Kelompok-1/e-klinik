<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dokter extends Model
{
    use HasFactory;
    protected $table = 'dokter';
    protected $fillable = [
        'nama_depan',
        'nama_belakang',
        'jenis_kelamin',
        'tempat_lahir',
        'alamat',
        'tgl_lahir',
        'no_hp',
        'foto_dokter'
    ];
    public function jadwal_praktek()
    {
        return $this->hasMany(JadwalPraktek::class, 'id_dokter', 'id');
    }
}
