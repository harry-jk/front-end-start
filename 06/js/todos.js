//start...

//개발자도구에서 메세지확인
console.log('todos.js');

(function($, global){
    // id가 todoString 인 element 가져오기
    var $todoStringField = $('#todoString');
    var todoTemplateHtml = $('#todoTemplate').html();
    var $listDom = $('#todoList');

    $todoStringField.on('keyup', addTodo.bind(null, $todoStringField, todoTemplateHtml, $listDom));

    ////삭제버튼 이벤트 잡기 위해 상위에서 이벤트 listen 하기
    $listDom.on('click', '.delete',checkDelete.bind(null, $listDom));

    ////처음 로딩시에 기존에 저장된 데이터 가져와서 보여주기
    $listDom.html(loadData());
})(jQuery, window);