const yemekler = {
  sabah: {
    hizli: ["Tost 🥪", "Poğaça ☕", "Simit 🥨", "Sandviç 🥙"],
    saglikli: ["Yulaf 🥣", "Haşlanmış Yumurta 🥚", "Meyve 🍎"],
    ev: ["Menemen 🍳", "Omlet 🧀"]
  },
  ogle: {
    hizli: ["Hamburger 🍔", "Döner 🥙", "Pizza 🍕", "Tantuni 🌯"],
    saglikli: ["Salata 🥗", "Izgara Tavuk 🍗", "Ton Balıklı Salata 🐟"],
    ev: ["Kuru Fasulye 🍲", "Makarna 🍝", "Pilav + Tavuk 🍗"]
  },
  aksam: {
    hizli: ["Pizza 🍕", "Hamburger 🍔"],
    saglikli: ["Sebze Yemeği 🥦", "Izgara Balık 🐟"],
    ev: ["Köfte + Pilav 🍽️", "Dolma 🌿"]
  },
  tatli: ["Baklava 🍯", "Sütlaç 🍮", "Dondurma 🍨", "Kek 🍰"]
};

const secimSelect = document.getElementById("secim");
const onerBtn = document.getElementById("onerBtn");
const sonucP = document.getElementById("sonuc");
const favoriBtn = document.getElementById("favoriBtn");
const favorilerUl = document.getElementById("favoriler");

let secilenYemek = "";

function zamanDilimi() {
  const saat = new Date().getHours();
  if (saat < 11) return "sabah";
  if (saat < 18) return "ogle";
  return "aksam";
}

function favorileriGetir() {
  return JSON.parse(localStorage.getItem("favoriler")) || [];
}

function favorileriKaydet(liste) {
  localStorage.setItem("favoriler", JSON.stringify(liste));
}

function favorileriGoster() {
  const favoriler = favorileriGetir();
  favorilerUl.innerHTML = "";

  favoriler.forEach((yemek, index) => {
    const li = document.createElement("li");
    li.style.display = "flex";
    li.style.justifyContent = "space-between";
    li.style.alignItems = "center";
    li.style.marginBottom = "6px";

    const span = document.createElement("span");
    span.textContent = yemek;

    const silBtn = document.createElement("button");
    silBtn.textContent = "❌";
    silBtn.style.fontSize = "14px";
    silBtn.style.padding = "2px 8px";
    silBtn.style.background = "transparent";
    silBtn.style.border = "none";
    silBtn.style.cursor = "pointer";

    silBtn.addEventListener("click", () => {
      favoriler.splice(index, 1);
      favorileriKaydet(favoriler);
      favorileriGoster();
    });

    li.appendChild(span);
    li.appendChild(silBtn);
    favorilerUl.appendChild(li);
  });
}

onerBtn.addEventListener("click", () => {
  const secim = secimSelect.value;

  if (!secim) {
    sonucP.textContent = "Lütfen bir seçenek seç 🙂";
    favoriBtn.style.display = "none";
    return;
  }

  let liste = [];

  if (secim === "tatli") {
    liste = yemekler.tatli;
  } else {
    const zaman = zamanDilimi();
    liste = yemekler[zaman][secim] || [];
  }

  if (liste.length === 0) {
    sonucP.textContent = "Bu seçenek için öneri yok 😅";
    favoriBtn.style.display = "none";
    return;
  }

  secilenYemek = liste[Math.floor(Math.random() * liste.length)];
  sonucP.textContent = "Bugün şunu yiyebilirsin: " + secilenYemek;
  favoriBtn.style.display = "block";
});

favoriBtn.addEventListener("click", () => {
  if (!secilenYemek) return;

  const favoriler = favorileriGetir();

  if (!favoriler.includes(secilenYemek)) {
    favoriler.push(secilenYemek);
    favorileriKaydet(favoriler);
    favorileriGoster();
  }
});

favorileriGoster();
