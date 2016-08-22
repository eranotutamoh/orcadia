angular
    .module('app_orcadia')
    .filter('capitalize', caps)
    .filter('addHtmlLineBreaks', breaks);

function caps() {
    return function(input) {
        return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
};

function breaks () {
    return function (text) {
        return (!!text)  ? text.replace(/\n/g, '<br/>') : '';
    };
}