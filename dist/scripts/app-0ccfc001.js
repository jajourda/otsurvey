"use strict";angular.module("otsurvey",["ngAnimate","ngCookies","ngTouch","ngSanitize","ngRoute","ui.bootstrap","route-segment","view-segment","prismic.io"]).config(["$routeSegmentProvider","$routeProvider",function($routeSegmentProvider,$routeProvider){var rsp=$routeSegmentProvider;rsp.when("/","main"),rsp.segment("main",{templateUrl:"app/main/main.html",controller:"MainCtrl",resolve:{initialData:function(MainControllerInitialData){return MainControllerInitialData()}}}),$routeProvider.otherwise({redirectTo:"/"})}]).config(["PrismicProvider",function(PrismicProvider){PrismicProvider.setApiEndpoint("https://ot-survey.prismic.io/api"),PrismicProvider.setLinkResolver(function(ctx,doc){return"detail.html?id="+doc.id+"&slug="+doc.slug+ctx.maybeRefParam})}]),angular.module("otsurvey").controller("NavbarCtrl",["$scope",function($scope){$scope.date=new Date}]),angular.module("otsurvey").factory("QueryPrismicDocument",["$q","Prismic","$rootScope",function($q,Prismic,$rootScope){return{broadcastLoad:function(elementName){var loadEvent=elementName+"Loaded";console.log("i am loadEvent"),console.log(loadEvent),$rootScope.$broadcast(loadEvent)},query:function(query,elementName){return $q.when(Prismic.query(query).then(function(data){var resultingDocuments=data.results,filteredFragments=[];return angular.forEach(resultingDocuments,function(result){result.newFragments={};var keys=_.keysIn(result.fragments);angular.forEach(keys,function(key){var hasProperty=_.has(result.fragments,key),singleResult=_.result(result.fragments,key);if(hasProperty){var newKey=key.replace(elementName+".","");result.newFragments[newKey]=singleResult}}),filteredFragments.push(result.newFragments)}),filteredFragments}))}}}]),angular.module("otsurvey").factory("MainControllerInitialData",["QueryPrismicDocument","$q",function(QueryPrismicDocument,$q){return function(){var qpd=QueryPrismicDocument,blog=qpd.query('[[:d = at(document.type, "blog")]]',"blog"),article=qpd.query('[[:d = at(document.type, "article")]]',"article");return console.log("i am MainControllerInitialData.service.js"),$q.all([blog,article]).then(function(results){return{blog:results[0],article:results[0]}})}}]),angular.module("otsurvey").controller("MainCtrl",["$scope","initialData",function($scope,initialData){console.log("i am at the top of the pack"),console.log("i am initialData:"),console.log(initialData),$scope.awesomeThings=[{title:"AngularJS",url:"https://angularjs.org/",description:"HTML enhanced for web apps!",logo:"angular.png"},{title:"BrowserSync",url:"http://browsersync.io/",description:"Time-saving synchronised browser testing.",logo:"browsersync.png"},{title:"GulpJS",url:"http://gulpjs.com/",description:"The streaming build system.",logo:"gulp.png"},{title:"Jasmine",url:"http://jasmine.github.io/",description:"Behavior-Driven JavaScript.",logo:"jasmine.png"},{title:"Karma",url:"http://karma-runner.github.io/",description:"Spectacular Test Runner for JavaScript.",logo:"karma.png"},{title:"Protractor",url:"https://github.com/angular/protractor",description:"End to end test framework for AngularJS applications built on top of WebDriverJS.",logo:"protractor.png"},{title:"Bootstrap",url:"http://getbootstrap.com/",description:"Bootstrap is the most popular HTML, CSS, and JS framework for developing responsive, mobile first projects on the web.",logo:"bootstrap.png"},{title:"Angular UI Bootstrap",url:"http://angular-ui.github.io/bootstrap/",description:"Bootstrap components written in pure AngularJS by the AngularUI Team.",logo:"ui-bootstrap.png"},{title:"Sass (Ruby)",url:"http://sass-lang.com/",description:"Original Syntactically Awesome StyleSheets implemented in Ruby",logo:"ruby-sass.png"}],angular.forEach($scope.awesomeThings,function(awesomeThing){awesomeThing.rank=Math.random()})}]),angular.module("otsurvey").run(["$templateCache",function($templateCache){$templateCache.put("app/main/main.html",'<div class="container"><div ng-include="\'app/components/navbar/navbar.html\'"></div><div class="jumbotron text-center"><h1>OT Survey @ JICC</h1><p class="lead">I delivered to you of first importance... <strong>CHRIST</strong>, according to the Old Testament Scriptures</p><p><em>1 Cor. 15</em></p></div><hr><div class="footer"><p>With ♥ from <a href="https://twitter.com/Swiip">@Swiip</a></p></div></div>'),$templateCache.put("app/components/navbar/navbar.html",'<nav class="navbar navbar-static-top navbar-inverse" ng-controller="NavbarCtrl"><div class="container-fluid"><div class="navbar-header"><a class="navbar-brand" href="https://github.com/Swiip/generator-gulp-angular"><span class="glyphicon glyphicon-home"></span> Gulp Angular</a></div><div class="collapse navbar-collapse" id="bs-example-navbar-collapse-6"><ul class="nav navbar-nav"><li class="active"><a ng-href="#">Home</a></li><li><a ng-href="#">About</a></li><li><a ng-href="#">Contact</a></li></ul><ul class="nav navbar-nav navbar-right"><li>Current date: {{ date | date:\'yyyy-MM-dd\' }}</li></ul></div></div></nav>')}]);