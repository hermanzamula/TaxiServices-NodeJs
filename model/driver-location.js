var mongoose = require("./mongoose-config");

var Schema = mongoose.Schema;

var EARTH_RADIUS = 6371 * 1000; //meters

var DriverLocation = new Schema({
    location: {
        type: [Number],
        index: "2d"
    },
    status: String,
    _id: {
        type: Number
    }
});

DriverLocation.index({location: true});

/**
 *
 * @param center [longitude, latitude]: array
 * @param near distance from center, in meters
 * @param limit return items limit.
 * @param callback
 *
 * Items is ordered by comments size within.
 */
DriverLocation.statics.findByPlace = function (center, near, limit, callback) {

    var match = {
        near: center,
        maxDistance: parseFloat(parseFloat(near) / parseFloat(EARTH_RADIUS)),
        num: limit,
        distanceField: "dist",
        spherical: true
    };

    this.aggregate()
        .near(match)
        .exec(function (err, docs) {
            err && console.log(err);
            callback(docs || []);
        });
};


exports.DriverLocation = mongoose.model("DriverLocation", DriverLocation);