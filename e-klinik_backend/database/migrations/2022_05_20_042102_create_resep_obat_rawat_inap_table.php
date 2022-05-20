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
        Schema::create('resep_obat_rawat_inap', function (Blueprint $table) {
            $table->id();
            $table->foreignId('berobat_rawat_inap');
            $table->foreignId('id_obat');
            $table->string('jumlah_penggunaan_dosis');
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
        Schema::dropIfExists('resep_obat_rawat_inap');
    }
};
