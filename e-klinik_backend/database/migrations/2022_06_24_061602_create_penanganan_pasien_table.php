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
        Schema::create('penanganan_pasien', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_pemeriksaan')->references('id')->on('pemeriksaan')->onDelete('cascade');
            $table->longText('tindakan_penanganan');
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
        Schema::dropIfExists('penanganan_pasien');
    }
};
