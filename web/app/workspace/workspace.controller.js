(function(angular) {
    'use strict';

    angular.module('app')

    .controller('WorkspaceController', ['$scope', 'apiUrls', 'dataService', '$routeParams', function($scope, apiUrls, dataService, $routeParams) {
        // the path param of country id
        var countryId = $routeParams.country;
        
        // first load the country detail data
        dataService.getCountries(apiUrls.countries + '/' + countryId)
        .subscribe(cs => {

            if (cs && cs.length > 0) {
                $scope.country = cs[0];
            }
            // ready to load population data for country
            if ($scope.country) {
                loadCoutryPopulation();
            }

        });
        // load population data for country
        function loadCoutryPopulation() {
            dataService.getPopulationByCountry(apiUrls.countryIndicator, $scope.country.id, '1960', '2015')
            .map(cs => {
                let mc = cs
                .map(c => {
                    return {x: parseInt(c.date), y: parseInt(c.value)}
                });

                return mc;
            })
            .subscribe(data => {
                $scope.population = data.sort(function(a, b) {
                    return a.x - b.x;
                });

                createLineChart();
                createBarchart();
            });
        }
        // export chart into img file 
        $scope.exportChart = function() {
            if ($scope.linechart) {
                $scope.linechart.exportChart();
            }
        }    
        // print chart
        $scope.printChart = function() {
            if ($scope.linechart) {
                $scope.linechart.print();
            }
        }  
        // create line chart
        function createLineChart() {
            
            $scope.linechart = Highcharts.chart('linechart', {
                chart: {
                    type: 'area'
                },
                title: {
                    text: 'Historic Population Growth'
                },
                subtitle: {
                    text: 'Source: World Bank'
                },
                credits:{enabled:false},
                xAxis: {
                    tickmarkPlacement: 'on',
                    title: {
                        enabled: false
                    }
                },
                yAxis: {
                    title: {
                        text: 'millions'
                    },
                    labels: {
                        formatter: function () {
                            return this.value / 1000000;
                        }
                    }
                },
                tooltip: {
                    split: true,
                    valueSuffix: ' people'
                },
                plotOptions: {
                    area: {
                        stacking: 'normal',
                        lineColor: '#666666',
                        lineWidth: 1,
                        marker: {
                            lineWidth: 1,
                            lineColor: '#666666'
                        }
                    }
                },
                series: [{
                    name: $scope.country.name,
                    data: $scope.population
                }]
            });
        }
        // create bar chart
        function createBarchart() {
            
            Highcharts.chart('barchart', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Historic Population Growth'
                },
                subtitle: {
                    text: 'Source: World Bank'
                },
                credits:{enabled:false},
                xAxis: {
                    tickmarkPlacement: 'on',
                    title: {
                        enabled: false
                    }
                },
                yAxis: {
                    title: {
                        text: 'millions'
                    },
                    labels: {
                        formatter: function () {
                            return this.value / 1000000;
                        }
                    }
                },
                tooltip: {
                    split: true,
                    valueSuffix: ' people'
                },
                series: [{
                    name: $scope.country.name,
                    data: $scope.population
                }]
            });
        }

    }]);

})(window.angular);