angular.module('demo', ['ngDialog']).controller('control', function($scope,$http,ngDialog){
    
    $scope.posts=[];
	$scope.newPost={};
	$scope.loading=true;

	$http.get("https://jsonplaceholder.typicode.com/posts")
    	.then(function successCallback(response) {
            $scope.posts=response.data;
            $scope.loading=false;
            console.log(response.data);
		}, function errorCallback(response) {
		    $scope.loading=false;
            console.log(response.data);
		});

    $scope.addPost=function(){
        $http.post("https://jsonplaceholder.typicode.com/posts",{
        	NroDeclaracion: $scope.newPost.NroDeclaracion,
        	title: $scope.newPost.title,
            body: $scope.newPost.body
        })
        	.then(function successCallback(response) {
            $scope.resultado=response.data;
            $scope.posts.push($scope.newPost);
		    $scope.newPost={};
            console.log(response.data);
		}, function errorCallback(response) {
			    console.log(response.data);
		});
	}
    

    $scope.detallesReg = function (id) {
    	$http({
		    method: 'GET',
		    url: 'https://jsonplaceholder.typicode.com/posts/' + id,
		    data: { id: id},
		    headers: { 'Content-type': 'application/json;charset=utf-8'}
		})
		.then(function(response) {
		    console.log(response.data);
		    $scope.resul_ind=response.data;
		}, function(rejection) {
		    console.log(rejection.data);
		});

        ngDialog.open({
        	template: 'detallesRegistro',
            className: 'ngdialog-theme-default',
            scope: $scope
        });
        $scope.id_datos=id;
        console.log("detalles registro registro");
    };     

   $scope.modificarReg = function(post_r){
         ngDialog.open({
        	template: 'modificarRegistro',
            className: 'ngdialog-theme-default',
            scope: $scope
        });
        $scope.post_r=post_r;
        console.log("Modificando registro");
        console.log(post_r)
   };

   $scope.agregarReg = function () {
        ngDialog.open({
        	template: 'agregarRegistro',
            className: 'ngdialog-theme-default',
            scope: $scope
        });
        console.log("agregarndo registro");
   };

   $scope.verHerramientas=function(){
       ngDialog.open({
           template:'herramientas',
           className: 'ngdialog-theme-default',
           scope: $scope
       })
       console.log("Mostrando Herramientas");
   }    

})