# todo-fancy
ToDo API
access demo client: http://todo.masfaris.com  
client repo: https://github.com/fariswd/todo-fancy-client

## Usage
1. npm install
2. edit .env-template, fill yours, and rename to .env
3. start mongodb
```sh
$ mongod
```
4. npm start
5. app running on port 3000
6. :rocket:

## API Endpoint
| Route               | HTTP   | Require Data            | Description           |
|---------------------|--------|-------------------------|-----------------------|
| /api/signup/        | POST   | email, password         | signup                |
| /api/signin/        | POST   | email, password         | signin return token   |
| /api/signfb/        | POST   | fb_token(header)        | login with fb         |
| /api/mytodo         | GET    | token(header)           | get only my todo      |
| /api/todo           | POST   | token(header), todo     | post new todo         |
| /api/todo/:id       | PUT    | token(header), todo     | edit desc             |
| /api/todo/:id       | DELETE | token(header), id       | delete todo           |
| /api/done/:id       | PUT    | token(header), id       | checklist todo        |
| /api/undone/:id     | PUT    | token(header), id       | uncheck todo          |
| /api/mytagged       | GET    | token(header)           | get only my tagged    |
| /api/done/tag/:id   | PUT    | token(header), id       | checklist tagged todo |
| /api/undone/tag/:id | PUT    | token(header), id       | uncheck tagged todo   |
| /api/todo/tag/:id   | DELETE | token(header), id       | delete tagged todo    |
| /api/user/          | POST   | [id]                    | return string email   |