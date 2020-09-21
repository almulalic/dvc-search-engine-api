import cors from "cors";
import express from "express";
import EmailService from "../../Email/EmailService";

const ContactController = express.Router();

//#region Controllers

ContactController.post("/submit", (req, res) => {
  EmailService.SendContactEmail(req.body, res);
});

//#endregion

export default ContactController;
