$(function(){
    var canvas = document.getElementById("myChart");
    var ctx = document.getElementById('myChart').getContext('2d');
    var data = {
            labels: ['PHP', 'CSS', 'JAVASCRIPT', 'SQL','JQUERY','HTML'],
            datasets: [{
                label: 'courses',
                data: [4, 7, 5, 7, 4, 7],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.4)',
                    'rgba(54, 162, 235, 0.4)',
                    'rgba(255, 206, 86, 0.4)',
                    'rgba(75, 192, 192, 0.4)',
                    'rgba(127, 0, 255, 0.4)',
                    'rgba(25, 255, 90, 0.4)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(127, 0, 255, 1)',
                    'rgba(25, 255, 90, 1)'
                ],
                borderWidth: 2.5
            }]
        };
    
    
    
            /*PIECHART*/
    var myChart = new Chart(ctx, {
        type: 'pie',
        data: data ,
    });
    
    
    function doScroll() {
      var el = document.querySelector('.flexbox');
      el.scrollTop = '0';
    }
    
    
            /*fait apparaitre les txt des competances*/
    canvas.onclick = function(evt) {
              var activePoints = myChart.getElementsAtEvent(evt);
              if (activePoints[0]) {
                var chartData = activePoints[0]['_chart'].config.data;
                var idx = activePoints[0]['_index'];
                var label = chartData.labels[idx];
                var value = chartData.datasets[0].data[idx];
                var url = "label = " + label + " value = " + value;
                switch(label){
                      case 'HTML' : 
                                    if($("#HTML").css("display") == "none" ){
                                        $("#HTML").show('slow');
                                        
                                       } else {
                                           $("#HTML").hide('slow');
                                        };
                                    $("#JAVASCRIPT").hide('slow');
                                    $("#CSS").hide('slow');
                                    $("#SQL").hide('slow');
                                    $("#JQUERY").hide('slow');
                                    $("#PHP").hide('slow');
                                    break;
                          
                      case 'CSS':    
                                    $("#HTML").hide('slow');
                                    $("#JAVASCRIPT").hide('slow');
                          
                                    if( $("#CSS").css("display") == "none" ){
                                    $("#CSS").show('slow');
                                       } else {
                                           $("#CSS").hide('slow');
                                        };
                                    $("#SQL").hide('slow');
                                    $("#JQUERY").hide('slow');
                                    $("#PHP").hide('slow');
                                    break;
                          
                      case 'JAVASCRIPT':   
                                    $("#HTML").hide('slow');
                                    if( $("#JAVASCRIPT").css("display") == "none" ){
                                    $("#JAVASCRIPT").show('slow');
                                       } else {
                                           $("#JAVASCRIPT").hide('slow');
                                       };
                                    $("#CSS").hide('slow');
                                    $("#SQL").hide('slow');
                                    $("#JQUERY").hide('slow');
                                    $("#PHP").hide('slow');
                                    break;
                          
                      case 'SQL': 
                                    $("#HTML").hide('slow');
                                    $("#JAVASCRIPT").hide('slow');
                                    $("#CSS").hide('slow');
                                    if( $("#SQL").css("display") == "none" ){
                                    $("#SQL").show('slow');
                                       } else {
                                           $("#SQL").hide('slow');
                                       };
                                    $("#JQUERY").hide('slow');
                                    $("#PHP").hide('slow');
                                    break;
                     case 'JQUERY': 
                                    $("#SQL").hide('slow');
                                    $("#HTML").hide('slow');
                                    $("#JAVASCRIPT").hide('slow');
                                    $("#CSS").hide('slow');
                                    if( $("#JQUERY").css("display") == "none" ){
                                    $("#JQUERY").show('slow');
                                       } else {
                                           $("#JQUERY").hide('slow');
                                       };
                                    $("#PHP").hide('slow');
                                    break;
                        
                        case 'PHP':
                                    $("#SQL").hide('slow');
                                    $("#HTML").hide('slow');
                                    $("#JAVASCRIPT").hide('slow');
                                    $("#CSS").hide('slow');
                                    $("#JQUERY").hide('slow');
                                    if( $("#PHP").css("display") == "none" ){
                                    $("#PHP").show('slow');
                                       } else {
                                           $("#PHP").hide('slow');
                                       };
                                    break;
                                
                      default: ;
                  } 
                  $(".flexbox").get(0).scrollIntoView();
              }
            };
            
       
            /*fait apparaitre texte cache dans la description*/
    $("#photoCVAxel").click(function(){
        var x = document.getElementById('descript');
        $(x).toggle(1000);    

    });
    
    
    
    $('[data-toggle="tooltip"]').tooltip(); 
    
    
});