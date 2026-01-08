const onerBtn = document.getElementById("onerBtn");
const sonucP = document.getElementById("sonuc");
const favoriBtn = document.getElementById("favoriBtn");
const tekrarBtn = document.getElementById("tekrarBtn");
const favorilerUl = document.getElementById("favoriler");

const yemekler = [
  "Mantı",
  "Köfte",
  "Pizza",
  "Hamburger",
  "Lahmacun",
  "Döner",
  "Tavuk Sote",
  "Makarna",
  "Pilav",
  "Çorba",
  "Menemen",
  "Karnıyarık",
  "Börek",
  "Balık",
  "Salata"
];

let secilenYemek = "";

onerBtn.addEventListener("click", () => {
  secilenYemek = yemekler[Math.floor(Math.random() * yemekler.length)];

  sonucP.classList.remove("show");

  setTimeout(() => {
    sonucP.textContent = "Bugün şunu yiyebilirsin: " + secilenYemek;
    sonucP.classList.add("show");
  }, 50);

  favoriBtn.style.display = "inline-block";
  tekrarBtn.style.display = "inline-block";
});

favoriBtn.addEventListener("click", () => {
  if (!secilenYemek) return;

  const li = document.createElement("li");
  li.textContent = secilenYemek;

  li.addEventListener("click", () => {
    li.remove();
  });

  favorilerUl.appendChild(li);
});

tekrarBtn.addEventListener("click", () => {
  onerBtn.click();
});
