# Документация API для Epic Games Board Platform

## Оглавление
1. [Аутентификация](#аутентификация)
2. [Игры](#игры)
3. [Чат](#чат)

## Аутентификация

### Регистрация пользователя
- **URL**: `/api/users/register`
- **Метод**: `POST`
- **Тело запроса**:
  ```json
  {
    "login": "string (3-50 символов)",
    "email": "valid email",
    "password": "string (минимум 8 символов с заглавной, строчной буквой и цифрой)"
  }
  ```
- **Ответ**:
  ```json
  {
    "message": "Регистрация пользователя прошла успешно! На ваш e-mail было отправлено письмо с кодом подтверждения...",
    "token": "jwt token"
  }
  ```
- **Ошибки**:
  - 200: Пользователь с таким e-mail или логином уже зарегистрирован
  - 200: Неверные данные (валидация)

### Подтверждение регистрации
- **URL**: `/api/users/confirm`
- **Метод**: `POST`
- **Тело запроса**:
  ```json
  {
    "token": "jwt token из регистрации",
    "confirmationCode": "6-значный код"
  }
  ```
- **Ответ**:
  ```json
  {
    "message": "Учетная запись успешно активирована!",
    "token": "новый jwt token",
    "user": {
      "id": "user id",
      "login": "user login",
      "displayName": "display name",
      "email": "user email"
    }
  }
  ```

### Повторная отправка кода подтверждения
- **URL**: `/api/users/resend-confirmation`
- **Метод**: `POST`
- **Тело запроса**:
  ```json
  {
    "token": "jwt token из регистрации"
  }
  ```

### Запрос сброса пароля
- **URL**: `/api/users/request-reset`
- **Метод**: `POST`
- **Тело запроса**:
  ```json
  {
    "email": "valid email"
  }
  ```

### Сброс пароля
- **URL**: `/api/users/reset-password`
- **Метод**: `POST`
- **Тело запроса**:
  ```json
  {
    "tokenNewUser": "jwt token из запроса сброса",
    "newPassword": "новый пароль"
  }
  ```

### Вход в систему
- **URL**: `/api/users/login`
- **Метод**: `POST`
- **Тело запроса**:
  ```json
  {
    "email": "email или логин",
    "password": "password"
  }
  ```
- **Ответ**:
  ```json
  {
    "token": "jwt token",
    "user": {
      "id": "user id",
      "login": "user login",
      "displayName": "display name",
      "email": "user email",
      "favoriteGames": ["game ids"]
    }
  }
  ```

### Обновление токена
- **URL**: `/api/users/refresh-token`
- **Метод**: `POST`
- **Заголовки**: `Authorization: Bearer <token>`
- **Ответ**:
  ```json
  {
    "token": "новый jwt token"
  }
  ```

### Получение данных пользователя
- **URL**: `/api/users/me`
- **Метод**: `GET`
- **Заголовки**: `Authorization: Bearer <token>`
- **Ответ**:
  ```json
  {
    "id": "user id",
    "login": "user login",
    "displayName": "display name",
    "email": "user email",
    "isActive": true,
    "rights": ["user rights"],
    "avatarFilename": "filename",
    "favoriteGames": [
      {
        "id": "game id",
        "name": "game name",
        "description": "game description",
        "icon": "game icon"
      }
    ]
  }
  ```

## Игры

### Получение списка игр
- **URL**: `/api/games`
- **Метод**: `GET`
- **Заголовки**: `Authorization: Bearer <token>`

### Получение конкретной игры
- **URL**: `/api/games/:id`
- **Метод**: `GET`
- **Заголовки**: `Authorization: Bearer <token>`

## Чат

### Получение списка чатов
- **URL**: `/api/chat`
- **Метод**: `GET`
- **Заголовки**: `Authorization: Bearer <token>`

### Отправка сообщения
- **URL**: `/api/chat/send`
- **Метод**: `POST`
- **Заголовки**: `Authorization: Bearer <token>`
- **Тело запроса**:
  ```json
  {
    "roomId": "room id",
    "message": "message text"
  }
  ```