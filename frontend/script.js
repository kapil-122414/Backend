function login() {
  document.getElementById("loginForm").classList.remove("hidden");
  document.getElementById("registerForm").classList.add("hidden");
  document.getElementById("slider").style.left = "0%";
}

function register() {
  document.getElementById("registerForm").classList.remove("hidden");
  document.getElementById("loginForm").classList.add("hidden");
  document.getElementById("slider").style.left = "50%";
}

const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", async function (e) {
  e.preventDefault(); // ❗ page reload rokega

  const email = document.getElementById("regemail").value;
  const password = document.getElementById("regpassword").value;

  try {
    const res = await fetch("http://localhost:2000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        Email: email,
        Password: password,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      alert(data.message);
    } else {
      alert(data.message || "Error ❌");
    }
  } catch (error) {
    console.error(error);
    alert("Server error ❌");
  }
});

//login from
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async function (e) {
  e.preventDefault(); // ❗ page reload rokega
 
  const logemail = document.getElementById("logemail").value;
  const logpassword = document.getElementById("logpassword").value;

  try {
    const res = await fetch("http://127.0.0.1:2000/api/login", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        Email: logemail,
        Password: logpassword,
      }),
    });

    const data = await res.json();

   

    if (data.Role==="user") {
      alert(data.message);
      window.location.href = "./profile.html";
    }
   if(data.Role==="admin") {
      alert(data.message)
        window.location.href='./adminpage.html';
      
    }
      else {
      alert(data.message || "Error ❌");
    }
  } catch (error) {
    console.error(error);
    alert("Server error ❌");
  }
});

//get
