var _ = require('lodash-node');
var DriverService = {};
var DriverLocation = null;

var models = require(global.root("model/entities"))(function(models){

    DriverLocation = models.driver_location;

});

/**
 * @param center {Object}
 * @param radius {Number}
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
 * @param status {'free', 'on-call'}
 */
DriverService.saveLocation = function(driverId, location, status) {

    var toUpdate = {location: toModelLocation(location), status: status};

    DriverLocation.findByIdAndUpdate(driverId, toUpdate, {upsert: true}, function(err) {
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
            driverId: driver.id,
            status: driver.status
        })
    });
}


exports.DriverService = DriverService;