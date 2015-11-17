
var app = angular.module('app', ['xeditable', 'ngStorage']);

app.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});

app.controller('SimmulatorCtrl', ['$scope', '$http', '$localStorage', function ($scope, $http, $localStorage) {
	
	$scope.sortType     = 'numSupport'; // set the default sort type
	$scope.sortReverse  = false;  // set the default sort order
	$scope.gettingData = 1;

	$scope.reseaux = ["ASF","SANEF", "APRR", "A'LIENOR", "CCIH"];

	$scope.addReseau = function(support){
		console.log(support);
		support.reseaux.push({
							"reseau": "undefined",
							"peageHT": 156.00,
							"remiseHT": -23.89,
							"fraisCCPHT": 0,
							"nbTransactions": 16,
							"status": 1
						})
	}

	$scope.getData = function(){
		$http.get('./totalSimulator.json')
		.success(function(data) {
			$scope.data = data;
			$scope.gettingData = 0;
		});
	}
	$scope.data = $localStorage.data || $scope.getData();


	$scope.$watchCollection("data", function(newData, oldData){
		$localStorage.data = $scope.data;
	});

}]);
