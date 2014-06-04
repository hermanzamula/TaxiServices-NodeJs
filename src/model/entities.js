var orm = require("./db-config");

var EARTH_RADIUS = 6371 * 1000; //meters

module.exports = function(callback){

    orm(function(err, db) {

        var DriverLocation = db.define('driver_location', {
            locationX: Number,
            locationY: Number,
            status: String
        }, {
            methods: {
                location: function() {
                    return [this.locationX, this.locationY]
                }
            }
        });

        /**
         *
         * @param center [longitude, latitude]: array
         * @param near distance from center, in meters
         * @param limit return items limit.
         * @param callback
         *
         * Items is ordered by comments size within.
         */
        DriverLocation.findByPlace = function (center, near, limit, callback) {

            callback([{message: "TODO", location:[100, 200]}]);
            return;

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

        callback(db.models);
    });

};