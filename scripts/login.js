// /js/login.js
(() => {
  // Usuarios “quemados”
  const USERS = {
    admin:  { password: "admin", redirect: "/main.html"  },
    mesero: { password: "1234",  redirect: "/templates/mesero/mesero_comanda.html" },
    tour:   { password: "4321",  redirect: "/templates/tour/tour.html"   },
    cocina:   { password: "1111",  redirect: "/templates/cocina/menu_cocina.html"   },
  };

  const $ = (id) => document.getElementById(id);
  const form = $("form-login");
  const usuario = $("usuario");
  const password = $("password");
  const msg = $("msg");

  function setError(text = "") {
    if (msg) msg.textContent = text;
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      setError("");

      const user = (usuario.value || "").trim().toLowerCase();
      const pass = (password.value || "").trim();

      if (!user || !pass) {
        setError("Completa usuario y contraseña.");
        return;
      }

      const found = USERS[user];
      if (!found || pass !== found.password) {
        setError("Usuario o contraseña incorrectos.");
        return;
      }

      // Guarda sesión (opcional)
      try {
        sessionStorage.setItem("auth_user", user);
        sessionStorage.setItem("auth_role", user);
        sessionStorage.setItem("auth_time", new Date().toISOString());
      } catch {}

      // Redirige por rol
      window.location.href = found.redirect;
    });

    // Enter en password envía el formulario
    password.addEventListener("keydown", (ev) => {
      if (ev.key === "Enter") form.requestSubmit();
    });
  }
})();
