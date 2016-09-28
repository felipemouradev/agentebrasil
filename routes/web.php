<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of the routes that are handled
| by your application. Just tell Laravel the URIs it should respond
| to using a Closure or controller method. Build something great!
|
*/

// Route::get('/', function () {
//     return view('welcome');
// });


Route::get('/','ClienteController@index');

Route::get('/api/listaClientes/{page?}','ClienteController@listaClientes');
Route::get('/api/deleteCliente/{cliente_id}','ClienteController@deleteCliente');
Route::get('/api/maisInformacoesCliente/{cliente_id}','ClienteController@maisInformacoesCliente');
Route::post('/api/salvaNovoCliente','ClienteController@salvaNovoCliente');
Route::get('/api/maisInformacoesClientePopulaModalUpdate/{cliente_id}','ClienteController@maisInformacoesClientePopulaModalUpdate');
Route::post('/api/atualizaCliente/{cliente_id}','ClienteController@atualizaCliente');

