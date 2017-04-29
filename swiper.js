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
    currentIndex=index
  }

  function autoPlay(){
    timerId = setInterval(function(){
    goToSlide(currentIndex)
   // console.log(currentIndex)
    currentIndex++

    if(currentIndex>=count){
      currentIndex=0
    }
    },2000)
  }
   $el.on('mouseenter', function(){
     window.clearInterval(timerId)
   })    
   $el.on('mouseleave', function(){
     autoPlay()
   })

 controls()
 autoPlay()

  
}

slides($('.slides'))