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
    .setPin(".gnb")
    // .addIndicators({name: "GNB"})
    .addTo(ctrl);

  // --------------------------
  // scene. GNB_menu_activation
  // --------------------------
  var menu_vr_duration  = getOffset(query('.brand-name')).offsetTop;
  var menu_des_duration = getOffset(query('.feature-oculus-home')).offsetTop - menu_vr_duration;
  var menu_int_duration = getOffset(query('.feature-experiences')).offsetTop - menu_des_duration - menu_vr_duration;
  var menu_exp_duration = getOffset(query('.feature-stage-is-set')).offsetTop - menu_int_duration - menu_des_duration - menu_vr_duration;

  console.log(menu_vr_duration, menu_des_duration, menu_int_duration, menu_exp_duration);
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
  // scene. GEAR_VR
  // --------------------
  var scene_GEAR_VR = new SM.Scene({
  })

}(this, this.ScrollMagic));
