$(function(){
  let char_index = 1;
  let max_length = 3;
  let question_number = 1;
  const $yomi = $("#yomi");
  const $mondai = $("#mondai");
  const mondai_list = [
    {yomi: "ごはん", text:"gohan"},
    {yomi: "おすし", text:"osushi"},
    {yomi: "サイフ", text:"saifu"},
    {yomi: "バナナ", text:"banana"},
    {yomi: "くつした", text:"kutusita"},
  ];
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
    $yomi.text(mondai_list[question_number]["yomi"]);

  }

});