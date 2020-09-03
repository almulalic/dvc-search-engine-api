import fs from "fs";
import path from "path";
import moment from "moment";
import cheerio from "cheerio";
import fetch from "node-fetch";

import {
  DVCResalesShopAdapter,
  DVCResaleMarketAdapter,
  DVCResalesAdapter,
  DVCStoreAdapter,
  DVCResaleAdapter,
} from "../Common/Adapters";

class DataScraperService {
  //#region Public Methods

  public ScrapeDVCResaleMarketData = async (req, res, isFetch = true) => {
    const htmlResponse = await fetch(
      "https://www.dvcresalemarket.com/listings/"
    );

    const html = await htmlResponse.text();
    const $ = cheerio.load(html);

    let data = [] as DVCResaleMarketAdapter[];

    $(".listings-table__listing").each(async (i, tr) => {
      data.push(new DVCResaleMarketAdapter($(tr).data(), "DVC Resale Market"));
    });

    if (isFetch) res.json(data);
    else return data;
  };

  public ScrapeResalesDVC = async (req, res, isFetch = true) => {
    const htmlResponse = await fetch(
      "https://www.resalesdvc.com/dvc-resale-listings/"
    );

    const html = await htmlResponse.text();
    const $ = cheerio.load(html);

    let data = [] as DVCResalesAdapter[];

    $("#tablepress-14")
      .find("tbody")
      .find("tr")
      .each((i, tr) => {
        data.push(
          new DVCResalesAdapter(
            $(tr)
              .find("td")
              .toArray()
              .map((x) => {
                return $(x).text();
              }),
            $(tr).find(".column-8").find("a").attr("href"),
            "Resales DVC"
          )
        );
      });

    if (isFetch) res.json(data);
    else return data;
  };

  public ScrapeDVCStore = async (req, res, isFetch = true) => {
    const htmlResponse = await fetch(
      "https://www.dvcstore.com/dvc-listings.cfm"
    );

    const html = await htmlResponse.text();
    const $ = cheerio.load(html);

    let data = [] as DVCStoreAdapter[];

    $(".c-content-person-1-slider").each(async (i, div) => {
      $(div)
        .find(".container")
        .find(".row")
        .each((i, row) => {
          if (i < 6)
            data.push(
              new DVCStoreAdapter(
                $(row)
                  .find("a")
                  .toArray()
                  .map((x) => {
                    return $(x).text();
                  }),
                $(row).find("a").attr("href"),
                $(row).find(".col-md-12").text(),
                "DVC Store"
              )
            );
        });
    });

    if (isFetch) res.json(data);
    else return data;
  };

  public ScrapeDVCResale = async (req, res, isFetch = true) => {
    const htmlResponse = await fetch(
      "http://www.dvcresale.com/buying-dvc/current-disney-vacation-club-listings/"
    );

    const html = await htmlResponse.text();
    const $ = cheerio.load(html);

    var data = [] as DVCResaleAdapter[];

    $("#listing_content")
      .find("tr")
      .each(async (i, tr) => {
        data.push(
          new DVCResaleAdapter(
            $(tr)
              .find("td")
              .toArray()
              .map((x) => {
                return $(x).text();
              }),
            $(tr).find("td").find("a").attr("href"),
            "DVC Resale"
          )
        );
      });

    if (isFetch) res.json(data);
    else return data;
  };

  public ScrapeDVCResalesShop = async (req, res, isFetch = true) => {
    const htmlResponse = await fetch("https://resales.dvcshop.com/listings/");

    const html = await htmlResponse.text();
    const $ = cheerio.load(html);

    var data = [] as DVCResalesShopAdapter[];

    $("tbody")
      .find("tr")
      .each(async (i, tr) => {
        data.push(
          new DVCResalesShopAdapter(
            $(tr)
              .find("td")
              .toArray()
              .map((x) => {
                return $(x).text();
              }),
            $(tr).find(".more_info_button .hover_info_button a").attr("href"),
            "DVC Resales Shop"
          )
        );
      });

    if (isFetch) res.json(data);
    else return data;
  };

  public RefreshData = async (req, res, isFetch = false) => {
    let DVCResaleMarket = await this.ScrapeDVCResaleMarketData(
      null,
      null,
      false
    );

    let ResalesDVC = await this.ScrapeResalesDVC(null, null, false);

    let DVCStore = await this.ScrapeDVCStore(null, null, false);

    let DVCResale = await this.ScrapeDVCResale(null, null, false);

    let DVCResalesShop = await this.ScrapeDVCResalesShop(null, null, false);

    let date = moment()
      .format("DD-MM-YYYY__HH:mm:ss")
      .replace(" ", "__")
      .replace(":", "-")
      .replace(":", "-");

    let that = this;

    fs.rename(
      path.join(__dirname, "..", "Data", "liveData.json"),
      path.join(__dirname, "..", "Data", `[${date}].json`),
      (err) => {
        if (err) {
          console.log("Failed to rename live data!");
          console.log("ERROR: " + err);
        } else {
          console.log("Successfully renamed!");
          fs.appendFile(
            path.join(__dirname, "..", "Data", "liveData.json"),
            JSON.stringify(
              [].concat(
                DVCResaleMarket,
                ResalesDVC,
                DVCStore,
                DVCResalesShop,
                DVCResale
              )
            ),
            (err) => {
              if (err) {
                console.log("Failed to create new live data!");
                that.RestoreData(date);
                res.json();
              } else {
                console.log("Successfully created new live data!");
                fs.rename(
                  path.join(__dirname, "..", "Data", `[${date}].json`),
                  path.join(
                    __dirname,
                    "..",
                    "Data",
                    "Backup",
                    `[${date}].json`
                  ),
                  (err) => {
                    if (err) {
                      console.log("Failed to move data to Backup Folder!");
                      throw err;
                    } else {
                      console.log("Successfully moved data to Backup Folder!");
                    }
                  }
                );
              }
            }
          );
        }
      }
    );

    if (isFetch) res.json();
    else return 0;
  };

  //#endregion

  //#region Private Methods

  private RestoreData = (date) => {
    fs.rename(
      path.join(__dirname, "..", "Data", `[${date}].json`),
      path.join(__dirname, "..", "Data", "liveData.json"),
      (err) => {
        if (err) {
          console.log("Failed to rename old data to live data !");
          console.log("ERROR: " + err);
          return;
        }
      }
    );
  };

  //#endregion
}

export default new DataScraperService();
