$(function(){
  let char_index = 1;
  let max_length = 3;
  let question_number = 1;

  $(document).on("keypress",function(e){
    const $target = $("#char-"+char_index);
    const char = $target.text();
    if(e.key === char){
      $target.removeClass('default');
      $target.addClass('correct');
      char_index++;
    }
  });
  
  if(max_length < question_number){
    changeQuestionWord();
    question_number++;
  }

  function changeQuestionWord() {

  }
  
});