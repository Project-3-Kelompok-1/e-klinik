<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pemeriksaan extends Model
{
    use HasFactory;
    protected $table = 'pemeriksaan';
    protected $guarded = ['id'];
    public function appointment()
    {
        return $this->belongsTo(Appointment::class, 'id_appointment', 'id');
    }
    public function diagnosis()
    {
        return $this->hasMany(Diagnosis::class, 'id_pemeriksaan', 'id');
    }
    public function penanganan_pasien()
    {
        return $this->hasOne(PenangananPasien::class, 'id_pemeriksaan', 'id');
    }
    public function resep()
    {
        return $this->hasMany(Resep::class, 'id_pemeriksaan', 'id');
    }
}
