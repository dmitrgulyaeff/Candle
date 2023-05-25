function getFilteredUrl(link, allowedParams) {
  // Разбиваем ссылку на URL и параметры
  const [url, params] = link.split('?');

  // Создаем объект URLSearchParams для параметров из ссылки
  const paramsFromLink = new URLSearchParams(params);

  // Создаем новый объект URLSearchParams для нужных параметров
  const neededParams = new URLSearchParams();

  // Проходим по всем разрешенным параметрам
  allowedParams.forEach((param) => {
    // Если параметр есть в параметрах из ссылки, то добавляем его в нужные параметры
    if (paramsFromLink.has(param)) {
      neededParams.append(param, paramsFromLink.get(param));
    }
  });

  // Возвращаем отфильтрованную ссылку
  return `${url}?${neededParams.toString()}`;
}

// Создаем объект Map для хранения регулярных выражений и соответствующих им функций для исправления ссылок
const linksToFix = new Map();

// Добавляем регулярное выражение и функцию для исправления ссылок на YouTube вида https://youtu.be/~id~
linksToFix.set(/https:\/\/youtu\.be\/.+/, (shortLink) => {
  shortLink = shortLink.replace('?', '&');
  const defaultLink = shortLink.replace(
    /https:\/\/youtu\.be\//,
    'https://www.youtube.com/watch?v='
  );
  return getFilteredUrl(defaultLink, ['v']);
});

// Добавляем регулярное выражение и функцию для исправления ссылок на YouTube вида https://www.youtube.com/watch?v=~id~
linksToFix.set(/https:\/\/www\.youtube\.com\/watch\?.*v=/, (link) =>
  getFilteredUrl(link, ['v'])
);

// Определяем функцию для проверки ссылки и исправления ее при необходимости
function checkLink(link) {
  // Проходим по всем регулярным выражениям и проверяем, подходит ли ссылка под какое-либо из них
  for (const regex of linksToFix.keys()) {
    if (regex.test(link)) {
      // Если ссылка подходит, вызываем соответствующую функцию для исправления ссылки
      const fixedLink = linksToFix.get(regex)(link);
      return fixedLink;
    }
  }
  // Если ссылка не подходит ни под одно регулярное выражение, возвращаем исходную ссылку без изменений
  return link;
}

// Экспортируем функцию checkLink для использования в других модулях
export default checkLink;
