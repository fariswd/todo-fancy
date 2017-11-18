# todo-fancy
ToDo API

## API Endpoint
| Route           | HTTP   | Require Data | Description          |
|-----------------|--------|--------------|----------------------|
| /api/signup/    | POST   | email,token  | signup with facebook |
| /api/signin/    | POST   | email,token  | signin with facebook |
| /api/mytodo     | GET    | token        | get only my todo     |
| /api/add        | POST   | desc         | post new task        |
| /api/edit/:id   | PUT    | desc         | edit desc            |
| /api/done/:id   | PUT    | id           | checklist todo       |
| /api/undone/:id | PUT    | id           | uncheck todo         |
| /api/del/:id    | DELETE | id           | delete todo          |