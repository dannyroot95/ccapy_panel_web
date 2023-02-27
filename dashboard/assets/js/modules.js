
var user = {
  type : "root"
}

if (user.type == "root") {
  console.log("super admin");
  $("#modules").html(
    `
    <li>
          <a href="#">
            <span class="icon">

              <img src="/dashboard/assets/imgs/cowlogo.png"" width="40px" height="40px" style="margin-top: 12px;" />
            </span>
            <span class="title2"><strong>Ccapy</strong>
              <p id="typeUser">Monitoring Home</p>
            </span>
          </a>
        </li>

        <li>
          <a href="#dashboard" class="links_modulo">
            <span class="icon">
              <ion-icon name="home-outline"></ion-icon>
            </span>
            <span class="title">Inicio</span>
          </a>
        </li>
        <script>;
          window.open("#dashboard", "_self");
        </script>

        <li>
          <a href="#users">
            <span class="icon">
              <ion-icon name="people-outline"></ion-icon>
            </span>
            <span class="title">Usuarios</span>
          </a>
        </li>
        <script>;
          window.open("#users", "_self");
        </script>


        <li>
          <a href="#devices">
            <span class="icon">
            <ion-icon name="apps-outline"></ion-icon>
            </span>
            <span class="title">Dispositivos</span>
          </a>
        </li>
        

        <li>
          <a href="#metrics">
            <span class="icon">
            <ion-icon name="locate-outline"></ion-icon>
            </span>
            <span class="title">Métricas</span>
          </a>
        </li>
        <script>;
          window.open("#metrics", "_self");
        </script>

        <li>
          <a href="#analysis">
            <span class="icon">
            <ion-icon name="git-branch-outline"></ion-icon>
            </span>
            <span class="title">Análisis</span>
          </a>
        </li>
        <script>;
          window.open("#analysis", "_self");
        </script>

        <script>;
        window.open("#dashboard", "_self");
      </script>

        <li>
          <a href="#" onclick="logout()">
            <span class="icon">
              <ion-icon name="log-out-outline"></ion-icon>
            </span>
            <span class="title">Cerrar sesión</span>
          </a>
        </li>
    `
  );
} else if (user.type == "admin") {
  console.log("admin");
  $("#modules").html(
    `
    <li>
          <a href="#">
            <span class="icon">

              <img src="/dashboard/assets/imgs/cowlogo.png"" width="40px" height="40px" style="margin-top: 12px;" />
            </span>
            <span class="title2"><strong>Ccapy</strong>
              <p id="typeUser">Monitoring Home</p>
            </span>
          </a>
        </li>

        <li>
          <a href="#dashboard" class="links_modulo">
            <span class="icon">
              <ion-icon name="home-outline"></ion-icon>
            </span>
            <span class="title">Inicio</span>
          </a>
        </li>
        <script>;
          window.open("#dashboard", "_self");
        </script>

        <li>
          <a href="#devices">
            <span class="icon">
            <ion-icon name="apps-outline"></ion-icon>
            </span>
            <span class="title">Dispositivos</span>
          </a>
        </li>
        
        <li>
          <a href="#metrics">
            <span class="icon">
            <ion-icon name="locate-outline"></ion-icon>
            </span>
            <span class="title">Métricas</span>
          </a>
        </li>
        <script>;
          window.open("#metrics", "_self");
        </script>

        <li>
          <a href="#analysis">
            <span class="icon">
            <ion-icon name="git-branch-outline"></ion-icon>
            </span>
            <span class="title">Análisis</span>
          </a>
        </li>
        <script>;
          window.open("#analysis", "_self");
        </script>

        <script>;
        window.open("#dashboard", "_self");
      </script>

        <li>
          <a href="#" onclick="logout()">
            <span class="icon">
              <ion-icon name="log-out-outline"></ion-icon>
            </span>
            <span class="title">Cerrar sesión</span>
          </a>
        </li>
    `
    );
} 

function urlModulo(url) {
  return (
    "<iframe src='" +
    url +
    "' style='width: 100%; height: 100%; border: none;'></iframe>"
  );
}

function listaModulos_A(modulo, contenedor) {
  if ("#dashboard" == modulo) {
    contenedor.innerHTML = urlModulo("assets/modules/admin/dashboard.html");
    document.getElementById("start").innerText = "Inicio";
  } else if ("#transfers" == modulo) {
    contenedor.innerHTML = urlModulo("assets/modules/admin/transfers.html");
    document.getElementById("start").innerText = "Transferencias";
  } else if ("#" == modulo) {
    contenedor.innerHTML = "<br>&nbsp;&nbsp;Muy Pronto...";
  } else {
    contenedor.innerHTML = urlModulo("assets/modules/dashboard.html");
  }
}

function listaModulos_SA(modulo, contenedor) {
  if ("#dashboard" == modulo) {
    contenedor.innerHTML = urlModulo("assets/modules/dashboard.html");
    document.getElementById("start").innerText = "Inicio";
  } else if ("#users" == modulo) {
    contenedor.innerHTML = urlModulo("assets/modules/users.html");
    document.getElementById("start").innerText = "Usuarios";
  } else if ("#devices" == modulo) {
    contenedor.innerHTML = urlModulo("assets/modules/devices.html");
    document.getElementById("start").innerText = "Dispositivos";
  } else if ("#metrics" == modulo) {
    contenedor.innerHTML = urlModulo("assets/modules/metrics.html");
    document.getElementById("start").innerText = "Métricas";
  } else if ("#analysis" == modulo) {
    contenedor.innerHTML = urlModulo("assets/modules/analysis.html");
    document.getElementById("start").innerText = "Análisis";
  }else if ("#" == modulo) {
    contenedor.innerHTML = "<br>&nbsp;&nbsp;Muy Pronto...";
  } else {
    contenedor.innerHTML = urlModulo("assets/modules/dashboard.html");
  }
}

var contentModulo = document.querySelector(".body-content");
let linkModulo = document.querySelector(".nav-list").querySelectorAll("a");
if(user.type == "root"){
  listaModulos_SA(window.location.hash, contentModulo);
}else if(user.type == "admin"){
  listaModulos_A(window.location.hash, contentModulo);
}

linkModulo.forEach((elemento) => {
  elemento.addEventListener("click", function () {
    if(user.type == "root"){
      listaModulos_SA(elemento.getAttribute("href") + "", contentModulo);
    }else if(user.type == "admin"){
      listaModulos_A(elemento.getAttribute("href") + "", contentModulo);
    }
  });
});


