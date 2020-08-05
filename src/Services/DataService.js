const cheerio = require("cheerio");
const fetch = require("node-fetch");
const fs = require("fs");
var path = require("path");

const DateAlias = new Map([
  ["Jan", "January"],
  ["Feb", "February"],
  ["Mar", "March"],
  ["Apr", "April"],
  ["Mar", "May"],
  ["Jun", "June"],
  ["Jul", "July"],
  ["Aug", "August"],
  ["Sep", "September"],
  ["Oct", "October"],
  ["Nov", "November"],
  ["Dec", "December"],
]);

class DataService {
  static FetchDVCResaleMarketData = async (req, res, isFetch = true) => {
    const htmlResponse = await fetch(
      "https://www.dvcresalemarket.com/listings/"
    );

    const html = await htmlResponse.text();
    const $ = cheerio.load(html);

    let data = [];
    $(".listings-table__listing").each(async (i, tr) => {
      let temp = $(tr).data();
      temp.market = "DVC Resale Market";
      data.push(temp);
    });

    if (isFetch) res.json(data);
    else return data;
  };

  static FetchResalesDVC = async (req, res, isFetch = true) => {
    const htmlResponse = await fetch(
      "https://www.resalesdvc.com/dvc-resale-listings/"
    );

    const html = await htmlResponse.text();
    const $ = cheerio.load(html);

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
      "market",
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
            if (text === "More info") temp[key] = $(row).find("a").attr("href");
            else if (key == "price" || key == "priceperpoint")
              temp[key] = parseFloat(text.replace("$", "").replace(",", ""));
            else if (key == "points") temp[key] = parseInt(text);
            else if (key == "useyear") temp[key] = DateAlias.get(text);
            else temp[key] = text;
            temp.market = "Resales DVC";
          });

        data.push(temp);
        temp = {};
      });

    if (isFetch) res.json(data);
    else return data;
  };

  static FetchDVCStore = async (req, res, isFetch = true) => {
    const htmlResponse = await fetch(
      "https://www.dvcstore.com/dvc-listings.cfm"
    );

    const html = await htmlResponse.text();
    const $ = cheerio.load(html);

    let data = [],
      temp = {};
    let keys = [
      "resort",
      "id",
      "useyear",
      "points",
      "price",
      "priceperpoint",
      "pointavailability",
      "href",
      "market",
    ];

    $(".c-content-person-1-slider").each(async (i, div) => {
      $(div)
        .find(".container")
        .each((i, col) => {
          $(col)
            .find(".col-md-2")
            .each((i, row) => {
              let text = $(row).find("a").text().padStart().padEnd();
              let key = keys[i];

              if (key == "price" || key == "priceperpoint")
                temp[key] = parseFloat(text.replace("$", "").replace(",", ""));
              else if (key == "points") temp[key] = parseInt(text);
              else temp[key] = text;

              temp["href"] =
                "https://www.dvcstore.com/" + $(row).find("a").attr("href");
            });
          temp["pointavailability"] = $(col)
            .find(".col-md-12")
            .text()
            .padStart()
            .padEnd();
          temp.market = "DVC Store";
          data.push(temp);
          temp = {};
        });
    });

    if (isFetch) res.json(data);
    else return data;
  };

  static RestoreData = (date) => {
    fs.rename(
      path.join(__dirname, "..", "Data", `[${date}].json`),
      path.join(__dirname, "..", "Data", "liveData.json"),
      function (err) {
        if (err) {
          console.log("Failed to rename old data to live data !");
          console.log("ERROR: " + err);
          res.json();
        }
      }
    );
  };

  static RefreshData = async (req, res) => {
    let DVCResaleMarket = await this.FetchDVCResaleMarketData(
      null,
      null,
      false
    );
    let ResalesDVC = await this.FetchResalesDVC(null, null, false);
    let DVCStore = await this.FetchDVCStore(null, null, false);

    let date = new Date()
      .toLocaleString()
      .replace(" ", "__")
      .replace(":", "-")
      .replace(":", "-");

    fs.rename(
      path.join(__dirname, "..", "Data", "liveData.json"),
      path.join(__dirname, "..", "Data", `[${date}].json`),
      function (err) {
        if (err) {
          console.log("Failed to rename live data !");
          console.log("ERROR: " + err);
        } else {
          console.log("Successfully renamed !");
          fs.appendFile(
            path.join(__dirname, "..", "Data", "liveData.json"),
            JSON.stringify([].concat(DVCResaleMarket, ResalesDVC, DVCStore)),
            function (err) {
              if (err) {
                console.log("Failed to create new live data !");
                this.RestoreData(date);
                res.json();
              } else {
                console.log("Successfully created new live data !");
                fs.rename(
                  path.join(__dirname, "..", "Data", `[${date}].json`),
                  path.join(
                    __dirname,
                    "..",
                    "Data",
                    "Backup",
                    `[${date}].json`
                  ),
                  function (err) {
                    if (err) throw err;
                    else {
                      console.log("Successfully moved data to Backup Folder !");
                    }
                  }
                );
              }
            }
          );
        }
      }
    );

    res.json();
  };
}

module.exports = DataService;
