<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateClientesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('clientes', function (Blueprint $table) {
            $table->engine = "InnoDB";
            $table->string('nome',60);
            $table->integer('cpf',14);
            $table->string('email',60);
            $table->integer('parcelas');
            $table->double('valor_parcela');
            $table->double('valor_total');
            $table->string('checkbox',11);
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
        Schema::drop('clientes');
    }
}
