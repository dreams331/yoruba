/**
 * Yoruba Calendar (Kọ́jọ́dá) — accurate implementation
 * - 364 days / year: 13 months × 28 days (4-day week × 7 weeks/month)
 * - 1 Bridge Day (June 2) between years
 * - New Year = June 3 every year
 * - Year 10068 starts June 3, 2026
 */

// ── Data ──────────────────────────────────────────────────────────────────

const MONTHS = [
    { num: 1,  name: 'Òkúdù',    sub: 'The Source',      orisha: 'Orunmila & Ifá',   greg: 'June'      },
    { num: 2,  name: 'Agẹmo',    sub: 'The Masquerade',  orisha: 'Eṣu & Agemo',      greg: 'July'      },
    { num: 3,  name: 'Ògún',     sub: 'The Forge',       orisha: 'Ọṣun & Ogun',      greg: 'August'    },
    { num: 4,  name: 'Ọwẹ́wẹ̀',  sub: 'The Harvest',     orisha: 'Oko (Farming)',     greg: 'September' },
    { num: 5,  name: 'Ọ̀wàrà',   sub: 'The Rains',       orisha: 'Oya',               greg: 'October'   },
    { num: 6,  name: 'Belu',     sub: 'The Quiet',       orisha: 'Oya & Ancestors',   greg: 'November'  },
    { num: 7,  name: 'Ọ̀pẹ',     sub: 'The Harmattan',   orisha: 'Obaluaye',          greg: 'December'  },
    { num: 8,  name: 'Ṣẹrẹ',    sub: 'The Foundation',  orisha: 'Obatala',           greg: 'January'   },
    { num: 9,  name: 'Èrèlé',   sub: 'The Deep Waters', orisha: 'Olokun',            greg: 'February'  },
    { num: 10, name: 'Ẹrẹ́nà',   sub: 'The Earth',       orisha: 'Oduduwa',           greg: 'March'     },
    { num: 11, name: 'Igbe',     sub: 'The Forest',      orisha: 'Ọṣọọsi',           greg: 'April'     },
    { num: 12, name: 'Èbìbí',   sub: 'The Ancestors',   orisha: 'Egungun',           greg: 'May'       },
    { num: 13, name: 'Ìparí',   sub: 'The Closing',     orisha: 'All Orisha',        greg: 'Late May'  },
];

// 4 traditional week days
const WEEK_DAYS = [
    {
        num: 1, name: 'Ọjọ́ Ọba', label: 'ONE',
        orisha: ['Obatala', 'Egungun', 'Iyami Aje'],
        desc: 'Day of Obatala (purity, wisdom) and the Ancestors. A day for quiet reflection, wearing white, and honouring the dead.',
        colors: ['#a3b899', '#4a7c59'], dotClass: 'dot-egungun'
    },
    {
        num: 2, name: 'Ọjọ́ Ifá', label: 'TWO',
        orisha: ['Orunmila', 'Eṣu', 'Ọṣun'],
        desc: 'Day of Orunmila (divination, destiny), Eṣu (communication) and Ọṣun (love, fertility). A day for IFA consultation and seeking guidance.',
        colors: ['#d4a017', '#e8891a'], dotClass: 'dot-ifa'
    },
    {
        num: 3, name: 'Ọjọ́ Ogun', label: 'THREE',
        orisha: ['Ogun', 'Ọṣọọsi'],
        desc: 'Day of Ogun (iron, justice, labour) and Ọṣọọsi (hunting, adventure). A day for honest work, craftsmanship and physical endeavour.',
        colors: ['#2a5c8a', '#1a3a5c'], dotClass: 'dot-ogun'
    },
    {
        num: 4, name: 'Ọjọ́ Ṣàngó', label: 'FOUR',
        orisha: ['Ṣàngó', 'Oya'],
        desc: 'Day of Ṣàngó (thunder, justice, power) and Oya (wind, transformation, river Niger). A day of strength, boldness and change.',
        colors: ['#c0392b', '#8B0000'], dotClass: 'dot-sango'
    },
];

// Gregorian 7-day names in Yoruba
const GREG_DAYS = ['Ọjọ́ Àìkú', 'Ọjọ́ Ajé', 'Ọjọ́ Ìṣẹ́gun', 'Ọjọ́rú', 'Ọjọ́bọ̀', 'Ọjọ́ Ẹtì', 'Ọjọ́ Àbámẹ́ta'];
const GREG_DAYS_EN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// ── Core Calculation ──────────────────────────────────────────────────────

function getYorubaDate(date) {
    const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    // Determine which Yoruba year this Gregorian date belongs to
    let gregNY = d.getFullYear();
    const nyCandidate = new Date(gregNY, 5, 3); // June 3 of same year
    if (d < nyCandidate) gregNY -= 1;

    const newYear = new Date(gregNY, 5, 3); // June 3 of that year
    const bridge  = new Date(gregNY, 5, 2); // June 2 = bridge day

    const diff = Math.round((d - newYear) / 86400000);

    // Bridge day
    if (d.getTime() === bridge.getTime()) {
        return { isBridgeDay: true, yorubaYear: gregNY + 8042, gregDate: d };
    }

    // Before new year of this calculation (shouldn't happen)
    if (diff < 0) return null;

    // Past 364 days = bridge day territory (handled above)
    if (diff >= 364) {
        return { isBridgeDay: true, yorubaYear: gregNY + 8042, gregDate: d };
    }

    const monthIdx  = Math.floor(diff / 28);       // 0-12
    const dayInMonth = (diff % 28) + 1;             // 1-28
    const weekInMonth = Math.floor((dayInMonth - 1) / 4) + 1; // 1-7
    const dayInWeek   = ((dayInMonth - 1) % 4) + 1;           // 1-4

    return {
        isBridgeDay: false,
        yorubaYear: gregNY + 8042,
        month: MONTHS[monthIdx],
        monthNum: monthIdx + 1,
        dayInMonth,
        weekInMonth,
        dayInWeek,
        weekDay: WEEK_DAYS[dayInWeek - 1],
        dayOfYear: diff + 1,
        gregDate: d,
    };
}

// Get the Gregorian date of Yoruba month start
function getMonthStart(yorubaYear, monthNum) {
    const gregYear = yorubaYear - 8042;
    const newYear = new Date(gregYear, 5, 3);
    const offset = (monthNum - 1) * 28;
    return new Date(newYear.getTime() + offset * 86400000);
}

// ── State ─────────────────────────────────────────────────────────────────

const today = new Date();
const todayYD = getYorubaDate(today);
let viewYear  = todayYD.isBridgeDay ? todayYD.yorubaYear : todayYD.yorubaYear;
let viewMonth = todayYD.isBridgeDay ? 13 : todayYD.monthNum;

// ── Render ────────────────────────────────────────────────────────────────

function renderTodayBanner() {
    const yd = getYorubaDate(today);
    const banner = document.getElementById('todayBanner');

    if (yd.isBridgeDay) {
        banner.innerHTML = `
            <div class="today-bridge">
                <i class="fas fa-star-of-david"></i>
                <div>
                    <h2>Ọjọ́ Àfonínú — Bridge Day</h2>
                    <p>The sacred day between years. Year <strong>${yd.yorubaYear}</strong> ends. Tomorrow begins Year <strong>${yd.yorubaYear + 1}</strong>.</p>
                    <p class="greg-today">Today: ${today.toLocaleDateString('en-GB', {weekday:'long',day:'numeric',month:'long',year:'numeric'})}</p>
                </div>
            </div>`;
        return;
    }

    const wd = yd.weekDay;
    banner.innerHTML = `
        <div class="today-card">
            <div class="today-left">
                <span class="today-label">Today in Kọ́jọ́dá</span>
                <h2>${yd.month.name} <span class="today-day-num">${yd.dayInMonth}</span></h2>
                <p class="today-sub">${yd.month.sub}</p>
                <div class="today-detail-row">
                    <span><i class="fas fa-calendar-alt"></i> Year <strong>${yd.yorubaYear}</strong></span>
                    <span><i class="fas fa-layer-group"></i> Month <strong>${yd.monthNum}</strong> of 13</span>
                    <span><i class="fas fa-list"></i> Week <strong>${yd.weekInMonth}</strong> of 7</span>
                    <span><i class="fas fa-sun"></i> Day <strong>${yd.dayInWeek}</strong> of 4</span>
                </div>
                <p class="greg-today">${today.toLocaleDateString('en-GB', {weekday:'long',day:'numeric',month:'long',year:'numeric'})}</p>
            </div>
            <div class="today-right">
                <div class="orisha-today ${wd.dotClass}-bg">
                    <h3>Today's Orisha</h3>
                    <p class="orisha-day-name">${wd.name} — <em>${wd.label}</em></p>
                    <div class="orisha-names">${wd.orisha.map(o => `<span class="orisha-chip">${o}</span>`).join('')}</div>
                    <p class="orisha-desc">${wd.desc}</p>
                </div>
            </div>
        </div>`;
}

function renderMonthGrid() {
    const header = document.getElementById('calMonthHeader');
    const grid   = document.getElementById('calGrid');
    const m = MONTHS[viewMonth - 1];
    const monthStart = getMonthStart(viewYear, viewMonth);

    header.innerHTML = `
        <button class="cal-nav-btn" id="prevMonth"><i class="fas fa-chevron-left"></i></button>
        <div class="cal-month-title">
            <span class="cal-month-name">${m.name}</span>
            <span class="cal-month-sub">${m.sub}</span>
            <span class="cal-month-meta">Month ${viewMonth} &nbsp;·&nbsp; Year ${viewYear} &nbsp;·&nbsp; ~${m.greg}</span>
        </div>
        <button class="cal-nav-btn" id="nextMonth"><i class="fas fa-chevron-right"></i></button>`;

    // Day headers
    const dayHeaders = WEEK_DAYS.map(wd => `<div class="cal-day-header ${wd.dotClass}-text">${wd.label}</div>`).join('');

    // 7 weeks × 4 days = 28 cells
    let cells = '';
    for (let dayNum = 1; dayNum <= 28; dayNum++) {
        const gregDate = new Date(monthStart.getTime() + (dayNum - 1) * 86400000);
        const isToday = !todayYD.isBridgeDay && todayYD.monthNum === viewMonth && todayYD.yorubaYear === viewYear && todayYD.dayInMonth === dayNum;
        const dayInWeek = ((dayNum - 1) % 4) + 1;
        const wd = WEEK_DAYS[dayInWeek - 1];
        const dots = wd.orisha.map(o => `<span class="cal-dot ${wd.dotClass}" title="${o}"></span>`).join('');
        cells += `
            <div class="cal-cell ${isToday ? 'cal-today' : ''}" data-day="${dayNum}" title="${wd.name} — ${wd.orisha.join(', ')}">
                <span class="cal-cell-num">${dayNum}</span>
                <span class="cal-greg-date">${gregDate.getDate()} ${gregDate.toLocaleString('en',{month:'short'})}</span>
                <div class="cal-dots">${dots}</div>
            </div>`;
    }

    grid.innerHTML = `
        <div class="cal-headers">${dayHeaders}</div>
        <div class="cal-weeks">${cells}</div>`;

    // Bridge day cell (only at end of month 13)
    if (viewMonth === 13) {
        const bridgeGreg = new Date(viewYear - 8042, 5, 2);
        grid.innerHTML += `
            <div class="cal-bridge-row">
                <div class="cal-bridge-cell">
                    <i class="fas fa-star-of-david"></i>
                    <strong>Ọjọ́ Àfonínú</strong> — Bridge Day
                    <span>${bridgeGreg.toLocaleDateString('en-GB',{day:'numeric',month:'long'})}</span>
                </div>
            </div>`;
    }

    // Month Orisha info
    document.getElementById('calMonthOrisha').innerHTML = `
        <i class="fas fa-circle-notch"></i> Month dedicated to: <strong>${m.orisha}</strong>`;

    // Wire nav buttons
    document.getElementById('prevMonth').addEventListener('click', () => {
        viewMonth--;
        if (viewMonth < 1) { viewMonth = 13; viewYear--; }
        renderMonthGrid();
    });
    document.getElementById('nextMonth').addEventListener('click', () => {
        viewMonth++;
        if (viewMonth > 13) { viewMonth = 1; viewYear++; }
        renderMonthGrid();
    });
}

function renderYearStrip() {
    const strip = document.getElementById('yearStrip');
    strip.innerHTML = MONTHS.map(m => {
        const active = m.num === viewMonth ? 'active' : '';
        const isCurrentMonth = !todayYD.isBridgeDay && m.num === todayYD.monthNum;
        return `<button class="year-strip-btn ${active} ${isCurrentMonth ? 'current' : ''}" data-month="${m.num}">
            <span class="strip-num">${m.num}</span>
            <span class="strip-name">${m.name}</span>
        </button>`;
    }).join('');

    strip.querySelectorAll('.year-strip-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            viewMonth = parseInt(btn.dataset.month);
            renderMonthGrid();
            renderYearStrip();
        });
    });
}

function renderWeekDayGuide() {
    const el = document.getElementById('weekDayGuide');
    el.innerHTML = WEEK_DAYS.map(wd => `
        <div class="wd-card">
            <div class="wd-label ${wd.dotClass}-bg">${wd.label}</div>
            <h4>${wd.name}</h4>
            <div class="wd-orisha">${wd.orisha.map(o => `<span class="orisha-chip small">${o}</span>`).join('')}</div>
            <p>${wd.desc}</p>
        </div>`).join('');
}

function renderGregorianRef() {
    const el = document.getElementById('gregRef');
    const yd = getYorubaDate(today);
    el.innerHTML = `
        <h3>Yoruba 7-Day Week (Ọ̀sẹ̀ Méjèéjì)</h3>
        <p>To reconcile with Gregorian time, Yoruba people also use a 7-day business week:</p>
        <div class="greg-week-grid">
            ${GREG_DAYS.map((name, i) => `
                <div class="greg-day-cell">
                    <span class="greg-day-en">${GREG_DAYS_EN[i]}</span>
                    <span class="greg-day-yo">${name}</span>
                </div>`).join('')}
        </div>`;
}

// ── Init ──────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
    renderTodayBanner();
    renderYearStrip();
    renderMonthGrid();
    renderWeekDayGuide();
    renderGregorianRef();

    // Jump to today button
    document.getElementById('jumpToday')?.addEventListener('click', () => {
        viewYear  = todayYD.isBridgeDay ? todayYD.yorubaYear : todayYD.yorubaYear;
        viewMonth = todayYD.isBridgeDay ? 13 : todayYD.monthNum;
        renderMonthGrid();
        renderYearStrip();
        document.getElementById('calMonthHeader').scrollIntoView({ behavior: 'smooth' });
    });
});
