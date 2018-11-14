var app = angular.module("myApp", []); //this module will only run within the div with the ng-app

//now we add controllers for the app
app.controller("myController", function($scope, $http) {

    //this bad boy gets the comments from the server
    $http.get("/comments").success(function(response) {
        $scope.comments = response;
    });

    $scope.getAllComments = function() {
        return $http.get('/comments').success(function(data) {
            angular.copy(data, $scope.comments); //this will copy our comments to the comments array
        });
    };

    $scope.addComment = function() {

        if (!$("#userName").val()) {
            alert("Please Enter Your Name");
        }
        else if (!$("#userFavScripture").val()) {
            alert("Please Enter Your Favorit Scripture");
        }
        else if (!$("#userComment").val()) {
            alert("Please Enter a Comment About Your Favorit Scripture");
        } else {
            var newComment = {
                name: $("#userName").val(),
                favScripture: $("#userFavScripture").val(),
                comment: $("#userComment").val()
            };
            $("#userComment").val("");
            $("#userFavScripture").val("");
            $("#commentAddedConfirmation").show();
            
            setTimeout(function(){
                $("#commentAddedConfirmation").hide();
            }, 5000);
            
            $http.post('/comments', newComment).success(function(data) {
                $scope.getAllComments();
            });
        }


    }

    setInterval($scope.getAllComments, 5000);
});
