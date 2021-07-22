// document.addEventListener('DOMContentLoaded', function(){
//   // alert('Caricamento completato')
//   setTimeout(function(){
//     // Global vars to cache event state
//     var evCache = new Array();
//     init()
//
//
//
// function init() {
// // // Install event handlers for the pointer target
// var el=document.getElementById('graph');
// el.addEventListener('touchstart', function(e) {e.preventDefault(); e.stopImmediatePropagation()}, {passive: false});
// el.addEventListener('touchmove', function(e) {e.preventDefault(); e.stopImmediatePropagation()}, {passive: false});
// el.addEventListener('touchend', function(e) {e.preventDefault(); e.stopImmediatePropagation()}, {passive: false});
//
//  el.ontouchenter = false_func;
//  el.ontouchleave = false_func;
//  el.ontouchstart = false_func;
//  el.ontouchmove = false_func;
//  el.ontouchend = false_func;
//
//  }
//
//
//  function false_func(ev){
//
//    console.log("Prevented")
//    return false;
//      ev.preventDefault()
//  }
//
//  function pointerdown_handler(ev) {
//  // The pointerdown event signals the start of a touch interaction.
//  // This event is cached to support 2-finger gestures
//  evCache.push(ev);
// //  if (evCache.length == 1) {
// //  singleTouchHandler(ev);
// // // singleTouchHandler(ev);
// //  }
//  // if (evCache.length > 1) {
//  //     ev.preventDefault();
//  //     // ev.stopImmediatePropagation();
//  // }
//  // console.log('Down')
//  log("pointerDown", ev);
// }
//
//  function pointermove_handler(ev) {
//  // This function implements a 2-pointer horizontal pinch/zoom gesture.
//  //
//  // If the distance between the two pointers has increased (zoom in),
//  // the target element's background is changed to "pink" and if the
//  // distance is decreasing (zoom out), the color is changed to "lightblue".
//  //
//  // This function sets the target element's border to "dashed" to visually
//  // indicate the pointer's target received a move event.
//  log("pointerMove N "+evCache.length, ev);
//
//  // ev.target.style.border = "dashed";
//
//  // Find this event in the cache and update its record with this event
//  for (var i = 0; i < evCache.length; i++) {
//    if (ev.pointerId == evCache[i].pointerId) {
//       evCache[i] = ev;
//    break;
//    }
//  }
//
//
//  // If two pointers are down, check for pinch gestures
//  if (evCache.length == 2) {
//
//    // Calculate the distance between the two pointers
//    var curDiffX = Math.abs(evCache[0].clientX - evCache[1].clientX);
//    var curDiffY = Math.abs(evCache[0].clientY - evCache[1].clientY);
//    var curDiff = Math.sqrt( Math.pow(curDiffX,2) + Math.pow(curDiffX,2));
//    // var clientCenterX = Math.abs((evCache[0].clientX + evCache[1].clientX)/2);
//    // var clientCenterY = Math.abs((evCache[0].clientY + evCache[1].clientY)/2);
//    // var screenCenterX = Math.abs((evCache[0].screenX + evCache[1].screenX)/2);
//    // var screenCenterY = Math.abs((evCache[0].screenY + evCache[1].screenY)/2);
//
//    if (prevClientX<0) {var clientCenterX = Math.abs((evCache[0].clientX + evCache[1].clientX)/2);
//      var s = 'New Ccenter X: ' + clientCenterX;
//      // console.log(s + "\n");
//    }
//    else {var clientCenterX = prevClientX;
//      //console.log("Using prevClientX\n");
//    }
//
//    if (prevClientY<0) {var clientCenterY = Math.abs((evCache[0].clientY + evCache[1].clientY)/2);
//      var s = 'New Ccenter Y: ' + clientCenterY;
//      // console.log(s + "\n");
//    }
//    else {var clientCenterY = prevClientY;
//      //console.log("Using prevClientY\n");
//    }
//
//    if (prevScreenX<0) {var screenCenterX = Math.abs((evCache[0].screenX + evCache[1].screenX)/2);
//      var s = 'New Scenter X: ' + screenCenterX;
//      // console.log(s + "\n");
//    }
//    else {var screenCenterX = prevScreenX;
//      //console.log("Using prevScreenX\n");
//    }
//
//    if (prevScreenY<0) {var screenCenterY = Math.abs((evCache[0].screenY + evCache[1].screenY)/2);
//      var s = 'New Scenter Y: ' + screenCenterY;
//      // console.log(s + "\n");
//    }
//    else {var screenCenterY = prevScreenY;
//      //console.log("Using prevScreenY\n");
//    }
//
//    if (prevDiff > 0) {
//      var simulatedEvent = new WheelEvent('wheel', {
//          bubbles: true, // only bubbles and cancelable
//          cancelable: true, // work in the Event constructor
//          isTrusted: true,
//          screenX: screenCenterX,
//          screenY: screenCenterY,
//          clientX: clientCenterX,
//          clientY: clientCenterY,
//          deltaY: (prevDiff-curDiff),
//        });
//        evCache[0].target.dispatchEvent(simulatedEvent);
//    }
//
//    // Cache the distance for the next move event
//    ev.preventDefault();
//    ev.stopImmediatePropagation();
//    prevDiff = curDiff;
//    prevClientX = clientCenterX;
//    prevClientY = clientCenterY;
//    prevScreenX = screenCenterX;
//    prevScreenY = screenCenterY;
//  }
//
//  if (evCache.length == 3) {
//
//    // Calculate the distance between the two pointers
//    var client3CenterX = Math.abs((evCache[0].clientX + evCache[1].clientX + evCache[2].clientX)/3);
//    var client3CenterY = Math.abs((evCache[0].clientY + evCache[1].clientY + evCache[2].clientY)/3);
//    var screen3CenterX = Math.abs((evCache[0].screenX + evCache[1].screenX + evCache[2].screenX)/3);
//    var screen3CenterY = Math.abs((evCache[0].screenY + evCache[1].screenY + evCache[2].screenY)/3);
//
//
//
//        var opts = {
//            bubbles: true, // only bubbles and cancelable
//            cancelable: true, // work in the Event constructor
//            isTrusted: true,
//          screenX: screen3CenterX,
//          screenY: screen3CenterY,
//          clientX: client3CenterX,
//          clientY: client3CenterY,
//          ctrlKey: true,
//        };
//
//        var simulatedEvent2 = new MouseEvent("mousemove", opts);
//        evCache[0].target.dispatchEvent(simulatedEvent2);
//
//        ev.preventDefault();
//        ev.stopImmediatePropagation();
//
//
//  }
//
//
// }
//
//
// function pointerup_handler(ev) {
//   log(ev.type, ev);
//   // Remove this pointer from the cache and reset the target's
//   // background and border
//   // if (evCache.length > 1) {
//   //     ev.preventDefault();
//   //     ev.stopImmediatePropagation();
//   // }
//  //  if (evCache.length == 1) {
//  //  singleTouchHandler(ev);
//  // // singleTouchHandler(ev);
//  //  }
//   remove_event(ev);
//
//
//   // ev.target.style.border = "1px solid white";
//
//   // If the number of pointers down is less than two then reset diff tracker
//   if (evCache.length < 2) {
//     prevDiff = -1;
//     prevClientX = -1;
//     prevClientY = -1;
//     prevScreenX = -1;
//     prevScreenY = -1;
//   }
// }
//
// function remove_event(ev) {
//  // Remove this event from the target's cache
//  for (var i = 0; i < evCache.length; i++) {
//    if (evCache[i].pointerId == ev.pointerId) {
//      evCache.splice(i, 1);
//      break;
//    }
//  }
// }
//
// // Log events flag
// var logEvents = true;
//
//
// function log(prefix, ev) {
//   var s = prefix + ": pointerID = " + ev.pointerId +
//                 " ; pointerType = " + ev.pointerType;// +
//                 // " ; isPrimary = " + ev.isPrimary;
//   // alert(s + " ");
//   // console.log(s + "\n");
// }
//
// function singleTouchHandler(event)
// {
//   // alert(event.touches.length)
//     // alert(`touchHandler triggered for event ${event.type}`)
//     // console.log(`touchHandler triggered for event ${event.type}`);
//     if (event.touches.length<1) {
//       var touches = event.changedTouches,
//           first = touches[0],
//           type = '';
//
//           switch(event.type)
//           {
//             case 'touchenter': type = 'mouseover'; break;
//             case 'touchleave': type = 'mouseout';  break;
//             case 'touchstart': type = 'mousedown'; break;
//             case 'touchmove':  type = 'mousemove'; break;
//             case 'touchend':   type = 'mouseup';   break;
//             default:           return;
//           }
//
//           var opts = {
//             bubbles: true,
//             screenX: first.screenX,
//             screenY: first.screenY,
//             clientX: first.clientX,
//             clientY: first.clientY,
//           };
//
//           var simulatedEvent = new MouseEvent(type, opts);
//
//           first.target.dispatchEvent(simulatedEvent);
//           event.preventDefault();
//         }
//
//
//         if (event.touches.length>0) {
//           event.preventDefault();
//         }
// }
//   }, 2000);
// });
