# Game Community
Простой симулятор биржи. Позволяет отправлять заявки на покупку на сервер, по протоколу Websocket. Заявки сохраняются в БД и отображаются на клиенте. 

## Содержание
- [Технологии](#технологии)
- [Начало работы](#начало-работы)
- [Тестирование](#тестирование)
- [To do](#to-do)
- [Telegram](#Контакты)
- 
## Технологии:
 ## Технологии клиента
 - [React](https://react.dev/)
 - [TypeScript](https://www.typescriptlang.org/)
 - [SCSS](https://sass-scss.ru/)
 - [Jest](https://jestjs.io/ru/)
 
 
 ## Технологии сервера
 - [Python](https://www.python.org/)
 - [FastApi](https://fastapi.tiangolo.com/)
 - [SQLAlchemy](https://www.sqlalchemy.org/)

### Требования
Для установки и запуска проекта, необходимы:
- [NodeJS](https://nodejs.org/) v8+
- [Python](https://www.python.org/) v3+

### Запуск Development сервера
```
npm install - устанавливаем зависимости
npm run start:dev - запуск сервера + frontend проекта в dev режиме
```

----

## Скрипты

- `npm run start` - Запуск frontend проекта
- `npm run build:prod` - Сборка в prod режиме
- `npm run lint:ts` - Проверка ts файлов линтером
- `npm run lint:ts:fix` - Исправление ts файлов линтером
- `npm run test:unit` - Запуск unit тестов с jest

----

## Архитектура проекта

Проект написан в соответствии с методологией Feature sliced design

Ссылка на документацию - [feature sliced design](https://feature-sliced.design/docs/get-started/tutorial)

----

### Создание билда
Чтобы выполнить production сборку клиента, выполните команду: 
```sh
npm run build
```

## Тестирование

Мой проект покрыт юнит-тестами Jest. Для их запуска выполните команду:
```sh
npm run test:unit
```

## Конфигурация проекта



### Работа с данными




## To do
- [ ] Добавить виртуализацию
- [ ] Рефакторинг
- [ ] Адаптив

## Контакты

- [Митин Алексей](https://t.me/n1kaka) — Front-End Engineer
 
