import sgMail from "@sendgrid/mail";
import moment from "moment";
import { LiveDataWriteError } from "../Common/Types/Exceptions";

require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

class EmailService {
  public SendErrorMail = (
    location: string,
    error: string,
    backupDate: string,
    backupPossible: number
  ) => {
    sgMail
      .send({
        to: "almir.mulalic.am@gmail.com",
        from: "dvcbot@enviorment.live",
        subject: "A wild error has appeard :O",
        html: `<div>
            <h1 style='color:red'>${location}</h1>
            <p>${error}</p>
            <hr>
            <h1>Was backup possible: ${
              backupPossible
                ? "<span style='color:green'>Yes, restored version from: " +
                  moment(backupDate, "DD-MM-YYYY__HH:mm:ss").format(
                    "Date: DD/MM/YY HH:mm:ss"
                  ) +
                  "</span>"
                : "<span style='color:green'>Nope</span>"
            }</h1>"
            <h2>${moment().format("DD/MM/YY HH:mm:ss")}</h2>
          </div>`,
      })
      .then(() => {
        console.log("Error notification email successfully sent!");
      })
      .catch((err) => {
        console.error(err);
        console.log("Error notification email failed to  deliver!");
      });
  };
}

export default new EmailService();
