# Dextra Challenge

Desafio dextra: repositório com o ambiente Backend e Frontend

## Tecnologias utilizadas
- Java 8
- Spring Boot
- Maven
- React.JS
- Material-UI
- JUnit

## Relatório de justificativas para escolha do design de código

#### Design Pattern Arquitetural - Service Layer
Foi criado a camada Service permitindo separar da camada controller, desse modo não é necessário saber como ele implementa regras e acesso a dados

#### Dependency Injection
Foi utilizado o padrão de desenvolvimento de injeção de dependência nas camadas services para manter o baixo nível de acomplamento no módulo de produto do sistema.

#### Singleton
Foi criado um count de ids no momento da inicialização do sistema. Desse modo é possível criar objetos únicos para os quais há apenas uma instância. 

## Como executar?

- Realize o clone do projeto com o comando: **git clone https://github.com/LucasGustavo088/DextraChallenge**
- Use o terminal para navegar dentro dela com o comando: **cd DextraChallenge**

#### Frontend
- Navegue com o terminal para a pasta frontend_challenge com o comando: **cd frontend_challenge**
- Tenha o node.js instalado na sua máquina e então rode o comando **npm install**
- Para startar a aplicação react rode o comando: **npm start**

#### Backend
- Com o eclipse aberto, selecione a opção arquivo(file) -> importar(import) -> Maven/Existing Maven Projects -> selecione a pasta onde está o backend (backend_challenge) -> finalizar
- Clique com o botão direito no projeto -> maven -> update project -> ok
- Vá na pasta src/main/java -> com.dextrachallenge.dextrachallenge -> DextrachallengeApplication -> botão direito -> run as java application

#### Test JUnit
- Para testar o backend vá no eclipse -> dextrachallenge -> src/test/java -> com.dextrachallenge.dextrachallenge -> Clique com o botão direito no arquivo TesteProduto.java -> run as JUnit Test
- Na aba JUnit é possível ver se todos os itens de teste na classe foram realizados com sucesso.

Pronto! 

*Obs:*
- Ao acessar a aplicação web. Clique para adicionar o produto, em seguida, selecione um dos lanches e clique em "+". Selecione a quantidade de ingredientes em cada item e clique em adicionar produto no carrinho.
- No canto esquerdo tem o preço total do seu carrinho
- É possível remover os itens do carrinho na listagem principal

#### Métodos do Backend
- GET - http://localhost:8080/produto/cardapio
- GET - http://localhost:8080/produto/cardapio/{id}
- POST - http://localhost:8080/produto/obter_produto (basta passar os ingredientes necessários)
- GET - http://localhost:8080/produto/ingredientes 

## Descrição

Somos uma startup do ramo de alimentos e precisamos de uma aplicação web para gerir nosso negócio. Nossa especialidade é a venda de lanches, de modo que alguns lanches são opções de cardápio e outros podem conter ingredientes personalizados.

A seguir, apresentamos a lista de ingredientes disponíveis:


INGREDIENTE           |   VALOR
:---------            | --------:
Alface                | R$ 0.40
Bacon                 | R$ 2,00
Hambúrguer de carne   | R$ 3,00
Ovo                   | R$ 0,80
Queijo                | R$ 1,50

Segue as opções de cardápio e seus respectivos ingredientes:


LANCHE        |   INGREDIENTES
:---------    | :--------------------------------------:
X-Bacon       | Bacon, hambúrguer de carne e queijo
X-Burger      | Hambúrguer de carne e queijo
X-Egg         | Ovo, hambúrguer de carne e queijo
X-Egg Bacon   | Ovo, bacon, hambúrguer de carne e queijo

O valor de cada opção do cardápio é dado pela soma dos ingredientes que compõe o lanche. Além destas opções, o cliente pode personalizar seu lanche e escolher os ingredientes que desejar. Nesse caso, o preço do lanche também será calculado pela soma dos ingredientes.

Existe uma exceção à regra para o cálculo de preço, quando o lanche pertencer à uma promoção. A seguir, apresentamos a lista de promoções e suas respectivas regras de negócio:

PROMOÇÃO        |  REGRA DE NEGÓCIO
:---------      | :--------------------------------------:
Light           | Se o lanche tem alface e não tem bacon, ganha 10% de desconto.
Muita carne     | A cada 3 porções de carne o cliente só paga 2. Se o lanche tiver 6 porções, ocliente pagará 4. Assim por diante...
Muito queijo    | A cada 3 porções de queijo o cliente só paga 2. Se o lanche tiver 6 porções, ocliente pagará 4. Assim por diante...
Inflação        | Os valores dos ingredientes são alterados com frequência e não gastaríamos que isso influenciasse nos testes automatizados.

## CRITÉRIOS DE COMPLETUDE

### O projeto deve ser entregue atendendo aos seguintes critérios:

- O server-side deve ser desenvolvido em Java.
- O client-side pode ser desenvolvido em React.
- Deve possuir cobertura de testes automatizados para os seguintes pontos: Valor dos lanches de cardápio, regra para cálculo de preço e promoções.
- Não é necessário se preocupar com a autenticação dos usuários.
- Não é necessário persistir os dados em um banco, pode fazer armazenamento em memória.

## Entregáveis 
- [X] Implementação dos requisitos;
- [X] Relatório simples de justificativas para escolha do design de código;
- [X] Instruções para executar;




