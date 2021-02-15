$(function(){
  let char_index = 1;
  $(document).on("keypress",function(e){
    const $target = $("#char-"+char_index);
    const char = $target.text();
    if(e.key === char){
      $target.removeClass('default');
      $target.addClass('correct');
      char_index++;
    }
  });
});