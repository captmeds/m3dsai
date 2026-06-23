/* ── m3dsEYE dashboard client ──────────────────────────────────────────────
 * Vanilla JS (no build step). Talks to the FastAPI backend with a JWT bearer
 * token kept in localStorage. Keeps detection/OCR/DB concerns server-side.
 * ------------------------------------------------------------------------- */
const m3dsEYE = (() => {
  const TOKEN_KEY = "m3dseye_token";
  const ROLE_KEY = "m3dseye_role";
  const EMAIL_KEY = "m3dseye_email";

  const token = () => localStorage.getItem(TOKEN_KEY);
  const role = () => localStorage.getItem(ROLE_KEY);
  const email = () => localStorage.getItem(EMAIL_KEY);

  /* Generic authenticated fetch wrapper. */
  async function api(path, opts = {}) {
    const headers = opts.headers || {};
    if (token()) headers["Authorization"] = "Bearer " + token();
    const res = await fetch(path, { ...opts, headers });
    if (res.status === 401) {
      logout();
      throw new Error("Session expired — please sign in again.");
    }
    if (!res.ok) {
      let detail = res.statusText;
      try { detail = (await res.json()).detail || detail; } catch (e) {}
      throw new Error(detail);
    }
    const ct = res.headers.get("content-type") || "";
    return ct.includes("application/json") ? res.json() : res;
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ROLE_KEY);
    localStorage.removeItem(EMAIL_KEY);
    window.location.href = "/login";
  }

  const esc = (s) => String(s ?? "").replace(/[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const mediaUrl = (p) => p ? `/api/media/${p}` + `?_=${token() ? "" : ""}` : "";

  /* ── Login page ──────────────────────────────────────────────────────── */
  async function initLogin() {
    try {
      const cfg = await (await fetch("/api/config")).json();
      const banner = document.getElementById("lawful-banner");
      if (banner && !cfg.lawful_use_banner) banner.hidden = true;
    } catch (e) {}

    const form = document.getElementById("login-form");
    const err = document.getElementById("login-error");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      err.textContent = "";
      const body = new URLSearchParams();
      body.set("username", document.getElementById("email").value);
      body.set("password", document.getElementById("password").value);
      try {
        const res = await fetch("/api/auth/login", { method: "POST", body });
        if (!res.ok) throw new Error((await res.json()).detail || "Login failed");
        const data = await res.json();
        localStorage.setItem(TOKEN_KEY, data.access_token);
        localStorage.setItem(ROLE_KEY, data.role);
        localStorage.setItem(EMAIL_KEY, data.email);
        window.location.href = "/app";
      } catch (ex) {
        err.textContent = ex.message;
      }
    });
  }

  /* ── Dashboard ───────────────────────────────────────────────────────── */
  let liveCameraId = null;

  async function initDashboard() {
    if (!token()) { window.location.href = "/login"; return; }

    // Header + role-gated UI.
    document.getElementById("user-chip").textContent = `${email()} · ${role()}`;
    document.getElementById("logout-btn").onclick = logout;
    if (role() === "admin") {
      document.querySelectorAll(".admin-only").forEach((el) => (el.hidden = false));
    }

    try {
      const cfg = await (await fetch("/api/config")).json();
      const banner = document.getElementById("lawful-banner");
      if (banner) banner.hidden = !cfg.lawful_use_banner;
    } catch (e) {}

    setupTabs();
    bindForms();
    await Promise.all([loadCameras(), loadDetections(), loadAlerts(), loadWatchlist()]);
    // Periodically refresh alert badge.
    setInterval(loadAlerts, 15000);
  }

  function setupTabs() {
    const tabs = document.querySelectorAll(".tab");
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        tabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
        document.querySelectorAll(".panel").forEach((p) => (p.hidden = true));
        const name = tab.dataset.tab;
        document.getElementById("tab-" + name).hidden = false;
        if (name === "audit") loadAudit();
        if (name === "detections") loadDetections();
      });
    });

    // Live controls.
    document.getElementById("start-btn").onclick = startStream;
    document.getElementById("stop-btn").onclick = stopStream;
    document.getElementById("live-camera").onchange = (e) => (liveCameraId = +e.target.value);

    // Detection filters.
    document.getElementById("search-btn").onclick = loadDetections;
    document.getElementById("export-btn").onclick = exportCsv;

    // Modal.
    document.getElementById("modal-close").onclick = () =>
      (document.getElementById("detail-modal").hidden = true);
  }

  function bindForms() {
    const isPriv = role() === "admin" || role() === "operator";

    document.getElementById("camera-form").addEventListener("submit", async (e) => {
      e.preventDefault();
      try {
        await api("/api/cameras", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: val("c-name"), location: val("c-location"),
            camera_type: val("c-type"), source: val("c-source"),
          }),
        });
        e.target.reset();
        await loadCameras();
      } catch (ex) { alert(ex.message); }
    });

    document.getElementById("watchlist-form").addEventListener("submit", async (e) => {
      e.preventDefault();
      try {
        await api("/api/watchlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            plate_text: val("w-plate"), reason: val("w-reason"),
            severity: val("w-severity"), reference: val("w-reference"),
          }),
        });
        e.target.reset();
        await loadWatchlist();
      } catch (ex) { alert(ex.message); }
    });

    if (!isPriv) {
      // Hide write controls for viewers.
      ["camera-form", "watchlist-form"].forEach((id) => {
        const f = document.getElementById(id);
        if (f) f.style.display = "none";
      });
    }
  }

  const val = (id) => document.getElementById(id).value;

  /* ── Cameras ─────────────────────────────────────────────────────────── */
  async function loadCameras() {
    const cams = await api("/api/cameras");
    // Populate selects.
    const liveSel = document.getElementById("live-camera");
    const filterSel = document.getElementById("f-camera");
    liveSel.innerHTML = "";
    filterSel.innerHTML = '<option value="">All cameras</option>';
    cams.forEach((c) => {
      liveSel.insertAdjacentHTML("beforeend", `<option value="${c.id}">${esc(c.name)} (${c.camera_type})</option>`);
      filterSel.insertAdjacentHTML("beforeend", `<option value="${c.id}">${esc(c.name)}</option>`);
    });
    if (cams.length && liveCameraId === null) liveCameraId = cams[0].id;

    // Table.
    const tbody = document.querySelector("#cameras-table tbody");
    tbody.innerHTML = cams.map((c) => `
      <tr>
        <td>${c.id}</td><td>${esc(c.name)}</td><td>${c.camera_type}</td>
        <td><code>${esc(c.source)}</code></td><td>${esc(c.location)}</td>
        <td>${role() === "admin"
          ? `<button class="btn btn-ghost btn-danger" onclick="m3dsEYE.deleteCamera(${c.id})">Delete</button>`
          : ""}</td>
      </tr>`).join("") || `<tr><td colspan="6" class="muted">No cameras yet. Add one above.</td></tr>`;
  }

  async function deleteCamera(id) {
    if (!confirm("Delete this camera?")) return;
    try { await api(`/api/cameras/${id}`, { method: "DELETE" }); await loadCameras(); }
    catch (ex) { alert(ex.message); }
  }

  /* ── Live stream ─────────────────────────────────────────────────────── */
  async function startStream() {
    if (!liveCameraId) { alert("Add and select a camera first."); return; }
    try {
      const st = await api("/api/stream/start", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ camera_id: liveCameraId }),
      });
      renderStreamStatus(st);
      const img = document.getElementById("live-img");
      img.src = `/api/stream/${liveCameraId}/live.mjpg?token=${encodeURIComponent(token())}`;
    } catch (ex) { alert(ex.message); }
  }

  async function stopStream() {
    if (!liveCameraId) return;
    try {
      await api("/api/stream/stop", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ camera_id: liveCameraId }),
      });
    } catch (ex) {}
    document.getElementById("live-img").removeAttribute("src");
    document.getElementById("stream-mode").textContent = "stopped";
    document.getElementById("stream-mode").className = "status-pill";
  }

  function renderStreamStatus(st) {
    const pill = document.getElementById("stream-mode");
    pill.textContent = st.mode === "mock" ? "MOCK MODE" : "LIVE";
    pill.className = "status-pill " + (st.mode === "mock" ? "mock" : "live");
    document.getElementById("stream-stats").textContent =
      st.message ? `Status: ${st.message}` : "";
  }

  /* ── Detections ──────────────────────────────────────────────────────── */
  function detectionQuery() {
    const p = new URLSearchParams();
    if (val("f-plate")) p.set("plate", val("f-plate"));
    if (val("f-camera")) p.set("camera_id", val("f-camera"));
    if (val("f-type")) p.set("vehicle_type", val("f-type"));
    if (val("f-from")) p.set("date_from", val("f-from"));
    if (val("f-to")) p.set("date_to", val("f-to"));
    return p.toString();
  }

  async function loadDetections() {
    let rows;
    try { rows = await api("/api/detections?" + detectionQuery()); }
    catch (ex) { return; }
    const tbody = document.querySelector("#detections-table tbody");
    tbody.innerHTML = rows.map((d) => `
      <tr onclick="m3dsEYE.showDetection(${d.id})" style="cursor:pointer">
        <td>${d.snapshot_path
          ? `<img class="thumb" src="${mediaUrl(d.snapshot_path)}" loading="lazy"/>` : "—"}</td>
        <td>${d.best_plate_text ? `<span class="plate-tag">${esc(d.best_plate_text)}</span>` : "—"}</td>
        <td>${(d.best_plate_confidence * 100).toFixed(0)}%</td>
        <td>${esc(d.vehicle_type)}</td>
        <td>${d.camera_id}</td>
        <td>${new Date(d.first_seen + "Z").toLocaleString()}</td>
        <td><span class="pill none" id="wl-${d.id}">—</span></td>
      </tr>`).join("") || `<tr><td colspan="7" class="muted">No detections match your filters.</td></tr>`;
  }

  async function showDetection(id) {
    try {
      const d = await api(`/api/detections/${id}`);
      const body = document.getElementById("modal-body");
      body.innerHTML = `
        <h2>Detection #${d.id} ${d.is_watchlisted ? '<span class="pill hit">WATCHLIST HIT</span>' : ""}</h2>
        <div class="kv">
          <span>Plate</span><span>${d.best_plate_text ? `<span class="plate-tag">${esc(d.best_plate_text)}</span>` : "—"}</span>
          <span>Confidence</span><span>${(d.best_plate_confidence * 100).toFixed(1)}%</span>
          <span>Vehicle type</span><span>${esc(d.vehicle_type)}</span>
          <span>Camera</span><span>${esc(d.camera_name || d.camera_id)} ${d.camera_location ? "· " + esc(d.camera_location) : ""}</span>
          <span>First seen</span><span>${new Date(d.first_seen + "Z").toLocaleString()}</span>
          <span>Plate reads</span><span>${d.plate_reads.length}</span>
        </div>
        ${d.plate_image_path ? `<p class="muted">Plate crop:</p><img src="${mediaUrl(d.plate_image_path)}"/>` : ""}
        ${d.snapshot_path ? `<p class="muted">Vehicle snapshot (privacy-filtered):</p><img src="${mediaUrl(d.snapshot_path)}"/>` : ""}
      `;
      document.getElementById("detail-modal").hidden = false;
    } catch (ex) { alert(ex.message); }
  }

  async function exportCsv() {
    try {
      const res = await api("/api/detections/export/csv?" + detectionQuery());
      const blob = await res.blob();
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "detections.csv";
      a.click();
    } catch (ex) { alert(ex.message); }
  }

  /* ── Alerts ──────────────────────────────────────────────────────────── */
  async function loadAlerts() {
    let rows;
    try { rows = await api("/api/alerts"); } catch (ex) { return; }
    const open = rows.filter((a) => a.status === "new").length;
    document.getElementById("alert-count").textContent = open;
    const tbody = document.querySelector("#alerts-table tbody");
    const canAct = role() === "admin" || role() === "operator";
    tbody.innerHTML = rows.map((a) => `
      <tr>
        <td><span class="plate-tag">${esc(a.plate_text)}</span></td>
        <td>${esc(a.reason)}</td>
        <td><span class="pill ${a.severity}">${a.severity}</span></td>
        <td>${a.status}</td>
        <td>${new Date(a.created_at + "Z").toLocaleString()}</td>
        <td>${canAct && a.status === "new"
          ? `<button class="btn btn-ghost" onclick="m3dsEYE.updateAlert(${a.id},'acknowledged')">Acknowledge</button>
             <button class="btn btn-ghost" onclick="m3dsEYE.updateAlert(${a.id},'dismissed')">Dismiss</button>`
          : ""}</td>
      </tr>`).join("") || `<tr><td colspan="6" class="muted">No alerts.</td></tr>`;
  }

  async function updateAlert(id, status) {
    try {
      await api(`/api/alerts/${id}`, {
        method: "PATCH", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      await loadAlerts();
    } catch (ex) { alert(ex.message); }
  }

  /* ── Watchlist ───────────────────────────────────────────────────────── */
  async function loadWatchlist() {
    let rows;
    try { rows = await api("/api/watchlist"); } catch (ex) { return; }
    const tbody = document.querySelector("#watchlist-table tbody");
    tbody.innerHTML = rows.map((w) => `
      <tr>
        <td><span class="plate-tag">${esc(w.plate_text)}</span></td>
        <td>${esc(w.reason)}</td>
        <td><span class="pill ${w.severity}">${w.severity}</span></td>
        <td>${esc(w.reference)}</td>
        <td>${esc(w.added_by)}</td>
        <td>${role() === "admin"
          ? `<button class="btn btn-ghost btn-danger" onclick="m3dsEYE.deleteWatchlist(${w.id})">Remove</button>`
          : ""}</td>
      </tr>`).join("") || `<tr><td colspan="6" class="muted">Watchlist is empty.</td></tr>`;
  }

  async function deleteWatchlist(id) {
    if (!confirm("Remove this watchlist entry?")) return;
    try { await api(`/api/watchlist/${id}`, { method: "DELETE" }); await loadWatchlist(); }
    catch (ex) { alert(ex.message); }
  }

  /* ── Audit (admin) ───────────────────────────────────────────────────── */
  async function loadAudit() {
    let rows;
    try { rows = await api("/api/audit"); } catch (ex) { return; }
    const tbody = document.querySelector("#audit-table tbody");
    tbody.innerHTML = rows.map((a) => `
      <tr>
        <td>${new Date(a.timestamp + "Z").toLocaleString()}</td>
        <td>${esc(a.user_email)}</td><td>${esc(a.action)}</td>
        <td>${esc(a.resource)}</td><td>${esc(a.detail)}</td><td>${esc(a.ip_address)}</td>
      </tr>`).join("") || `<tr><td colspan="6" class="muted">No audit entries.</td></tr>`;
  }

  // Public surface.
  return {
    initLogin, initDashboard,
    deleteCamera, showDetection, updateAlert, deleteWatchlist,
  };
})();
