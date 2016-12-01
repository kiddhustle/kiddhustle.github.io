var require = {
    //baseUrl:'./js',
    paths:{
        jquery:'../../bower_components/jquery/dist/jquery.min',
        mustache:'../../bower_components/mustache/mustache',
        text:'../../bower_components/requirejs-text/text',
    },
    shim: {
        jquery:{
            exports:'$'
        },
        mustache:{
            deps:['text']
        }
    }
};