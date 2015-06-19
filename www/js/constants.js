
define(['ionic'], function () {
    angular.module('WorkStation.constants', [])

        .constant('APPCONSTANTS', {
            SPLASH_SCREEN_EXTRA_DELAY: 1000,
            PLATFORM_BACK_BUTTON_PRIORITY_VIEW: 110,
            EXIT_APP_CONFIRM_TIME: 2000,

            EXIT_APP_CONFIRM_STR: '再按一次退出工作站'
        });
});
