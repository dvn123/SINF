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


            var $container = $('.portfolio'),
                $items = $container.find('.portfolio-item'),
                portfolioLayout = 'fitRows';

            if ($container.hasClass('portfolio-centered')) {
                portfolioLayout = 'masonry';
            }

            $container.isotope({
                filter: '*',
                animationEngine: 'best-available',
                layoutMode: portfolioLayout,
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false
                },
                masonry: {}
            }, refreshWaypoints());

            function refreshWaypoints() {
                setTimeout(function () {
                }, 1000);
            }

            $('nav.portfolio-filter ul a').on('click', function () {
                var selector = $(this).attr('data-filter');
                $container.isotope({filter: selector}, refreshWaypoints());
                $('nav.portfolio-filter ul a').removeClass('active');
                $(this).addClass('active');
                return false;
            });

            function getColumnNumber() {
                var winWidth = $(window).width(),
                    columnNumber = 1;

                if (winWidth > 1200) {
                    columnNumber = 5;
                } else if (winWidth > 950) {
                    columnNumber = 4;
                } else if (winWidth > 600) {
                    columnNumber = 3;
                } else if (winWidth > 400) {
                    columnNumber = 2;
                } else if (winWidth > 250) {
                    columnNumber = 1;
                }
                return columnNumber;
            }

            function setColumns() {
                var winWidth = $(window).width(),
                    columnNumber = getColumnNumber(),
                    itemWidth = Math.floor(winWidth / columnNumber);

                $container.find('.portfolio-item').each(function () {
                    $(this).css({
                        width: itemWidth + 'px'
                    });
                });
            }

            function setPortfolio() {
                setColumns();
                $container.isotope('reLayout');
            }

            $container.imagesLoaded(function () {
                setPortfolio();
            });

            $(window).on('resize', function () {
                setPortfolio();
            });
        },true);

    }]);