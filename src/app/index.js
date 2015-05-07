'use strict';

angular.module('otsurvey', ['ngAnimate',
        'ngCookies',
        'ngTouch',
        'ngSanitize',
        'ngRoute',
        'ui.bootstrap',
        'route-segment',
        'view-segment',
        'prismic.io'
    ])
.config(['$routeSegmentProvider','$routeProvider',function ($routeSegmentProvider, $routeProvider) {
  //instantiate the provider
  var rsp = $routeSegmentProvider;
  //set up main main route with two arguments passed:
  /*1. teh route as string*/
  /*2. the segment that will be associated with that route by angular-route-segment*/
  rsp.when('/', 'main');

  rsp.when('/about', 'about');

  rsp.when('/contact', 'contact');

  rsp.segment('main', {
          templateUrl: 'app/main/main.html',
          controller: 'MainCtrl',
          resolve: {
              initialData: function(MainControllerInitialData) {
                  return MainControllerInitialData();
              }
          }
      });

  rsp.segment('about',{
    templateUrl:'app/about/about.html',
    controller:'AboutCtrl'
  });

  rsp.segment('contact',{
    templateUrl:'app/contact/contact.html',
    controller:'ContactCtrl'
  })
  //route provider gets the otherwise method; rsp will handle the rest.
  $routeProvider
      .otherwise({
          redirectTo: '/'
      });
}])
.config(['PrismicProvider', function (PrismicProvider) {
  PrismicProvider.setApiEndpoint('https://ot-survey.prismic.io/api');
  PrismicProvider.setLinkResolver(function(ctx, doc) {
      return 'detail.html?id=' + doc.id + '&slug=' + doc.slug + ctx.maybeRefParam;
  });
}])

