# Desafio Node

Para executar os containers deste desafio, basta executar docker-compose up -d --build na raiz do diretorio node

Disponível em: http:localhost:8080

Obs1.: adicionei uma chamada a uma API externa de nomes fakes para incrementar um pouco no desafio e não inserir na base de dados sempre o mesmo nome.

Obs2.: Não sei se é algo com a minha rede, porém, mesmo a após o docker-compose retornar que os containers foram startados, preciso aguardar alguns segundos (em média 5s) para finaliar o download das dependências do node e então ter acesso à aplicação em http:localhost:8080. Coloquei o dockerize no nginx, como tentativa de aguardar a aplicação node startar, mas não funcionou. Acredito que não há como aguardar o node_modules ser baixado. Pesquisei várias coisas na internet, mas não obtive sucesso para melhorar isso. Porém, mesmo com este ponto, o desafio foi implementado conforme pedido.