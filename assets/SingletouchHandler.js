document.addEventListener('DOMContentLoaded', function(){
  //alert('Caricamento completato')
  setTimeout(function(){
  // var myPlot = document.getElementById('graph');
  var myPlot = document.getElementById('map-2D-div');
  // var myPlot = document.getElementById('my_js');
  //myPlot.addEventListener('touchenter', (event) => singleTouchHandler(event));
  //myPlot.addEventListener('touchleave', (event) => singleTouchHandler(event));
  myPlot.addEventListener('touchstart', (event) => singleTouchHandler(event));
  myPlot.addEventListener('touchmove', (event) => singleTouchHandler(event));
  myPlot.addEventListener('touchend', (event) => singleTouchHandler(event));
  //myPlot.addEventListener('wheel', (event) => alert('wheel'));
  //myPlot.addEventListener('mouseover', (event) => touchHandler(event));

//////////////////////////////////////////////
//////////////////////////////////////////////

}, 2000);

});

function singleTouchHandler(event)
{
  // alert(event.touches.length)
    // console.log(`touchHandler triggered for event ${event.type}`);
    if (event.touches.length<2) {
        event.preventDefault();
      var touches = event.changedTouches,
          first = touches[0],
          type = '';

          //alert(`touchHandler triggered for event ${event.type}`)
          switch(event.type)
          {
            case 'touchenter': type = 'mouseover'; break;
            case 'touchleave': type = 'mouseout';  break;
            case 'touchstart': type = 'mousedown'; break;
            case 'touchmove':  type = 'mousemove'; break;
            case 'touchend':   type = 'mouseup';   break;
            default:           return;
          }
            //alert(`touchHandler triggered for event ${type}`)

          var opts = {
            bubbles: true,
            screenX: first.screenX,
            screenY: first.screenY,
            clientX: first.clientX,
            clientY: first.clientY,
          };

          var simulatedEvent = new MouseEvent(type, opts);
          first.target.dispatchEvent(simulatedEvent);
          //alert(event.touches.length)
          //event.preventDefault();
        }


        //if (event.touches.length>0) {
        //  event.preventDefault();
        //}
}
