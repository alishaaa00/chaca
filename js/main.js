/**
 * Caca's Personal Website - Interactive Features
 * Handcrafted with care & cute micro-interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initGreeting();
  initPetals();
  initMobileMenu();
  initQuoteGenerator();
  initInstagramCopy();
  initContactForm();
  initCozyPlayer();
});

/* ============================================================
   1. DYNAMIC TIME-BASED GREETING
   ============================================================ */
function initGreeting() {
  const greetingEl = document.getElementById('dynamic-greeting');
  if (!greetingEl) return;

  const hour = new Date().getHours();
  let greetingText = '';
  let greetingEmoji = '';

  if (hour >= 4 && hour < 11) {
    greetingText = 'Selamat Pagi. Semoga aktivitas hari ini berjalan lancar';
    greetingEmoji = '🌷';
  } else if (hour >= 11 && hour < 15) {
    greetingText = 'Selamat Siang. Selamat melanjutkan kegiatan dan belajar';
    greetingEmoji = '☀️';
  } else if (hour >= 15 && hour < 18) {
    greetingText = 'Selamat Sore. Waktu yang tenang untuk membaca buku';
    greetingEmoji = '☕';
  } else {
    greetingText = 'Selamat Malam. Selamat beristirahat';
    greetingEmoji = '🌙';
  }

  greetingEl.innerHTML = `<span>${greetingEmoji}</span> ${greetingText}`;
}

/* ============================================================
   2. FLOATING TULIP PETALS EFFECT
   ============================================================ */
let petalsActive = true;
let petalInterval = null;

function initPetals() {
  const container = document.getElementById('petals-container');
  if (!container) return;

  const toggleBtn = document.getElementById('petal-toggle-btn');
  const storedState = localStorage.getItem('caca_petals_active');
  if (storedState !== null) {
    petalsActive = storedState === 'true';
  }

  updatePetalButtonText(toggleBtn);

  if (petalsActive) {
    startPetals(container);
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      petalsActive = !petalsActive;
      localStorage.setItem('caca_petals_active', petalsActive);
      updatePetalButtonText(toggleBtn);

      if (petalsActive) {
        startPetals(container);
        showToast('Efek kelopak bunga dinyalakan 🌷');
      } else {
        stopPetals(container);
        showToast('Efek kelopak bunga dinonaktifkan 🍃');
      }
    });
  }
}

function updatePetalButtonText(btn) {
  if (!btn) return;
  btn.innerHTML = petalsActive 
    ? '<span>🌷</span> Kelopak: Aktif' 
    : '<span>🍃</span> Kelopak: Mati';
}

function startPetals(container) {
  if (petalInterval) clearInterval(petalInterval);

  petalInterval = setInterval(() => {
    if (!petalsActive) return;
    createPetal(container);
  }, 1200);

  // Initial burst of 3 petals
  for (let i = 0; i < 3; i++) {
    setTimeout(() => createPetal(container), i * 300);
  }
}

function stopPetals(container) {
  if (petalInterval) clearInterval(petalInterval);
  container.innerHTML = '';
}

function createPetal(container) {
  const petal = document.createElement('div');
  petal.className = 'falling-petal';

  const size = Math.random() * 12 + 14; // 14px to 26px
  const startX = Math.random() * window.innerWidth;
  const duration = Math.random() * 6 + 7; // 7s to 13s

  // Color variants: Rose pink, peach tulip, soft petal cream
  const colors = [
    'radial-gradient(circle at 30% 30%, #FFAAA6, #FF758F)',
    'radial-gradient(circle at 30% 30%, #FFCAD4, #FF8DA1)',
    'radial-gradient(circle at 30% 30%, #FFE5D9, #F4A261)',
    'radial-gradient(circle at 30% 30%, #FFF0F3, #FFCCD5)'
  ];
  const color = colors[Math.floor(Math.random() * colors.length)];

  petal.style.width = `${size}px`;
  petal.style.height = `${size * 1.3}px`;
  petal.style.left = `${startX}px`;
  petal.style.background = color;
  petal.style.animationDuration = `${duration}s`;

  container.appendChild(petal);

  setTimeout(() => {
    if (petal.parentNode === container) {
      container.removeChild(petal);
    }
  }, duration * 1000);
}

/* ============================================================
   3. MOBILE NAVIGATION DRAWER
   ============================================================ */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger-btn');
  const drawer = document.getElementById('mobile-drawer');
  const closeBtn = document.getElementById('drawer-close');

  if (!hamburger || !drawer) return;

  hamburger.addEventListener('click', () => {
    drawer.classList.add('open');
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      drawer.classList.remove('open');
    });
  }

  drawer.addEventListener('click', (e) => {
    if (e.target === drawer) {
      drawer.classList.remove('open');
    }
  });
}

/* ============================================================
   4. NOVEL QUOTE GENERATOR (FOR PROFILE & NOVEL LOVERS)
   ============================================================ */
const novelQuotes = [
  {
    quote: "“Sebuah buku adalah jendela yang menyajikan cara baru dalam memandang dunia di sekitar kita.”",
    author: "Catatan Membaca"
  },
  {
    quote: "“Bunga tulip bertumbuh dalam keheningan tanah sebelum akhirnya mekar dengan anggun pada waktunya.”",
    author: "Refleksi Alam & Kesabaran"
  },
  {
    quote: "“Arsitektur Milan mengajarkan bahwa karya yang berkarakter membutuhkan ketelitian, waktu, dan apresiasi sejarah.”",
    author: "Catatan Arsitektur"
  },
  {
    quote: "“Di dunia teknologi jaringan, kita menghubungkan sistem data. Di dunia literasi, kita memperluas wawasan berpikir.”",
    author: "Caca — Catatan Siswi TKJ"
  },
  {
    quote: "“Membaca secara teratur adalah cara melatih fokus dan menemukan kejernihan berpikir di tengah derasnya arus informasi.”",
    author: "Refleksi Literasi"
  }
];

function initQuoteGenerator() {
  const quoteBtn = document.getElementById('btn-new-quote');
  const quoteText = document.getElementById('novel-quote-text');
  const quoteAuthor = document.getElementById('novel-quote-author');

  if (!quoteBtn || !quoteText || !quoteAuthor) return;

  let currentIndex = 0;

  quoteBtn.addEventListener('click', () => {
    quoteBtn.disabled = true;
    quoteText.style.opacity = '0';
    quoteAuthor.style.opacity = '0';

    setTimeout(() => {
      let nextIndex;
      do {
        nextIndex = Math.floor(Math.random() * novelQuotes.length);
      } while (nextIndex === currentIndex && novelQuotes.length > 1);

      currentIndex = nextIndex;
      quoteText.textContent = novelQuotes[currentIndex].quote;
      quoteAuthor.textContent = novelQuotes[currentIndex].author;

      quoteText.style.transition = 'opacity 0.4s ease';
      quoteAuthor.style.transition = 'opacity 0.4s ease';
      quoteText.style.opacity = '1';
      quoteAuthor.style.opacity = '1';

      quoteBtn.disabled = false;
      showToast('Kutipan berhasil diperbarui 📖');
    }, 250);
  });
}

/* ============================================================
   5. INSTAGRAM COPY & TOAST
   ============================================================ */
function initInstagramCopy() {
  const copyButtons = document.querySelectorAll('.btn-copy-ig');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const handle = btn.getAttribute('data-handle') || '@shazchiv';
      navigator.clipboard.writeText(handle).then(() => {
        showToast(`Username ${handle} berhasil disalin ke clipboard`);
      }).catch(() => {
        showToast(`Username: ${handle}`);
      });
    });
  });
}

function showToast(message) {
  let toast = document.getElementById('cute-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'cute-toast';
    toast.className = 'cute-toast';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<span>🌷</span> <span>${message}</span>`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

/* ============================================================
   6. INTERACTIVE CONTACT FORM & MODAL
   ============================================================ */
function initContactForm() {
  const form = document.getElementById('sweet-contact-form');
  const modal = document.getElementById('contact-modal');
  const modalClose = document.getElementById('modal-close-btn');
  const btnIgDm = document.getElementById('btn-modal-ig-dm');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const senderName = document.getElementById('sender-name').value.trim();
    const senderContact = document.getElementById('sender-contact').value.trim();
    const senderMessage = document.getElementById('sender-message').value.trim();

    if (!senderName || !senderMessage) {
      showToast('Mohon lengkapi nama dan isi pesan Anda');
      return;
    }

    // Set modal message details
    const modalSummary = document.getElementById('modal-summary-text');
    if (modalSummary) {
      modalSummary.textContent = `Terima kasih, ${senderName}. Pesan Anda telah disiapkan dan dapat langsung diteruskan ke Instagram @shazchiv.`;
    }

    if (modal) {
      modal.classList.add('open');
    }

    if (btnIgDm) {
      btnIgDm.onclick = () => {
        const encodedText = encodeURIComponent(`Halo Caca! Saya ${senderName} (${senderContact}). Pesan: ${senderMessage}`);
        // Redirect to Instagram profile
        window.open(`https://www.instagram.com/shazchiv/`, '_blank');
      };
    }

    form.reset();
  });

  if (modalClose && modal) {
    modalClose.addEventListener('click', () => {
      modal.classList.remove('open');
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('open');
      }
    });
  }
}

/* ============================================================
   7. COZY AMBIENCE / MUSIC PLAYER SIMULATION
   Web Audio API synth for gentle, lovely music chords
   ============================================================ */
let audioCtx = null;
let isPlayingAmbience = false;
let ambienceTimer = null;
let currentTrackIdx = 0;
const cozyPlaylist = [
  'Lofi Piano & Tulip Breeze',
  'Milan Sunset & Acoustic Coffee',
  'Cozy Library Study Session',
  'Warm Tea & Chapter Reflections'
];

function initCozyPlayer() {
  const toggleBtn = document.getElementById('player-play-btn');
  const vinyl = document.getElementById('player-vinyl');
  const playerStatus = document.getElementById('player-track-status');

  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    if (!isPlayingAmbience) {
      startCozyMelody();
      isPlayingAmbience = true;
      toggleBtn.innerHTML = '⏸️';
      if (vinyl) vinyl.classList.add('playing');
      const nowPlaying = cozyPlaylist[currentTrackIdx];
      if (playerStatus) playerStatus.textContent = `Sedang Memutar: ${nowPlaying}`;
      showToast(`Memutar: ${nowPlaying} 🎶`);
      currentTrackIdx = (currentTrackIdx + 1) % cozyPlaylist.length;
    } else {
      stopCozyMelody();
      isPlayingAmbience = false;
      toggleBtn.innerHTML = '▶️';
      if (vinyl) vinyl.classList.remove('playing');
      if (playerStatus) playerStatus.textContent = 'Musik Dijeda (Klik putar untuk nada berikutnya)';
      showToast('Musik dijeda');
    }
  });
}

// Gentle soft music synth chords (Cmaj9 / Fmaj7 cozy acoustic vibe)
function startCozyMelody() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!audioCtx) {
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const chords = [
      [261.63, 329.63, 392.00, 493.88], // Cmaj7
      [220.00, 261.63, 329.63, 392.00], // Am7
      [174.61, 220.00, 261.63, 329.63], // Fmaj7
      [196.00, 246.94, 293.66, 349.23]  // G7
    ];

    let chordStep = 0;
    playChord(chords[chordStep]);

    ambienceTimer = setInterval(() => {
      chordStep = (chordStep + 1) % chords.length;
      playChord(chords[chordStep]);
    }, 2800);

  } catch (err) {
    console.log('Audio init notice:', err);
  }
}

function playChord(frequencies) {
  if (!audioCtx) return;
  const now = audioCtx.currentTime;

  frequencies.forEach((freq, idx) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now + idx * 0.08);

    // Soft warm envelope
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.035, now + 0.3 + idx * 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(now + idx * 0.08);
    osc.stop(now + 2.6);
  });
}

function stopCozyMelody() {
  if (ambienceTimer) {
    clearInterval(ambienceTimer);
    ambienceTimer = null;
  }
}
