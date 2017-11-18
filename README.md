# todo-fancy
ToDo API

## API Endpoint
| Route           | HTTP   | Require Data    | Description          |
|-----------------|--------|-----------------|----------------------|
| /api/signup/    | POST   | email, password | signup               |
| /api/signin/    | POST   | email, password | signin return token  |
| /api/mytodo     | GET    | token           | get only my todo     |
| /api/add        | POST   | token, todo     | post new todo        |
| /api/edit/:id   | PUT    | token, todo     | edit desc            |
| /api/done/:id   | PUT    | token, id       | checklist todo       |
| /api/undone/:id | PUT    | token, id       | uncheck todo         |
| /api/del/:id    | DELETE | token, id       | delete todo          |