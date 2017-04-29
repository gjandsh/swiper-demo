window.slides = function(element){
  var $el = $(element)
  let $view = $el.children('.view')
  var width = $el.width()
  var count = $el.find('.slide').length
  var currentIndex = 0
  let timerId

  function controls(){
    var $ol = $('<ol class="controls"></ol>')
    for(let i = 0;i<count; i++){
    $ol.append(`<li>${i+1}</li>`)
    }
    $el.append($ol)
    $item = $ol.find('li')
    $item.eq(0).addClass('active');
    $ol.on('click','li', function(e){ 
    let $li = $(e.currentTarget)
    let index = $li.index()
      goToSlide(index)
    })
  }
   
  function goToSlide(index){
    if(index<0){
      index = count - 1
    }else if(index>= count){
      index = 0
    }
    let number = - width * index
    $view.css({transform: `translateX(${number}px)`})
    cyclic(index)
    $item.removeClass('active');
    $item.eq(index).addClass('active');
    currentIndex = index
    currentIndex=index
  }

  function cyclic(index){
    if(index === 0&&currentIndex===count-1){
      let $li = $el.find('.slide').eq(0).clone()
      $li.appendTo($view)
      let number = - width * count
      $view.css({transform: `translateX(${number}px)`})
      $view.one("transitionend", function(){
      $li.remove()
      let oldTransition = $view.css('transition')
      $view.css({
      transition: 'none',
      transform: `translateX(0px)`
      })
      $view.offset()
      $view.css('transition', oldTransition)
      })
     return
    }
  }
  
  function autoPlay(){
    timerId = setInterval(function(){
    goToSlide(currentIndex+1)
    },2000)
  }
   $view.on('mouseenter', function(){
     window.clearInterval(timerId)
   })    
   $view.on('mouseleave', function(){
     autoPlay()
   })

 controls()
 autoPlay()
  
}

slides($('.slides'))