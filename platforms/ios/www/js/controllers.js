angular.module('starter.controllers', [])
.controller('AppCtrl', function($scope) {
})
.controller('MapCtrl', function($scope, $cordovaDeviceOrientation) {

        $scope.comp = {
            watching: null,
            orientation: "?"
        };
        $scope.getOrientation = function() {
          var options = { frequency: 1000 };

          if ($scope.comp.watching) {
            console.log("in if: "+$scope.comp.watching);
            navigator.compass.clearWatch($scope.comp.watching);

            $scope.comp.watching = null;
            $scope.comp.orientation = "?";
            $scope.$apply();


          } else {
            console.log("in else: "+$scope.comp.watching);

            $scope.comp.watching = navigator.compass.watchHeading(
              function (heading) {
                $scope.comp.orientation = heading.magneticHeading;
                $scope.$apply();

              },
              function (compassError) {
                alert('Compass Error: ' + compassError.code);
              }, options);

          }
        };

        $scope.getLocation = function(){

            navigator.geolocation.getCurrentPosition(
                   function(position) {

                        angular.extend($scope.map, {
                            center: {
                                lat: position.coords.latitude,
                                lng: position.coords.longitude,
                                zoom: 14
                            },
                            markers: {
                                geoMarker: {
                                    lat: position.coords.latitude,
                                    lng: position.coords.longitude,
                                    message: "You are here!",
                                    focus: true,
                                    draggable: false
                                }
                            }
                        });
                        $scope.$apply();
                    },
                    function(error) {
                            alert('code: '    + error.code    + '\n' +
                                'message: ' + error.message + '\n');
            });
        };

        $scope.map = {
            defaults: {
                tileLayer: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
                maxZoom: 20,
                zoomControlPosition: 'bottomleft',
                path: {
                    weight: 10,
                    color: '#800000',
                    opacity: 1
                }
            },
            center: {
                lat: 55.699706,
                lng: 12.533040,
                zoom: 5
            },
            markers: {

            }
        };
})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('PhotoCtrl', function($scope) {
    $scope.getPhoto = function(){
        navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
            destinationType: Camera.DestinationType.DATA_URL
        });

        function onSuccess(imageData) {
            var image = document.getElementById('largeImage');
            image.style.display = 'block';

            image.src = "data:image/jpeg;base64," + imageData;
        }

        function onFail(message) {
            alert('Failed because: ' + message);
        }
    }
});
