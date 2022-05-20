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
        Schema::create('berobat_rawat_inap', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_rawat_inap');
            $table->string('resep_obat_lainnya');
            $table->string('dosis_konsumsi_obat');
            $table->string('catatan_peracikan_obat');
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
        Schema::dropIfExists('berobar_rawat_inap');
    }
};
