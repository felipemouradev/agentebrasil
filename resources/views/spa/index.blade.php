<!DOCTYPE html>
<html>
<head>
	<title>Cadastro de Clientes - SPA</title>
	<link rel="stylesheet" type="text/css" href="http://agentebrasil.com/meuboleto/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="http://agentebrasil.com/meuboleto/bootstrap-theme.min.css">
	<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.12/css/jquery.dataTables.min.css">
</head>
<body>
	<div class="container-fluid">
		<div class="col-md-12">
			<h1>Cadastro de Clientes</h1>
			<div class="jumbotron">
				<button type="button" class="btn btn-primary save">Novo Cliente</button>
				{{--<button class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Novo Cliente</button>--}}
			</div>
			<table id="spaTable" class="table table-hover">
				<thead>
					<tr>
						<th>ID</th>
						<th>Nome</td>
						<th>CPF</th>
						<th>Parcelas</th>
						<th>Valor Parcela</th>
						<th>Valor Total</th>
						<th>Acoes</th>
					</tr>
				</thead>
			</table>
		</div>
	</div>
	<div class="modals"></div>

	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
	<script src="http://momentjs.com/downloads/moment-with-locales.js"></script>
	<script type="text/javascript" src="https://cdn.datatables.net/1.10.12/js/jquery.dataTables.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	<script src="{{ asset('/js/mascara_telefone.js') }}"></script>
	<script type="text/javascript" src="{{ asset("/js/app_agente_brasil.js")}}"></script>
</body>
</html>