
var app = angular.module('app', ['xeditable', 'ngStorage']);

app.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});

app.controller('SimmulatorCtrl', ['$scope', '$http', '$localStorage', function ($scope, $http, $localStorage) {
	
	$scope.sortType     = 'numSupport'; // set the default sort type
	$scope.sortReverse  = false;  // set the default sort order
	$scope.gettingData = 1;

	$scope.reseauxList = ["ASF","SANEF", "APRR", "A'LIENOR", "CCIH"];

	$scope.selectedReseaux = function(toFilter, reseaux){
		reseauxSelected = [];
		for(var i = 0; i < reseaux.length; i++){
			reseauxSelected.push(reseaux[i].reseau);
		}
		var filtered = []
		for (var i = 0; i < toFilter.length; i++) {
			if(reseauxSelected.indexOf(toFilter[i]) == -1){
				filtered.push(toFilter[i]);
			}
		}
		return filtered;

	}

	$scope.addReseau = function(support){
		support.reseaux.push({
			"reseau": "undefined",
			"peageHT": 0,
			"remiseHT": 0,
			"fraisCCPHT": 0,
			"nbTransactions": 0,
			"status": 1
		});
	}

	$scope.addSupport = function(noeud){
		noeud.supports.push({
			"numSupport": "undefined",
			"immatriculation": "undefined",
			"classEuro": 0,
			"peageHT": 0,
			"remiseHT": 0,
			"fraisCCPHT": 0,
			"nbTransactions": 0,
			"status": 1,
			"reseaux": []
		});
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
