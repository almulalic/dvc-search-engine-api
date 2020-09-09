import fs from "fs";
import path from "path";
import moment from "moment";
import cheerio from "cheerio";
import fetch from "node-fetch";

import { ResortAdapter } from "../Common/Types/Interface";
import { LiveDataWriteError } from "../Common/Types/Exceptions";

import {
  DVCResalesShopAdapter,
  DVCResaleMarketAdapter,
  DVCResalesAdapter,
  DVCStoreAdapter,
  DVCResaleAdapter,
} from "../Common/Adapters";
import EmailService from "../Email/EmailService";

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
            "DVC Resales"
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

    let newData = [].concat(
      DVCResaleMarket,
      ResalesDVC,
      DVCStore,
      DVCResale,
      DVCResalesShop
    );

    let date = moment()
      .format("DD-MM-YYYY__HH:mm:ss")
      .replace(" ", "__")
      .replace(":", "-")
      .replace(":", "-");

    try {
      this.RenameOldData(date);
      this.CreateNewDataFile(newData, date);
      this.FilterAndCreateValidData(newData);
      this.MoveDataToBackup(date);
    } catch (err) {
      console.error(err);

      let restoreSuccessful = await this.RestoreData(date);
      EmailService.SendErrorMail(
        err,
        "Refresh Data Section",
        date,
        restoreSuccessful
      );

      return;
    }

    if (isFetch) res.json();
    else return 0;
  };

  //#endregion

  //#region Private Methods

  private RenameOldData = (date: string) => {
    try {
      fs.renameSync(
        path.join(__dirname, "..", "Data", "liveData.json"),
        path.join(__dirname, "..", "Data", `[${date}].json`)
      );
    } catch (err) {
      console.error(err);

      throw new LiveDataWriteError("Failed to rename live data! Reverting...");
    }

    console.log("Successfully renamed!");
  };

  private CreateNewDataFile = (newData, date: string) => {
    try {
      fs.appendFileSync(
        path.join(__dirname, "..", "Dataa", "liveData.json"),
        JSON.stringify(newData)
      );
    } catch (err) {
      console.error(err);
      this.RestoreData(date);
      throw new LiveDataWriteError(
        "Failed to create new live data! Reverting..."
      );
    }

    console.log("Successfully created new live data!");
  };

  private FilterAndCreateValidData = (newData) => {
    const filteredData = newData.filter((x: ResortAdapter) => {
      if (
        x.id?.length > 0 &&
        x.id !== " " &&
        !isNaN(x.resort) &&
        x.resort >= 0 &&
        !isNaN(x.points) &&
        x.points >= 0 &&
        !isNaN(x.price) &&
        x.price >= 0 &&
        !isNaN(x.priceperpoint) &&
        x.priceperpoint >= 0 &&
        x.pointavailability?.length > 0 &&
        x.pointavailability !== " " &&
        !isNaN(x.useyear) &&
        x.useyear >= 0 &&
        !isNaN(x.status) &&
        x.status >= 0 &&
        x.href?.length > 0 &&
        x.href !== " " &&
        !isNaN(x.broker) &&
        x.broker >= 0
      )
        return x;
    });

    if (filteredData.length > 0) {
      try {
        fs.truncateSync(
          path.join(__dirname, "..", "Data", "validLiveData.json")
        );
      } catch (err) {
        // this.RestoreData(date);
        console.error(err);
        throw new LiveDataWriteError(
          "Failed to create new live data! Reverting..."
        );
      }

      console.error("Successfully trunctuated old valid live data!");

      try {
        fs.appendFileSync(
          path.join(__dirname, "..", "Data", "validLiveData.json"),
          JSON.stringify(filteredData)
        );
      } catch (err) {
        console.log(err);
      }

      console.log("Successfully created new valid live data!");
    }
  };

  private MoveDataToBackup = (date: string) => {
    try {
      fs.renameSync(
        path.join(__dirname, "..", "Data", `[${date}].json`),
        path.join(__dirname, "..", "Data", "Backup", `[${date}].json`)
      );
    } catch (err) {
      console.log("Failed to move data to Backup Folder!");
    }

    console.log("Successfully moved data to Backup Folder!");
    console.log("All done chief.");
  };

  private RestoreData = (date: string) => {
    try {
      fs.renameSync(
        path.join(__dirname, "..", "Data", `[${date}].json`),
        path.join(__dirname, "..", "Data", "liveData.json")
      );
    } catch (err) {
      console.error("ERROR: " + err);
      return 1;
    }

    console.log("Successfully restored data on day: " + date);
    return 0;
  };

  //#endregion
}

export default new DataScraperService();
