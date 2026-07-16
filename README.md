# Academia API

Aplicação Spring Boot para gerenciamento de alunos, aulas, instrutores e matrículas.

## Configuração local

Defina as variáveis antes de subir a aplicação:

```bash
export DB_USER=sua_usuario
export DB_PASSWORD=sua_senha
```

**Valores padrão (fallback):** Se as variáveis não forem definidas, a app tenta conectar com `root` e senha vazia.

O banco esperado é MySQL em `localhost:3306/academiaapi`.

### Primeiro acesso (se não tem usuário MySQL)

Crie um usuário local:
```bash
sudo mysql -u root -p <<SQL
CREATE DATABASE IF NOT EXISTS academiaapi;
CREATE USER 'academia'@'localhost' IDENTIFIED BY '12341234';
GRANT ALL PRIVILEGES ON academiaapi.* TO 'academia'@'localhost';
FLUSH PRIVILEGES;
SQL
```

Depois configure:
```bash
export DB_USER=academia
export DB_PASSWORD=12341234
```

## Observações

- Não mantenha credenciais fixas no repositório.
- Se algum token ou senha foi exposto, revogue-o e gere outro.
