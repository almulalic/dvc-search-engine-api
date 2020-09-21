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

  public SendContactEmail = (req, res) => {
    const { name, email, message } = req;

    sgMail
      .send({
        to: "dvcsearchengine@enviorment.live",
        from: "dvcbot@enviorment.live",
        subject: "DVC Resale Search Engine Contact",
        html: `<div>
            <h1 style='color:lightblue'>CONTACT</h1>
            <hr>
            <h3>Name: ${name}</h3>
            <h3>E-mail: ${email}</h3>
            <hr>
            <p><span style="font-weight:bold">Message:</span> ${message}</p>
            <hr/>
            <h3>${moment().format("DD/MM/YY HH:mm:ss")}</h3>
          </div>`,
      })
      .then(() => {
        console.log("Contact notification email successfully sent!");
        res.json();
      })
      .catch((err) => {
        res.sendStatus(400);
        console.error(err);
        this.SendErrorMail(
          "Contact",
          "Contact email failed to sent",
          moment().format("DD/MM/YY HH:mm:ss"),
          1
        );
        console.log(
          "Contact mail failed to delive, backup sent. Content:" +
            name +
            " " +
            email +
            " " +
            message
        );
      });
  };
}

export default new EmailService();
