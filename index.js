const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const PORT = 5000;

const app = express();

const url = "https://time.com";
axios(url)
  .then((response) => {
    const html_data = response.data;
    const $ = cheerio.load(html_data);
    const articles = [];

    $(".latest-stories__item", html_data).each(function () {
      //   const title = $(this).text().toString().replace(/\\n/g, " ").trim();
      const title = $(this).text().replace(/\n/g, "").trim();
      const url = "http://time.com" + $(this).find("a").attr("href");

      articles.push({
        title,
        url,
      });
    });
    console.log(articles);
  })
  .catch((err) => console.log(err));

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
