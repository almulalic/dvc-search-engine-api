import sgMail from "@sendgrid/mail";
import moment from "moment";

require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

class EmailService {
  public SendErrorMail = (location, error, backupPossible, backupDate) => {
    sgMail
      .send({
        to: "almir.mulalic.am@gmail.com",
        from: "dvcbot@enviorment.live",
        subject: "A wild error has appeard :O",
        html: `<div>
            <h1>${location}</h1>
            <h2>${error.type}</h2>
            <p>${error}</p>
            <hr>
            <h1>Was backup possible: ${
              backupPossible
                ? "Yes, restored version from: " +
                  moment(backupDate, "DD-MM-YYYY__HH:mm:ss").format(
                    "DD/MM/YY HH:mm:ss"
                  )
                : "Nope"
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
