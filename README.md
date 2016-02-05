# ng-confirm
Confirmation popup AngularJS with Angular UI Bootstrap

Installation & Usage
-----

#### Bower
````
bower install ngconfirm 
````

````
<script src="./bower_components/dist/confirm.js"></script>
````

#### Insert dependency 
```
angular.module('myApp', ['ngConfirm']);
```

add `ng-confirm` to the button like this 👇
```
<a class="btn btn-primary" ng-confirm ng-click="callfunction()">Remove</a>
```

Demo
-----
Install components
````
npm install
````
Setup files with Gulp
````
gulp install
````
Run demo with `localhost:8000`
````
gulp
````
