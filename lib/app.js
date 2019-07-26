var path = require("path");
var express = require("express");
var slashes = require("connect-slashes");
let cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
var Songs = require("./songs");

// var STATIC_DIR = path.join(__dirname, "..", "public");
var BUILD_DIR = path.join(__dirname, "..", "build");

module.exports = function createApp(options) {
  var library = new Songs(path.join(__dirname, "..", "data"));

  var app = express();
  // app.use(express.logger());
  app.use(
    morgan(":method :url :status :res[content-length] - :response-time ms")
  );
  // app.use(express.bodyParser());
  app.use(bodyParser.json());
  app.use(cors());

  // CORS shenanigans
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
  });

  // app.use(express.static(STATIC_DIR));
  app.use(express.static(BUILD_DIR));
  app.use(slashes(false));

  app.get("/library", function(req, res) {
    var data = library.getLibrary();
    res.json(data);
  });

  app.get("/library/:id", function(req, res) {
    var id = parseInt(req.params.id, 10);
    var data = library.getSong(id);

    res.json(data);
  });

  app.get("/playlist", function(req, res) {
    var data = library.getPlaylists(function(err, playlists) {
      res.json(playlists);
    });
  });

  app.post("/playlist", function(req, res) {
    var data = req.body;

    console.dir(data);
    console.dir(req.headers);

    var name = data.name;
    var songs = data.songs;

    library.savePlaylist(null, name, songs, function(err, id) {
      res.json({
        id: id
      });
    });
  });

  app.get("/playlist/:id", function(req, res) {
    var id = parseInt(req.params.id, 10);
    var data = library.getPlaylist(id);

    res.json(data);
  });

  app.post("/playlist/:id", function(req, res) {
    var id = parseInt(req.params.id, 10);
    var data = req.body;

    var name = data.name;
    var songs = data.songs;

    library.savePlaylist(id, name, songs, function(err, id) {
      res.json({
        id: id
      });
    });
  });

  app.delete("/playlist/:id", function(req, res) {
    var id = parseInt(req.params.id, 10);
    var data = library.deletePlaylist(id);

    res.json({});
  });

  // CRA
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "build", "index.html"));
  });

  return app;
};
