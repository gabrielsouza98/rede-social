"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var readline_sync_1 = require("readline-sync");
var perfil = /** @class */ (function () {
    function perfil(id, nome, email) {
        this.postagens = [];
        this.id = id;
        this.nome = nome;
        this.email = email;
    }
    perfil.prototype.get_id = function () {
        return this.id;
    };
    perfil.prototype.get_nome = function () {
        return this.nome;
    };
    perfil.prototype.get_email = function () {
        return this.email;
    };
    perfil.prototype.adicionar_postagem = function (postagem) {
        this.postagens.push(postagem);
    };
    return perfil;
}());
var postagem = /** @class */ (function () {
    function postagem(id, texto, curtidas, descurtidas, data, perfil) {
        this.id = id;
        this.texto = texto;
        this.curtidas = curtidas;
        this.descurtidas = descurtidas;
        this.data = data;
        this.perfil = perfil;
    }
    postagem.prototype.get_id = function () {
        return this.id;
    };
    postagem.prototype.get_texto = function () {
        return this.texto;
    };
    postagem.prototype.get_curtidas = function () {
        return this.curtidas;
    };
    postagem.prototype.get_descurtidas = function () {
        return this.descurtidas;
    };
    postagem.prototype.get_data = function () {
        return this.data;
    };
    postagem.prototype.get_perfil = function () {
        return this.perfil;
    };
    postagem.prototype.curtir = function () {
        this.curtidas++;
    };
    postagem.prototype.descutir = function () {
        this.descurtidas++;
    };
    postagem.prototype.eh_popular = function () {
        if (this.curtidas > this.descurtidas * 1.5) {
            return true;
        }
        else {
            return false;
        }
    };
    return postagem;
}());
var postagem_avancada = /** @class */ (function (_super) {
    __extends(postagem_avancada, _super);
    function postagem_avancada(id, texto, curtidas, descurtidas, data, perfil, hashtags, visualizacoes_restantes) {
        var _this = _super.call(this, id, texto, curtidas, descurtidas, data, perfil) || this;
        _this.hashtags = hashtags;
        _this.visualizacoes_restantes = visualizacoes_restantes;
        return _this;
    }
    postagem_avancada.prototype.get_visualizacoes_restantes = function () {
        return this.visualizacoes_restantes;
    };
    postagem_avancada.prototype.adicionar_hashtag = function (hashtag) {
        this.hashtags.push(hashtag);
    };
    postagem_avancada.prototype.existe_hashtag = function (hashtag) {
        for (var i = 0; i < this.hashtags.length; i++) {
            if (this.hashtags[i] === hashtag) {
                return true;
            }
        }
        return false;
    };
    postagem_avancada.prototype.decrementar_visualizacoes = function () {
        this.visualizacoes_restantes--;
    };
    return postagem_avancada;
}(postagem));
var repositorio_de_perfis = /** @class */ (function () {
    function repositorio_de_perfis() {
        this._perfis = [];
    }
    repositorio_de_perfis.prototype.incluir = function (perfil) {
        this._perfis.push(perfil);
    };
    repositorio_de_perfis.prototype.consultar = function (id, nome, email) {
        for (var _i = 0, _a = this._perfis; _i < _a.length; _i++) {
            var perfil_1 = _a[_i];
            if ((id !== undefined && perfil_1.get_id() === id) || (nome && perfil_1.get_nome() === nome) || (email && perfil_1.get_email() === email)) {
                return perfil_1;
            }
        }
        return null;
    };
    repositorio_de_perfis.prototype.get_perfis = function () {
        return this._perfis;
    };
    return repositorio_de_perfis;
}());
var repositorio_de_postagens = /** @class */ (function () {
    function repositorio_de_postagens() {
        this.postagens = [];
    }
    repositorio_de_postagens.prototype.incluir = function (postagem_nova) {
        this.postagens.push(postagem_nova);
        var perfil = postagem_nova.get_perfil();
        perfil.adicionar_postagem(postagem_nova);
    };
    repositorio_de_postagens.prototype.consultar = function (id, texto, hashtag, perfil) {
        var postagensEncontradas = [];
        if (hashtag && perfil) {
            for (var _i = 0, _a = this.postagens; _i < _a.length; _i++) {
                var postagem_1 = _a[_i];
                if (postagem_1 instanceof postagem_avancada && postagem_1.get_perfil() === perfil && postagem_1.existe_hashtag(hashtag)) {
                    postagensEncontradas.push(postagem_1);
                }
            }
            return postagensEncontradas;
        }
        for (var _b = 0, _c = this.postagens; _b < _c.length; _b++) {
            var postagem_2 = _c[_b];
            if ((!id || postagem_2.get_id() === id) &&
                (!texto || postagem_2.get_texto() === texto) &&
                (!perfil || postagem_2.get_perfil() === perfil)) {
                postagensEncontradas.push(postagem_2);
            }
        }
        return postagensEncontradas;
    };
    repositorio_de_postagens.prototype.get_postagens = function () {
        return this.postagens;
    };
    return repositorio_de_postagens;
}());
var RedeSocial = /** @class */ (function () {
    function RedeSocial() {
        this.armazenamento_postagens = new repositorio_de_postagens();
        this.armazenamento_perfis = new repositorio_de_perfis();
    }
    RedeSocial.prototype.perfil_nao_existe = function (perfil) {
        var perfis = this.armazenamento_perfis.get_perfis();
        for (var _i = 0, perfis_1 = perfis; _i < perfis_1.length; _i++) {
            var perf = perfis_1[_i];
            if (perf.get_id() === perfil.get_id() || perf.get_nome() === perfil.get_nome() || perf.get_email() === perfil.get_email()) {
                return false;
            }
        }
        return true;
    };
    RedeSocial.prototype.postagemNaoExiste = function (postagem) {
        var postagens = this.armazenamento_postagens.get_postagens();
        for (var _i = 0, postagens_1 = postagens; _i < postagens_1.length; _i++) {
            var post = postagens_1[_i];
            if (post.get_id() === postagem.get_id()) {
                return false;
            }
        }
        return true;
    };
    RedeSocial.prototype.preenchimento_valido = function (perfil) {
        if (perfil.get_id() && perfil.get_nome().trim() !== '' && perfil.get_email().trim() !== '') {
            return true;
        }
        else {
            return false;
        }
    };
    RedeSocial.prototype.incluir_perfil = function (perfil) {
        if (this.perfil_nao_existe(perfil) && this.preenchimento_valido(perfil)) {
            this.armazenamento_perfis.incluir(perfil);
            console.log('Cadastro feito com sucesso');
        }
        else {
            console.log('ERROR 404 ');
        }
    };
    RedeSocial.prototype.consultar_perfil = function (id, nome, email) {
        return this.armazenamento_perfis.consultar(id, nome, email);
    };
    RedeSocial.prototype.incluirPostagem = function (postagem) {
        if (postagem.get_id() !== undefined && postagem.get_texto().trim() !== '' && postagem.get_perfil()) {
            if (this.postagemNaoExiste(postagem)) {
                this.armazenamento_postagens.incluir(postagem);
                console.log('Postagem incluída com sucesso.');
            }
            else {
                console.log('Erro: Já existe uma postagem com o mesmo ID.');
            }
        }
        else {
            console.log('Erro: Não foi possível incluir a postagem, atributos incompletos.');
        }
    };
    RedeSocial.prototype.consultar_postagens = function (id, texto, hashtag, perfil) {
        return this.armazenamento_postagens.consultar(id, texto, hashtag, perfil);
    };
    RedeSocial.prototype.curtir_postagem = function (id_postagem) {
        var postagens = this.armazenamento_postagens.get_postagens();
        for (var _i = 0, postagens_2 = postagens; _i < postagens_2.length; _i++) {
            var post = postagens_2[_i];
            if (id_postagem === post.get_id()) {
                post.curtir();
            }
        }
    };
    RedeSocial.prototype.descurtir_postagem = function (id_postagem) {
        var postagens = this.armazenamento_postagens.get_postagens();
        for (var _i = 0, postagens_3 = postagens; _i < postagens_3.length; _i++) {
            var post = postagens_3[_i];
            if (id_postagem === post.get_id()) {
                post.descutir();
            }
        }
    };
    RedeSocial.prototype.decrementar_visualizacoes = function (postagem) {
        var restante_de_visualizacoes = postagem.get_visualizacoes_restantes();
        if (restante_de_visualizacoes > 0) {
            postagem.decrementar_visualizacoes();
        }
        else {
            console.log('Erro: Contador de visualizações já é zero.');
        }
    };
    RedeSocial.prototype.exibirPostagensPorPerfil = function (id) {
        var _this = this;
        var perfilConsultado = this.armazenamento_perfis.consultar(id);
        if (perfilConsultado) {
            var postagensDoPerfil = this.armazenamento_postagens.consultar(undefined, undefined, undefined, perfilConsultado);
            postagensDoPerfil.forEach(function (postagem) {
                if (postagem instanceof postagem_avancada) {
                    _this.decrementar_visualizacoes(postagem);
                }
            });
            var postagensExibiveis = postagensDoPerfil.filter(function (postagem) {
                if (postagem instanceof postagem_avancada) {
                    return postagem.get_visualizacoes_restantes() > 0;
                }
                return true;
            });
            return postagensExibiveis;
        }
        else {
            console.log('Perfil não encontrado.');
            return [];
        }
    };
    RedeSocial.prototype.exibirPostagensPorHashtag = function (hashtag) {
        var _this = this;
        var postagensPorHashtag = this.armazenamento_postagens.consultar(undefined, undefined, hashtag, undefined)
            .filter(function (postagem) { return postagem instanceof postagem_avancada; });
        postagensPorHashtag.forEach(function (postagem) {
            if (postagem instanceof postagem_avancada) {
                _this.decrementar_visualizacoes(postagem);
            }
        });
        var postagensExibiveis = postagensPorHashtag.filter(function (postagem) {
            if (postagem instanceof postagem_avancada) {
                return postagem.get_visualizacoes_restantes() > 0;
            }
            return false;
        });
        return postagensExibiveis;
    };
    return RedeSocial;
}());
var app = /** @class */ (function () {
    function app() {
        this.rede_social = new RedeSocial();
    }
    app.prototype.criar_perfil = function () {
        var id = parseInt((0, readline_sync_1.question)("Digite o ID do perfil: "));
        var nome = (0, readline_sync_1.question)("Digite o nome do perfil: ");
        var email = (0, readline_sync_1.question)("Digite o e-mail do perfil: ");
        var perfil_novo = new perfil(id, nome, email);
        return perfil_novo;
    };
    app.prototype.criar_postagem = function () {
        var id_postagem = parseInt((0, readline_sync_1.question)('Digite o id da postage.: '));
        var texto = (0, readline_sync_1.question)("Digite o texto da postagem: ");
        var curtidas = parseInt((0, readline_sync_1.question)('Digite a quantidade de curtidas: '));
        var descurtidas = parseInt((0, readline_sync_1.question)("Digite a quantidade de descurtidas: "));
        var data = (0, readline_sync_1.question)("Digite a data do post: ");
        var perfil = this.criar_perfil();
        var postagem_nova = new postagem(id_postagem, texto, curtidas, descurtidas, data, perfil);
        return postagem_nova;
    };
    app.prototype.exibirMenu = function () {
        var opcao = -1;
        while (opcao !== 0) {
            console.log("\n=== Menu da Rede Social ===");
            console.log("1. Incluir perfil");
            console.log("2. Consultar Perfil");
            console.log("3. Incluir postagem");
            console.log("4. Consultar Postagens");
            console.log("5. Curtir Postagem");
            console.log("6. Descurtir Postagem");
            console.log("0. Sair");
            opcao = parseInt((0, readline_sync_1.question)("Escolha uma opcao: "));
            switch (opcao) {
                case 1:
                    this.rede_social.incluir_perfil(this.criar_perfil());
                    break;
                case 2:
                    break;
                case 3:
                    this.rede_social.incluirPostagem(this.criar_postagem());
                    break;
                case 4:
                    //this.consultarPostagens()
                    break;
                case 5:
                    var id_postagem = parseInt((0, readline_sync_1.question)("Digite o id da postagem a ser curtida: "));
                    this.rede_social.curtir_postagem(id_postagem);
                    break;
                case 6:
                    var id_postagem1 = parseInt((0, readline_sync_1.question)("Digite o id da postagem a ser curtida: "));
                    this.rede_social.descurtir_postagem(id_postagem1);
                    break;
                case 0:
                    console.log("Saindo da aplicação.");
                    break;
                default:
                    console.log("Opção inválida. Por favor, escolha uma opção válida.");
            }
        }
    };
    return app;
}());
var meuApp = new app();
meuApp.exibirMenu();
var oi = (0, readline_sync_1.question)('oi');
