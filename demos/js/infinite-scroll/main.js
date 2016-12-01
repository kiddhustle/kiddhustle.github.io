define(
    ['jquery', 'mustache'], function($, Mustache){
        $(document).ready(
            function(e){
                var sButtonQry = '.videos__item__watch';
                //var aExtra = ['first', 'second', 'third','four'];
                var aExtra = [
                    {
                        description:'Beautiful sunrise',
                        thumbnail:'images/thumbs/sunrise.png',
                        duration:'2 mins 57 secs',
                        views:'200k',
                        variation:3
                    },
                    {
                        description:'Beautiful butterfly in the bushes',
                        thumbnail:'images/thumbs/butterfly.png',
                        duration:'2 mins  08 secs',
                        views:'187k',
                        variation:4
                    },
                    {
                        description:'Giraffe head-butting match',
                        thumbnail:'images/thumbs/giraffes.png',
                        duration:'2 mins 21 secs',
                        views:'200k',
                        variation:5
                    },
                    {
                        description:'Birds flying over the ocean',
                        thumbnail:'images/thumbs/seabirds.png',
                        duration:'2 mins 10 secs',
                        views:'187k',
                        variation:6
                    },
                    {
                        description:'Beautiful sunrise',
                        thumbnail:'images/thumbs/sunrise.png',
                        duration:'2 mins 57 secs',
                        views:'200k',
                        variation:7
                    },
                    {
                        description:'Beautiful butterfly in the bushes',
                        thumbnail:'images/thumbs/butterfly.png',
                        duration:'2 mins  08 secs',
                        views:'187k',
                        variation:8
                    },
                ];
                var iAdded = 0;
                var sItemTmp = $('#tpl_video_item').html();
                Mustache.parse( sItemTmp );
                // add on animation end CB (remove class)
                $( '#videos' ).on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
                    sButtonQry,
                    function(e){
                        //console.log('animate end');
                        var self = $(this);
                        self.removeClass('wobble animated');
                    }
                );
                // add on scroll CB (add class)
                $(document).on('scroll', function(e){
                    console.log('scrolled');
                    $( sButtonQry ).addClass('wobble animated');
                    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                        // you're at the bottom of the page
                        //console.log('bottom of page!');
                        // on scroll to bottom load extra content
                        if( iAdded < aExtra.length ){
                            for(var x=0; x<2;x++){
                                var rendered = Mustache.render( sItemTmp, aExtra[ iAdded ] );
                                $('#videos').append( rendered );
                                //console.log('render: ' + aExtra[ iAdded ] );
                                iAdded++;
                            }
                        }
                    }
                });
            }
        );
    }
);
