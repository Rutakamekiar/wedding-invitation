"use strict";

const WEDDING_DATE = new Date("2027-04-11T13:00:00+03:00");
const DEFAULT_GREETING = "Дорогі гості";

function decodeBase64Url(value) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(
    normalized.length + ((4 - (normalized.length % 4)) % 4),
    "=",
  );
  const bytes = Uint8Array.from(atob(padded), (character) =>
    character.charCodeAt(0),
  );
  return new TextDecoder().decode(bytes);
}

function getGuestName() {
  const params = new URLSearchParams(window.location.search);
  const encodedGuest = params.get("guest") || params.get("g");
  const readableGuest = params.get("name");

  if (encodedGuest) {
    try {
      const decoded = decodeBase64Url(encodedGuest).trim();
      if (!decoded) return "";

      try {
        const payload = JSON.parse(decoded);
        if (typeof payload === "string") return payload.trim();
        if (typeof payload.name === "string") return payload.name.trim();
        if (Array.isArray(payload.names)) {
          return payload.names.filter(Boolean).join(" та ").trim();
        }
      } catch {
        return decoded;
      }
    } catch {
      console.warn("Guest parameter could not be decoded.");
    }
  }

  return readableGuest?.trim() || "";
}

function applyGuestName() {
  const guestName = getGuestName();
  if (!guestName) return;

  document.getElementById("guest-greeting").textContent =
    `Дорогі ${guestName}`;
  document.getElementById("guest-name").value = guestName;
  document.title = `${guestName} — весільне запрошення`;
}

function pluralizeUkrainian(value, forms) {
  const absolute = Math.abs(value) % 100;
  const finalDigit = absolute % 10;
  if (absolute > 10 && absolute < 20) return forms[2];
  if (finalDigit > 1 && finalDigit < 5) return forms[1];
  if (finalDigit === 1) return forms[0];
  return forms[2];
}

function updateCountdown() {
  const distance = Math.max(0, WEDDING_DATE.getTime() - Date.now());
  const days = Math.floor(distance / 86_400_000);
  const hours = Math.floor((distance / 3_600_000) % 24);
  const minutes = Math.floor((distance / 60_000) % 60);
  const seconds = Math.floor((distance / 1_000) % 60);

  document.querySelector(".day").textContent = String(days).padStart(3, "0");
  document.querySelector(".hour").textContent = String(hours).padStart(2, "0");
  document.querySelector(".minut").textContent = String(minutes).padStart(
    2,
    "0",
  );
  document.querySelector(".second").textContent = String(seconds).padStart(
    2,
    "0",
  );

  document.querySelector(".day-label").textContent = pluralizeUkrainian(days, [
    "день",
    "дні",
    "днів",
  ]);
  document.querySelector(".hour-label").textContent = pluralizeUkrainian(
    hours,
    ["година", "години", "годин"],
  );
  document.querySelector(".minute-label").textContent = pluralizeUkrainian(
    minutes,
    ["хвилина", "хвилини", "хвилин"],
  );
  document.querySelector(".second-label").textContent = pluralizeUkrainian(
    seconds,
    ["секунда", "секунди", "секунд"],
  );
}

function setupFixedSections() {
  const sections = [
    document.querySelector(".section_countdown"),
    document.querySelector(".last__section"),
  ].filter(Boolean);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("visible", entry.isIntersecting);
      });
    },
    {
      rootMargin: "100px 0px",
      threshold: 0,
    },
  );

  sections.forEach((section) => observer.observe(section));
}

function setupMusic() {
  const music = document.getElementById("background-music");
  const button = document.getElementById("mute-button");
  const playIcon = document.getElementById("sound-on");
  const pauseIcon = document.getElementById("sound-off");

  button.addEventListener("click", async () => {
    if (music.paused) {
      try {
        await music.play();
        button.setAttribute("aria-pressed", "true");
        button.setAttribute("aria-label", "Вимкнути музику");
        playIcon.hidden = true;
        pauseIcon.hidden = false;
      } catch {
        button.setAttribute("aria-label", "Не вдалося увімкнути музику");
      }
      return;
    }

    music.pause();
    button.setAttribute("aria-pressed", "false");
    button.setAttribute("aria-label", "Увімкнути музику");
    playIcon.hidden = false;
    pauseIcon.hidden = true;
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden && !music.paused) {
      music.pause();
      button.setAttribute("aria-pressed", "false");
      playIcon.hidden = false;
      pauseIcon.hidden = true;
    }
  });
}

const GRID_DATA = [
  "Ж",
  "Р",
  "О",
  "В",
  "А",
  "Н",
  "А",
  "Р",
  "Е",
  "Ч",
  "Е",
  "Н",
  "А",
  "А",
  "Л",
  "Ф",
  "А",
  "Т",
  "А",
  "Т",
  "Ь",
  "К",
  "П",
  "О",
  "І",
  "Ц",
  "А",
  "Н",
  "И",
  "І",
  "Г",
  "О",
  "І",
  "С",
  "М",
  "Н",
  "Л",
  "О",
  "Б",
  "І",
  "Т",
  "Н",
  "И",
  "Ц",
  "Я",
  "В",
  "Б",
  "У",
  "К",
  "Е",
  "Т",
  "У",
  "З",
  "І",
  "М",
  "Ь",
  "О",
  "К",
  "П",
  "Е",
  "О",
  "Ь",
  "М",
  "А",
  "Н",
  "А",
  "В",
  "Е",
  "С",
  "І",
  "Л",
  "Л",
  "Я",
  "Л",
  "Н",
  "Р",
  "О",
  "Б",
  "Р",
  "У",
  "Ч",
  "К",
  "А",
  "Д",
  "Н",
  "А",
  "Е",
  "І",
  "І",
  "И",
  "Е",
  "Е",
  "Ь",
  "Ц",
  "Ь",
  "А",
  "Л",
  "Я",
  "К",
  "С",
  "Р",
  "Н",
  "К",
  "Т",
  "Й",
  "Н",
  "П",
  "Е",
  "О",
  "Ь",
  "О",
  "А",
  "Л",
  "О",
  "Т",
  "О",
  "Р",
  "Т",
  "І",
  "Ь",
  "И",
  "Ь",
  "Й",
  "Л",
  "О",
  "К",
  "О",
  "Х",
  "А",
  "Н",
  "Н",
  "Я",
  "Ч",
  "Л",
  "Ь",
  "Й",
  "О",
  "Л",
  "Г",
  "Р",
  "Т",
  "Ь",
  "Т",
  "А",
  "Н",
  "Е",
  "Ц",
  "Ь",
  "А",
  "Т",
  "Я",
  "К",
  "Ь",
  "Р",
  "П",
  "Н",
  "А",
  "Р",
  "Е",
  "Ч",
  "Е",
  "Н",
  "И",
  "Й",
  "И",
];

function setupWordSearch() {
  const grid = document.getElementById("grid");
  const wordList = document.getElementById("wordList");
  const canvas = document.getElementById("lineCanvas");
  const context = canvas.getContext("2d");
  const words = document
    .getElementById("words-data")
    .dataset.words.split(",")
    .map((word) => word.trim().toUpperCase());
  const foundWords = new Set();
  let selectedCells = [];
  let selecting = false;

  words.forEach((word) => {
    const item = document.createElement("span");
    item.textContent = word;
    item.dataset.word = word;
    wordList.append(item);
  });

  GRID_DATA.forEach((letter, index) => {
    const cell = document.createElement("p");
    cell.className = "cell";
    cell.textContent = letter;
    cell.dataset.letter = letter;
    cell.dataset.row = String(Math.floor(index / 15));
    cell.dataset.col = String(index % 15);
    grid.append(cell);
  });

  const cells = [...grid.querySelectorAll(".cell")];

  function resizeCanvas() {
    const bounds = grid.getBoundingClientRect();
    const pixelRatio = window.devicePixelRatio || 1;
    canvas.width = Math.round(bounds.width * pixelRatio);
    canvas.height = Math.round(bounds.height * pixelRatio);
    canvas.style.width = `${bounds.width}px`;
    canvas.style.height = `${bounds.height}px`;
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  }

  function clearTemporarySelection() {
    cells.forEach((cell) => cell.classList.remove("selected"));
    selectedCells = [];
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  function areNeighbors(first, second) {
    if (!first || !second) return false;
    const rowDifference = Math.abs(
      Number(first.dataset.row) - Number(second.dataset.row),
    );
    const columnDifference = Math.abs(
      Number(first.dataset.col) - Number(second.dataset.col),
    );
    return rowDifference <= 1 && columnDifference <= 1;
  }

  function getCellFromPointer(event) {
    const element = document.elementFromPoint(event.clientX, event.clientY);
    return element?.classList.contains("cell") ? element : null;
  }

  function selectCell(cell) {
    if (!cell || cell.classList.contains("selected")) return;
    const previous = selectedCells.at(-1);
    if (previous && !areNeighbors(cell, previous)) return;
    cell.classList.add("selected");
    selectedCells.push(cell);
  }

  function finishSelection() {
    if (!selecting || selectedCells.length === 0) return;
    selecting = false;
    const selectedWord = selectedCells
      .map((cell) => cell.dataset.letter)
      .join("");
    const matchingWord = wordList.querySelector(
      `[data-word="${CSS.escape(selectedWord)}"]`,
    );

    if (matchingWord && !foundWords.has(selectedWord)) {
      selectedCells.forEach((cell) => {
        cell.classList.remove("selected");
        cell.classList.add("correct");
      });
      matchingWord.classList.add("found");
      foundWords.add(selectedWord);
      selectedCells = [];
      if (foundWords.size === words.length) showGameSurprise();
    } else {
      window.setTimeout(clearTemporarySelection, 350);
    }
  }

  grid.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    clearTemporarySelection();
    selecting = true;
    selectCell(getCellFromPointer(event));
    grid.setPointerCapture(event.pointerId);
  });
  grid.addEventListener("pointermove", (event) => {
    if (selecting) selectCell(getCellFromPointer(event));
  });
  grid.addEventListener("pointerup", finishSelection);
  grid.addEventListener("pointercancel", finishSelection);

  function showGameSurprise() {
    document.querySelector(".grid-wrapper").classList.add("active");
    document.getElementById("game-surprise").classList.add("active");
    document.getElementById("close-game").classList.add("active");
  }

  document.getElementById("close-game").addEventListener("click", () => {
    document.querySelector(".grid-wrapper").classList.remove("active");
    document.getElementById("game-surprise").classList.remove("active");
    document.getElementById("close-game").classList.remove("active");
  });

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);
}

function setupDecorativeHearts() {
  const positions = {
    section1: [
      ["-12%", "5%"],
      ["-5%", "27%"],
      ["8%", "91%"],
      ["77%", "8%"],
      ["88%", "72%"],
    ],
    section2: [
      ["62%", "8%"],
      ["78%", "48%"],
      ["88%", "91%"],
    ],
    section3: [
      ["21%", "-2%"],
      ["42%", "93%"],
      ["78%", "2%"],
    ],
    section4: [
      ["62%", "9%"],
      ["73%", "44%"],
      ["85%", "88%"],
    ],
  };

  document.querySelectorAll("[data-heart]").forEach((container) => {
    container.style.position = "relative";
    const items = positions[container.dataset.heart] || [];
    items.forEach(([top, left], index) => {
      const heart = document.createElement("img");
      heart.src =
        index % 2 === 0
          ? "assets/icons/heart.svg"
          : "assets/icons/heart-dark.png";
      heart.alt = "";
      heart.className = "heart";
      heart.style.position = "absolute";
      heart.style.top = top;
      heart.style.left = left;
      heart.style.width = index % 2 === 0 ? "20px" : "18px";
      heart.style.animationDelay = `${index * 100}ms`;
      container.append(heart);
    });
  });
}

function setupRsvpForm() {
  const form = document.getElementById("contactForm");
  const nameInput = document.getElementById("guest-name");
  const dialog = document.getElementById("response-dialog");
  const nameError = form.querySelector('[data-error="name"]');
  const attendanceError = form.querySelector('[data-error="attendance"]');

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const nameIsValid = Boolean(data.get("name")?.trim());
    const attendanceIsValid = Boolean(data.get("attendance"));
    nameError.hidden = nameIsValid;
    attendanceError.hidden = attendanceIsValid;

    if (!nameIsValid) nameInput.focus();
    if (!nameIsValid || !attendanceIsValid) return;

    const response = {
      name: data.get("name"),
      attendance: data.get("attendance"),
      comment: data.get("comment"),
      submittedAt: new Date().toISOString(),
    };
    window.localStorage.setItem("wedding-rsvp-preview", JSON.stringify(response));

    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    } else {
      window.alert("Готово! Вашу відповідь збережено.");
    }
  });

  dialog.querySelector("[data-close-dialog]").addEventListener("click", () => {
    dialog.close();
  });

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
}

function downloadCalendarEvent() {
  const formatDate = (date) =>
    date
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}Z$/, "Z");
  const end = new Date(WEDDING_DATE.getTime() + 9 * 60 * 60 * 1000);
  const calendar = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Wedding Invitation//UK",
    "BEGIN:VEVENT",
    `UID:wedding-${WEDDING_DATE.getTime()}@invitation`,
    `DTSTAMP:${formatDate(new Date())}`,
    `DTSTART:${formatDate(WEDDING_DATE)}`,
    `DTEND:${formatDate(end)}`,
    "SUMMARY:Весілля Андрія та Анни",
    "LOCATION:Fairmont Grand Hotel Kyiv",
    "DESCRIPTION:Весілля Андрія та Анни — 11 квітня 2027 року",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([calendar], { type: "text/calendar;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "wedding-andrii-anna.ics";
  link.click();
  URL.revokeObjectURL(link.href);
}

window.createGuestLink = function createGuestLink(name) {
  const bytes = new TextEncoder().encode(name);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  const encoded = btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
  const url = new URL(window.location.href);
  url.search = "";
  url.hash = "";
  url.searchParams.set("guest", encoded);
  return url.toString();
};

document.addEventListener("DOMContentLoaded", () => {
  applyGuestName();
  updateCountdown();
  window.setInterval(updateCountdown, 1_000);
  setupFixedSections();
  setupMusic();
  setupWordSearch();
  setupDecorativeHearts();
  setupRsvpForm();
  document
    .getElementById("download-calendar")
    .addEventListener("click", downloadCalendarEvent);
});
