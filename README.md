В разработке тестового задания для компании СимбирСофт использовалась экосистема Vue, Vuex, Vue-router.

Выполнено приложения словаря, состоящее из двух страничек. На первой отображается список из искомых слов, на второй страница с избранными словами,
выбраннами самим юзером. Словарь работает только с англоязычными словами.

При разработке изпользовался Vue версии 3.2.13.
Node.js - v16.16.0
АPI словаря - https://dictionaryapi.com/

Замечание:
При сборке, могут возникнуть проблемы с переносом строки (в линтере настроен LF, могут быть ошибки с CRLF). Использовать npm run lint --fix для фикса проблемы

Требования:

1. Поиск по первым и выдача первых 10 слов списком
2. Сортировку списка осуществить в алфавитном порядке
3. Если обозначение не влезает, обрезать его
3. При клике на слово можно открыть и увидеть больше обозначений и транскрипцию
4. Слова можно сохранять в избранное
5. Сессия должна сохраняться и не сбрасываться при обновлении страницы и перезагрузке браузера
6. На странице избранных слов можно поменять порядок слов перетаскиванием и удалить слово при клике на
звездочку
7. Поиск должен работать и в странице избранных слов
8. Должен работать фильтр части речи

Отмечу, что ветку в Git не ввел, так как приложение писал с одного устройства, без особых перерывов. Обычно веду ветку, преимущественно используя git flow.



### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
