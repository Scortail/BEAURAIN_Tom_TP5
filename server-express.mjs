import express from "express";
import morgan from "morgan";
import createError from 'http-errors';
import logger from "loglevel";

const host = "localhost";
const port = 8000;

const app = express();

logger.setLevel(logger.levels.DEBUG);

// Définir le moteur de vue EJS
app.set("view engine", "ejs");

// Activer Morgan uniquement en mode développement
if (app.get("env") === "development") {
  app.use(morgan("dev"));
}
app.use(express.static("static"));


app.get("/random/:nb", async function (request, response, next) {
  const length = Number.parseInt(request.params.nb, 10);
  if (Number.isNaN(length)) {
    return next(createError(400, 'Le paramètre nb doit être un nombre'));
  }
  else {
    const welcome = "Willkommen"
    let numbers = []
    for (let index = 0; index < length; index++) {
      const randomNumber = Math.floor(100 * Math.random());
      numbers.push(randomNumber);
    }
    return response.render("random", {numbers, welcome});
  }
});

app.use((request, response, next) => {
  logger.debug(`default route handler : ${request.url}`);
  return next(createError(404));
});

app.use((error, _request, response, _next) => {
  logger.error(`default error handler: ${error}`);
  const status = error.status ?? 500;
  const stack = app.get("env") === "development" ? error.stack : "";
  const result = { code: status, message: error.message, stack };
  return response.render("error", result);
});

const server = app.listen(port, host);

server.on("listening", () =>
  logger.info(
    `HTTP listening on http://${server.address().address}:${server.address().port} with mode '${process.env.NODE_ENV}'`,
  ),
);

logger.info(`File ${import.meta.url} executed.`);