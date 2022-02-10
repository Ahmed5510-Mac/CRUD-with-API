let users=[]
let emilinput = document.querySelector("input[type=email]")
let passwoerinput = document.querySelector("input[type=password]")
let btnsubmit = document.querySelector("#btnlogin")
let Remilinput = document.querySelector("input[name=Remail]")
let Rusername = document.querySelector("input[name=Rusername]")
let Rpassword = document.querySelector("input[name=Rpassword]")
let Rbtnsubmit = document.querySelector(".add-btn")

// ---------------------------------login button--------------------------------------
$('#login-button').click(function () {
  $('#login-button').fadeOut("slow",function(){
      $("#container").fadeIn();
      TweenMax.from("#container", .4, { scale: 0, ease:Sine.easeInOut});
      TweenMax.to("#container", .4, { scale: 1, ease:Sine.easeInOut});
    });
  });
  
  $(".close-btn").click(function(){
    TweenMax.from("#container", .4, { scale: 1, ease:Sine.easeInOut});
    TweenMax.to("#container", .4, { left:"0px", scale: 0, ease:Sine.easeInOut});
    $("#container, #forgotten-container").fadeOut(800, function(){
      $("#login-button").fadeIn(800);
    });
  });
  
  /* Forgotten Password */
  $('#forgotten').click(function(){
    $("#container").fadeOut(function(){
      $("#forgotten-container").fadeIn();
    });
  });
  // ---------------------------------login button--------------------------------------
  btnsubmit.addEventListener("click", function () {
    console.log(emilinput.value );
    console.log(passwoerinput.value );
      if (emilinput.value == "ahmed" && passwoerinput.value == "123")
      {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        Toast.fire({
          icon: 'success',
          title: 'Signed in successfully'
        })
      // --------------------------------------------------------------------
    setTimeout(() => {
      window.location.href="index.html"
    }, 3000);
    
      }
      else
      {
        Swal.fire({
          icon: 'error',
          title: 'Oops...  يامعلم🤭',
          text: 'passowrd or email incorrect',
          footer: 'if you dont have user and password goto Regrigstration'
        })
    // -------------------------
        
    }
    })

// ---------------------------------------- vervication log in---------------------------------------------
Rbtnsubmit.addEventListener("click", function () {
  console.log("ahmed");
  users+=(`{ user: ${Rusername.value}, pass: ${Rpassword.value}).value}`)
  localStorage.setItem("users", JSON.stringify(users))
  Remilinput.value=""
   Rusername.value=""
   Rpassword.value=""

})
