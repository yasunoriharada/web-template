/**
 * トップに戻るボタン
 */
 export default function() {
    $('.gotop > a').on('click' ,function(){
      $('html,body').animate({
        'scrollTop': $('body').offset().top
      },{
        'duration':'normal','easing':'swing','queue':false
      });
      return false;
    });
  }