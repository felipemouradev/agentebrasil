<?php

use Illuminate\Database\Seeder;
use App\Cliente;
use App\InformacaoCliente;

class ClientesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */

    public function run()
    {
        //
        $faker = Faker\Factory::create();
        $faker->addProvider(new Faker\Provider\pt_BR\Address($faker));
        $faker->addProvider(new Faker\Provider\pt_BR\Person($faker));
        $faker->addProvider(new Faker\Provider\pt_BR\PhoneNumber($faker));

        for($i=1;$i<=2500;$i++){
        	$genId = rand(0,1);
        	
        	$genArray = ['male','female'];
        	$parcelas = rand(1,12);
        	$valor_parcela = rand(199,399);
        	$valor_total = $parcelas*$valor_parcela;

        	$cliente = Cliente::create([
        		'nome'=>$faker->name($genArray[$genId]),
        		'cpf'=>$faker->cpf(false),
        		'email'=>$faker->email,
                'fone'=>$faker->phoneNumber,
        		'parcelas'=> $parcelas,
        		'valor_parcela'=>$valor_parcela,
        		'valor_total'=>$valor_total,
        		'checkbox'=>0
        	]);

        	$InformacaoCliente = InformacaoCliente::create([
        		'nome_mae'=>$faker->name('female'),
        		'data_nascimento'=>$faker->dateTimeInInterval(
        			$startDate = '-30 years', 
        			$interval = '+ 5 days', 
        			$timezone = date_default_timezone_get()
        		), 
        		'logradouro'=>$faker->streetName,
				'cep'=>$faker->postcode,
				'bairro'=>$faker->name,
				'numero'=>rand(1,5000),
				'complemento'=>$faker->text(99),
				'clientes_id'=>$i
        	]);
        }
    }
}

