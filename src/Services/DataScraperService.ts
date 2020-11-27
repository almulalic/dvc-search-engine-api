import cheerio from "cheerio";
import fetch from "node-fetch";

import { ResortAdapter } from "../Common/Types/Interface";
import conn from "../Database/connection";

import {
  DVCResalesShopAdapter,
  DVCResaleMarketAdapter,
  DVCResalesAdapter,
  DVCStoreAdapter,
  DVCResaleAdapter,
} from "../Common/Adapters";
import { classToPlain } from "class-transformer";

class DataScraperService {
  //#region Public Methods

  public ScrapeDVCResaleMarketData = async (req, res, isFetch = true) => {
    const htmlResponse = await fetch("https://www.dvcresalemarket.com/listings/");

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
    const htmlResponse = await fetch("https://www.resalesdvc.com/dvc-resale-listings/");

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
    const htmlResponse = await fetch("https://www.dvcstore.com/dvc-listings.cfm");

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
    let DVCResaleMarket = await this.ScrapeDVCResaleMarketData(null, null, false);

    let ResalesDVC = await this.ScrapeResalesDVC(null, null, false);

    let DVCStore = await this.ScrapeDVCStore(null, null, false);

    let DVCResale = await this.ScrapeDVCResale(null, null, false);

    let DVCResalesShop = await this.ScrapeDVCResalesShop(null, null, false);

    let newData = [].concat(DVCResaleMarket, ResalesDVC, DVCStore, DVCResale, DVCResalesShop);

    try {
      this.UploadData(newData);
    } catch (err) {
      console.error(err);

      return;
    }

    if (isFetch) res.json();
    else return 0;
  };

  //#endregion

  //#region Private Methods

  private UploadData = async (liveData) => {
    conn.query(
      "SELECT * FROM liveValidData WHERE archivedAt IS NULL ORDER BY createdAt DESC",
      async (err, res, fields) => {
        if (res.length > 0) {
          let result = classToPlain(res[0]);
          await conn.query(`UPDATE liveValidData SET archivedAt = NOW() WHERE id = ${result.id}`);
        }

        conn.query(
          "SELECT * FROM liveInvalidData WHERE archivedAt IS NULL ORDER BY createdAt DESC",
          async (err, res2, fields) => {
            if (res2.length > 0) {
              let result2 = classToPlain(res2[0]);
              await conn.query(`UPDATE liveInvalidData SET archivedAt = NOW() WHERE id = ${result2.id}`);
            }

            let validData = this.FilterValidData(liveData);
            let queryValid = `INSERT INTO liveValidData (data,countValid,countInvalid,createdAt) VALUES ('${JSON.stringify(
              validData
            )}',${validData.length},${liveData.length},NOW())`;
            await conn.query(queryValid);

            let queryInvalid = `INSERT INTO liveInvalidData (data,countValid,countInvalid,createdAt) VALUES ('${JSON.stringify(
              liveData
            )}',${validData.length},${liveData.length},NOW()) `;
            await conn.query(queryInvalid);
          }
        );
      }
    );
  };

  private FilterValidData = (newData) => {
    return newData.filter((x: ResortAdapter) => {
      if (
        x.id?.length > 0 &&
        x.id !== " " &&
        !isNaN(x.resort) &&
        x.resort >= 0 &&
        !isNaN(x.points) &&
        x.points >= 0 &&
        !isNaN(x.price) &&
        x.price >= 0 &&
        !isNaN(x.pricePerPoint) &&
        x.pricePerPoint >= 0 &&
        x.pointAvailability?.length > 0 &&
        x.pointAvailability !== " " &&
        !isNaN(x.useYear) &&
        x.useYear >= 0 &&
        !isNaN(x.status) &&
        x.status >= 0 &&
        x.href?.length > 0 &&
        x.href !== " " &&
        !isNaN(x.broker) &&
        x.broker >= 0
      )
        return x;
    });
  };

  //#endregion
}

export default new DataScraperService();
