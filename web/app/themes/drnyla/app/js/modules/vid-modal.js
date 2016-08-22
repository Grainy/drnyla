var vidModal = (function($) {
    var $vidModal = $("#vid-modal");

    function init() {
        _bind();
    }

    var setupWistiaVidz = function(){
        $('.js-wistia-hero').each(function(e) {

            var wistiaID =  $(this).data('wistia-id'),
                videoFoamSetting =  $(this).data('video-foam');

            wistiaEmbed = Wistia.embed(wistiaID, {
                videoFoam: videoFoamSetting,
                autoPlay: true,
                controlsVisibleOnLoad: true,
                volumeControl: false,
                playbar: false,
                fullscreenButton: false,
                smallPlayButton: false,
                container: "wistia_hero_" + wistiaID,
                volume: 0,
                endVideoBehavior: "loop"
            });
        });

    };

    var revealVideoModalHandler = function(el){
        var videoSrc = $(el).attr('href');
        var wistiaID = $(el).data('wistia-id');
        var modalHTML = '<div id="wistia_' + wistiaID + '"' + ' class="wistia_embed">&nbsp;</div>';

        $('#vid-modal').addClass('animated');
        $('#vid-modal').find('.js-wistia-embed').html(modalHTML);

        wistiaEmbed = Wistia.embed(wistiaID, {
            autoPlay: true,
            controlsVisibleOnLoad: true,
            volumeControl: false,
            playbar: true,
            fullscreenButton: false,
            smallPlayButton: true
        });

        //close the video modal when play finishes
        wistiaEmbed.bind("end", function () {

            $('#vid-modal').removeClass('animated');
            setTimeout(function(){
                 $('#vid-modal').find('.js-wistia-embed').html("");
            }, 200);
        });

        return false;
    };

    var _bind = function() {
        $('.js-reveal-video-modal').each(function(){
            $(this).on("click", function(e) {
                var el = $(this);
                revealVideoModalHandler(el);
            });
        });

        $("#js-close-vid-modal").click(function(e) {
            //reset the video
            $('#vid-modal').removeClass('animated');
            setTimeout(function(){
                 $('#vid-modal').find('.js-wistia-embed').html("");
            }, 200);

            e.preventDefault();
        });
    };

    return {
        init: init,
        revealVideoModalHandler: revealVideoModalHandler,
        setupWistiaVidz: setupWistiaVidz
    };
}(jQuery));

jQuery(window).load(function($) {
    vidModal.init();

    if(jQuery('.js-wistia-hero').length){
        vidModal.setupWistiaVidz();
    }
});
