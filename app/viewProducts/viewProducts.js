'use strict';

angular.module('myApp.viewProducts', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/viewProducts', {
            templateUrl: 'viewProducts/viewProducts.html',
            controller: 'viewProductsCtrl'
        });
    }])

    .controller('viewProductsCtrl', ['$sce', '$scope', function($sce, $scope) {
        var div = '<div class="portfolio-item web-design"><div class="he-wrap tpl6"><img src="assets/Theme/demos/portfolio_09.jpg" alt=""><div class="he-view"><div class="bg a0" data-animate="fadeIn"><h3 class="a1" data-animate="fadeInDown">A Web Design Item</h3><a data-rel="prettyPhoto" href="assets/Theme/demos/portfolio_09.jpg" class="dmbutton a2" data-animate="fadeInUp"><i class="fa fa-search"></i></a><a href="single-portfolio-2.html" class="dmbutton a2" data-animate="fadeInUp"><i class="fa fa-link"></i></a></div><!-- he bg --></div><!-- he view --></div><!-- he wrap --></div><!-- end col-12 -->';
        $scope.ddata = {someString: div, trustedVersion:""}
        $scope.$watch("ddata.someString", function(newVal){
            debugger;
            $scope.ddata.trustedVersion = $sce.trustAsHtml(newVal);
        },true);

    }]);