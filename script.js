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

  // 8. Barra Deslizante Animada en el Navbar ("Traveling Underline")
  const navContainer = document.querySelector("header nav");
  if (navContainer) {
    navContainer.style.position = "relative";
    
    let indicator = navContainer.querySelector("#nav-indicator");
    if (!indicator) {
      indicator = document.createElement("div");
      indicator.id = "nav-indicator";
      indicator.className = "absolute bottom-0 h-0.5 bg-sky-400 transition-all duration-300 ease-in-out pointer-events-none rounded-full shadow-[0_0_10px_#38bdf8]";
      navContainer.appendChild(indicator);
    }

    const navLinks = navContainer.querySelectorAll("a:not([class*='bg-'])");
    let activeLink = navContainer.querySelector("a.active") || Array.from(navLinks).find(link => {
      const href = link.getAttribute("href");
      return window.location.pathname.endsWith(href) || (href === "index.html" && window.location.pathname.endsWith("/"));
    });

    function moveIndicator(el) {
      if (!el) return;
      const navRect = navContainer.getBoundingClientRect();
      const linkRect = el.getBoundingClientRect();
      const left = linkRect.left - navRect.left;
      const width = linkRect.width;
      indicator.style.left = left + "px";
      indicator.style.width = width + "px";
    }

    if (activeLink) {
      activeLink.classList.add("active");
      // Animar desde la izquierda al cargar la página para dar el efecto de deslizamiento
      indicator.style.left = "0px";
      indicator.style.width = "0px";
      setTimeout(() => {
        indicator.style.transition = "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)";
        moveIndicator(activeLink);
      }, 50);
    }

    window.addEventListener("resize", () => {
      if (activeLink) moveIndicator(activeLink);
    });
  }
});
