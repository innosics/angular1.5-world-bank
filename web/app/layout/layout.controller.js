(function(angular) {
    'use strict';

    angular.module('app')

    .controller('LayoutController', ['$scope', 'dataService', function($scope, dataService) {
        // layoutState is state of sidebar
        $scope.layoutState = 'sideNavOpened';
        // layoutStateButton controls icon of sidebar open/close button 
        $scope.layoutStateButton = 'glyphicon-chevron-left';
        // sideMenuClass and worksapceClass are classes to animate the sidebar and workspace
        $scope.sideMenuClass = 'sidenav-open';
        $scope.worksapceClass = 'ws-sidenav-open';

        // toggle sidebar
        $scope.toggleSideNav = function() {
            if ($scope.layoutState === 'sideNavOpened') {
                $scope.layoutState = 'sideNavClosed';
                $scope.layoutStateButton = 'glyphicon-chevron-right';
                $scope.sideMenuClass = 'sidenav-close';
                $scope.worksapceClass = 'ws-sidenav-close';
            } else {
                $scope.layoutState = 'sideNavOpened';
                $scope.layoutStateButton = 'glyphicon-chevron-left';
                $scope.sideMenuClass = 'sidenav-open';
                $scope.worksapceClass = 'ws-sidenav-open';
            }
        }

    }]);

})(window.angular);