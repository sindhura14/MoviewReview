/**
 * Created by Sindhu on 7/30/2014.
 */

var mod = angular.module('MovieSearchMod',[]);
mod.controller('MovieSearchCntrl',function($scope,$http){
    //console.log('setting up MyC controller ... ');
    // $scope.message = "Hello World!!";
    $scope.inp_movie_search ='';
    $scope.getName = function($event){
        if($event.keyCode === 13){
            //console.log($event.target.value);
            //console.log($scope.inp_movie_search); //both console.log statements give the same output
            $http.get("http://api.themoviedb.org/3/search/movie?api_key="+api_key+"&query="+$scope.inp_movie_search).success(function(data){
                //console.log(data.results);
                $scope.movies = data.results;
                var images = {};
                data.results.forEach(function(elem){
                    if(!elem.poster_path){
                        elem.poster_path ="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrEuac4vWEUYuwN0ui-Pc6ZRvcMn5eUsaXje6JoL1Y8FSmjg2j";
                    }else{
                        elem.poster_path = "http://image.tmdb.org/t/p/w500" + elem.poster_path;
                    }
                });
            });
        };
    };
});