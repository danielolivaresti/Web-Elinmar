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

  // 3. Formulario de Envío de CV (envío real vía FormSubmit, con archivo adjunto)
  // FormSubmit no acepta archivos por AJAX: se envía de forma normal y vuelve a esta página con ?enviado=1
  const cvForm = document.getElementById("cv-form");
  const cvSuccess = document.getElementById("cv-success");
  const MAX_CV_MB = 5;

  if (cvForm) {
    const nextField = cvForm.querySelector('input[name="_next"]');
    if (nextField && location.protocol.startsWith("http")) {
      nextField.value = location.origin + location.pathname + "?enviado=1";
    } else if (nextField) {
      nextField.remove(); // abierto como archivo local: FormSubmit mostrará su propia página de gracias
    }

    cvForm.addEventListener("submit", (e) => {
      const file = cvForm.querySelector('input[type="file"]');
      if (file && file.files[0] && file.files[0].size > MAX_CV_MB * 1024 * 1024) {
        e.preventDefault();
        alert(`El archivo supera los ${MAX_CV_MB} MB. Por favor adjunta una versión más liviana (PDF recomendado).`);
        return;
      }
      const btn = cvForm.querySelector('button[type="submit"]');
      if (btn) { btn.disabled = true; btn.textContent = "Enviando..."; }
    });

    if (cvSuccess && new URLSearchParams(location.search).get("enviado") === "1") {
      cvSuccess.classList.remove("hidden");
      cvSuccess.scrollIntoView({ behavior: "smooth", block: "center" });
      history.replaceState(null, "", location.pathname);
    }
  }

  // 3b. Formulario de Cotización (envío real vía FormSubmit AJAX, sin salir de la página)
  const quoteForm = document.getElementById("quote-form");
  const quoteSuccess = document.getElementById("quote-success");
  const quoteError = document.getElementById("quote-error");

  if (quoteForm) {
    quoteForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const btn = quoteForm.querySelector('button[type="submit"]');
      const btnText = btn ? btn.textContent : "";
      if (btn) { btn.disabled = true; btn.textContent = "Enviando..."; }
      if (quoteError) quoteError.classList.add("hidden");

      try {
        const ajaxUrl = quoteForm.action.replace("formsubmit.co/", "formsubmit.co/ajax/");
        const res = await fetch(ajaxUrl, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: new FormData(quoteForm)
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok || data.success === false || data.success === "false") {
          throw new Error(data.message || "Error " + res.status);
        }
        quoteForm.reset();
        if (quoteSuccess) {
          quoteSuccess.classList.remove("hidden");
          setTimeout(() => quoteSuccess.classList.add("hidden"), 10000);
        }
      } catch (err) {
        console.error("Error al enviar cotización:", err);
        if (quoteError) {
          quoteError.textContent = "No pudimos enviar tu solicitud. Inténtalo nuevamente o escríbenos directamente a daniel.olivares@elinmar.cl.";
          quoteError.classList.remove("hidden");
        }
      } finally {
        if (btn) { btn.disabled = false; btn.textContent = btnText; }
      }
    });
  }

  // 4. Tarjetas de Contacto Interactivas (Expandibles con Zoom Individual)
  const contactCards = document.querySelectorAll(".contact-card");
  contactCards.forEach(card => {
    card.addEventListener("click", () => {
      const isAlreadyActive = card.classList.contains("ring-2");

      contactCards.forEach(c => {
        c.classList.remove("scale-105", "z-20", "shadow-2xl", "ring-2", "ring-blue-500", "bg-blue-50");
        c.classList.add("bg-white");
        const content = c.querySelector(".expandable-content");
        const indicator = c.querySelector(".toggle-indicator");
        if (content) content.classList.add("hidden");
        if (indicator) indicator.textContent = "Ver más +";
      });

      if (!isAlreadyActive) {
        card.classList.remove("bg-white");
        card.classList.add("scale-105", "z-20", "shadow-2xl", "ring-2", "ring-blue-500", "bg-blue-50");
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

  // Respuestas del asistente por palabras clave (sin tildes y en minúsculas)
  const CHAT_KB = [
    { k: ["precio", "valor", "cuesta", "costo", "cuanto sale", "cuanto vale", "tarifa", "cotiz", "presupuesto"], r: "Cada proyecto se cotiza según capacidad, ubicación y requerimientos. Completa el formulario y te enviamos una propuesta técnica y comercial.", link: "cotizar.html", label: "Solicitar cotización" },
    { k: ["planta", "jema", "jmwc60", "aguas negras", "tratamiento", "vapor"], r: "Fabricamos la planta de tratamiento de aguas negras Jema JMWC60 de 50 L/h: sistema estanco, vapor limpio, estanque triturador previo y monitoreo desde la oficina.", link: "planta.html", label: "Ver planta JMWC60" },
    { k: ["mantencion", "mantenciones", "reparacion", "falla", "soporte"], r: "Realizamos mantenciones preventivas y correctivas en terreno, incluidos centros en alta mar.", link: "servicios.html", label: "Ver servicios" },
    { k: ["ponton", "pontones", "sala tecnica", "electromecanic", "centro de cultivo", "salmon"], r: "Fabricamos, montamos y mantenemos equipos y salas técnicas para pontones habitacionales de centros de cultivo.", link: "servicios.html", label: "Ver servicios" },
    { k: ["taller", "acero", "inoxidable", "aisi", "316", "maestranza", "soldadura"], r: "Contamos con maestranza propia en Chonchi, especializada en acero inoxidable AISI 316L y con pruebas hidráulicas en taller.", link: "taller.html", label: "Ver taller" },
    { k: ["trabajo", "trabajar", "empleo", "cv", "curriculum", "postular", "postulacion", "vacante"], r: "Recibimos currículums para áreas técnicas, operativas y administrativas en Chonchi.", link: "trabaja.html", label: "Enviar mi CV" },
    { k: ["telefono", "celular", "whatsapp", "llamar", "correo", "email", "mail", "contacto", "hablar"], r: "En nuestro directorio encontrarás el correo y teléfono de cada encargado.", link: "equipo.html", label: "Ver directorio" },
    { k: ["cobertura", "zona", "region", "aysen", "palena", "los lagos", "llegan", "viajan"], r: "Atendemos Chiloé, el resto de la Región de Los Lagos (incluida Palena) y la Región de Aysén. Otras zonas, a consultar.", link: "cotizar.html", label: "Consultar mi zona" },
    { k: ["ubicacion", "donde", "direccion", "chonchi", "oficina"], r: "Estamos en Chonchi, Chiloé, donde se encuentran nuestra oficina y taller.", link: "nosotros.html", label: "Conocer Elinmar" },
    { k: ["flamy", "mascota"], r: "¡Soy Flamy, el supervisor oficial de Elinmar! Estoy aquí para orientarte por el sitio." },
    { k: ["gracias", "chao", "adios", "listo"], r: "¡Con gusto! Si necesitas algo más, aquí estaré." },
    { k: ["hola", "buenas", "buenos dias", "buenas tardes"], r: "¡Hola! Puedo orientarte sobre la planta Jema JMWC60, servicios en pontones, nuestro taller, cotizaciones o postulaciones." }
  ];
  const CHAT_FALLBACK = { r: "No estoy seguro de haber entendido. Puedes pedir una cotización o escribir directamente a nuestro equipo.", link: "cotizar.html", label: "Solicitar cotización", link2: "equipo.html", label2: "Ver directorio" };

  const normalize = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  const findAnswer = (text) => {
    const t = normalize(text);
    return CHAT_KB.find(entry => entry.k.some(word => t.includes(word))) || CHAT_FALLBACK;
  };
  const chatLink = (href, label) => {
    const a = document.createElement("a");
    a.href = href;
    a.textContent = label + " ➔";
    a.className = "inline-block mt-2 mr-2 text-sky-400 font-bold hover:text-sky-300";
    return a;
  };

  if (chatSendBtn && chatInput && chatMessages) {
    const handleSend = () => {
      const text = chatInput.value.trim();
      if (!text) return;

      // Mensaje usuario (textContent: nunca se interpreta como HTML)
      const userBubble = document.createElement("div");
      userBubble.className = "bg-blue-600 text-white p-3 rounded-2xl max-w-[85%] ml-auto text-right";
      userBubble.textContent = text;
      chatMessages.appendChild(userBubble);
      chatInput.value = "";
      chatMessages.scrollTop = chatMessages.scrollHeight;

      // Respuesta del asistente según palabras clave
      const answer = findAnswer(text);
      setTimeout(() => {
        const botBubble = document.createElement("div");
        botBubble.className = "bg-slate-900 p-3 rounded-2xl border border-slate-800 max-w-[85%] text-slate-300";
        const p = document.createElement("p");
        p.textContent = answer.r;
        botBubble.appendChild(p);
        if (answer.link) botBubble.appendChild(chatLink(answer.link, answer.label));
        if (answer.link2) botBubble.appendChild(chatLink(answer.link2, answer.label2));
        chatMessages.appendChild(botBubble);
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }, 600);
    };

    chatSendBtn.addEventListener("click", handleSend);
    chatInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") handleSend();
    });
  }

  // Planos animados de los pasos: reinicia el dibujo cada vez que se muestra uno
  const playDiagram = (stage) => {
    if (!stage) return;
    stage.classList.remove("is-drawing");
    void stage.offsetWidth;
    stage.classList.add("is-drawing");
  };
  const firstDiagram = document.querySelector('.anim-slide:not(.hidden) .bp-diagram');
  if (firstDiagram) {
    if (!("IntersectionObserver" in window)) playDiagram(firstDiagram);
    else new IntersectionObserver((entries, obs) => {
      if (entries[0].isIntersecting) { playDiagram(firstDiagram); obs.disconnect(); }
    }, { threshold: 0.4 }).observe(firstDiagram);
  }

  // 7. Animación Interactiva de 4 Pasos en Planta de Tratamiento
  const processBtns = document.querySelectorAll(".process-step-btn");
  const animSlides = document.querySelectorAll(".anim-slide");

  if (processBtns.length > 0 && animSlides.length > 0) {
    processBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const step = btn.getAttribute("data-step");

        processBtns.forEach(b => {
          b.classList.remove("is-active");
          b.setAttribute("aria-pressed", "false");
        });
        btn.classList.add("is-active");
        btn.setAttribute("aria-pressed", "true");

        animSlides.forEach(slide => {
          if (slide.getAttribute("data-content") === step) {
            slide.classList.remove("hidden");
            playDiagram(slide.querySelector(".bp-diagram"));
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
  // 9. Efecto Blueprint: dibuja el plano y revela la foto al aparecer en pantalla
  const bpStages = document.querySelectorAll(".bp-stage:not(.bp-diagram)");
  const bpReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  bpStages.forEach(stage => {
    const DRAW_MS = 4200, REVEAL_MS = 1700;
    let timers = [];
    const play = () => {
      timers.forEach(clearTimeout);
      stage.classList.remove("is-drawing", "is-revealing", "is-done");
      void stage.offsetWidth; // reinicia las animaciones CSS
      stage.classList.add("is-drawing");
      timers = [
        setTimeout(() => stage.classList.add("is-revealing"), DRAW_MS),
        setTimeout(() => { stage.classList.remove("is-drawing", "is-revealing"); stage.classList.add("is-done"); }, DRAW_MS + REVEAL_MS)
      ];
    };
    if (bpReduce || !("IntersectionObserver" in window)) { stage.classList.add("is-done"); return; }
    new IntersectionObserver((entries, obs) => {
      if (entries[0].isIntersecting) { play(); obs.disconnect(); }
    }, { threshold: 0.4 }).observe(stage);
    const replay = stage.querySelector(".bp-replay");
    if (replay) replay.addEventListener("click", play);
  });
});
