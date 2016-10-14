(function(global, SM){
  'use strict';

  var ctrl =  new SM.Controller();

  // --------------------
  // scene. GNB_sticky 
  // --------------------
  var scene_GNB_sticky = new SM.Scene({
    triggerElement: ".page-main",
    triggerHook : "0.075"
  });
  scene_GNB_sticky
    .setPin(".container__gnb")
    // .addIndicators({name: "GNB"})
    .addTo(ctrl);

  // --------------------------
  // scene. GNB_menu_activation
  // --------------------------
  var menu_vr_duration  = getOffset(query('.brand-name')).offsetTop;
  var menu_des_duration = getOffset(query('.feature-oculus-home')).offsetTop - menu_vr_duration;
  var menu_int_duration = getOffset(query('.feature-experiences')).offsetTop - menu_des_duration - menu_vr_duration;
  var menu_exp_duration = getOffset(query('.feature-stage-is-set')).offsetTop - menu_int_duration - menu_des_duration - menu_vr_duration;

  // console.log(menu_vr_duration, menu_des_duration, menu_int_duration, menu_exp_duration);
  var scene_GNB_menu_vr = new SM.Scene({
    triggerElement  : ".brand-product",
    triggerHook     : "0.5",
    duration        : menu_vr_duration
  });
  scene_GNB_menu_vr
    .setClassToggle('.menu-vr', 'active')
    // .addIndicators({name: "GNB-vr"})
    .addTo(ctrl);

  var scene_GNB_menu_design = new SM.Scene({
    triggerElement   : ".brand-name",
    triggerHook      : "0.5",
    duration        : menu_des_duration
  });
  scene_GNB_menu_design
    .setClassToggle('.menu-des', 'active')
    // .addIndicators({name: "GNB-design"})
    .addTo(ctrl);

  var scene_GNB_menu_interface = new SM.Scene({
    triggerElement: ".feature-oculus-home",
    triggerHook : "0.5",
    duration        : menu_int_duration
  });
  scene_GNB_menu_interface
    .setClassToggle('.menu-int', 'active')
    // .addIndicators({name: "GNB-interface"})
    .addTo(ctrl);

  var scene_GNB_menu_experience = new SM.Scene({
    triggerElement: ".feature-experiences",
    triggerHook : "0.5",
    duration        : menu_exp_duration
  });
  scene_GNB_menu_experience
    .setClassToggle('.menu-exp', 'active')
    // .addIndicators({name: "GNB-experience"})
    .addTo(ctrl);

  var scene_GNB_menu_com = new SM.Scene({
    triggerElement: ".feature-stage-is-set",
    triggerHook : "0.5"
  });
  scene_GNB_menu_com
    .setClassToggle('.menu-com', 'active')
    // .addIndicators({name: "GNB-comptibilty"})
    .addTo(ctrl);

  // --------------------
  // scene. page_menu_activation
  // --------------------

  var scene_page_menu_state = new SM.Scene({
    triggerHook : "0"
  });

  scene_page_menu_state
    .offset(150)
    .setClassToggle('.page-menu', 'para-fixed')
    // .addIndicators({name: "page-menu-state"})
    .addTo(ctrl);

  // scene_page_menu
  var page_fixed_menu = query('.page-menu-fixed');
  var scene_page_menu = new SM.Scene({
    triggerElement: ".page-main",
    triggerHook : "0.12"
  });

  scene_page_menu
    .setClassToggle('.page-menu', 'hide')
    .on("enter leave", function (e) {
      // console.log(e.type === 'leave' && e.target.controller().info("scrollDirection") === 'FORWARD');
      // console.log(e.type === 'enter');
      if (e.type === 'leave' && e.target.controller().info("scrollDirection") === 'FORWARD') {
        btn_scroll_edge.setAttribute('data-section-title', 'page-main');
      } else if (e.type === 'enter'){
        btn_scroll_edge.setAttribute('data-section-title', 'page-header');
      }
    })
    // .addIndicators({name: "page-menu"})
    .addTo(ctrl);

  // scene_page_menu_fixed
  var scene_page_menu_fixed = new SM.Scene({
    triggerElement: ".page-main",
    triggerHook : "0.075"
  });

  scene_page_menu_fixed
    .on("enter leave", function (e) {
      // console.log(e.type === 'leave');
      if (e.type === 'enter' && e.target.controller().info("scrollDirection") === 'FORWARD') {
        css(page_fixed_menu, 'display', 'block');
        setTimeout(function(){ addClass(page_fixed_menu, 'show') } , 250);
      } else if (e.type === 'leave'){
        removeClass(page_fixed_menu, 'show');
        setTimeout(function(){ css(page_fixed_menu, 'display', 'none') } , 250);
      }
    })
    // .setClassToggle('.page-menu-fixed', 'show')
    .addTo(ctrl);

  // --------------------
  // scene. btn_scroll_edge
  // --------------------
  var btn_scroll_edge = query('.btn__scroll-to-edge');
  var scene_btn_scroll_edge = new SM.Scene({
    triggerElement: ".page-main",
    triggerHook : "0.9"
  });
  scene_btn_scroll_edge
    .setClassToggle('.btn__scroll-to-edge', 'fixed')
    // .addIndicators({name: "GNB-comptibilty"})
    .addTo(ctrl);

  var scene_btn_scroll_edge_footer = new SM.Scene({
    triggerElement: ".page-footer",
    triggerHook : "1"
  });
  scene_btn_scroll_edge_footer 
    .setClassToggle('.btn__scroll-to-edge', 'hide')
    .addTo(ctrl);

}(this, this.ScrollMagic));

(function(global, SM){
  'use strict';
  // --------------------
  // scene. GEAR_VR
  // --------------------
  var ctrl =  new SM.Controller();
  var vf_vr = query('.vf__vr-device'), changed;
  css(vf_vr, 'top', '-55px');

  var scene_GEAR_VR = new SM.Scene({
    triggerElement: ".page-header",
    triggerHook: "0",
    duration: 400
  })
  scene_GEAR_VR
    .on("progress", function (e) {
      changed = e.progress * 30;
      // console.log('progress : ' , e.progress);
      css(vf_vr, 'transform', 'translateY('+ changed +'px)')
    })
    // .addIndicators({name: "para-vr"})
    .addTo(ctrl);
  
}(this, this.ScrollMagic));


(function(global, SM){
  'use strict';
  // --------------------
  // scene. Supreme comfort 
  // --------------------
  var ctrl =  new SM.Controller();
  var vf_key_img = query('.feature-supreme-comfort .vf__key-image'), changed;
  var scene_supreme = new SM.Scene({
    triggerElement: ".feature-supreme-comfort",
    triggerHook: "0",
    duration: 1000
  })
  scene_supreme
    .on("progress", function (e) {
      changed = e.progress * 100;
      css(vf_key_img, 'transform', 'translateY(-'+ changed +'px)')
    })
    // .addIndicators({name: "para-supreme"})
    .addTo(ctrl);

}(this, this.ScrollMagic));


(function(global, SM){
  'use strict';
  // --------------------
  // scene. Complete focus 
  // --------------------
  var ctrl =  new SM.Controller();
  var vf_container = query('.feature-complete-focus');
  var vf_key_img = query('.feature-complete-focus .vf__exp-device'), changed;
  var scene_complete = new SM.Scene({
    triggerElement: ".feature-complete-focus",
    triggerHook: "0",
    duration: 1200
  })
  scene_complete
    .setPin(".feature-complete-focus")
    .on("progress", function (e) {
      changed = 1 + e.progress * 2;
      // console.log('progress-s: ' , e.progress);
      css(vf_key_img, 'transform', 'scale('+ changed +')')
    })
    .on("enter leave", function (e) {
      // console.log(e.type === 'leave');
      if (e.type === 'leave' && e.target.controller().info("scrollDirection") === 'FORWARD') {
        addClass(vf_key_img, 'para-done');        
        addClass(vf_container, 'para-done');        
      } else if (e.type === 'enter'){
        removeClass(vf_key_img, 'para-done');        
        removeClass(vf_container, 'para-done'); 
      }
    })
    // .addIndicators({name: "para-supreme"})
    .addTo(ctrl);
  
}(this, this.ScrollMagic));
 
(function(global, SM){
  'use strict';
  // --------------------
  // scene. feature-galaxy-connection 
  // --------------------
  
  var ctrl =  new SM.Controller();
  var vf_key_img = query('.feature-galaxy-connection .vf__key-image'), changed;
  var scene_galaxy_connection = new SM.Scene({
    triggerElement: ".feature-galaxy-connection",
    triggerHook: "0",
    duration: 400
  })
  scene_galaxy_connection
    .on("progress", function (e) {
      changed = e.progress * 80;
      css(vf_key_img, 'transform', 'translateY('+ changed +'px)')
    })

    // .addIndicators({name: "para-connection"})
    .addTo(ctrl);
  
}(this, this.ScrollMagic));

 
(function(global, SM){
  'use strict';
  // --------------------
  // scene. feature-oculus-home
  // --------------------
  
  var ctrl =  new SM.Controller();
  var vf_key_img = query('.feature-oculus-home .vf__key-image'), changed;
  var scene_oculus_home = new SM.Scene({
    triggerElement: ".feature-oculus-home",
    triggerHook: "0",
    duration: 800
  })
  scene_oculus_home
    .on("progress", function (e) {
      changed = e.progress * 50;
      css(vf_key_img, 'transform', 'translateY(-'+ changed +'px)')
    })
    // .addIndicators({name: "para-oculus-home"})
    .addTo(ctrl);
  
}(this, this.ScrollMagic));

 
(function(global, SM){
  'use strict';
  // --------------------
  // scene. feature-optimized-for-gear
  // --------------------
  
  var ctrl =  new SM.Controller();
  var vf_key_img = query('.feature-optimized-for-gear .vf__gallaxy-device'), changed;
  
  // Gallaxy-Device.
  var scene_show_device = new SM.Scene({
    triggerElement: ".feature-optimized-for-gear",
    triggerHook: "0",
    duration: 200
  })
  scene_show_device
    .on("progress", function (e) {
      changed = 100 - e.progress * 100;
      // console.log(changed);
      css(vf_key_img, 'transform', 'translate(-50%, '+ changed +'px)');
      css(vf_key_img, 'opacity', e.progress);
    })
    // .addIndicators({name: "show_device"})
    .addTo(ctrl);

  // Component.
  var comp_sipwer = query('.ui-swiper');
  var scene_show_component = new SM.Scene({
    triggerElement: ".feature-optimized-for-gear .vf__gallaxy-device",
    triggerHook: "0.3",
    duration: 150
  })
  scene_show_component
    .on("progress", function (e) {
      changed = e.progress;
      css(comp_sipwer, 'opacity', changed);
    })
    .on("enter leave", function (e) {
      if (e.type === 'leave' && e.target.controller().info("scrollDirection") === 'REVERSE') {
        css(comp_sipwer, 'opacity', 0);       
      } 
    })
    // .addIndicators({name: "show_component"})
    .addTo(ctrl);
  
}(this, this.ScrollMagic));

 
(function(global, SM){
  'use strict';
  // --------------------
  // scene. feature-stage-is-set
  // --------------------
  
  var ctrl =  new SM.Controller();
  var vf_key_img_g360 = query('.feature-stage-is-set .item-g360');
  var vf_key_img_gnote = query('.feature-stage-is-set .item-gnote');
  var changed;
  
  var scene_moving_figure = new SM.Scene({
    triggerElement: ".feature-stage-is-set",
    triggerHook: "0",
    duration: 650
  })
  scene_moving_figure
    .on("progress", function (e) {
      changed = 50 + e.progress * 10;
      // console.log(changed);
      css(vf_key_img_g360, 'transform', 'translateX('+ changed +'%)');
      css(vf_key_img_gnote, 'transform', 'translateX(-'+ changed +'%)');
    })
    // .addIndicators({name: "show_stage"})
    .addTo(ctrl);

  
}(this, this.ScrollMagic));

(function(global, SM){
  'use strict';
  // --------------------
  // scene. feture-vr-gallery
  // --------------------
  
  var ctrl =  new SM.Controller();
  var vf_key_img1 = query('.feture-vr-gallery .gallery-1 img');
  var vf_key_img2 = query('.feture-vr-gallery .gallery-2 img');
  var vf_key_img3 = query('.feture-vr-gallery .gallery-3 img');
  var changed;
  
  var scene_gallery = new SM.Scene({
    triggerElement: ".feture-vr-gallery",
    triggerHook: "0.8",
    duration: 1000
  })
  scene_gallery
    .on("progress", function (e) {
      changed = 1 + e.progress * 0.1;
      css(vf_key_img1, 'transform', 'scale('+ changed +')');
      css(vf_key_img2, 'transform', 'scale('+ changed +')');
      css(vf_key_img3, 'transform', 'scale('+ changed +')');
    })
    // .addIndicators({name: "show_gallery"})
    .addTo(ctrl);
  
}(this, this.ScrollMagic));
