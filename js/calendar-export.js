/**
 * Generates a Yoruba Kọ́jọ́dá .ics calendar file for download
 * Compatible with: Apple Calendar, Google Calendar, Outlook, Android
 */

const YORUBA_YEAR = 10068;
const GREG_NEW_YEAR = new Date(2026, 5, 3); // June 3 2026

const MONTHS = [
    { num: 1,  name: 'Òkúdù',   sub: 'The Source',      orisha: 'Orunmila & Ifá'   },
    { num: 2,  name: 'Agẹmo',   sub: 'The Masquerade',  orisha: 'Eṣu & Agemo'      },
    { num: 3,  name: 'Ògún',    sub: 'The Forge',       orisha: 'Ọṣun & Ogun'      },
    { num: 4,  name: 'Ọwẹ́wẹ̀', sub: 'The Harvest',     orisha: 'Oko (Farming)'    },
    { num: 5,  name: 'Ọ̀wàrà',  sub: 'The Rains',       orisha: 'Oya'              },
    { num: 6,  name: 'Belu',    sub: 'The Quiet',       orisha: 'Oya & Ancestors'  },
    { num: 7,  name: 'Ọ̀pẹ',    sub: 'The Harmattan',   orisha: 'Obaluaye'         },
    { num: 8,  name: 'Ṣẹrẹ',   sub: 'The Foundation',  orisha: 'Obatala'          },
    { num: 9,  name: 'Èrèlé',  sub: 'The Deep Waters', orisha: 'Olokun'           },
    { num: 10, name: 'Ẹrẹ́nà',  sub: 'The Earth',       orisha: 'Oduduwa'          },
    { num: 11, name: 'Igbe',    sub: 'The Forest',      orisha: 'Ọṣọọsi'          },
    { num: 12, name: 'Èbìbí',  sub: 'The Ancestors',   orisha: 'Egungun'          },
    { num: 13, name: 'Ìparí',  sub: 'The Closing',     orisha: 'All Orisha'       },
];

const WEEK_DAYS = [
    { name: 'Ọjọ́ Ọba',   orisha: 'Obatala, Egungun & Iyami Aje' },
    { name: 'Ọjọ́ Ifá',   orisha: 'Orunmila, Eṣu & Ọṣun'        },
    { name: 'Ọjọ́ Ogun',  orisha: 'Ogun & Ọṣọọsi'               },
    { name: 'Ọjọ́ Ṣàngó', orisha: 'Ṣàngó & Oya'                 },
];

function pad(n) { return String(n).padStart(2, '0'); }

function formatDate(d) {
    return `${d.getFullYear()}${pad(d.getMonth()+1)}${pad(d.getDate())}`;
}

function uid(i) {
    return `yoruba-kojoda-${YORUBA_YEAR}-day${i}@yorubaheritage.com`;
}

// Escape special chars for ICS
function esc(str) {
    return str.replace(/\\/g, '\\\\').replace(/,/g, '\\,').replace(/;/g, '\\;').replace(/\n/g, '\\n');
}

function generateICS() {
    const lines = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Yoruba Heritage//Kojoda Calendar ' + YORUBA_YEAR + '//EN',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
        'X-WR-CALNAME:Yoruba Kọ́jọ́dá ' + YORUBA_YEAR,
        'X-WR-CALDESC:Traditional Yoruba calendar - Year ' + YORUBA_YEAR + ' (2026-2027 CE)',
        'X-WR-TIMEZONE:Africa/Lagos',
        '',
        // New Year event
        'BEGIN:VEVENT',
        'UID:yoruba-newyear-' + YORUBA_YEAR + '@yorubaheritage.com',
        'DTSTART;VALUE=DATE:' + formatDate(GREG_NEW_YEAR),
        'DTEND;VALUE=DATE:' + formatDate(new Date(GREG_NEW_YEAR.getTime() + 86400000)),
        'SUMMARY:🎊 Yoruba New Year ' + YORUBA_YEAR + ' (Ifá Festival)',
        'DESCRIPTION:' + esc('The Yoruba New Year begins today — Year ' + YORUBA_YEAR + ' of Yoruba civilisation. The Ifá festival is celebrated in Ilé-Ifẹ̀, the sacred centre of creation. Month 1: Òkúdù (The Source).'),
        'CATEGORIES:Yoruba Heritage,New Year,Ifá',
        'COLOR:TOMATO',
        'URL:https://yorubaheritage.com/yoruba-calendar.html',
        'END:VEVENT',
        '',
    ];

    // Generate month-start events
    for (let m = 0; m < 13; m++) {
        const monthStart = new Date(GREG_NEW_YEAR.getTime() + m * 28 * 86400000);
        const monthEnd   = new Date(monthStart.getTime() + 86400000);
        const month = MONTHS[m];
        lines.push(
            'BEGIN:VEVENT',
            'UID:kojoda-month' + month.num + '-' + YORUBA_YEAR + '@yorubaheritage.com',
            'DTSTART;VALUE=DATE:' + formatDate(monthStart),
            'DTEND;VALUE=DATE:'   + formatDate(monthEnd),
            'SUMMARY:📅 Yoruba Month ' + month.num + ': ' + month.name,
            'DESCRIPTION:' + esc('Oṣù ' + month.num + ' — ' + month.name + ' (' + month.sub + ')\nDedicated to: ' + month.orisha + '\n\nYear ' + YORUBA_YEAR + ' of Yoruba civilisation.\n\nhttps://yorubaheritage.com/yoruba-calendar.html'),
            'CATEGORIES:Yoruba Heritage,Kọ́jọ́dá',
            'END:VEVENT',
            '',
        );
    }

    // Bridge day
    const bridgeDay = new Date(GREG_NEW_YEAR.getTime() + 364 * 86400000); // June 2 2027
    lines.push(
        'BEGIN:VEVENT',
        'UID:kojoda-bridgeday-' + YORUBA_YEAR + '@yorubaheritage.com',
        'DTSTART;VALUE=DATE:' + formatDate(bridgeDay),
        'DTEND;VALUE=DATE:'   + formatDate(new Date(bridgeDay.getTime() + 86400000)),
        'SUMMARY:✨ Ọjọ́ Àfonínú — Yoruba Bridge Day',
        'DESCRIPTION:' + esc('The sacred day between Yoruba years. Year ' + YORUBA_YEAR + ' ends at midnight. Year ' + (YORUBA_YEAR+1) + ' begins tomorrow (June 3).'),
        'CATEGORIES:Yoruba Heritage,Kọ́jọ́dá',
        'END:VEVENT',
        '',
    );

    // Key orisha festivals
    const festivals = [
        { offset: 76, name: '🎭 Agemo Festival', desc: 'Annual Agemo masquerade festival — dedicated to Eṣu Elegba, divine messenger and communicator.' },
        { offset: 84, name: '⚡ Ṣàngó Festival', desc: 'Festival of Ṣàngó, Orisha of thunder and justice. Celebrated across Yorubaland and diaspora.' },
        { offset: 112, name: '⚒️ Ọṣun-Ọṣogbo Festival', desc: 'UNESCO-listed annual Ọṣun festival in Ọṣogbo — Orisha of fertility, love and fresh water.' },
        { offset: 84, name: '🌾 Ogun Festival', desc: 'Festival of Ogun, Orisha of iron, labour and justice. Patron of blacksmiths, soldiers and drivers.' },
        { offset: 168, name: '👻 Egungun Festival', desc: 'Egungun masquerade — honouring the ancestors who watch over the living from the spiritual realm.' },
    ];

    festivals.forEach((f, i) => {
        const d = new Date(GREG_NEW_YEAR.getTime() + f.offset * 86400000);
        lines.push(
            'BEGIN:VEVENT',
            'UID:kojoda-festival' + i + '-' + YORUBA_YEAR + '@yorubaheritage.com',
            'DTSTART;VALUE=DATE:' + formatDate(d),
            'DTEND;VALUE=DATE:'   + formatDate(new Date(d.getTime() + 86400000)),
            'SUMMARY:' + f.name,
            'DESCRIPTION:' + esc(f.desc + '\n\nhttps://yorubaheritage.com/ifa-wisdom.html'),
            'CATEGORIES:Yoruba Heritage,Festival',
            'END:VEVENT',
            '',
        );
    });

    lines.push('END:VCALENDAR');
    return lines.join('\r\n');
}

function downloadICS() {
    const content = generateICS();
    const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'yoruba-kojoda-' + YORUBA_YEAR + '.ics';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Register service worker (PWA)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('✓ Service Worker registered'))
            .catch(err => console.warn('SW registration failed:', err));
    });
}
