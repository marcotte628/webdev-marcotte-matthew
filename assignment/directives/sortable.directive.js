
(function() {
  // require("https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.min.js");

  angular.module('directivesApp', []).directive("wbdv-sortable", SortableDirective);

  function SortableDirective() { alert("no chance this works");}
  $(init);
  function init(){
   $("wbdv-sortable").sortable();
  }

})();