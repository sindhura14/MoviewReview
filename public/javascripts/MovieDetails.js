/**
 * Created by Sindhu on 7/30/2014.
 */
var mod1 = angular.module('MovieDetailsMod',[]);

mod1.controller('MovieDetailsCntrl',function($scope,$http,$routeParams){

    /*var id = location.search.match(/\d+/g)[0];*/
    var id = $routeParams.id;
    $http.get("http://api.themoviedb.org/3/movie/+"+id+"?api_key="+api_key).success(function(data){
        $scope.details = data;
        //console.log(data);
        if(!data.poster_path){
            $scope.imagesrc= "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrEuac4vWEUYuwN0ui-Pc6ZRvcMn5eUsaXje6JoL1Y8FSmjg2j";
        }else{
            $scope.imagesrc ="http://image.tmdb.org/t/p/w500" + data.poster_path;

        }
    });

    $http.get('http://localhost:3000/review/'+$routeParams.id).success(function(data){
          $scope.reviews = data;
        //console.log($scope.reviews);

    });

    $scope.review_data='';
    $scope.email ='';
    $scope.id = $routeParams.id;



    $scope.addNewReview = function($event){

        var review  = $scope.review_data;
        var arr = [];

         var data = review.replace(/[^a-z0-9._]+/ig,function(char){
             return '&#x' + char.charCodeAt(0).toString(16) + ';' ;
         });


        var obj={
            review : data,
            email : $scope.email,
            movieid : $scope.id
        };


        var url = "http://localhost:3000/review";

        $event.preventDefault();
        $http.post(url,obj).success(function(obj){
            //console.log(obj);
        });


    };

});

mod1.filter('unescape',function(){
    return function(value) {
        var review = value.replace(/&#x[0-9a-fA-F]+;/gmi, function (matched) {
            var hexcode = matched.substring(3,matched.length - 1);
            var decimalcode = parseInt(hexcode,16);
            return String.fromCharCode(decimalcode);
        });
        return review;
    }
});


