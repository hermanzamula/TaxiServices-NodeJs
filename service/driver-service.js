var DriverLocation = require(global.root("/model/driver-location")).DriverLocation;
var _ = require('lodash-node');

var DriverService = {};

/**
 * @param center {longitude, latitude}: array<Number>
 * @param radius
 * @param limit
 * @param callback
 */
DriverService.readNear = function (center, radius, limit, callback) {

    DriverLocation.findByPlace(toModelLocation(center), radius, limit, function (drivers) {

        callback(toDriversResponse(drivers));

    })

};

DriverService.readAll = function(callback) {

    DriverLocation.find({}, function(err, data) {

        err && console.log(err);
        callback(toDriversResponse(data || []));

    })
};

/**
 * @param driverId
 * @param location {longitude, latitude}
 */
DriverService.saveLocation = function(driverId, location) {

    DriverLocation.findByIdAndUpdate(driverId, {location: toModelLocation(location)}, {upsert: true}, function(err) {
        err && console.log("Error happened when save driver: " + JSON.stringify(err))
    });

};

function toModelLocation(location) {
    return [parseFloat(location.longitude), parseFloat(location.latitude)];
}


function toDriversResponse(drivers) {
    return _.transform(drivers, function (result, driver) {
        result.push({
            location: {
                longitude: driver.location[0],
                latitude: driver.location[1]
            },
            driverId: driver._id
        })
    });
}

exports.DriverService = DriverService;