/**
 * Created by xuxle on 2015/6/19.
 */
define(['app'], function (app) {

    app.register.directive('itemExpander', function($animate) {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            template:
                '<div class="expander">' +
                    '<div collapse="!expanded">' +
                        '<div class="body" ng-transclude></div>' +
                    '</div>' +
                    '<div class="footer">' +
                        '<button class="button button-clear button-icon button-full" ng-click="toggle()">' +
                            '<i class="icon" ng-class="{' + "'ion-android-arrow-dropdown':!expanded,'ion-android-arrow-dropup':expanded" + '}"></i>' +
                        '</button>' +
                    '</div>' +
                '</div>',
            link: function(scope, element, attrs) {
                scope.expanded = true;
                scope.toggle = function () {
                    scope.expanded = !scope.expanded;
                };
            }
        }
    });
});