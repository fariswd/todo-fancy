# todo-fancy
ToDo API

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
| Route           | HTTP   | Require Data            | Description          |
|-----------------|--------|-------------------------|----------------------|
| /api/signup/    | POST   | email, password         | signup               |
| /api/signin/    | POST   | email, password         | signin return token  |
| /api/mytodo     | GET    | token(header)           | get only my todo     |
| /api/add        | POST   | token(header), todo     | post new todo        |
| /api/edit/:id   | PUT    | token(header), todo     | edit desc            |
| /api/done/:id   | PUT    | token(header), id       | checklist todo       |
| /api/undone/:id | PUT    | token(header), id       | uncheck todo         |
| /api/del/:id    | DELETE | token(header), id       | delete todo          |
| /api/signfb/    | POST   | fb_token(header)        | login with fb        |
