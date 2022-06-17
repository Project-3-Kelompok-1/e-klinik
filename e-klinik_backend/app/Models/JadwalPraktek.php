<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JadwalPraktek extends Model
{
    use HasFactory;
    protected $table = 'jadwal_praktek';
    protected $fillable = [
        'id_dokter',
        'title',
        'tgl_praktek',
        'jam_mulai',
        'jam_selesai',
        'status'
    ];
    public function dokter()
    {
        return $this->belongsTo(Dokter::class, 'id_dokter', 'id');
    }
    public function appointment()
    {
        return $this->hasMany(Appointment::class, 'id_jadwal_praktek', 'id');
    }
}
