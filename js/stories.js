// Traditional Stories Page JavaScript

const storiesData = [
    {
        id: 1,
        title: "The Tortoise and the Birds: Ijapa's Clever Scheme",
        category: "folktales",
        date: "October 20, 2025",
        readTime: "5 min",
        excerpt: "Learn how Ijapa the tortoise tricked the birds to attend a feast in the sky, and how his greed led to his downfall. A classic tale teaching the dangers of deceit and selfishness.",
        image: null
    },
    {
        id: 2,
        title: "How Death Came Into the World",
        category: "myths",
        date: "October 18, 2025",
        readTime: "7 min",
        excerpt: "An ancient Yoruba creation story explaining how death became a part of human existence. Discover the cosmic drama between Olodumare and humanity's eternal quest for immortality.",
        image: null
    },
    {
        id: 3,
        title: "The Legend of Oduduwa: Creating the World",
        category: "legends",
        date: "October 16, 2025",
        readTime: "8 min",
        excerpt: "The sacred story of how Oduduwa descended from heaven with a chain, carrying a handful of earth, a cockerel, and a palm nut to create the land at Ile-Ife.",
        image: null
    },
    {
        id: 4,
        title: "Sango and His Three Wives",
        category: "myths",
        date: "October 14, 2025",
        readTime: "6 min",
        excerpt: "The dramatic tale of Sango's relationships with Oya, Osun, and Oba. A story of love, jealousy, and the consequences of deception.",
        image: null
    },
    {
        id: 5,
        title: "Why the Sky Is Far Away",
        category: "folktales",
        date: "October 12, 2025",
        readTime: "4 min",
        excerpt: "A charming folktale explaining why the sky moved far from earth. Learn how human wastefulness angered the heavens.",
        image: null
    },
    {
        id: 6,
        title: "The Brave Queen Moremi",
        category: "legends",
        date: "October 10, 2025",
        readTime: "9 min",
        excerpt: "The heroic story of Queen Moremi who sacrificed herself to save Ile-Ife from mysterious raiders. A tale of courage, sacrifice, and maternal love.",
        image: null
    },
    {
        id: 7,
        title: "Anansi and the Stories of Nyame",
        category: "folktales",
        date: "October 8, 2025",
        readTime: "6 min",
        excerpt: "Though Anansi is Akan, his stories are popular across West Africa. Learn how the spider-trickster gained ownership of all stories.",
        image: null
    },
    {
        id: 8,
        title: "The Two Friends and the Talking Yam",
        category: "parables",
        date: "October 6, 2025",
        readTime: "5 min",
        excerpt: "A moral tale about two friends whose bond is tested by greed when they discover a magical talking yam that produces endless wealth.",
        image: null
    },
    {
        id: 9,
        title: "Osun and the Creation of Children",
        category: "myths",
        date: "October 4, 2025",
        readTime: "7 min",
        excerpt: "Discover why Osun is revered as the giver of children and how she convinced the other Orisha to include women in their divine council.",
        image: null
    },
    {
        id: 10,
        title: "The Drum That Sang",
        category: "folktales",
        date: "October 2, 2025",
        readTime: "5 min",
        excerpt: "A magical drum reveals village secrets through its songs. This story teaches about the importance of integrity and living honestly.",
        image: null
    },
    {
        id: 11,
        title: "Ogun's Sacrifice for Humanity",
        category: "myths",
        date: "September 30, 2025",
        readTime: "8 min",
        excerpt: "Learn why Ogun is honored as the Orisha who opened the path for other deities and humans. His sacrifice made civilization possible.",
        image: null
    },
    {
        id: 12,
        title: "The Cunning Farmer and the Chief",
        category: "parables",
        date: "September 28, 2025",
        readTime: "6 min",
        excerpt: "A clever farmer uses wisdom to outwit a greedy chief. This parable teaches that intelligence is more powerful than authority.",
        image: null
    },
    {
        id: 13,
        title: "Why Bats Fly at Night",
        category: "folktales",
        date: "September 26, 2025",
        readTime: "4 min",
        excerpt: "A delightful tale explaining why bats became creatures of the night after betraying both birds and animals.",
        image: null
    },
    {
        id: 14,
        title: "The Legend of the Sacred Adire Cloth",
        category: "legends",
        date: "September 24, 2025",
        readTime: "7 min",
        excerpt: "Discover the mystical origins of Adire, the traditional indigo-dyed cloth, and its connection to the goddess Osun.",
        image: null
    },
    {
        id: 15,
        title: "The Hunter and the Forest Spirit",
        category: "folktales",
        date: "September 22, 2025",
        readTime: "8 min",
        excerpt: "A hunter's encounter with forest spirits teaches respect for nature and the unseen world. A tale emphasizing harmony with the environment.",
        image: null
    }
];

const storiesGrid = document.getElementById('storiesGrid');
const filterBtns = document.querySelectorAll('.filter-btn');
let currentFilter = 'all';

function displayStories(stories) {
    storiesGrid.innerHTML = '';
    
    stories.forEach(story => {
        const card = document.createElement('div');
        card.className = 'article-card';
        card.setAttribute('data-category', story.category);
        
        card.innerHTML = `
            <div class="article-image">
                ${story.image ? 
                    `<img src="${story.image}" alt="${story.title}">` : 
                    '<div style="width:100%;height:100%;background:linear-gradient(135deg, #8B0000, #C17817);"></div>'
                }
                <span class="article-category">${getCategoryLabel(story.category)}</span>
            </div>
            <div class="article-content">
                <div class="article-meta">
                    <span><i class="far fa-calendar"></i> ${story.date}</span>
                    <span><i class="far fa-clock"></i> ${story.readTime} read</span>
                </div>
                <h3>${story.title}</h3>
                <p>${story.excerpt}</p>
                <a href="story-detail.html?id=${story.id}" class="article-link">
                    Read Story <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        `;
        
        storiesGrid.appendChild(card);
    });
    
    animateCards();
}

function getCategoryLabel(category) {
    const labels = {
        'folktales': 'Folktale',
        'legends': 'Legend',
        'myths': 'Myth',
        'parables': 'Parable'
    };
    return labels[category] || category;
}

function filterStories() {
    let filtered = storiesData;
    
    if (currentFilter !== 'all') {
        filtered = filtered.filter(story => story.category === currentFilter);
    }
    
    displayStories(filtered);
}

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.getAttribute('data-category');
        filterStories();
    });
});

function animateCards() {
    const cards = document.querySelectorAll('.article-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

displayStories(storiesData);
