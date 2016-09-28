<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use App\InformacaoCliente;

class Cliente extends Model
{
    protected $guarded = ['id'];
    //retorna a listagem de clientes
    public function clienteBuilder(){
        return $this
            ->select('clientes.id','nome','cpf','parcelas','valor_parcela','valor_total','checkbox','fone','email')
            ->orderBy('id','desc')
            ->get();
    }

    //delta o cliente e suas informações (numa transação)
    public function deleteCliente($cliente_id){
        try{
            DB::beginTransaction();
            $getInformacaoCliente = InformacaoCliente::where('clientes_id',$cliente_id)->firstOrFail();
            $getInformacaoCliente->delete();
            $getCliente = $this->find($cliente_id);
            $getCliente->delete();
            DB::commit();
            return true;
        } catch (\Exception $e){
            DB::rollback();
            throw $e;
        }
    }
    //retorna os dados do usuario
    public function informacoesCliente($cliente_id){
        return $this::join('informacao_clientes','informacao_clientes.clientes_id','clientes.id')
            ->selectRaw('informacao_clientes.*')
            ->where('clientes.id',$cliente_id)
            ->get();
    }

    public function informacoesClienteTotal($cliente_id){
        return $this::join('informacao_clientes','informacao_clientes.clientes_id','clientes.id')
            ->selectRaw('clientes.*,informacao_clientes.*')
            ->where('clientes.id',$cliente_id)
            ->get();
    }
    //salva o cliente e suas informações (numa transação)
    public function salvaCliente($data){

        try {
            $objCliente = $data;
            unset($objCliente['nome_mae']);
            unset($objCliente['cep']);
            unset($objCliente['logradouro']);
            unset($objCliente['bairro']);
            unset($objCliente['estado']);
            unset($objCliente['cidade']);
            unset($objCliente['complemento']);
            unset($objCliente['numero']);
            unset($objCliente['data_nascimento']);

            $objInformacaoCliente =  $data;
            unset($objInformacaoCliente['nome']);
            unset($objInformacaoCliente['cpf']);
            unset($objInformacaoCliente['parcelas']);
            unset($objInformacaoCliente['valor_parcela']);
            unset($objInformacaoCliente['email']);
            unset($objInformacaoCliente['fone']);



            $objCliente['valor_total'] = $objCliente['parcelas'] * $objCliente['valor_parcela'];

            $newClient = $this->create($objCliente);
            $objInformacaoCliente['clientes_id'] = $newClient->id;
            $newInformacaoCliente = InformacaoCliente::create($objInformacaoCliente);
            DB::commit();
            return true;

        } catch (\Exception $e){
            DB::rollback();
            throw $e;
        }

    }

    public function atualizaCliente($data,$cliente_id){

        try {
            $objCliente = $data;
            unset($objCliente['nome_mae']);
            unset($objCliente['cep']);
            unset($objCliente['logradouro']);
            unset($objCliente['bairro']);
            unset($objCliente['estado']);
            unset($objCliente['cidade']);
            unset($objCliente['complemento']);
            unset($objCliente['numero']);
            unset($objCliente['data_nascimento']);

            $objInformacaoCliente =  $data;
            unset($objInformacaoCliente['nome']);
            unset($objInformacaoCliente['cpf']);
            unset($objInformacaoCliente['parcelas']);
            unset($objInformacaoCliente['valor_parcela']);
            unset($objInformacaoCliente['email']);
            unset($objInformacaoCliente['fone']);



            $objCliente['valor_total'] = $objCliente['parcelas'] * $objCliente['valor_parcela'];

            $updateClient = $this->find($cliente_id);
            $updateClient->update($objCliente);

            $updateInformacaoCliente = InformacaoCliente::where('clientes_id',$cliente_id);
            $updateInformacaoCliente->update($objInformacaoCliente);
            DB::commit();
            return true;

        } catch (\Exception $e){
            DB::rollback();
            throw $e;
        }
    }
}
