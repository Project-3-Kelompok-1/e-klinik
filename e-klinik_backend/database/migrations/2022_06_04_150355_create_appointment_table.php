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
        Schema::create('appointment', function (Blueprint $table) {
            $table->id();
            $table->string('nik_pasien');
            $table->foreignId('id_jadwal_praktek');
            $table->string('konsultasi')->nullable();
            $table->dateTime('waktu_pesan');
            $table->string('status');
            $table->timestamps();

            // add foreign key
            $table->foreign('nik_pasien')->references('nik')->on('pasien')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('appointment');
    }
};
