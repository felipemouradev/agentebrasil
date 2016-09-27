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
				<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modalCliente">Novo Cliente</button>
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
	{{--MODAL--}}
	{{--<div class="modal fade" id="modalCliente" tabindex="-1" role="dialog" aria-labelledby="modalClienteLabel">--}}
		{{--<div class="modal-dialog" role="document">--}}
			{{--<div class="modal-content">--}}
				{{--<div class="modal-header">--}}
					{{--<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>--}}
					{{--<h4 class="modal-title" id="modalClienteLabel"></h4>--}}
				{{--</div>--}}
				{{--<div class="modal-body"></div>--}}
				{{--<div class="modal-footer">--}}
					{{--<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>--}}
					{{--<button type="button" class="btn btn-primary btnAction"></button>--}}
				{{--</div>--}}
			{{--</div>--}}
		{{--</div>--}}
	{{--</div>--}}
	{{--MODAL--}}

	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
	<script type="text/javascript" src="https://cdn.datatables.net/1.10.12/js/jquery.dataTables.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="{{ asset("/js/app_agente_brasil.js")}}"></script>
</body>
</html>