$(function(){
    var $mainmenuItems = $("#mainMenu ul").children("li"),
    totalItems = $mainmenuItems.length, openedIndex = 2;
    
    var init = function(){
        bindEvents();
        if(valdIndex(openedIndex)){
              animateItem($mainmenuItems.eq(openedIndex), true, 700);
        };
    },
        
    bindEvents = function(){  
        $mainmenuItems.children(".images").click(function(){ //qquand on click sur un div .images on execute la fonction
            var newIndex = $(this).parent().index(); // l'element cliqué . son parent, donc le li, il en ressort l'index --l'index du li
            checkAndAnimateItem(newIndex);
        });
        
        $(".button").hover(function(){
            $(this).addClass("hovered");
            },function(){
                $(this).removeClass("hovered");
            }
        );
        $(".button").click(function(){
           var newIndex =  $(this).index();
            checkAndAnimateItem(newIndex);
            
        });
    },
        
    valdIndex = function(indexToCheck){
        return (indexToCheck >=0 )&& (indexToCheck <= totalItems);
    },
    
    animateItem = function($item, toOpen, speed){
        var $colorImage = $item.find(".color"), //on met l image colore dans une variable, correspond a l 'image de l item vu au dessus
        itemParam = toOpen ? { width:"420px"} : {width : "140px" },
        colorImageParam = toOpen ? {left:"0px"} : {left : "140px"};
            
        $colorImage.animate(colorImageParam, speed); 
        $item.animate(itemParam, speed);
    },
    
    checkAndAnimateItem = function(indextoCheckAndAnimate){
        
            if(openedIndex == indextoCheckAndAnimate){
                animateItem($mainmenuItems.eq(indextoCheckAndAnimate), false, 240);
                openedIndex = -1;
            } else {
                if (valdIndex(indextoCheckAndAnimate) ){
                    animateItem($mainmenuItems.eq(openedIndex), false, 240);
                    openedIndex = indextoCheckAndAnimate;
                    animateItem($mainmenuItems.eq(openedIndex), true, 240);
                } 
            }
    };
   
    init(); 
            
            
   
});