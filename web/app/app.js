(function(angular) {
  'use strict';

  angular.module('app', ['ngRoute', 'tabComponents'])

  // const for api url config
  .value('apiUrls', {
    countries: 'http://api.worldbank.org/countries',
    countryIndicator: 'http://api.worldbank.org/countries'
  })

  // routing config
	.config(function($routeProvider, $locationProvider) {
		$routeProvider
		.when('/workspace/:country', { templateUrl: 'app/workspace/templates/workspace.template.html', controller: "WorkspaceController"})

		.otherwise({ redirectTo: '/workspace/AFG' });
	});

})(window.angular);