// (function(){
//   var preload = document.getElementById("preload");
//   var loading = 0;
//   var id = setInterval(frame,64);
//
//   function frame(){
//     if(loading == 100){
//       clearInterval(id);
//       window.open("index.html");
//     } else{
//       loading = loading + 1;
//       if (loading == 90){
//         preload.style.animation = "fadeout 1s ease";
//       }
//     }
//   }
// });

var width = 100,
    perfData = window.performance.timing, // The PerformanceTiming interface represents timing-related performance information for the given page.
    EstimatedTime = -(perfData.loadEventEnd - perfData.navigationStart),
    time = parseInt((EstimatedTime/1000)%60)*100;

// Loadbar Animation
$(".loadbar").animate({
  width: width + "%"
}, time);


// Percentage Increment Animation
var PercentageID = $("#precent"),
		start = 0,
		end = 100,
		durataion = time;
		animateValue(PercentageID, start, end, durataion);

function animateValue(id, start, end, duration) {

	var range = end - start,
      current = start,
      increment = end > start? 1 : -1,
      stepTime = Math.abs(Math.floor(duration / range)),
      obj = $(id);

	var timer = setInterval(function() {
		current += increment;
		$(obj).text(current + "%");
      //obj.innerHTML = current;
		if (current == end) {
			clearInterval(timer);
		}
	}, stepTime);
}

// Fading Out Loadbar on Finised
setTimeout(function(){
  $('.preloader-wrap').fadeOut(300);
}, time);
