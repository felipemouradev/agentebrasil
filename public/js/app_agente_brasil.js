/**
 * Created by felipemoura on 26/09/16.
 */
$(document).ready(function() {

    $('#spaTable').on("click",".show",function(e){
        data = $(this).data('info_data');
        obtemMaisInformacoesCliente(data);
    });

    $('#spaTable').on("click",".update",function(e){
        alert('update');

    });

    $('#spaTable').on("click",".delete",function(e){
        cliente_id = $(this).data("cliente_id");
        console.log(cliente_id);
        var r = confirm("Você tem certeza que deseja deletar este cliente ?");
        if (r == true) {
            deleteCliente(cliente_id);
        }
    });

    var deleteCliente = function(cliente_id){
        delAjx = $.get('/api/deleteCliente/'+cliente_id)
            .done(function(resp){
                spaTable.ajax.reload( null, false );
                alert(resp.message);
            })
            .fail(function(resp){
                alert(resp.message);
            });
    };

    var obtemMaisInformacoesCliente = function(data){
        getAjx = $.get('/api/maisInformacoesCliente/'+data.id)
            .done(function(moreInfo){
                montaModalInformacaoCliente(data,moreInfo);
            })
            .fail(function(resp){
                alert("Houve um problema ao obter mais informações ");
            });
    };

    var geraButtoes = function(item){
        html = "";
        html += '<div class="btn-group btn-group-xs" role="group">';
        html += "<button type='button' class='btn btn-primary show' data-info_data='"+JSON.stringify(item)+"'>Ver</button>";
        html += "<button type='button' class='btn btn-success update' data-info_data='"+JSON.stringify(item)+"'>Atualizar</button>";
        html += "<button type='button' class='btn btn-danger delete' data-cliente_id='"+item.id+"'>Deletar</button>";
        html += '</div>';
        return html;
    }

    var spaTable = $('#spaTable').DataTable( {
        lengthMenu: [ 10, 25, 50, 75, 100 ],
        pageLength: 10,
        processing : true,
        pagingType: "numbers",
        ajax: {
            url: "/api/listaClientes",
            type : "GET",
            dataSrc: function (json) {
                json.forEach(function(item,index){
                    json[index].acoes = geraButtoes(item);
                });
                return json.data = json;
            }
        },
        columns : [
            {
                data : "id"
            },
            {
                data : "nome"
            },
            {
                data : "cpf"
            }, {
                data : "parcelas"
            },
            {
                data : "valor_parcela"
            },
            {
                data : "valor_total"
            },
            {
                data : "acoes"
            }
        ]
    } );

    var montaModalInformacaoCliente = function(usuario,infoUsuario){
        html = "";
            html += '<div class="modal fade" id="modalCliente" tabindex="-1" role="dialog" aria-labelledby="modalClienteLabel">';
                html += '<div class="modal-dialog" role="document">';
                    html += '<div class="modal-content">';
                        html += '<div class="modal-header">';
                        html += '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
                        html+= '<h4 class="modal-title" id="modalClienteLabel">Informações do Usuario</h4>';
                    html += '</div>';
            html += '<div class="modal-body">' +
                        "<p><b>Nome:</b> "+usuario.nome+"</p>"+
                        "<p><b>CPF:</b> "+usuario.cpf+"</p>"+
                        "<p><b>Telefone:</b> "+usuario.fone+"</p>"+
                        "<p><b>Data de Nascimento:</b> "+new Date(infoUsuario[0].data_nascimento).toLocaleDateString()+"</p>"+
                        "<p><b>Nome da Mãe</b>: "+infoUsuario[0].nome_mae+"</p>"+
                        "<p><b>Logradouro:</b> "+infoUsuario[0].logradouro+"</p>"+
                        "<p><b>Cep:</b> "+infoUsuario[0].cep+"</p>"+
                        "<p><b>Bairro:</b> "+infoUsuario[0].bairro+"</p>"+
                        "<p><b>Numero:</b> "+infoUsuario[0].numero+"</p>"+
                        "<p><b>Complemento:</b> "+infoUsuario[0].complemento+"</p>"+
                    '</div>';
                html += '<div class="modal-footer">';
                    html += '<button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>';
                    //html += '<button type="button" class="btn btn-primary btnAction"></button>';
                html += '</div>';
            html += '</div>';
            html += '</div>';
            html += '</div>';

        $('.modals').html(html);
        $('#modalCliente').modal('toggle');
    }

} );
