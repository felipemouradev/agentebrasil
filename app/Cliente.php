<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use App\InformacaoCliente;

class Cliente extends Model
{
    //
    public function clienteBuilder(){
        return $this
            ->select('clientes.id','nome','cpf','parcelas','valor_parcela','valor_total','checkbox','fone')
            ->get();
    }

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

    public function informacoesCliente($cliente_id){
        return $this::join('informacao_clientes','informacao_clientes.clientes_id','clientes.id')
            ->selectRaw('informacao_clientes.*')
            ->where('clientes.id',$cliente_id)
            ->get();
    }
}
