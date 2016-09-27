<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateInformacaoClientesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('informacao_clientes', function (Blueprint $table) {
            $table->engine = "InnoDB";
            $table->string('nome_mae',60);
            $table->date('data_nascimento');
            $table->string('logradouro',60);
            $table->string('cep');
            $table->string('bairro',40);
            $table->string('numero',11);
            $table->string('complemento',100);
            $table->integer('cliente_id')->unsigned()->nullable();
            $table->timestamps();
        });

        // Schema::table('informacao_clientes', function (Blueprint $table) {
        //     $table->foreign('cliente_id')->references('id')->on('clientes');
        // });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('informacao_clientes');
    }
}
