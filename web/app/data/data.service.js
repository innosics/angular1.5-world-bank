(function(angular) {
    'use strict';

    angular.module('app')

    .service('dataService', ['$sce', '$http', function($sce, $http) {

        var vm = this;
        // get all countries from world bank
        vm.getCountries = function(url) {

            let seg = `?per_page=500&format=jsonP&prefix=JSON_CALLBACK`;

            url = url + seg;

            $sce.trustAsResourceUrl(url);
                    
            return Rx.Observable.fromPromise($http.jsonp(url))
            .flatMap(res => {
                return Rx.Observable.of(res.data[1]);
            })
            .flatMap(data => {

                let cs = data.map(c => {
                    return {id: c.id, name: c.name};
                });

                return Rx.Observable.of(cs);
            });
        }
        // query population for a specific country in the specifice a year to another year
        vm.getPopulationByCountry = function(url, country, dateFrom, dateTo) {

            let seg = `/${country}/indicators/SP.POP.TOTL?date=${dateFrom}:${dateTo}&per_page=500&format=jsonP&prefix=JSON_CALLBACK`;

            url = url + seg;

            $sce.trustAsResourceUrl(url);
                    
            return Rx.Observable.fromPromise($http.jsonp(url))
            .flatMap(res => {
                return Rx.Observable.of(res.data[1]);
            })
            ;
        }

    }]);

})(window.angular);