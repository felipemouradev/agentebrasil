<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Cliente;

class ClienteController extends Controller
{
    //
    public function index(){
    	return view('spa.index');
    }

    public function listaClientes(){

        $query = new Cliente();
        $return = $query->clienteBuilder();
        return response()->json($return,200);
    }

    public function deleteCliente($cliente_id){
        $delete = (new Cliente())->deleteCliente($cliente_id);
        return $delete == true ?
            response()->json(['message'=>'Deletado com sucesso'],200) :
            response()->json(['message'=>'Houve um problema ao deletar'],400);
    }

    public function maisInformacoesCliente($cliente_id){

        $moreInfo = (new Cliente())->informacoesCliente($cliente_id);
        return response()->json($moreInfo,200);
    }
}
