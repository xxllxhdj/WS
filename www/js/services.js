/**
 * Created by xuxle on 2015/6/26.
 */
define(['ionic'], function () {
    angular.module('WorkStation.services', [])

        .constant('APPCONSTANTS', {
            APP_NAME: 'workstation',
            SPLASH_SCREEN_EXTRA_DELAY: 1000,
            PLATFORM_BACK_BUTTON_PRIORITY_VIEW: 110,
            EXIT_APP_CONFIRM_TIME: 2000,

            EXIT_APP_CONFIRM_STR: '再按一次退出工作站'
        });
});