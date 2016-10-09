(function(global, angular, $){
  'use strict';

  var myUploader = angular.module('myUploader', [
    'firebase'
  ]);

  // 파이어베이스 스토리지
  myUploader.controller('uploadController', function($scope, myService){
    var uploadCtrl = this;

    // 파이어베이스 저장소 참조
    var database = firebase.database();
    var storage = firebase.storage();  
    var storageRef = storage.ref();
    var imageRef = storageRef.child('images');

    // 플레이스홀더에 보여줄 이미지 객체의 배열
    uploadCtrl.photos = [];

    // 파이어베이스 저장소에서 초기데이터 가져오기
    myService.getAllData().$loaded().then(function(data){
      console.log(data);
      var l = data.length-1;
      if (l !== 0) {
        for (; 0 <= l; l--) {
          uploadCtrl.photos.push(data[l]);
        }
      }
    });

    // 심플 캐러셀
    uploadCtrl.caro_top = 0
    var moveLastImgPos = function() {
      uploadCtrl.caro_top = (uploadCtrl.photos.length*400*-1)+400;
    }
    uploadCtrl.nextImg = function(){
      // console.log('next');
      if (uploadCtrl.caro_top > (uploadCtrl.photos.length*400*-1)+400) {
        uploadCtrl.caro_top -= 400;
      } else {
        uploadCtrl.caro_top = 0;
      }
      // console.log(uploadCtrl.caro_top);
    };
    uploadCtrl.prevImg = function(){
      // console.log('prev');
      if (uploadCtrl.caro_top <= -400) {
        uploadCtrl.caro_top += 400;
      } else if (uploadCtrl.caro_top >= 0){
        uploadCtrl.caro_top = (uploadCtrl.photos.length*400*-1)+400;
      }
      // console.log(uploadCtrl.caro_top);
    };
    uploadCtrl.removeData = function(id){
      myService.removeData(id);
    }
    // 파이어베이스 저장소로 업로드
    uploadCtrl.upload = function(){
      var uploaders = document.querySelectorAll('.comp__uploader');
      var l = uploaders.length-1;

      var setStorageData = function(upload_files, fileName) {
        var uploadTask = storageRef.child('images/' + fileName).put(upload_files.files[0]);
        // 업로드 이벤트 핸들러
        uploadTask.on('state_changed', function(snapshot){
          // 이벤트 상태 관찰
          if (snapshot.state === 'running') {
            var btn = document.querySelector('.btn__submit');
            $(btn).addClass('active');
            btn.innerHTML = "<div class='loader'></div>";
          }
        }, function(error) {
          console.log(error);

        }, function() {
          // 파일 업로드 완료시 실행할 동작들
          var btn = document.querySelector('.btn__submit');
          $(btn).removeClass('active');
          btn.innerHTML = '업로드';
            var downloadURL = uploadTask.snapshot.downloadURL;
            var photo = {
              "name": fileName,
              "url": downloadURL
            };
            console.log(photo);
            myService.setData(photo);
            $scope.$apply(function(){
              uploadCtrl.photos.push(photo);
              moveLastImgPos();
            });
        });
      };


      for (; 0 <= l ; l--) {
        var file = uploaders[l].files[0];

        if ( !!uploaders[l] !== false && file != undefined ) {
          var fileName = file.name.toLowerCase();
          console.log(fileName);
          // 파일 사이즈 필터링
          if (file["size"] > 2097152) {
            alert('2MB 이상의 파일을 업로드하실 수 없습니다.')
            uploaders[l].value = '';
            continue;
          }
          // 이미지 파일 필터링
          var type_val = false;
          fileName.indexOf('.jpg') !== -1 ? type_val = true : 
          fileName.indexOf('.jpeg')!== -1 ? type_val = true :
          fileName.indexOf('.gif') !== -1 ? type_val = true : 
          fileName.indexOf('.png') !== -1 ? type_val = true : alert('이미지 파일만 업로드 가능합니다.');
          console.log(type_val);
          if ( type_val === true ) {
            // 파이어베이스 저장소에 바로 업로드
            setStorageData(uploaders[l], fileName);
          }
          // input 초기화
          uploaders[l].value = '';
        }
      }
    }
  });

  angular.module('myUploader')
    .service('myService', function($firebaseArray, $firebaseObject){
      this.getAllData = function(){
        var ref = firebase.database().ref('storage');
        return $firebaseArray(ref);
      }
      this.setData = function(item){
        return firebase.database().ref('storage').push(item);
      }
      this.removeData = function(itemId){
        return firebase.database().ref('projects/'+ itemId).remove();
      }
    })
}(this, this.angular, this.jQuery));


