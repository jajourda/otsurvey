'use strict';
angular.module('otsurvey').factory("MainControllerInitialData", function(QueryPrismicDocument, $q) {
    return function() {


         var qpd = QueryPrismicDocument;

         // var siteTitle = qpd.query('[[:d = at(document.type, "siteTitle")]]', "siteTitle");
         // var clients = qpd.query('[[:d = at(document.type, "clients")]]', "clients");
         // var services = qpd.query('[[:d = at(document.type, "services")]]', "services");
         // var dreamSections = qpd.query('[[:d = at(document.type, "dreamSections")]]', "dreamSections");
         var blog = qpd.query('[[:d = at(document.type, "blog")]]', "blog");
         var article = qpd.query('[[:d = at(document.type, "article")]]', "article");

         console.log('i am MainControllerInitialData.service.js');




        return $q.all([blog, article]).then(function(results){
            return {
                blog: results[0],
                article: results[0]
            };
        });
    }
});
