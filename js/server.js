const express = require("express");
const app = express();

const nodemailer = require("nodemailer");

const PORT = process.env.PORT || 5000;

// middleware
app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
   res.sendFile(__dirname + "/public/index.html");
});

app.post("/", (req, res) => {
   console.log(req.body);

   const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
         user: "rizukinbr@gmail.com",
         pass: "wR3ck1e$$",
      },
   });

   const mailOption = {
      form: req.body.email,
      to: "rizukinbr@gmail.com",
      subject: `Message from ${req.body.email}: ${req.body.subject}`,
      text: req.body.message,
   };

   transporter.sendMail(mailOption, (error, info) => {
      if (error) {
         console.log(error);
         res.send("error");
      } else {
         console.log("Email sent: " + info.response);
         res.send("sucsess");
      }
   });
});

app.listen(PORT, () => {
   console.log(`server running on PORT ${PORT}`);
});
