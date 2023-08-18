# TypeScript Practice

## Target:

-   Apply knowledge of HTML5/CSS3/TypeScript (with ES6 syntax).
-   Understand and apply MVC pattern.
-   Understand and apply Type Manipulation.

## Design on figma:

[Figma](https://www.figma.com/file/JYYgy4q64IXUalH0EisVq4/CRUD?type=design&node-id=4%3A41&mode=dev)

## Information:

-   Time line: 2023/08/09 – 2023/07/15
-   Editor: Visual Studio Code
-   Supported browser: Chrome, Firefox, MS Edge, Opera, Safari lasted
-   Supported screen: Screen width 996px or larger

## Team size:

-   1 dev: Liem Nguyen

## Develop Environment:

-   [Visual Studio Code](https://code.visualstudio.com/)
-   HTML5 & CSS3 & TypeScript
-   [Github](https://github.com/)

## Folder structure:

```
.
├── src/
│   ├── assets/
│   │   ├── fonts/
│   │   ├── icons/
│   │   └── images/
│   ├── scripts/
│   │   ├── constants/
│   │   ├── controllers/
│   │   ├── helpers/
│   │   ├── models/
│   │   ├── services/
│   │   ├── templates/
│   │   ├── views/
│   │   ├── app.js
│   │   └── main.js
│   ├── database/
│   │   └── db.json
│   │   └── index.js
│   ├── styles/
│   │   ├── base/
│   │   ├── components/
│   │   ├── layout/
│   │   ├── pages/
│   │   ├── themes/
│   │   ├── utils/
│   │   ├── vendors/
│   │   └── main.css
│   └── index.html
└── README.md
```

## Getting started

**Require JSON Server**

```
npm install -g json-server
```

-   Step 01: Clone repository with HTTPS

```bash
git clone https://github.com/liemgumball/typescript-training.git
```

-   Step 02: Change to branch feature/big-practice

```bash
git checkout feature/big-practice
```

-   Step 03: Move to folder which just cloned in your computer

```bash
cd typescript-training
```

-   Step 04: Install packages

```bash
npm install
```

-   Step 05: Run json-server

```bash
json-server --watch src/json-server/db.json
```

-   Step 06: Run

```bash
export API_GATEWAY=http://localhost:3000 && npm start
```
