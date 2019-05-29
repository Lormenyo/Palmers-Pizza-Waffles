function navbarmenu(){
    $(".burger").hide();
    $('.navmenu').show();
}

function nav(){
    $(".burger").show();
    $('.navmenu').hide();
}

// function flip(){
//     $(".back").html('<div class="col-lg-4 col-md-4 col-sm-12  card" style="width: 18rem;"><img class="card-img-top" src="static/images/pizza-logo1.png" alt="Card image cap"><div class="card-body" id="card-1"><form role="form" method="POST" action="/sendMail"><div class="form-group float-label-control"><label for="name">First Name</label><input type="text" class="form-control" placeholder="First Name" name="name" required></div><div class="form-group float-label-control"><label for="email">Email</label><input type="email" class="form-control" placeholder="Email" name="email" required></div><center> <button class="btn btn-primary" onclick="sayHi()">Submit</button></center></form></div></div><div class="col-lg-4 col-md-4 col-sm-12  card" style="width: 18rem;"><div class="card-body"><div class="funkyradio"><div class="funkyradio-default"><input type="checkbox" name="checkbox" id="checkbox1" onchange="beef_quant()" disabled="disabled"/><label for="checkbox1">Beefzaa</label><input type="number" name="quantity" id="beef-quant"></div><div class="funkyradio-default"><input type="checkbox" name="checkbox" id="checkbox2"disabled="disabled"/><label for="checkbox2">chicken-delight</label><input type="number" name="quantity" id="chicken-quant"></div><div class="funkyradio-default"><input type="checkbox" name="checkbox" id="checkbox3" disabled="disabled" /><label for="checkbox3">Veggie Special</label><input type="number" name="quantity" id="veg-quant"></div></div></div></div><div class="col-lg-4 col-md-4 col-sm-12 card" style="width: 18rem;"><div class="card-body"><form role="form"><div class="form-group float-label-control"><label for="">Username</label><input type="email" class="form-control" placeholder="Username"></div><div class="form-group float-label-control"><label for="">Password</label><input type="password" class="form-control" placeholder="Password"></div><div class="form-group float-label-control"><label for="">Textarea</label><textarea class="form-control" placeholder="Textarea" rows="1"></textarea></div></form></div></div>');

//     $(".front").css("transform","rotateY( -180deg )");
//     $(".back").css("transform","rotateY( 0deg )");
//     $(".front").hide()
//     $(".order-btn").hide()
// }

function sayHi(){
    name = $("input[type='text']").val();
    $("#card-1").html('<div class="card-body card-belle" id="typed-strings"><center><h1>Welcome  <strong>'+ name + '</strong></h1> <br><h2>What do you want to order?</h2></center></div><span id="typed"></span>')

    var typed = new Typed('#typed', {
        stringsElement: '#typed-strings',
        backSpeed: 40,
        typeSpeed: 40
      });
}


var timer = 0;
function recheck() {
        var window_top = $(this).scrollTop();
        var window_height = $(this).height();
        var view_port_s = window_top;
        var view_port_e = window_top + window_height;
         
        if ( timer ) {
          clearTimeout( timer );
        }
         
        $('.fly').each(function(){
          var block = $(this);
          var block_top = block.offset().top;
          var block_height = block.height();
           
          if ( block_top < view_port_e ) {
            timer = setTimeout(function(){
              block.addClass('show-block');
            }, 100);      
          } 
          else {
            timer = setTimeout(function(){
              block.removeClass('show-block');
            },100);         
          }
        });
    }
     
