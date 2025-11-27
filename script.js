// --- 1. BACKGROUND HEARTS SYSTEM ---
function createFloatingHeart() {
    const container = document.getElementById('heart-container');
    const heart = document.createElement('div');
    const emojis = ['❤️', '💖', '💕', '🌸', '✨'];
    
    heart.innerText = emojis[Math.floor(Math.random() * emojis.length)];
    heart.classList.add('heart-bg');
    
    // Posisi & Ukuran Random
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = (Math.random() * 1.5 + 0.5) + 'rem';
    
    // Kecepatan Random
    heart.style.animationDuration = (Math.random() * 5 + 5) + 's';
    
    container.appendChild(heart);
    
    // Hapus elemen setelah animasi selesai agar memori tidak penuh
    setTimeout(() => heart.remove(), 10000);
}

// Jalankan fungsi membuat hati setiap 400ms
setInterval(createFloatingHeart, 400);


// --- 2. NAVIGASI HALAMAN ---
function nextSection(id) {
    // Sembunyikan semua section
    document.querySelectorAll('[id^="section-"]').forEach(el => {
        el.classList.add('hidden'); 
        el.classList.remove('fade-in');
    });

    // Tampilkan section tujuan
    const target = document.getElementById('section-' + id);
    target.classList.remove('hidden'); 
    target.classList.add('fade-in');

    // Trigger khusus
    if(id === 2) startGame();
    if(id === 3) {
        document.getElementById('typing-text').innerHTML = ''; 
        charIndex = 0;
        setTimeout(typeWriter, 500);
    }
}


// --- 3. ISI SURAT (EDIT DISINI) ---
// Gunakan \n untuk ganti baris
const letterContent = "Jago juga kamu mainnya.\n\nSebenernya aku udah lama pengen ngomong ini. Aku nyaman banget sama kamu. Ketawa kamu, cerita kamu, semuanya bikin aku happy.\n\nJadi...";

let charIndex = 0;

function typeWriter() {
    const target = document.getElementById('typing-text');
    
    if (charIndex < letterContent.length) {
        // Jika karakter adalah \n, ganti dengan <br> HTML
        if(letterContent.charAt(charIndex) === "\n") {
            target.innerHTML += "<br>";
        } else {
            target.innerHTML += letterContent.charAt(charIndex);
        }
        
        charIndex++;
        // Kecepatan mengetik (semakin kecil semakin cepat)
        setTimeout(typeWriter, 40); 
    }
}


// --- 4. LOGIKA MINI GAME ---
let heartsCollected = 0; 
const totalHearts = 3;

function startGame() {
    const area = document.getElementById('game-area'); 
    area.innerHTML = ''; 
    heartsCollected = 0;
    
    document.getElementById('game-status').innerText = `Target: ${totalHearts} Hati`;
    
    for(let i=0; i<totalHearts; i++) {
        createGameHeart(area, i);
    }
}

function createGameHeart(container, index) {
    const btn = document.createElement('button'); 
    btn.innerHTML = '❤️';
    btn.className = 'absolute text-4xl cursor-pointer transition transform hover:scale-125';
    
    // Posisi Random
    btn.style.left = Math.random() * 80 + '%'; 
    btn.style.top = Math.random() * 70 + '%';
    
    btn.onclick = function() {
        heartsCollected++; 
        btn.remove();
        
        if(heartsCollected >= totalHearts) {
            setTimeout(() => nextSection(3), 500);
        }
    };
    
    container.appendChild(btn);
}


// --- 5. INTERAKSI TOMBOL & BUNGA MEMBESAR ---
let scaleFactor = 1; 
const ledekan = ["Eits!", "Gak Kena!", "Yakin?", "Wleee 😜", "Pencet Hijau Aja!"];

function dodge() {
    const btnNo = document.getElementById('btn-no');
    const btnYes = document.getElementById('btn-yes');
    const flower = document.getElementById('flower-icon');

    // 1. Tombol No Lari (Posisi Random)
    const x = (Math.random() * 250) - 125; 
    const y = (Math.random() * 250) - 125;
    
    btnNo.style.transform = `translate(${x}px, ${y}px)`;
    btnNo.innerText = ledekan[Math.floor(Math.random() * ledekan.length)];

    // 2. Tombol Yes & Bunga Membesar
    scaleFactor += 0.3; // Membesar 30%
    btnYes.style.transform = `scale(${scaleFactor})`;
    flower.style.transform = `scale(${scaleFactor})`;
    
    // Biar tombol Yes ada di atas tombol No kalau udah gede banget
    if(scaleFactor > 2) {
        btnYes.style.zIndex = "100";
    }
}

// --- 6. ENDING ---
function finish() { 
    nextSection(5); 
    // Percepat spawn hati di background
    setInterval(createFloatingHeart, 100); 
}