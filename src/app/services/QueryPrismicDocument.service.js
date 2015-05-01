'use strict';

angular.module('otsurvey').factory('QueryPrismicDocument', ['$q','Prismic','$rootScope',
  function($q, Prismic, $rootScope) {
    return {
      broadcastLoad : function(elementName) {
        //create event variable
        var loadEvent = elementName + 'Loaded';
        console.log('i am loadEvent');
        console.log(loadEvent);
        $rootScope.$broadcast(loadEvent);

      },
      query : function(query, elementName) {
        var that = this;
        return $q.when(
        Prismic.query(query).then(function(data) {
          var resultingDocuments = data.results;
          //array that will be passed the objects
          var filteredFragments = [];
          angular.forEach(resultingDocuments, function(result) {
            result.newFragments = {};
            // console.log('i am here');
            // console.log('result:');
            // console.log(result.fragments);
            var keys = _.keysIn(result.fragments);
            // console.log('KEYS:');
            //  console.log(keys);
            //  console.log(elementName);
            //iterate ver fragments and change property keys
            angular.forEach(keys, function(key) {
              // console.log('key:');
              // console.log(key);
              var hasProperty = _.has(result.fragments, key);
              var singleResult = _.result(result.fragments, key);
              // console.log('i am hasProperty:');
              // console.log(hasProperty);
              if (hasProperty) {
                //remove the elementName + the '.' from the string fore easier object access
                var newKey = key.replace(elementName + '.', '');
                //  console.log('i am key inside has Property:');
                // console.log(newKey);
                // console.log(singleResult);

                result.newFragments[newKey] = singleResult;
                // console.log('i am newFragments:');
                // console.log(newFragments);
                // console.log('i am old Fragments:');
                // console.log(result.fragments);
              }
            });
            // console.log('i am newFragments in last part of for loop:');
            // console.log(newFragments);
            //push results into fragments
            filteredFragments.push(result.newFragments);
          }); //end of resultingDocuments for each


          //attempting to return object
          return filteredFragments;


          // //**************
          // //deal with filtered resultingDocuments
          // //**************
          // // console.log('i am filtered fragments');
          // // console.log(filteredFragments);

          // //**************
          // //if only one fragment in array
          // //**************
          // // console.log('filteredFragments length:');
          // // console.log(filteredFragments);
          // //determine that the propertyNamespace on the rootscope is a single object inside an array
          // if (filteredFragments.length === 1) {
          //   $rootScope[elementName] = filteredFragments[0];
          // }
          // //determine that the propertyNamespace on the rootscope is an array of multiple objects
          // else if (filteredFragments.length > 1) {
          //   $rootScope[elementName] = filteredFragments;
          // }

          // console.log('i am $rootScope[' + elementName + '] :');
          // console.log($rootScope[elementName]);
          // //let the app know that ajaxContent is in
          // that.broadcastLoad(elementName);

        }) //end of Prismic.query.then
        )//end of $q.when
    }//end of query method
  }//END OF RETURN OBJECT
}//end of function
]);


// angular.module('myocLocal').service('QueryPrismicDocument', ['Prismic','$rootScope', function(Prismic, $rootScope){
//     var that = this;

//         this.broadcastLoad = function(elementName){
//           //create event variable
//           var loadEvent = elementName + 'Loaded';
//           console.log('i am loadEvent');
//           console.log(loadEvent);
//           $rootScope.$broadcast(loadEvent);

//         };

//       this.query = function(query, elementName){
//         Prismic.query(query).then(function(data) {
//              var resultingDocuments = data.results;
//              //array that will be passed the objects
//              var filteredFragments = [];
//              angular.forEach(resultingDocuments, function(result){
//               result.newFragments = {};
//                // console.log('i am here');
//                // console.log('result:');
//                // console.log(result.fragments);
//                var keys = _.keysIn(result.fragments);
//                // console.log('KEYS:');
//                //  console.log(keys);
//                //  console.log(elementName);
//                 //iterate ver fragments and change property keys
//                 angular.forEach(keys, function(key){
//                   // console.log('key:');
//                   // console.log(key);
//                   var hasProperty = _.has(result.fragments, key);
//                   var singleResult = _.result(result.fragments, key);
//                   // console.log('i am hasProperty:');
//                   // console.log(hasProperty);
//                   if(hasProperty){
//                     //remove the elementName + the '.' from the string fore easier object access
//                     var newKey = key.replace(elementName+'.','');
//                     //  console.log('i am key inside has Property:');
//                     // console.log(newKey);
//                     // console.log(singleResult);

//                     result.newFragments[newKey]=singleResult;
//                     // console.log('i am newFragments:');
//                     // console.log(newFragments);
//                     // console.log('i am old Fragments:');
//                     // console.log(result.fragments);
//                   }
//                 });
//                 // console.log('i am newFragments in last part of for loop:');
//                 // console.log(newFragments);
//                 //push results into fragments
//                 filteredFragments.push(result.newFragments);
//              });//end of resultingDocuments for each

//             //**************
//             //deal with filtered resultingDocuments
//             //**************
//             // console.log('i am filtered fragments');
//             // console.log(filteredFragments);

//             //**************
//             //if only one fragment in array
//             //**************
//             // console.log('filteredFragments length:');
//             // console.log(filteredFragments);
//             //determine that the propertyNamespace on the rootscope is a single object inside an array
//             if(filteredFragments.length === 1){
//               $rootScope[elementName] = filteredFragments[0];
//             }
//             //determine that the propertyNamespace on the rootscope is an array of multiple objects
//             else if(filteredFragments.length > 1){
//               $rootScope[elementName] = filteredFragments;
//             }

//             console.log('i am $rootScope['+elementName+'] :');
//             console.log($rootScope[elementName]);
//             //let the app know that ajaxContent is in
//             that.broadcastLoad(elementName);

//          });//end of Prismic.query.then
//       }//end $rootScope.queryPrismic



// }]);
