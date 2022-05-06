// 모달
$(document).on('click',function () {
// 모달 띄우기
    $(".btn-open-popup").click(function () {
        $(".modal-overlay").fadeIn();
        $('body').css("overflow", "hidden");
    });
// 모달 닫기
    $(".close-area").click(function () {
        $(".modal-overlay").fadeOut();
        $('body').css("overflow", "scroll");
    });
});

// 팔로우 버튼 클릭시 팔로잉 변경
$(document).on('click',function () {
    $('.follow-btn').click(function () {
        if ($(this).html() == '팔로우') {
            $(this).html('팔로잉');
        } else {
            $(this).html('팔로우');
        }
    });
});



// 댓글 달기
// 수정 필요 ready
// $(document).ready(function () {
//     show_comment()
// });

$(document).on('click',function () {
    show_comment()
});

function add_comment(post_id) {
    let comment = $(`#${post_id}`).val()

    $.ajax({
        type: 'POST',
        url: '/comment',
        data: {comment_give: comment, post_give: post_id},
        success: function (response) {
            alert(response['msg'])
            window.location.reload()
        }
    })
}

function show_comment() {

    $.ajax({
        type: "GET",
        url: "/comment",
        data: {},
        success: function (response) {
            let rows = response['comments']
            for (let i = 0; i < rows.length; i++) {
                let comment = rows[i]['comments']
                let post_id = rows[i]['post_id']
                // let user_id = rows[i]['user_id']
                console.log(post_id)

                let temp_html = `<p style="font-weight: lighter"><span style="font-weight: bold">${post_id}</span> ${comment}</p>`

                $(`.${post_id}`).append(temp_html)
            }
        }
    });
}
