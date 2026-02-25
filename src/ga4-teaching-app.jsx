import { useState, useCallback, useRef, useEffect } from "react";

const GA4_EVENTS = {
  ecommerce: [
    {
      name: "view_item_list",
      label: "View Item List",
      icon: "📋",
      description: "Usuario ve una lista de productos",
      params: {
        item_list_id: "categoria_zapatos",
        item_list_name: "Zapatos deportivos",
        items: [
          { item_id: "SKU_001", item_name: "Nike Air Max", item_category: "Zapatos", price: 129.99, index: 0 },
          { item_id: "SKU_002", item_name: "Adidas Ultra", item_category: "Zapatos", price: 149.99, index: 1 },
        ],
      },
    },
    {
      name: "select_item",
      label: "Select Item",
      icon: "👆",
      description: "Usuario selecciona un producto de la lista",
      params: {
        item_list_id: "categoria_zapatos",
        item_list_name: "Zapatos deportivos",
        items: [{ item_id: "SKU_001", item_name: "Nike Air Max", item_category: "Zapatos", price: 129.99, index: 0 }],
      },
    },
    {
      name: "view_item",
      label: "View Item",
      icon: "👁️",
      description: "Usuario ve el detalle de un producto",
      params: {
        currency: "EUR",
        value: 129.99,
        items: [{ item_id: "SKU_001", item_name: "Nike Air Max", item_category: "Zapatos", price: 129.99, quantity: 1 }],
      },
    },
    {
      name: "add_to_wishlist",
      label: "Add to Wishlist",
      icon: "💖",
      description: "Usuario añade producto a lista de deseos",
      params: {
        currency: "EUR",
        value: 129.99,
        items: [{ item_id: "SKU_001", item_name: "Nike Air Max", item_category: "Zapatos", price: 129.99, quantity: 1 }],
      },
    },
    {
      name: "add_to_cart",
      label: "Add to Cart",
      icon: "🛒",
      description: "Usuario añade producto al carrito",
      params: {
        currency: "EUR",
        value: 129.99,
        items: [{ item_id: "SKU_001", item_name: "Nike Air Max", item_category: "Zapatos", price: 129.99, quantity: 1 }],
      },
    },
    {
      name: "remove_from_cart",
      label: "Remove from Cart",
      icon: "❌",
      description: "Usuario elimina producto del carrito",
      params: {
        currency: "EUR",
        value: 129.99,
        items: [{ item_id: "SKU_001", item_name: "Nike Air Max", item_category: "Zapatos", price: 129.99, quantity: 1 }],
      },
    },
    {
      name: "view_cart",
      label: "View Cart",
      icon: "🧺",
      description: "Usuario ve el carrito de compra",
      params: {
        currency: "EUR",
        value: 259.98,
        items: [
          { item_id: "SKU_001", item_name: "Nike Air Max", item_category: "Zapatos", price: 129.99, quantity: 1 },
          { item_id: "SKU_002", item_name: "Adidas Ultra", item_category: "Zapatos", price: 149.99, quantity: 1 },
        ],
      },
    },
    {
      name: "begin_checkout",
      label: "Begin Checkout",
      icon: "🏁",
      description: "Usuario inicia proceso de checkout",
      params: {
        currency: "EUR",
        value: 259.98,
        coupon: "SUMMER2024",
        items: [
          { item_id: "SKU_001", item_name: "Nike Air Max", item_category: "Zapatos", price: 129.99, quantity: 1 },
          { item_id: "SKU_002", item_name: "Adidas Ultra", item_category: "Zapatos", price: 149.99, quantity: 1 },
        ],
      },
    },
    {
      name: "add_shipping_info",
      label: "Add Shipping Info",
      icon: "🚚",
      description: "Usuario añade datos de envío",
      params: {
        currency: "EUR",
        value: 259.98,
        shipping_tier: "Express",
        items: [
          { item_id: "SKU_001", item_name: "Nike Air Max", item_category: "Zapatos", price: 129.99, quantity: 1 },
          { item_id: "SKU_002", item_name: "Adidas Ultra", item_category: "Zapatos", price: 149.99, quantity: 1 },
        ],
      },
    },
    {
      name: "add_payment_info",
      label: "Add Payment Info",
      icon: "💳",
      description: "Usuario añade datos de pago",
      params: {
        currency: "EUR",
        value: 259.98,
        payment_type: "Credit Card",
        items: [
          { item_id: "SKU_001", item_name: "Nike Air Max", item_category: "Zapatos", price: 129.99, quantity: 1 },
          { item_id: "SKU_002", item_name: "Adidas Ultra", item_category: "Zapatos", price: 149.99, quantity: 1 },
        ],
      },
    },
    {
      name: "purchase",
      label: "Purchase",
      icon: "✅",
      description: "Usuario completa la compra",
      params: {
        transaction_id: "TXN_" + Date.now(),
        currency: "EUR",
        value: 259.98,
        tax: 54.6,
        shipping: 5.99,
        coupon: "SUMMER2024",
        items: [
          { item_id: "SKU_001", item_name: "Nike Air Max", item_category: "Zapatos", price: 129.99, quantity: 1 },
          { item_id: "SKU_002", item_name: "Adidas Ultra", item_category: "Zapatos", price: 149.99, quantity: 1 },
        ],
      },
    },
    {
      name: "refund",
      label: "Refund",
      icon: "↩️",
      description: "Se procesa una devolución",
      params: {
        transaction_id: "TXN_REFUND_001",
        currency: "EUR",
        value: 129.99,
        items: [{ item_id: "SKU_001", item_name: "Nike Air Max", item_category: "Zapatos", price: 129.99, quantity: 1 }],
      },
    },
    {
      name: "view_promotion",
      label: "View Promotion",
      icon: "📢",
      description: "Usuario ve un banner promocional",
      params: {
        items: [
          {
            item_id: "SKU_001",
            item_name: "Nike Air Max",
            promotion_id: "PROMO_VERANO",
            promotion_name: "Rebajas de Verano",
            creative_name: "banner_hero",
            creative_slot: "slot_1",
          },
        ],
      },
    },
    {
      name: "select_promotion",
      label: "Select Promotion",
      icon: "🏷️",
      description: "Usuario hace click en la promoción",
      params: {
        items: [
          {
            item_id: "SKU_001",
            item_name: "Nike Air Max",
            promotion_id: "PROMO_VERANO",
            promotion_name: "Rebajas de Verano",
            creative_name: "banner_hero",
            creative_slot: "slot_1",
          },
        ],
      },
    },
  ],
  custom: [
    {
      name: "click",
      label: "Click (Custom)",
      icon: "🖱️",
      description: "Evento personalizado de click",
      params: {
        link_text: "Ver más información",
        link_url: "https://ejemplo.com/info",
        link_domain: "ejemplo.com",
        outbound: true,
      },
    },
    {
      name: "form_submit",
      label: "Form Submit (Custom)",
      icon: "📝",
      description: "Envío de formulario",
      params: {
        form_id: "contacto_form",
        form_name: "Formulario de Contacto",
        form_destination: "/gracias",
        form_length: 5,
      },
    },
  ],
};

function generateClientId() {
  const stored = typeof window !== 'undefined' ? window.__ga4_client_id : null;
  if (stored) return stored;
  const id = Math.floor(Math.random() * 2147483647) + "." + Math.floor(Date.now() / 1000);
  if (typeof window !== 'undefined') window.__ga4_client_id = id;
  return id;
}

function LogEntry({ entry, index }) {
  const [expanded, setExpanded] = useState(false);
  const statusColor = entry.status === "success" ? "#22c55e" : entry.status === "error" ? "#ef4444" : "#f59e0b";

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderLeft: `3px solid ${statusColor}`,
        borderRadius: 8,
        padding: "10px 14px",
        marginBottom: 6,
        cursor: "pointer",
        transition: "all 0.2s",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 14 }}>{entry.icon}</span>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#e2e8f0", fontWeight: 600 }}>
            {entry.eventName}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              fontSize: 10,
              padding: "2px 8px",
              borderRadius: 99,
              background: statusColor + "22",
              color: statusColor,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            {entry.status}
          </span>
          <span style={{ fontSize: 10, color: "#64748b" }}>{entry.time}</span>
          <span style={{ fontSize: 10, color: "#64748b", transform: expanded ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}>▼</span>
        </div>
      </div>
      {expanded && (
        <pre
          style={{
            marginTop: 10,
            padding: 12,
            background: "rgba(0,0,0,0.3)",
            borderRadius: 6,
            fontSize: 11,
            color: "#94a3b8",
            overflow: "auto",
            maxHeight: 200,
            fontFamily: "'JetBrains Mono', monospace",
            lineHeight: 1.5,
            whiteSpace: "pre-wrap",
            wordBreak: "break-all",
          }}
        >
          {JSON.stringify(entry.payload, null, 2)}
        </pre>
      )}
    </div>
  );
}

function EventButton({ event, onClick, disabled }) {
  const [flash, setFlash] = useState(false);

  const handleClick = () => {
    setFlash(true);
    onClick(event);
    setTimeout(() => setFlash(false), 400);
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      style={{
        background: flash ? "rgba(99, 220, 160, 0.15)" : "rgba(255,255,255,0.04)",
        border: flash ? "1px solid rgba(99, 220, 160, 0.4)" : "1px solid rgba(255,255,255,0.08)",
        borderRadius: 10,
        padding: "12px 10px",
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
        opacity: disabled ? 0.4 : 1,
        minWidth: 0,
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        if (!disabled) e.currentTarget.style.background = "rgba(255,255,255,0.08)";
      }}
      onMouseLeave={(e) => {
        if (!flash) e.currentTarget.style.background = "rgba(255,255,255,0.04)";
      }}
    >
      <span style={{ fontSize: 22 }}>{event.icon}</span>
      <span style={{ fontSize: 10, color: "#cbd5e1", fontWeight: 600, textAlign: "center", lineHeight: 1.3, fontFamily: "'JetBrains Mono', monospace" }}>
        {event.name}
      </span>
    </button>
  );
}

export default function GA4TeachingApp() {
  const [measurementId, setMeasurementId] = useState("");
  const [apiSecret, setApiSecret] = useState("");
  const [logs, setLogs] = useState([]);
  const [activeTab, setActiveTab] = useState("ecommerce");
  const [sending, setSending] = useState(false);
  const [totalEvents, setTotalEvents] = useState(0);
  const [debugMode, setDebugMode] = useState(false);
  const [customEventName, setCustomEventName] = useState("");
  const [serverSide, setServerSide] = useState(false);
  const [serverUrl, setServerUrl] = useState("");
  const logRef = useRef(null);

  const isConfigured = serverSide
    ? serverUrl.trim().length > 0
    : measurementId.trim().startsWith("G-") && apiSecret.trim().length > 0;

  const addLog = useCallback((eventName, icon, payload, status, message) => {
    const now = new Date();
    const time = now.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    setLogs((prev) => [{ eventName, icon, payload, status, message, time }, ...prev].slice(0, 50));
  }, []);

  const handleEventClick = useCallback(
    async (event) => {
      if (!isConfigured) return;
      setSending(true);

      const params = { ...event.params };
      if (event.name === "purchase") {
        params.transaction_id = "TXN_" + Date.now();
      }

      try {
        let url;
        if (serverSide) {
          // Server-side: send to GTM SS container
          const base = serverUrl.trim().replace(/\/+$/, "");
          url = `${base}/mp/collect`;
        } else if (debugMode) {
          url = `https://www.google-analytics.com/debug/mp/collect?measurement_id=${measurementId.trim()}&api_secret=${apiSecret.trim()}`;
        } else {
          url = `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId.trim()}&api_secret=${apiSecret.trim()}`;
        }

        const clientId = generateClientId();
        const payload = {
          client_id: clientId,
          events: [
            {
              name: event.name,
              params: {
                ...params,
                engagement_time_msec: "100",
                session_id: Math.floor(Date.now() / 1000).toString(),
              },
            },
          ],
        };

        // For server-side, include measurement_id in the payload if available
        if (serverSide && measurementId.trim().startsWith("G-")) {
          payload.measurement_id = measurementId.trim();
          if (apiSecret.trim()) payload.api_secret = apiSecret.trim();
        }

        const fetchOptions = {
          method: "POST",
          body: JSON.stringify(payload),
        };
        if (serverSide) {
          fetchOptions.headers = { "Content-Type": "application/json" };
        }

        let response;
        if (serverSide) {
          response = await fetch(url, fetchOptions);
        } else if (debugMode) {
          // El endpoint /debug/mp/collect no permite CORS desde el navegador.
          // Usamos sendBeacon con text/plain (no dispara preflight) y asumimos éxito.
          // Para validar el payload, usamos el endpoint normal con no-cors.
          const blob = new Blob([JSON.stringify(payload)], { type: "text/plain" });
          const sent = navigator.sendBeacon(url, blob);
          response = { ok: sent !== false, status: sent !== false ? 204 : 0 };
        } else {
          const blob = new Blob([JSON.stringify(payload)], { type: "text/plain" });
          const sent = navigator.sendBeacon(url, blob);
          response = { ok: sent, status: sent ? 204 : 0 };
        }

        const modeLabel = serverSide ? "→ SS" : debugMode ? "→ Debug" : "";
        if (debugMode && !serverSide) {
          const debugData = await response.json();
          const hasErrors = debugData.validationMessages && debugData.validationMessages.length > 0;
          addLog(
            event.name,
            event.icon,
            { sent: payload, debug_response: debugData },
            hasErrors ? "warning" : "success",
            hasErrors ? "Validation issues" : "Debug OK"
          );
        } else {
          addLog(event.name, event.icon, payload, response.ok ? "success" : "error", response.ok ? `Sent ${modeLabel} (${response.status})` : `Error ${modeLabel} ${response.status}`);
        }

        if (response.ok || debugMode) setTotalEvents((p) => p + 1);
      } catch (err) {
        addLog(event.name, event.icon, event.params, "error", err.message);
      } finally {
        setSending(false);
      }
    },
    [isConfigured, measurementId, apiSecret, debugMode, serverSide, serverUrl, addLog]
  );

  const sendAllEcommerce = useCallback(async () => {
    if (!isConfigured) return;
    for (const event of GA4_EVENTS.ecommerce) {
      await handleEventClick(event);
      await new Promise((r) => setTimeout(r, 1000));
    }
  }, [isConfigured, handleEventClick]);

  const sendCustomEvent = useCallback(() => {
    if (!isConfigured || !customEventName.trim()) return;
    const sanitized = customEventName.trim().toLowerCase().replace(/[^a-z0-9_]/g, "_").slice(0, 40);
    if (!sanitized.match(/^[a-z]/)) return;
    const event = {
      name: sanitized,
      icon: "✏️",
      params: { custom_event: "true" },
    };
    handleEventClick(event);
    setCustomEventName("");
  }, [isConfigured, customEventName, handleEventClick]);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = 0;
    }
  }, [logs]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(145deg, #0a0e1a 0%, #111827 40%, #0f172a 100%)",
        color: "#e2e8f0",
        fontFamily: "'Inter', -apple-system, sans-serif",
        position: "relative",
      }}
    >
      <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@700&display=swap" rel="stylesheet" />

      {/* Subtle grid bg */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 480, margin: "0 auto", padding: "0 16px" }}>
        {/* Header */}
        <div style={{ padding: "24px 0 16px", textAlign: "center" }}>
          <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: "#4ade80", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 6, fontWeight: 600 }}>
            GA4 Measurement Lab
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0, background: "linear-gradient(135deg, #f1f5f9, #94a3b8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Event Simulator
          </h1>
          <p style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>
            Envía eventos reales a tu propiedad de GA4
          </p>
        </div>

        {/* Config Panel */}
        <div
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 14,
            padding: 16,
            marginBottom: 16,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <span style={{ fontSize: 14 }}>⚙️</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'JetBrains Mono', monospace" }}>
              Configuración
            </span>
            {isConfigured && (
              <span style={{ marginLeft: "auto", fontSize: 10, color: serverSide ? "#a78bfa" : "#22c55e", background: serverSide ? "rgba(139,92,246,0.1)" : "rgba(34,197,94,0.1)", padding: "2px 10px", borderRadius: 99, fontWeight: 600 }}>
                ● {serverSide ? "Server-Side" : "Conectado"}
              </span>
            )}
          </div>

          <div style={{ marginBottom: 10 }}>
            <label style={{ fontSize: 11, color: "#64748b", display: "block", marginBottom: 4, fontFamily: "'JetBrains Mono', monospace" }}>
              Measurement ID
            </label>
            <input
              type="text"
              value={measurementId}
              onChange={(e) => setMeasurementId(e.target.value)}
              placeholder="G-XXXXXXXXXX"
              style={{
                width: "100%",
                padding: "10px 12px",
                background: "rgba(0,0,0,0.3)",
                border: measurementId && !measurementId.startsWith("G-") ? "1px solid #ef4444" : "1px solid rgba(255,255,255,0.08)",
                borderRadius: 8,
                color: "#e2e8f0",
                fontSize: 14,
                fontFamily: "'JetBrains Mono', monospace",
                outline: "none",
                boxSizing: "border-box",
                transition: "border 0.2s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "rgba(74,222,128,0.4)")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
            />
          </div>

          <div style={{ marginBottom: 10 }}>
            <label style={{ fontSize: 11, color: "#64748b", display: "block", marginBottom: 4, fontFamily: "'JetBrains Mono', monospace" }}>
              API Secret{" "}
              <span style={{ color: "#475569", fontWeight: 400 }}>(Admin → Data Streams → Measurement Protocol)</span>
            </label>
            <input
              type="password"
              value={apiSecret}
              onChange={(e) => setApiSecret(e.target.value)}
              placeholder="xxxxxxxxxxxxxxxx"
              style={{
                width: "100%",
                padding: "10px 12px",
                background: "rgba(0,0,0,0.3)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 8,
                color: "#e2e8f0",
                fontSize: 14,
                fontFamily: "'JetBrains Mono', monospace",
                outline: "none",
                boxSizing: "border-box",
                transition: "border 0.2s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "rgba(74,222,128,0.4)")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
            />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <button
              onClick={() => setDebugMode(!debugMode)}
              disabled={serverSide}
              style={{
                background: debugMode && !serverSide ? "rgba(251,191,36,0.15)" : "rgba(255,255,255,0.04)",
                border: debugMode && !serverSide ? "1px solid rgba(251,191,36,0.3)" : "1px solid rgba(255,255,255,0.08)",
                borderRadius: 6,
                padding: "6px 12px",
                color: debugMode && !serverSide ? "#fbbf24" : "#64748b",
                fontSize: 11,
                cursor: serverSide ? "not-allowed" : "pointer",
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 600,
                transition: "all 0.2s",
                opacity: serverSide ? 0.4 : 1,
              }}
            >
              🐛 Debug {debugMode && !serverSide ? "ON" : "OFF"}
            </button>
            <button
              onClick={() => setServerSide(!serverSide)}
              style={{
                background: serverSide ? "rgba(139,92,246,0.15)" : "rgba(255,255,255,0.04)",
                border: serverSide ? "1px solid rgba(139,92,246,0.3)" : "1px solid rgba(255,255,255,0.08)",
                borderRadius: 6,
                padding: "6px 12px",
                color: serverSide ? "#a78bfa" : "#64748b",
                fontSize: 11,
                cursor: "pointer",
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 600,
                transition: "all 0.2s",
              }}
            >
              🖥️ Server-Side {serverSide ? "ON" : "OFF"}
            </button>
          </div>

          {serverSide && (
            <div style={{ marginBottom: 10 }}>
              <label style={{ fontSize: 11, color: "#a78bfa", display: "block", marginBottom: 4, fontFamily: "'JetBrains Mono', monospace" }}>
                URL del contenedor GTM Server-Side
              </label>
              <input
                type="text"
                value={serverUrl}
                onChange={(e) => setServerUrl(e.target.value)}
                placeholder="https://tu-servidor.example.com"
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  background: "rgba(0,0,0,0.3)",
                  border: "1px solid rgba(139,92,246,0.2)",
                  borderRadius: 8,
                  color: "#e2e8f0",
                  fontSize: 14,
                  fontFamily: "'JetBrains Mono', monospace",
                  outline: "none",
                  boxSizing: "border-box",
                  transition: "border 0.2s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "rgba(139,92,246,0.5)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(139,92,246,0.2)")}
              />
              <div style={{ fontSize: 10, color: "#64748b", marginTop: 4, fontFamily: "'JetBrains Mono', monospace" }}>
                Los eventos se enviarán a <span style={{ color: "#a78bfa" }}>{serverUrl.trim().replace(/\/+$/, "") || "..."}/mp/collect</span>
                {measurementId.trim().startsWith("G-") && <span> con measurement_id en el payload</span>}
              </div>
            </div>
          )}

          {!serverSide && (
            <div style={{ fontSize: 10, color: "#475569" }}>
              {debugMode ? "🐛 Valida sin enviar datos reales" : "Envía datos directamente a GA4"}
            </div>
          )}
        </div>

        {/* Stats Bar */}
        <div
          style={{
            display: "flex",
            gap: 8,
            marginBottom: 16,
          }}
        >
          <div
            style={{
              flex: 1,
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 10,
              padding: "10px 14px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 20, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", color: "#4ade80" }}>{totalEvents}</div>
            <div style={{ fontSize: 10, color: "#64748b", fontWeight: 500 }}>Eventos enviados</div>
          </div>
          <div
            style={{
              flex: 1,
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 10,
              padding: "10px 14px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 20, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", color: "#60a5fa" }}>{logs.filter((l) => l.status === "success").length}</div>
            <div style={{ fontSize: 10, color: "#64748b", fontWeight: 500 }}>Exitosos</div>
          </div>
          <div
            style={{
              flex: 1,
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 10,
              padding: "10px 14px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 20, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", color: "#f87171" }}>{logs.filter((l) => l.status === "error").length}</div>
            <div style={{ fontSize: 10, color: "#64748b", fontWeight: 500 }}>Errores</div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, marginBottom: 12 }}>
          {[
            { key: "ecommerce", label: "🛍️ Ecommerce", count: GA4_EVENTS.ecommerce.length },
            { key: "custom", label: "⚡ Custom", count: GA4_EVENTS.custom.length },
            { key: "log", label: "📊 Log", count: logs.length },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                flex: 1,
                padding: "10px 0",
                background: activeTab === tab.key ? "rgba(74,222,128,0.1)" : "rgba(255,255,255,0.02)",
                border: activeTab === tab.key ? "1px solid rgba(74,222,128,0.25)" : "1px solid rgba(255,255,255,0.05)",
                borderRadius: 8,
                color: activeTab === tab.key ? "#4ade80" : "#64748b",
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {tab.label} <span style={{ opacity: 0.6 }}>({tab.count})</span>
            </button>
          ))}
        </div>

        {/* Events Grid */}
        {activeTab !== "log" && (
          <>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 8,
                marginBottom: 12,
              }}
            >
              {GA4_EVENTS[activeTab].map((event) => (
                <EventButton key={event.name} event={event} onClick={handleEventClick} disabled={!isConfigured || sending} />
              ))}
            </div>

            {activeTab === "ecommerce" && (
              <button
                onClick={sendAllEcommerce}
                disabled={!isConfigured || sending}
                style={{
                  width: "100%",
                  padding: "12px",
                  background: isConfigured ? "linear-gradient(135deg, rgba(74,222,128,0.15), rgba(34,197,94,0.1))" : "rgba(255,255,255,0.02)",
                  border: isConfigured ? "1px solid rgba(74,222,128,0.25)" : "1px solid rgba(255,255,255,0.05)",
                  borderRadius: 10,
                  color: isConfigured ? "#4ade80" : "#475569",
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: isConfigured ? "pointer" : "not-allowed",
                  fontFamily: "'JetBrains Mono', monospace",
                  letterSpacing: "0.02em",
                  transition: "all 0.2s",
                  marginBottom: 16,
                }}
              >
                🚀 Enviar TODOS los eventos de ecommerce (funnel completo)
              </button>
            )}

            {activeTab === "custom" && (
              <div
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 12,
                  padding: 14,
                  marginBottom: 16,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <span style={{ fontSize: 14 }}>✏️</span>
                  <span style={{ fontSize: 11, fontWeight: 600, color: "#fbbf24", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'JetBrains Mono', monospace" }}>
                    Evento libre
                  </span>
                </div>
                <div style={{ fontSize: 11, color: "#64748b", marginBottom: 10 }}>
                  Escribe el nombre del evento que quieras y se enviará a GA4 sin parámetros adicionales.
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <input
                    type="text"
                    value={customEventName}
                    onChange={(e) => setCustomEventName(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") sendCustomEvent(); }}
                    placeholder="nombre_del_evento"
                    style={{
                      flex: 1,
                      padding: "10px 12px",
                      background: "rgba(0,0,0,0.3)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 8,
                      color: "#e2e8f0",
                      fontSize: 14,
                      fontFamily: "'JetBrains Mono', monospace",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "rgba(251,191,36,0.4)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
                  />
                  <button
                    onClick={sendCustomEvent}
                    disabled={!isConfigured || !customEventName.trim()}
                    style={{
                      padding: "10px 20px",
                      background: isConfigured && customEventName.trim() ? "linear-gradient(135deg, rgba(74,222,128,0.15), rgba(34,197,94,0.1))" : "rgba(255,255,255,0.02)",
                      border: isConfigured && customEventName.trim() ? "1px solid rgba(74,222,128,0.25)" : "1px solid rgba(255,255,255,0.05)",
                      borderRadius: 8,
                      color: isConfigured && customEventName.trim() ? "#4ade80" : "#475569",
                      fontSize: 13,
                      fontWeight: 700,
                      cursor: isConfigured && customEventName.trim() ? "pointer" : "not-allowed",
                      fontFamily: "'JetBrains Mono', monospace",
                      transition: "all 0.2s",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Enviar
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {/* Log Panel */}
        {activeTab === "log" && (
          <div ref={logRef} style={{ maxHeight: 400, overflowY: "auto", paddingBottom: 16 }}>
            {logs.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px 20px", color: "#475569" }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>📭</div>
                <div style={{ fontSize: 13 }}>No hay eventos aún. Configura tu ID y API Secret, luego pulsa un botón.</div>
              </div>
            ) : (
              <>
                <button
                  onClick={() => setLogs([])}
                  style={{
                    marginBottom: 8,
                    padding: "6px 12px",
                    background: "rgba(239,68,68,0.1)",
                    border: "1px solid rgba(239,68,68,0.2)",
                    borderRadius: 6,
                    color: "#f87171",
                    fontSize: 11,
                    cursor: "pointer",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontWeight: 600,
                  }}
                >
                  🗑️ Limpiar log
                </button>
                {logs.map((entry, i) => (
                  <LogEntry key={`${entry.time}-${i}`} entry={entry} index={i} />
                ))}
              </>
            )}
          </div>
        )}

        {/* Instructions */}
        {!isConfigured && (
          <div
            style={{
              background: serverSide ? "rgba(139,92,246,0.08)" : "rgba(59,130,246,0.08)",
              border: serverSide ? "1px solid rgba(139,92,246,0.15)" : "1px solid rgba(59,130,246,0.15)",
              borderRadius: 12,
              padding: 16,
              marginTop: 8,
              marginBottom: 24,
            }}
          >
            {serverSide ? (
              <>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#a78bfa", marginBottom: 8 }}>🖥️ Modo Server-Side</div>
                <div style={{ fontSize: 12, color: "#94a3b8", lineHeight: 1.7 }}>
                  <div style={{ marginBottom: 6 }}><strong style={{ color: "#cbd5e1" }}>1.</strong> Introduce la <strong style={{ color: "#cbd5e1" }}>URL de tu contenedor GTM Server-Side</strong></div>
                  <div style={{ marginBottom: 6 }}><strong style={{ color: "#cbd5e1" }}>2.</strong> Opcionalmente, añade Measurement ID y API Secret (se incluirán en el payload)</div>
                  <div><strong style={{ color: "#cbd5e1" }}>3.</strong> Los eventos se enviarán a <strong style={{ color: "#cbd5e1" }}>/mp/collect</strong> de tu servidor</div>
                </div>
              </>
            ) : (
              <>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#60a5fa", marginBottom: 8 }}>📘 Cómo empezar</div>
                <div style={{ fontSize: 12, color: "#94a3b8", lineHeight: 1.7 }}>
                  <div style={{ marginBottom: 6 }}><strong style={{ color: "#cbd5e1" }}>1.</strong> Ve a Google Analytics → Admin → Data Streams</div>
                  <div style={{ marginBottom: 6 }}><strong style={{ color: "#cbd5e1" }}>2.</strong> Copia tu <strong style={{ color: "#cbd5e1" }}>Measurement ID</strong> (empieza por G-)</div>
                  <div style={{ marginBottom: 6 }}><strong style={{ color: "#cbd5e1" }}>3.</strong> En la misma sección, crea un <strong style={{ color: "#cbd5e1" }}>API Secret</strong> en "Measurement Protocol API secrets"</div>
                  <div><strong style={{ color: "#cbd5e1" }}>4.</strong> Pega ambos valores arriba y empieza a enviar eventos</div>
                </div>
              </>
            )}
          </div>
        )}

        {/* Tip Box */}
        <div
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.04)",
            borderRadius: 12,
            padding: 14,
            marginBottom: 24,
          }}
        >
          <div style={{ fontSize: 11, color: "#64748b", lineHeight: 1.6, fontFamily: "'JetBrains Mono', monospace" }}>
            💡 <strong style={{ color: "#94a3b8" }}>Tip:</strong> Activa el <strong style={{ color: "#fbbf24" }}>Debug Mode</strong> para validar los payloads antes de enviar datos reales.
            Activa <strong style={{ color: "#a78bfa" }}>Server-Side</strong> para enviar a un contenedor de GTM SS y practicar transformaciones de datos.
          </div>
        </div>

        {/* Footer */}
        <div style={{ textAlign: "center", paddingBottom: 32, color: "#334155", fontSize: 11 }}>
          GA4 Measurement Lab
        </div>
      </div>
    </div>
  );
}
