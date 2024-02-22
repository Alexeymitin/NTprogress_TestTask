# Симулятор биржы
Простой симулятор биржи. Позволяет отправлять заявки на покупку на сервер, по протоколу Websocket. Заявки сохраняются в БД и отображаются на клиенте. 

### Описание клиента
На клиенте намеренно не используется глобальное состояние, т.к. в нем нет необходимости в маленьком приложении и я не стал усложнять код. Котировки инструментов захардкожены на клиенте - это сделано для простоты разработки.При смене инструмента на сервер автоматически отправляется запрос о подписке на данный инструмент. Архитектура клиента построена по методологии Feature-Sliced Design

### Описание сервера
На сервере реализована имитация торговой логики - после получения заявки и сохранения в БД, ей присваивается статус = 'active', после 3 секунд случайно выбирается новый статус и высылается клиенту.

Важно: при обновление страницы на клиенте, а так же любом изменении кода на сервере - БД полностью очищается. Это сделано для простоты тестирования. Если вы хотите изменить это поведение, то необходимо в файле app.py удалить строчку - 
```
await delete_tables()
```


## Содержание
- [Технологии клиента](#технологии-клиента)
- [Технологии сервера](#технологии-сервера)
- [Тестирование](#тестирование)
- [API](#api)
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


### Запуск клиентской части
```
cd client - переходим в папку client
npm install - устанавливаем зависимости
npm run start - запуск сервера + frontend проекта в dev режиме
```

### Запуск клиентской части
```
cd server - переходим в папку server
pip install -r requirements.txt. - устанавливаем зависимости
uvicorn app:api --reload - запуск сервера
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

## API:
Все сообщения имеют общий JSON формат:

{
    "messageType": <integer>,
    "message": <object>
}
В зависимости от типа сообщения (messageType) само сообщение (message) должно иметь конкретный формат:

### SubscribeMarketData messageType=1

Field	Type	Comment
instrument	integer	Идентификатор инструмента, на котировки которого запрошена подписка
Пример:

{"instrument": 12}
В случае успешной подписки сервер отвечает сообщением SuccessInfo, где поле message будет содержать идентификатор подписки:

{"subscriptionId": <string:UUID>}
И далее, при каждом изменении котировок сервер будет присылать сообщение MarketDataUpdate.

В случае какой-либо ошибки сервер отвечает сообщением ErrorInfo, где поле message будет содержать описание причины ошибки:

{"reason": <string>}
Чтобы отменить подписку, нужно отправить сообщение UnsubscribeMarketData.

### UnsubscribeMarketData messageType=2
{
    "messageType": 2,
    "message": {"instrument": 12}
}

...

### PlaceOrder messageType=3
{
    "messageType": 3,
    "message": {"instrument": 12, "side": 1, "amount": 1234.12, "price": 83.11}
}
...

CancelOrder

...

SuccessInfo

...

ErrorInfo

...

ExecutionReport

...

MarketDataUpdate

...



### Работа с данными




## To do
- [ ] Добавить виртуализацию
- [ ] Рефакторинг
- [ ] Адаптив

## Контакты

- [Митин Алексей](https://t.me/n1kaka) — Front-End Engineer
 
