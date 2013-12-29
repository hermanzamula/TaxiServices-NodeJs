var DriverService = require(global.root('service/driver-service')).DriverService;

var DriverController = {};

var UNLIMITED = 100000;

DriverController.getDrivers = function (req, resp) {
    var query = req.query;

    console.log("Processing get drivers request: " + JSON.stringify(query));

    if (!query.longitude || !query.latitude) {

        DriverService.readAll(function (drivers) {
            resp.json(drivers);
        });

    } else {

        DriverService.readNear({longitude: query.longitude, latitude: query.latitude}, query.radius, query.limit || UNLIMITED, function (drivers) {
            resp.json(drivers);
        });

    }

};

DriverController.save = function (req, resp) {

    var body = req.body;
    console.log("Save driver request: " + JSON.stringify(body));

    DriverService.saveLocation(body.driverId, body.location);

    resp.status(200).send();

};

module.exports = function(app) {

    app.post("/api/drivers", DriverController.save);
    app.get("/api/drivers", DriverController.getDrivers);

};

