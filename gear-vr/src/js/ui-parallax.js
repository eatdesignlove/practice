(function(global, SM){
  'use strict';

  var ctrl =  new SM.Controller();

  var scene = new SM.Scene({
                    triggerElement: ".page-main",
                    triggerHook : "0.075"
                    })
                    .setPin(".gnb")
                    .addIndicators({name: "1 (duration: 0)"}) // add indicators (requires plugin)
                    .addTo(controller);

}(this, this.ScrollMagic));
