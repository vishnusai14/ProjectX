
document.onscroll = function () {

   var nav = document.querySelector("nav").getBoundingClientRect()
   var form = document.querySelector("#searchform").getBoundingClientRect()   
   var navx = nav.left + nav.width/2;
   var navy = nav.top + nav.height/2;
   var formx = form.left + form.width/2;
   var formy = form.top + form.height/2;
   var distanceSquared = Math.pow(navx - formx, 2) + Math.pow(navy - formy, 2);
   var distance = Math.sqrt(distanceSquared);
   console.log(distance)
}