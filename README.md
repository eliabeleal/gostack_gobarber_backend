# Casdastro de usuário

**RF**

-

**RN**

- O cadastro deve ser realizado pelo adminstrador do sistema;
- Uma senha temporária deve ser enviada para o novo usuário;
- No primeiro acesso o usuário deve mudar a senha;
- A senha deve ter um tempo para expirar, definida pelo adminstrador;

# Coordenadas em tempo real

**RN**

1. As localizações serão filtradas por agências, por região, por área e por quadrante:

* PM - 0 | 2:
  * CASA MILITAR (CMG)
* BM - 1
* PC - 3
* DETRAN - 4
* SEAP - 5
* PRF - 6
* PREFEITURAS - 7
  * GCM -
    * JP
    * CABEDELO
    * CONDE
  * SAMU:
    * JP -
    * CG -
    * CAJAZEIRAS -
  * SEMOB:
    * JP
    * CABEDELO
* OUTROS - 8:
* SESDS - 9:
  * MPE
  * CIIDS
  * FUNDAC
  * GTI
  * GTA
  * ZELADORIA

**RNF**

- As localizações serão recebidas do geodevice events por Websocket;
- As localizações serão repassadas para o front com Socket.io;

**RF**

# Cadastro de funções

**RN**

- O administrador pode criar funções com determinadas permissões;
- As permissões são para os recursos do sistema;




# Recuperação de senha

**RF**

- O usuário deve poder recuperar sua senha informando seu e-mail;
- O usuário deve receber um e-mail com instruções de recuperação de senha;
- O usuário deve poder resetar sua senha;

**RNF**

- Utilizar Mailtrap para testar envios em ambiente de dev;
- Utilizar Amazon SES para envios em produção;
- O envio de e-mails deve acontecer em segundo plano (background job);

**RN**

- O link enviado por email para resetar senha, deve expirar em 2h;
- O usuário precisa confirmar a nova senha ao resetar sua senha;

# Atualização do perfil

**RF**

- O usuário deve poder atualizar seu nome, email e senha;

**RN**

- O usuário não pode alterar seu email para um email já utilizado;
- Para atualizar sua senha, o usuário deve informar a senha antiga;
- Para atualizar sua senha, o usuário precisa confirmar a nova senha;

# Painel do prestador

**RF**

- O usuário deve poder listar seus agendamentos de um dia específico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas;

**RNF**

- Os agendamentos do prestador no dia devem ser armazenados em cache;
- As notificações do prestador devem ser armazenadas no MongoDB;
- As notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io;

**RN**

- A notificação deve ter um status de lida ou não-lida para que o prestador possa controlar;

# Agendamento de serviços

**RF**

- O usuário deve poder listar todos prestadores de serviço cadastrados;
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador;
- O usuário deve poder listar horários disponíveis em um dia específico de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador;

**RNF**

- A listagem de prestadores deve ser armazenada em cache;

**RN**

- Cada agendamento deve durar 1h exatamente;
- Os agendamentos devem estar disponíveis entre 8h às 18h (Primeiro às 8h, último às 17h);
- O usuário não pode agendar em um horário já ocupado;
- O usuário não pode agendar em um horário que já passou;
- O usuário não pode agendar serviços consigo mesmo;
