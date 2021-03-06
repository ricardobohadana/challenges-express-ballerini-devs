# Backend API for [this frontend project](https://github.com/ricardobohadana/challenges-react-ballerini-devs)

Backend API developed for the frontend of another github repo.

## Stacks

**Backend:**

<div style="padding: 0.5rem">
    <img align="center" alt="Rafa-Ts" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/2ae2a900d2f041da66e950e4d48052658d850630/icons/nodejs/nodejs-original.svg">
    Node
</div>
<div style="padding: 0.5rem">
    <img align="center" alt="Rafa-Ts" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg">
TypeScript
</div>
<div style="padding: 0.5rem">
    <img align="center" alt="Rafa-Ts" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/2ae2a900d2f041da66e950e4d48052658d850630/icons/express/express-original.svg">
Express
</div>
<div style="padding: 0.5rem">
    <img align="center" alt="Rafa-Ts" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/2ae2a900d2f041da66e950e4d48052658d850630/icons/postgresql/postgresql-original.svg">
    PostgreSQL
</div>
<div style="padding: 0.5rem">
    <img align="center" alt="Rafa-Ts" height="30" width="40" src="https://cdn.worldvectorlogo.com/logos/prisma-2.svg">
    Prisma
</div>
<div style="padding: 0.5rem">
    <img align="center" alt="Rafa-Ts" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/2ae2a900d2f041da66e950e4d48052658d850630/icons/jest/jest-plain.svg">
    Jest
</div>

<div style="display: inline_block"><br>
  
</div>

## API Documentation

First, here it is what a Dev looks like for the API

```typescript
interface Dev extends Record<string, string> {
  Nome: string;
  Avatar: string;
  Carreira: string;
  Github: string;
  Linkedin: string;
}
```

And here it is what a Dev looks like for the Prisma ORM and the PostgreSQL

```prisma
model Dev {
  id        String      @id     @default(cuid())
  Nome      String
  Avatar    String
  Carreira  String
  Github    String
  Linkedin  String
}
```

All the requests for this api should use the ` /api/v1/dev` path.

#### A `GET METHOD` return all Devs from the database as an `Array` of objects

```http
  GET /api/v1/dev
```

## --

### A `POST METHOD` is used to create a Dev object in the Database

```http
  POST /api/v1/dev
```

| Parameter  | Type     | Descritption                        |
| :--------- | :------- | :---------------------------------- |
| `Nome`     | `string` | **Required**. Dev name              |
| `Avatar`   | `string` | **Required**. Dev avatar image link |
| `Carreira` | `string` | **Required**. Dev job title         |
| `Github`   | `string` | **Required**. Dev github username   |
| `Linkedin` | `string` | **Required**. Dev linkedin username |

## --

### A `PUT METHOD` is used to update an existing Dev object in the Database

```http
  PUT /api/v1/dev
```

At least one of the _not required_ parameters should be specified, otherwise there is no attribute to update.
| Parameter | Type | Descritption |
| :-------- | :------- | :------------------------------------------ |
| `id` | `string` | **Required**. Dev name |
| `Nome` | `string` | Dev updated name |
| `Avatar` | `string` | Dev updated avatar image link |
| `Carreira` | `string` | Dev updated job title |
| `Github` | `string` | Dev updated github username |
| `Linkedin` | `string` | Dev updated linkedin username |

## --

### A `DELETE METHOD` is used to delete an existing Dev object in the Database

```http
  DELETE /api/v1/dev
```

| Parameter | Type     | Descritption           |
| :-------- | :------- | :--------------------- |
| `id`      | `string` | **Required**. Dev name |
