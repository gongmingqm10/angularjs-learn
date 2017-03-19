angular.module('Eggly', [])
  .controller('MainCtrl', function ($scope) {
    $scope.hello = 'world';
    $scope.isEditing = false;
    $scope.isCreating = false;
    $scope.formBookmark = {};

    $scope.categories = [
      {"id": 0, "name": "Development"},
      {"id": 1, "name": "Design"},
      {"id": 2, "name": "Exercise"},
      {"id": 3, "name": "Humor"}
    ];

    $scope.bookmarks = [
      {"id": 0, "title": "AngularJS", "url": "http://angularjs.org", "category": "Development"},
      {"id": 1, "title": "Egghead.io", "url": "http://angularjs.org", "category": "Development"},
      {"id": 2, "title": "A List Apart", "url": "http://alistapart.com/", "category": "Design"},
      {"id": 3, "title": "One Page Love", "url": "http://onepagelove.com/", "category": "Design"},
      {"id": 4, "title": "MobilityWOD", "url": "http://www.mobilitywod.com/", "category": "Exercise"},
      {"id": 5, "title": "Robb Wolf", "url": "http://robbwolf.com/", "category": "Exercise"},
      {"id": 6, "title": "Senor Gif", "url": "http://memebase.cheezburger.com/senorgif", "category": "Humor"},
      {"id": 7, "title": "Wimp", "url": "http://wimp.com", "category": "Humor"},
      {"id": 8, "title": "Dump", "url": "http://dump.com", "category": "Humor"}
    ];

    $scope.setCurrentCategory = function (category) {
      $scope.currentCategory = category;
      $scope.cancelForm();
    };

    $scope.isCurrentCategory = function(category) {
      return $scope.currentCategory && category.name === $scope.currentCategory.name;
    };

    $scope.startEditing = function(bookmark) {
      Object.assign($scope.formBookmark, bookmark);
      $scope.isEditing = true;
      $scope.isCreating = false;
    };

    $scope.startCreating = function() {
      $scope.formBookmark = {category: _.result($scope.currentCategory, 'name')};
      $scope.isEditing = false;
      $scope.isCreating = true;
    };

    $scope.cancelForm = function() {
      $scope.formBookmark = {};
      $scope.isEditing = $scope.isCreating = false;
    };

    $scope.submitForm = function() {
      if (_.result($scope.formBookmark, 'id')) {
        _.map($scope.bookmarks, function(bookmark) {
          return bookmark.id === $scope.formBookmark.id ? Object.assign(bookmark, $scope.formBookmark) : bookmark;
        })
      } else {
        $scope.bookmarks.push(Object.assign({id: _.last($scope.bookmarks).id + 1}, $scope.formBookmark));
      }
      $scope.cancelForm();
    };

  });
