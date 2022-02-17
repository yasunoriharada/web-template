export default function() {
    // 別ページからのリンク対策
    // const headerHeight = $('.l-header').height();
    // if (location.hash !== "") {
    //     var targetOffset = $(location.hash).offset().top;
    //     $(window).scrollTop(targetOffset - headerHeight);
    // }

    // 同一ページ内スムーススクロール
    $('a[href^="#"]').on('click', function () {
        let speed = 500;
        let href = $(this).attr("href");
        let target = $(href == "#" || href == "" ? 'html' : href);
        let position = target.offset().top - headerHeight;
        $("html, body").animate({ scrollTop: position }, speed, "swing");
        return false;
    });
}