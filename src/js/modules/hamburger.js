/**
 * ハンバーガーメニュー開閉
 */
export default function () {
    $('.l-header_hamburger_wrap').on('click' ,function() {
        $('.l-header_hamburger').toggleClass('is-menuopen');
    })
}


