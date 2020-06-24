const cheerio = require("cheerio");
const getUrls = require("get-urls");
const fetch = require("node-fetch");

class DataService {
  static FetchDVCResaleMarketData = async (req, res) => {
    const htmlResponse = await fetch(
      "https://www.dvcresalemarket.com/listings/"
    );

    const html = await htmlResponse.text();
    const $ = cheerio.load(html);

    let data = [];
    $(".listings-table__listing").each(async (i, tr) => {
      if (i < 10) {
        // const htmlResponse = await fetch($(tr).data().href);

        // const innerHtml = await htmlResponse.text();
        // const $inner = cheerio.load(html);

        // console.log($inner("slick-slide slick-current slick-active img"));
        data.push($(tr).data());
      } else return;
    });

    res.json(data);
  };

  static FetchResalesDVC = async (req, res) => {
    const htmlResponse = await fetch(req.body.url);

    const html = await htmlResponse.text();
    const $ = cheerio.load(html);
    let keyCount = 0;
    let data = [],
      temp = {};
    let keys = [
      "id",
      "resort",
      "points",
      "priceperpoint",
      "useyear",
      "pointavailability",
      "price",
      "href",
    ];
    $("#tablepress-14")
      .find("tbody")
      .find("tr")
      .each((i, td) => {
        $(td)
          .find("td")
          .each((i, row) => {
            let text = $(row).text();
            let key = keys[i];
            if (text === "More info")
              temp[keys[i]] = $(row).find("a").attr("href");
            else if (key == "price" || key == "priceperpoint")
              temp[keys[i]] = parseFloat(
                text.replace("$", "").replace(",", "")
              );
            else if (key == "points") temp[keys[i]] = parseInt(text);
            else temp[keys[i]] = text;
          });

        data.push(temp);
        temp = {};
        keyCount = 0;
      });

    res.json(data);
  };
}

module.exports = DataService;
