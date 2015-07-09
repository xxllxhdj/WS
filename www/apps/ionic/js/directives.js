/**
 * Created by xuxle on 2015/6/19.
 */
define(['app'], function (app) {

    app.register.directive('itemExpander', function() {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            scope: {
                expanded: '=?'
            },
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
                scope.toggle = function () {
                    scope.expanded = !scope.expanded;
                };
            }
        }
    });

    app.register.directive('itemExpanded', function () {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                scope.$watch(attrs.itemExpanded, function (value) {
                    var expandHeight = value ? 145 : 20,
                        navBarHeight = 44,
                        tabsHeight = 48,
                        docHeight = document.body.scrollHeight;
                    element[0].style.height = (docHeight - expandHeight - navBarHeight - tabsHeight) + 'px';
                });
            }
        };
    });
});