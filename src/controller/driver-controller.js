var DriverService = require(global.root('service/driver-service')).DriverService;

var DriverController = {};

var UNLIMITED = 100000;

DriverController.getDrivers = function (req, res) {
    var query = req.query;

    console.log("Processing get drivers request: " + JSON.stringify(query));

    if (!query.longitude || !query.latitude) {

        DriverService.readAll(function (drivers) {
            res.json(drivers);
        });

    } else {

        var center = {longitude: query.longitude, latitude: query.latitude};

        DriverService.readNear(center, query.radius, query.limit || UNLIMITED, function (drivers) {
            res.json(drivers);
        });

    }

};

DriverController.save = function (req, resp) {

    var body = req.body;
    console.log("Save driver request: " + JSON.stringify(body));

    DriverService.saveLocation(body.driverId, body.location, body.status);

    resp.status(200).send();

};

module.exports = function(app) {

    app.post("/api/drivers", DriverController.save);
    app.get("/api/drivers", DriverController.getDrivers);

};

