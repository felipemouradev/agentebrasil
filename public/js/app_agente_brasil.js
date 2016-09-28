/**
 * Created by felipemoura on 26/09/16.
 */
$(document).ready(function() {

    var camposDisponiveis = [
        {"name":"nome","type":"text","display":"Nome"},
        {"name":"cpf","type":"text","display":"CPF"},
        {"name":"parcelas","type": "number","display":"Numero de Parcelas"},
        {"name":"valor_parcela","type": "number","display":"Valor da Parcela"},
        {"name":"fone", "type": "phone","display":"Telefone"},
        {"name":"email", "type": "email","display":"Email"},
        {"name":"nome_mae","type": "text", "display":"Nome da Mãe"},
        {"name":"cep", "type": "text", "display":"CEP"},
        {"name":"estado", "type": "text", "display":"Estado"},
        {"name":"cidade", "type": "text", "display":"Cidade"},
        {"name":"logradouro", "type": "text", "display":"Logradouro"},
        {"name":"bairro", "type":"text", "display":"Bairro"},
        {"name":"numero", "type": "number","display":"Numero"},
        {"name":"complemento", "type":"text","display":"Complemento"},
        {"name":"data_nascimento", "type":"date","display":"Data de Nascimento"}
    ];

    $(".save").click(function(e){
        montaModalSalvarCliente();
    });

    $('#spaTable').on("click",".show",function(e){
        data = $(this).data('info_data');
        obtemMaisInformacoesCliente(data);
    });

    $('#spaTable').on("click",".update",function(e){
        data = $(this).data('info_data');
        getAjx = $.get('/api/maisInformacoesClientePopulaModalUpdate/'+data.id)
            .done(function(moreInfo){
                montaModalAtualizaCliente(moreInfo[0]);
            })
            .fail(function(resp){
                alert("Houve um problema ao obter mais informações ");
            });

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
    };

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
                        "<p><b>Email:</b> "+usuario.email+"</p>"+
                        "<p><b>Data de Nascimento:</b> "+moment(infoUsuario[0].data_nascimento).format('DD/MM/YYYY')+"</p>"+
                        "<p><b>Nome da Mãe</b>: "+infoUsuario[0].nome_mae+"</p>"+
                        "<p><b>Logradouro:</b> "+infoUsuario[0].logradouro+"</p>"+
                        "<p><b>Cep:</b> "+infoUsuario[0].cep+"</p>"+
                        "<p><b>Estado:</b> "+infoUsuario[0].estado+"</p>"+
                        "<p><b>Cidade:</b> "+infoUsuario[0].cidade+"</p>"+
                        "<p><b>Bairro:</b> "+infoUsuario[0].bairro+"</p>"+
                        "<p><b>Numero:</b> "+infoUsuario[0].numero+"</p>"+
                        "<p><b>Complemento:</b> "+infoUsuario[0].complemento+"</p>"+
                    '</div>';
                html += '<div class="modal-footer">';
                    html += '<button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>';
                html += '</div>';
            html += '</div>';
            html += '</div>';
            html += '</div>';

        $('.modals').html(html);
        $('#modalCliente').modal('toggle');
    };

    $(document).on('click','.saveCliente',function(){
        data = retornaValoresModal();
        $.post('/api/salvaNovoCliente',data)
            .done(function(response){
                $("#modalCliente .close").click();
                spaTable.ajax.reload( null, false );
                alert(response.message);
            }).fail(function () {
                alert('Erro ao salvar');
            });
    });

    var retornaValoresModal = function() {
        data = {};
        camposDisponiveis.forEach(function(item,index){
            data[item.name] = eval("$('input[name="+item.name+"]').val()");
        });
        return data;
    };

    var montaModalSalvarCliente = function(){
        values = {};

        html = "";
        html += '<div class="modal fade" id="modalCliente" tabindex="-1" role="dialog" aria-labelledby="modalClienteLabel">';
        html += '<div class="modal-dialog" role="document">';
        html += '<div class="modal-content">';
        html += '<div class="modal-header">';
        html += '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
        html+= '<h4 class="modal-title" id="modalClienteLabel">Salvar Novo  Usuario</h4>';
        html += '</div>';
        html += '<div class="modal-body">'+
                    '<form class="save">' +
                    montaHTMLCamposDisponiveisSave()
                    '</form>'+
                '</div>';
        html += '<div class="modal-footer">';
        html += '<button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>';
        html += '<button type="button" class="btn btn-primary btnAction saveCliente">Salvar</button>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '</div>';

        $('.modals').html(html);
        $('#modalCliente').modal('toggle');
        validarCampos();
    };

    var montaHTMLCamposDisponiveisSave = function(values){
        console.log(camposDisponiveis);
        html = '';
        camposDisponiveis.forEach(function (item,index) {
            html += '<div class="form-group '+item.name+'">';
            html += '<label for="'+item.name+'">'+item.display+'</label>';
            if(item.name =="fone"){
                html += '<input type="'+item.type+'" name="'+item.name+'" class="form-control" maxlength="15">';
            }
            else {
                html += '<input type="'+item.type+'" name="'+item.name+'" class="form-control">';
            }

            html += "</div>";
        });
        return html;
    };

    $(document).on('click','.updateCliente',function(){
        data = retornaValoresModal();
        cliente_id = $('.btnAction.updateCliente').data('cliente_id');
        $.post('/api/atualizaCliente/'+cliente_id,data)
            .done(function(response){
                $("#modalCliente .close").click();
                spaTable.ajax.reload( null, false );
                alert(response.message);
            }).fail(function () {
            alert('Erro ao salvar');
        });
    });

    var montaModalAtualizaCliente = function(values){
        console.log(values);
        html = "";
        html += '<div class="modal fade" id="modalCliente" tabindex="-1" role="dialog" aria-labelledby="modalClienteLabel">';
        html += '<div class="modal-dialog" role="document">';
        html += '<div class="modal-content">';
        html += '<div class="modal-header">';
        html += '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
        html+= '<h4 class="modal-title" id="modalClienteLabel">Atualizado Usuario</h4>';
        html += '</div>';
        html += '<div class="modal-body">'+
            '<form class="save">' +
            montaHTMLCamposDisponiveisUpdate(values)
        '</form>'+
        '</div>';
        html += '<div class="modal-footer">';
        html += '<button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>';
        html += '<button type="button" class="btn btn-success btnAction updateCliente" data-cliente_id ="'+values.clientes_id+'">Atualizar</button>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '</div>';

        $('.modals').html(html);
        $('#modalCliente').modal('toggle');
        validarCampos();
    };

    var montaHTMLCamposDisponiveisUpdate = function(values){
        html = '';
        camposDisponiveis.forEach(function (item,index) {
            html += '<div class="form-group '+item.name+'">';
            html += '<label for="'+item.name+'">'+item.display+'</label>';
            if(item.name =="fone"){
                html += '<input type="'+item.type+'" name="'+item.name+'" class="form-control" maxlength="15" value="'+values[item.name]+'">';
            }
            else {
                html += '<input type="'+item.type+'" name="'+item.name+'" class="form-control" value="'+values[item.name]+'">';
            }

            html += "</div>";
        });
        return html;
    };

    var validarCampos = function(){

        var addOrRemoveClassError = function(result,name){
            var className = eval('$(".form-group.'+name+'")');
            if(result==true){
                className.addClass('has-error');
            } else {
                className.removeClass('has-error');
            }
        };

        var validaTodosCampos = function(){
            numCamposNaoPreenchidos = 0;
            camposDisponiveis.forEach(function(item,index){

                value = eval("$('input[name="+item.name+"]').val()");
                var className = eval('$(".form-group.'+item.name+'")');
                if(value==="" || className.hasClass('has-error')){
                    numCamposNaoPreenchidos+=1;
                }
            });

            if(numCamposNaoPreenchidos>0){
                $('.btnAction').attr('disabled',true);
            } else {
                $('.btnAction').attr('disabled',false);
            }

        };

        var validaSomenteNumeros = function(value,name){
            test = false;
            if(!$.isNumeric(value)){
                test = true;
            }
            addOrRemoveClassError(test,name);
        };

        var validaCEP = function (value,name) {
            test = false;
            if(!$.isNumeric(value) || value.length <=7 || value.length >= 9){
                test = true;
            }
            addOrRemoveClassError(test,name);
        };

        var validaCPF = function(value,name){
            test = false;
            if(!$.isNumeric(value) || value.length <=10 || value.length >= 12){
                test = true;
            }
            addOrRemoveClassError(test,name);
        };

        $(document).on('keyup','input',function(){
            fieldname = $(this).attr('name');
            value = $(this).val();

            if(fieldname=="valor_parcela" || fieldname=="parcela"){
                validaSomenteNumeros(value,fieldname);
            } else if(fieldname=="cpf"){
                validaCPF(value,fieldname);
            } else if(fieldname=="fone"){
                mascara( $(this), mtel );
            } else if(fieldname=="cep"){
                validaCEP(value,fieldname);
            }

            validaTodosCampos();
        });

        validaTodosCampos();
    };
    validarCampos();
} );
