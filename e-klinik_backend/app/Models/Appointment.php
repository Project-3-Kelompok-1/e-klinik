<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    use HasFactory;
    protected $table = 'appointment';
    protected $guarded = [
        'id'
    ];
    public function pasien()
    {
        return $this->belongsTo(Pasien::class, 'nik_pasien', 'nik');
    }
}
