// ==========================================================================
// INTERACTIVIDAD Y ANIMACIONES AVANZADAS - ELINMAR LTDA.
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  // 1. Menú Móvil Desplegable
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });

    mobileMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
      });
    });
  }

  // 2. Simulador de Modos de Operación
  const modeButtons = document.querySelectorAll(".mode-btn");
  const simTitle = document.getElementById("sim-mode-title");
  const simDesc = document.getElementById("sim-mode-desc");
  const simPlc = document.getElementById("sim-plc-status");
  const simStat = document.getElementById("sim-stat-value");

  const modeData = {
    standard: {
      title: "MODO ESTÁNDAR CONTINUO (50 LTS/H)",
      desc: "Funcionamiento nominal en centro de cultivo. Procesamiento y eliminación continua de 50 litros por hora de aguas negras mediante oxidación térmica.",
      plc: "OPERANDO OK · 100% AUTÓNOMO",
      stat: "85°C / 1.2 Bar"
    },
    eco: {
      title: "MODO ECO NOCTURNO (BAJO CONSUMO)",
      desc: "Optimización nocturna para dotaciones reducidas. Regula automáticamente los sopladores y reduce el consumo energético manteniendo el sello sanitario activo.",
      plc: "AHORRO ENERGÉTICO · CICLO LENTO",
      stat: "60°C / 0.8 Bar"
    },
    steam: {
      title: "CICLO DE VAPOR LIMPIO PURO (ESTERILIZACIÓN)",
      desc: "Inyección intensiva de vapor limpio a alta temperatura para la purificación total de cámaras e intercambio térmico sin residuos químicos.",
      plc: "ESTERILIZANDO · MÁXIMA POTENCIA",
      stat: "120°C / 2.5 Bar"
    }
  };

  modeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      modeButtons.forEach(b => {
        b.className = "mode-btn px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-all";
      });
      btn.className = "mode-btn px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg transition-all";

      const mode = btn.getAttribute("data-mode");
      if (modeData[mode] && simTitle && simDesc && simPlc && simStat) {
        simTitle.textContent = modeData[mode].title;
        simDesc.textContent = modeData[mode].desc;
        simPlc.textContent = modeData[mode].plc;
        simStat.textContent = modeData[mode].stat;
      }
    });
  });

  // 3. Formulario de Envío de CV
  const cvForm = document.getElementById("cv-form");
  const cvSuccess = document.getElementById("cv-success");

  if (cvForm && cvSuccess) {
    cvForm.addEventListener("submit", (e) => {
      e.preventDefault();
      cvSuccess.classList.remove("hidden");
      cvForm.reset();
      setTimeout(() => {
        cvSuccess.classList.add("hidden");
      }, 7000);
    });
  }

  // 4. Tarjetas de Contacto Interactivas (Expandibles con Zoom Individual)
  const contactCards = document.querySelectorAll(".contact-card");
  contactCards.forEach(card => {
    card.addEventListener("click", () => {
      const isAlreadyActive = card.classList.contains("ring-2");

      contactCards.forEach(c => {
        c.classList.remove("scale-105", "z-20", "shadow-2xl", "ring-2", "ring-blue-500", "bg-slate-900");
        c.classList.add("bg-slate-950");
        const content = c.querySelector(".expandable-content");
        const indicator = c.querySelector(".toggle-indicator");
        if (content) content.classList.add("hidden");
        if (indicator) indicator.textContent = "Ver más +";
      });

      if (!isAlreadyActive) {
        card.classList.remove("bg-slate-950");
        card.classList.add("scale-105", "z-20", "shadow-2xl", "ring-2", "ring-blue-500", "bg-slate-900");
        const content = card.querySelector(".expandable-content");
        const indicator = card.querySelector(".toggle-indicator");
        if (content) content.classList.remove("hidden");
        if (indicator) indicator.textContent = "Ver menos -";
      }
    });
  });

  // 6. Chatbot Widget Interactivo
  const chatToggleBtn = document.getElementById("chat-toggle-btn");
  const chatCloseBtn = document.getElementById("chat-close-btn");
  const chatWindow = document.getElementById("chat-window");
  const chatInput = document.getElementById("chat-input");
  const chatSendBtn = document.getElementById("chat-send-btn");
  const chatMessages = document.getElementById("chat-messages");

  if (chatToggleBtn && chatWindow && chatCloseBtn) {
    chatToggleBtn.addEventListener("click", () => {
      chatWindow.classList.toggle("hidden");
    });

    chatCloseBtn.addEventListener("click", () => {
      chatWindow.classList.add("hidden");
    });
  }

  if (chatSendBtn && chatInput && chatMessages) {
    const handleSend = () => {
      const text = chatInput.value.trim();
      if (!text) return;

      // Mensaje usuario
      const userBubble = document.createElement("div");
      userBubble.className = "bg-blue-600 text-white p-3 rounded-2xl max-w-[85%] ml-auto text-right";
      userBubble.textContent = text;
      chatMessages.appendChild(userBubble);
      chatInput.value = "";
      chatMessages.scrollTop = chatMessages.scrollHeight;

      // Respuesta simulada Asistente Elinmar
      setTimeout(() => {
        const botBubble = document.createElement("div");
        botBubble.className = "bg-slate-900 p-3 rounded-2xl border border-slate-800 max-w-[85%] text-slate-300";
        botBubble.innerHTML = `¡Gracias por tu mensaje! Un especialista de <strong>Elinmar Ltda.</strong> (Chonchi) se pondrá en contacto contigo pronto respecto a: <em>"${text}"</em>.`;
        chatMessages.appendChild(botBubble);
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }, 1000);
    };

    chatSendBtn.addEventListener("click", handleSend);
    chatInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") handleSend();
    });
  }

  // 7. Animación Interactiva de 4 Pasos en Planta de Tratamiento
  const processBtns = document.querySelectorAll(".process-step-btn");
  const animSlides = document.querySelectorAll(".anim-slide");

  if (processBtns.length > 0 && animSlides.length > 0) {
    processBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const step = btn.getAttribute("data-step");

        processBtns.forEach(b => {
          b.className = "process-step-btn w-full text-left p-5 rounded-2xl border transition-all duration-300 bg-slate-900/80 border-slate-800 hover:border-slate-700 group cursor-pointer";
        });

        btn.className = "process-step-btn w-full text-left p-5 rounded-2xl border transition-all duration-300 bg-blue-900/40 border-blue-500 shadow-xl group cursor-pointer";

        animSlides.forEach(slide => {
          if (slide.getAttribute("data-content") === step) {
            slide.classList.remove("hidden");
          } else {
            slide.classList.add("hidden");
          }
        });
      });
    });
  }

  // 8. Línea del Navbar: marca la página actual y se desliza a la que se hace click
  const header = document.querySelector("header");
  const navContainer = header && header.querySelector("nav");

  if (navContainer) {
    const SLIDE_MS = 450; // Debe coincidir con la transición de .nav-indicator en estilos.css
    const navLinks = Array.from(navContainer.querySelectorAll("a"));
    const activeLink = navContainer.querySelector("a.active");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let navigationTimer;

    const indicator = document.createElement("span");
    indicator.className = "nav-indicator";
    indicator.setAttribute("aria-hidden", "true");
    navContainer.appendChild(indicator);

    const placeIndicator = (link) => {
      if (!link) return;
      indicator.style.left = link.offsetLeft + "px";
      indicator.style.width = link.offsetWidth + "px";
    };

    const resetIndicator = () => {
      indicator.classList.remove("is-sliding");
      placeIndicator(activeLink);
    };

    resetIndicator();

    // Las fuentes y Tailwind (CDN) cambian el ancho del menú después de cargar
    new ResizeObserver(resetIndicator).observe(navContainer);

    // Al volver con el botón "Atrás" la página se restaura con la línea en el destino
    window.addEventListener("pageshow", (e) => {
      if (e.persisted) resetIndicator();
    });

    header.addEventListener("click", (e) => {
      const clicked = e.target.closest("a[href]");
      if (!clicked || clicked.closest("#mobile-menu")) return;

      // Incluye el logo, que lleva a Inicio
      const target = navLinks.find(link => link.getAttribute("href") === clicked.getAttribute("href"));
      const opensElsewhere = e.ctrlKey || e.metaKey || e.shiftKey || e.altKey;
      if (!target || target === activeLink || opensElsewhere) return;
      if (reduceMotion.matches || navContainer.offsetWidth === 0) return;

      e.preventDefault();
      indicator.classList.add("is-sliding");
      placeIndicator(target);

      clearTimeout(navigationTimer);
      navigationTimer = setTimeout(() => {
        window.location.href = clicked.href;
      }, SLIDE_MS);
    });
  }
});
