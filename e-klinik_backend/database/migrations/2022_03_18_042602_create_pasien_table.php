<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pasien', function (Blueprint $table) {
            $table->string('nik')->primary();
            $table->foreignId('id_user');
            $table->string('nama_depan');
            $table->string('nama_belakang');
            $table->string('alamat_rumah');
            $table->string('usia');
            $table->string('jenis_kelamin');
            $table->string('tempat_lahir');
            $table->datetime('tgl_lahir');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('pasien');
    }
};
