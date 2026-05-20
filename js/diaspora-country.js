// Diaspora Country Page JavaScript

const allCountriesData = {
    brazil: {
        name: "Brazil", flag: "🇧🇷", region: "The Americas",
        population: "15–20 million",
        description: "Brazil has the largest Yoruba diaspora population outside Africa. Candomblé and Umbanda religions preserve Yoruba spiritual practices, particularly strong in Bahia and Rio de Janeiro. The Yoruba (known locally as Nagô) shaped Brazilian music, food, religion, and language in profound ways.",
        history: "Yoruba people were among the largest groups transported to Brazil during the transatlantic slave trade, primarily between the 17th and 19th centuries. Concentrated in the state of Bahia, they were called 'Nagô' by colonisers. Despite brutal oppression, they maintained their language, religion, and cultural traditions. The Malê Revolt of 1835 in Salvador — led largely by Yoruba Muslims — remains one of the most significant slave uprisings in the Americas.",
        culture: [
            "Candomblé — an Afro-Brazilian religion directly preserving Yoruba Orisha worship, centred in Bahia",
            "Umbanda — a syncretic spiritual tradition blending Yoruba, Catholic, and indigenous elements",
            "Axé music and Samba — deeply influenced by Yoruba rhythms and percussion traditions",
            "Yoruba-derived words embedded in Brazilian Portuguese (e.g. 'axé', 'orixá', 'dendê')",
            "Traditional Yoruba foods like acarajé (akara) and abará (moi moi) are iconic street foods in Bahia",
            "Annual festivals honouring Yemanjá (Yemoja), Goddess of the Sea, celebrated on 2 February"
        ],
        figures: [
            { name: "Mãe Stella de Oxóssi", role: "High Priestess of Candomblé, cultural ambassador and author" },
            { name: "Gilberto Gil", role: "Grammy-winning musician, former Brazilian Minister of Culture — Afro-Brazilian heritage" },
            { name: "Caetano Veloso", role: "Iconic musician who championed Afro-Brazilian and Yoruba-rooted traditions" }
        ],
        facts: [
            { icon: "fas fa-map-marker-alt", label: "Stronghold", value: "Bahia, Rio de Janeiro, São Paulo" },
            { icon: "fas fa-pray", label: "Main Religion", value: "Candomblé, Umbanda" },
            { icon: "fas fa-language", label: "Local Name", value: "Nagô / Lucumi" },
            { icon: "fas fa-calendar", label: "Presence Since", value: "17th century" },
            { icon: "fas fa-music", label: "Musical Influence", value: "Samba, Axé, Afrobeat" }
        ]
    },
    "united-states": {
        name: "United States", flag: "🇺🇸", region: "The Americas",
        population: "1–2 million",
        description: "Growing Yoruba communities exist across major US cities, with cultural centres, language schools, and Orisha worship communities particularly strong in New York, Miami, and Houston. The community is enriched by both descendants of enslaved Africans and modern Nigerian immigrants.",
        history: "Yoruba cultural heritage reached the United States through two distinct waves: first through enslaved Africans during the colonial era, whose traditions survived in Gullah Geechee culture along the southeastern coast, and later through large-scale Nigerian immigration from the 1960s onwards. Today the US hosts one of the most vibrant and organised Yoruba diaspora communities in the world.",
        culture: [
            "Lucumí/Santería practices among African-American and Cuban-American communities",
            "Yoruba cultural organisations and associations in New York, Houston, and Atlanta",
            "Nigerian Yoruba churches — predominantly Pentecostal — thriving in major cities",
            "Yoruba language classes offered in community centres and universities",
            "Annual Yoruba cultural festivals celebrating heritage, food, and traditional dress",
            "Strong presence of Yoruba fashion (aso-oke, agbada) at cultural events"
        ],
        figures: [
            { name: "Wole Soyinka", role: "Nobel Laureate in Literature — has lectured extensively at US universities" },
            { name: "Hakeem Olajuwon", role: "NBA legend, born in Lagos to Yoruba heritage" },
            { name: "Olu Dara", role: "Acclaimed jazz musician with Yoruba roots" }
        ],
        facts: [
            { icon: "fas fa-map-marker-alt", label: "Stronghold", value: "New York, Houston, Miami, Atlanta" },
            { icon: "fas fa-pray", label: "Practices", value: "Orisha worship, Lucumí, Christianity" },
            { icon: "fas fa-users", label: "Community Type", value: "Mixed heritage & immigrant" },
            { icon: "fas fa-calendar", label: "Modern Wave", value: "1960s – present" },
            { icon: "fas fa-graduation-cap", label: "Institutions", value: "Yoruba cultural centres & churches" }
        ]
    },
    cuba: {
        name: "Cuba", flag: "🇨🇺", region: "Caribbean",
        population: "3–5 million",
        description: "Cuba hosts one of the most intact Yoruba cultural legacies outside Africa. Santería (Regla de Ocha) blends Yoruba Orisha worship with Catholic traditions and is deeply woven into Cuban daily life, music, art, and identity.",
        history: "Enslaved Yoruba people, called 'Lucumí' in Cuba, arrived in large numbers during the 18th and 19th centuries. To preserve their religion under Catholic oppression, they disguised Orishas as Catholic saints — giving birth to Santería. Unlike many other colonies, Cuba allowed some degree of African cultural organisation through 'cabildos' (mutual aid societies), which helped preserve Yoruba language, music, and ritual in remarkable detail.",
        culture: [
            "Santería (Regla de Ocha) — Yoruba Orisha worship syncretised with Catholicism, practised by millions",
            "Batá drums — sacred Yoruba double-headed drums used in religious ceremonies",
            "Lucumí language — a liturgical form of Yoruba still used in Santería rituals",
            "Rumba and Son music rooted in Yoruba percussion and call-and-response traditions",
            "Ifá divination practised by babalawos (Yoruba priests), recognised by UNESCO",
            "Elaborate Orisha festivals and initiations (kariocha) performed throughout the year"
        ],
        figures: [
            { name: "Celia Cruz", role: "Queen of Salsa — Afro-Cuban icon whose music was deeply rooted in Yoruba-Cuban tradition" },
            { name: "Mongo Santamaría", role: "Cuban-born percussionist and bandleader, master of Afro-Cuban rhythms" },
            { name: "Miguel Barnet", role: "Author of Biography of a Runaway Slave — key work documenting Afro-Cuban Yoruba heritage" }
        ],
        facts: [
            { icon: "fas fa-map-marker-alt", label: "Stronghold", value: "Havana, Matanzas, Santiago de Cuba" },
            { icon: "fas fa-pray", label: "Main Religion", value: "Santería (Regla de Ocha)" },
            { icon: "fas fa-language", label: "Local Name", value: "Lucumí" },
            { icon: "fas fa-calendar", label: "Presence Since", value: "18th century" },
            { icon: "fas fa-globe", label: "UNESCO Recognition", value: "Ifá divination heritage" }
        ]
    },
    "trinidad-and-tobago": {
        name: "Trinidad and Tobago", flag: "🇹🇹", region: "Caribbean",
        population: "100,000+",
        description: "The Orisha religion of Trinidad (also called Shango or Orisha Baptist) is an officially recognised religion, preserving Yoruba spiritual practices with remarkable authenticity. Trinidadian Yoruba heritage also shaped the country's famous Carnival and calypso traditions.",
        history: "Yoruba enslaved people arrived in Trinidad primarily in the late 18th and early 19th centuries. After emancipation in 1838, free Yoruba (called 'Aku') continued to arrive as indentured workers and liberated Africans. They established tight-knit communities in south and central Trinidad and maintained their spiritual traditions with less syncretism than elsewhere in the Caribbean, due to their later arrival and relative freedom to organise.",
        culture: [
            "Orisha religion (Shango Baptist) — officially recognised faith combining Yoruba and Christian elements",
            "Shango festivals and ceremonies honouring Yoruba Orishas",
            "Yoruba-derived words in Trinidadian Creole English",
            "African heritage communities in Gasparillo, Princes Town, and Moruga",
            "Calypso and soca music influenced by Yoruba rhythmic traditions",
            "Annual Emancipation Day celebrations honouring African cultural roots"
        ],
        figures: [
            { name: "Earl Lovelace", role: "Celebrated novelist whose work explores Afro-Trinidadian and Yoruba cultural identity" },
            { name: "Iya Rodney", role: "Legendary Orisha priestess and keeper of Yoruba traditions in Trinidad" }
        ],
        facts: [
            { icon: "fas fa-map-marker-alt", label: "Stronghold", value: "South & Central Trinidad" },
            { icon: "fas fa-pray", label: "Religion", value: "Orisha (Shango Baptist) — officially recognised" },
            { icon: "fas fa-calendar", label: "Peak Arrival", value: "Late 18th – early 19th century" },
            { icon: "fas fa-music", label: "Cultural Influence", value: "Calypso, Soca, Carnival" }
        ]
    },
    nigeria: {
        name: "Nigeria", flag: "🇳🇬", region: "West Africa",
        population: "40+ million",
        description: "Nigeria is the ancestral homeland of the Yoruba people, one of Africa's largest ethnic groups. Primarily located in southwestern Nigeria, Yoruba civilisation gave rise to powerful empires, sophisticated art, and one of the world's richest oral traditions.",
        history: "Yoruba history stretches back over 14,000 years, with Ile-Ife regarded as the cradle of Yoruba civilisation. The Oyo Empire (14th–19th century) was one of the most powerful states in West Africa, controlling vast trade networks. Other major Yoruba kingdoms included Benin (distinct from modern Benin Republic), Ijesha, Egba, Ijebu, and Ekiti. The 19th century saw Yoruba civil wars and the rise of Lagos as a major port city, which became central to Nigerian independence movements.",
        culture: [
            "Ifá divination system — a UNESCO Intangible Cultural Heritage of Humanity",
            "Gelede masquerade — UNESCO-recognised ceremony honouring female spiritual power",
            "Rich tradition of bronze and terracotta sculpture dating to the Ife civilisation (12th–14th century)",
            "Yoruba language — spoken by 40+ million people, with rich tonal complexity",
            "Egungun masquerades — ceremonies honouring ancestral spirits",
            "Traditional textile arts including aso-oke weaving and adire (tie-dye) cloth"
        ],
        figures: [
            { name: "Wole Soyinka", role: "Nobel Laureate in Literature 1986 — playwright, poet, and political activist" },
            { name: "Fela Kuti", role: "Creator of Afrobeat, political activist, global music icon" },
            { name: "Chief Obafemi Awolowo", role: "Founding father of modern Nigeria, champion of Yoruba political identity" },
            { name: "Oba Adeyeye Ogunwusi", role: "Ooni of Ife — spiritual and cultural leader of the Yoruba people" }
        ],
        facts: [
            { icon: "fas fa-map-marker-alt", label: "Homeland States", value: "Lagos, Oyo, Ogun, Osun, Ondo, Ekiti, Kwara, Kogi" },
            { icon: "fas fa-language", label: "Language", value: "Yoruba (tonal, 3 main dialects)" },
            { icon: "fas fa-crown", label: "Historic Empire", value: "Oyo Empire (14th–19th century)" },
            { icon: "fas fa-globe", label: "UNESCO Heritage", value: "Ifá, Gelede masquerade" },
            { icon: "fas fa-calendar", label: "Civilisation Age", value: "14,000+ years (Iwo Eleru)" }
        ]
    },
    "united-kingdom": {
        name: "United Kingdom", flag: "🇬🇧", region: "Europe",
        population: "500,000+",
        description: "The UK hosts one of the largest and most organised Yoruba diaspora communities outside Africa. With deep roots in London, Birmingham, and Manchester, British-Yoruba communities have built thriving churches, cultural organisations, and businesses.",
        history: "Yoruba and wider Nigerian migration to the UK began significantly after Nigerian independence in 1960, accelerating through the 1980s and 1990s due to economic instability in Nigeria. Today, British Nigerians — the majority of whom are Yoruba — are one of the most educated and economically active immigrant communities in the UK. Peckham and Brixton in London are known as vibrant Yoruba community hubs.",
        culture: [
            "Hundreds of Yoruba Pentecostal and traditional churches across London and Birmingham",
            "Nigerian food markets, restaurants, and businesses in Peckham, Brixton, and Woolwich",
            "Yoruba cultural associations hosting events, naming ceremonies, and festivals",
            "British-Yoruba fashion designers gaining recognition in UK fashion",
            "Nollywood films widely watched and distributed in British-Yoruba communities",
            "Annual Nigerian independence celebrations on 1 October across major UK cities"
        ],
        figures: [
            { name: "Sade Adu", role: "Global music icon — born in Ibadan, Nigeria; raised in the UK" },
            { name: "Seal", role: "Grammy-winning British-Nigerian singer of Yoruba descent" },
            { name: "Kano", role: "Acclaimed British rapper and actor of Nigerian heritage" },
            { name: "David Lammy", role: "UK Cabinet Minister of Yoruba-Caribbean heritage" }
        ],
        facts: [
            { icon: "fas fa-map-marker-alt", label: "Stronghold", value: "London (Peckham, Brixton), Birmingham, Manchester" },
            { icon: "fas fa-pray", label: "Main Practice", value: "Pentecostal Christianity, cultural organisations" },
            { icon: "fas fa-calendar", label: "Major Wave", value: "1960s – present" },
            { icon: "fas fa-graduation-cap", label: "Achievement", value: "One of UK's most educated immigrant groups" }
        ]
    },
    jamaica: {
        name: "Jamaica", flag: "🇯🇲", region: "Caribbean",
        population: "100,000+",
        description: "Yoruba influence in Jamaica is woven into Kumina and Revival Zion religious practices, folk traditions, and Rastafarian philosophy. Many Jamaican surnames and place names retain Yoruba origins.",
        history: "Yoruba enslaved people arrived in Jamaica from the 17th century onwards. After emancipation, liberated Africans — including Yoruba known locally as 'Nago' — continued to arrive until the 1860s. These later arrivals strengthened Yoruba cultural memory in rural communities, particularly in St. Thomas and St. Elizabeth parishes. The Yoruba belief in the return of the spirit influenced Jamaican religious and cultural practices.",
        culture: [
            "Kumina religion — preserves West African (partly Yoruba) ancestral spirit worship",
            "Revival Zion — Afro-Christian spiritual practice with Yoruba-influenced elements",
            "Jonkonnu festival — masquerade tradition with West African roots",
            "Rastafarian philosophy draws on African spiritual concepts linked to Yoruba worldview",
            "Jamaican patois contains Yoruba-derived words and expressions",
            "Folk healing and herbalism traditions rooted in West African, including Yoruba, knowledge"
        ],
        figures: [
            { name: "Marcus Garvey", role: "Pan-Africanist leader whose philosophy drew on African heritage including Yoruba traditions" },
            { name: "Louise Bennett-Coverley", role: "Poet and folklorist who preserved Afro-Jamaican oral traditions" }
        ],
        facts: [
            { icon: "fas fa-map-marker-alt", label: "Stronghold", value: "St. Thomas, St. Elizabeth, Kingston" },
            { icon: "fas fa-pray", label: "Religious Influence", value: "Kumina, Revival Zion" },
            { icon: "fas fa-language", label: "Local Name", value: "Nago" },
            { icon: "fas fa-calendar", label: "Presence Since", value: "17th century" }
        ]
    },
    haiti: {
        name: "Haiti", flag: "🇭🇹", region: "Caribbean",
        population: "500,000+",
        description: "Yoruba deities — called Lwa — are central figures in Haitian Vodou, the national spiritual tradition. Yoruba cultural memory survived the Haitian Revolution and lives on in ceremony, song, and daily spiritual practice.",
        history: "Yoruba enslaved people were brought to the French colony of Saint-Domingue (now Haiti) from the 17th century. Their spiritual traditions merged with Fon, Kongo, and other African traditions to form Vodou. Yoruba Orishas were incorporated as Lwa — spiritual beings central to Haitian religious life. Haitian independence in 1804, the world's first successful slave revolution, was reportedly preceded by the Bwa Kayiman ceremony, a Vodou ritual that united enslaved Africans of multiple ethnicities.",
        culture: [
            "Vodou — the national spiritual tradition incorporating Yoruba Lwa (Ogun, Erzulie/Oshun, Agwé/Olokun)",
            "Rara music — ritual street processions with roots in West African including Yoruba traditions",
            "Haitian art — vibrant paintings often depicting Lwa with clear Yoruba parallels",
            "Ceremonial drumming (Rada and Petwo rhythms) linked to Yoruba drum traditions",
            "Oral traditions, proverbs, and folk tales with Yoruba thematic parallels",
            "Bwa Kayiman ceremony — foundation myth of Haitian independence linked to African spiritual heritage"
        ],
        figures: [
            { name: "Toussaint Louverture", role: "Leader of the Haitian Revolution — possibly of Yoruba or Arada descent" },
            { name: "Milo Rigaud", role: "Scholar who documented Yoruba-derived Lwa in Haitian Vodou" }
        ],
        facts: [
            { icon: "fas fa-pray", label: "Main Influence", value: "Vodou (Yoruba Lwa)" },
            { icon: "fas fa-calendar", label: "Presence Since", value: "17th century" },
            { icon: "fas fa-crown", label: "Historic Event", value: "Haitian Revolution 1791–1804" },
            { icon: "fas fa-music", label: "Musical Tradition", value: "Rara, ceremonial drumming" }
        ]
    },
    benin: {
        name: "Benin", flag: "🇧🇯", region: "West Africa",
        population: "1–2 million",
        description: "Significant Yoruba populations live in western Benin, maintaining strong cultural and linguistic ties with southwestern Nigeria. The city of Porto-Novo, Benin's capital, has deep Yoruba roots.",
        history: "The Yoruba of Benin Republic (not to be confused with the Kingdom of Benin in Nigeria) are primarily found in the Ouémé, Plateau, and Collines departments. Porto-Novo, the capital, was founded by Yoruba migrants and retains strong Yoruba cultural character. Benin was also a major site during the transatlantic slave trade, with Yoruba people among those transported to the Americas. The Vodun (Voodoo) religion of Benin shares deep roots with Yoruba religious traditions.",
        culture: [
            "Yoruba language spoken in western departments alongside Fon and French",
            "Vodun religion of Benin shares Orisha traditions with Yoruba spirituality",
            "Porto-Novo's cultural architecture and royal traditions reflect Yoruba heritage",
            "Annual Vodun festival in Ouidah celebrating African spiritual heritage including Yoruba traditions",
            "Traditional Yoruba market culture and craft traditions",
            "Cross-border family and community ties with southwestern Nigeria"
        ],
        figures: [
            { name: "Dah Aligbonon", role: "Renowned Vodun high priest maintaining Yoruba-linked spiritual traditions in Benin" },
            { name: "Angélique Kidjo", role: "Grammy-winning singer from Benin whose music draws on Yoruba and Fon heritage" }
        ],
        facts: [
            { icon: "fas fa-map-marker-alt", label: "Stronghold", value: "Porto-Novo, Ouémé, Plateau regions" },
            { icon: "fas fa-language", label: "Language", value: "Yoruba (alongside French and Fon)" },
            { icon: "fas fa-pray", label: "Shared Tradition", value: "Vodun / Orisha religion" },
            { icon: "fas fa-calendar", label: "Historic Ties", value: "Pre-colonial to present" }
        ]
    },
    venezuela: {
        name: "Venezuela", flag: "🇻🇪", region: "The Americas",
        population: "500,000+",
        description: "Yoruba-derived religions and cultural practices survive in Venezuela, often blended with Catholic and indigenous traditions. Venezuelan Santería (María Lionza cult) shows clear Yoruba influences.",
        history: "Yoruba enslaved Africans were brought to Venezuela during the colonial era, concentrated in coastal and plantation regions. Their spiritual traditions merged with Catholic and indigenous Amazonian practices to form syncretic religious movements, most notably the cult of María Lionza — a uniquely Venezuelan spiritual tradition with an Orisha-like pantheon. Venezuelan Afro-descendant communities in Barlovento and Chuao maintain the clearest links to Yoruba heritage.",
        culture: [
            "Cult of María Lionza — a uniquely Venezuelan spiritual tradition drawing on Yoruba Orisha concepts",
            "Afro-Venezuelan music: tambores (drumming) linked to Yoruba percussion traditions",
            "Barlovento region — heart of Afro-Venezuelan culture with Yoruba-influenced traditions",
            "Traditional Yoruba-derived foods adapted into Venezuelan cuisine",
            "Community festivals celebrating African heritage in coastal regions",
            "Afro-Venezuelan healing and herbal traditions linked to Yoruba medicinal knowledge"
        ],
        figures: [
            { name: "Juan Pablo Sojo", role: "Writer and historian who documented Afro-Venezuelan Yoruba heritage" }
        ],
        facts: [
            { icon: "fas fa-map-marker-alt", label: "Stronghold", value: "Barlovento, Chuao, Caracas" },
            { icon: "fas fa-pray", label: "Spiritual Tradition", value: "María Lionza cult, Santería" },
            { icon: "fas fa-music", label: "Musical Heritage", value: "Tambores (Afro-Venezuelan drumming)" },
            { icon: "fas fa-calendar", label: "Presence Since", value: "17th century" }
        ]
    },
    colombia: {
        name: "Colombia", flag: "🇨🇴", region: "The Americas",
        population: "200,000+",
        description: "Significant Yoruba cultural influence exists in Colombia's coastal regions, particularly in the Pacific and Caribbean coastlines where African heritage communities have preserved West African traditions for generations.",
        history: "Yoruba and other West African enslaved people were brought to Colombia's gold-mining regions and coastal plantations from the 16th century. The Chocó region on the Pacific coast and the Caribbean coast (Cartagena, San Basilio de Palenque) became strongholds of African cultural survival. San Basilio de Palenque — the first free African town in the Americas — maintains African language and cultural traditions, some with Yoruba parallels.",
        culture: [
            "San Basilio de Palenque — UNESCO World Heritage site, first free Black town in the Americas",
            "Palenquero language — Spanish-based creole with West African (including Yoruba) elements",
            "Marimba music of the Pacific coast — UNESCO-recognised African-derived tradition",
            "Currulao dance and drumming — Afro-Colombian tradition with West African roots",
            "Bullerengue music — Afro-Colombian genre with African spiritual roots",
            "Traditional healing practices (curanderismo) drawing on African herbal knowledge"
        ],
        figures: [
            { name: "Manuel Zapata Olivella", role: "Writer and anthropologist who championed Afro-Colombian and Yoruba-linked heritage" }
        ],
        facts: [
            { icon: "fas fa-map-marker-alt", label: "Stronghold", value: "Chocó, Cartagena, Pacific & Caribbean coasts" },
            { icon: "fas fa-globe", label: "UNESCO Site", value: "San Basilio de Palenque" },
            { icon: "fas fa-music", label: "Music Tradition", value: "Marimba, Currulao, Bullerengue" },
            { icon: "fas fa-calendar", label: "Presence Since", value: "16th century" }
        ]
    },
    "dominican-republic": {
        name: "Dominican Republic", flag: "🇩🇴", region: "Caribbean",
        population: "50,000+",
        description: "Growing Yoruba religious practices and cultural awareness exist in the Dominican Republic, where Santería and related traditions have taken root alongside the country's syncretic spiritual heritage.",
        history: "African enslaved people — including Yoruba — were brought to Hispaniola from the early 16th century. The Dominican side of the island developed a distinct Afro-Dominican culture shaped by Spanish colonialism, differing from the Haitian Vodou tradition next door. Dominican folk religion (21 Divisiones) shares some Yoruba-derived spiritual figures with Cuban Santería and Haitian Vodou, reflecting their common West African roots.",
        culture: [
            "21 Divisiones — Dominican folk religion with Yoruba-derived spiritual figures",
            "Palos drumming — sacred Afro-Dominican percussion tradition",
            "Gagá music and processions — linked to Haitian Vodou and Yoruba traditions",
            "Merengue and Bachata — rooted in Afro-Dominican rhythmic traditions",
            "Growing awareness and practice of Cuban-influenced Santería",
            "Afro-Dominican community organisations celebrating African heritage"
        ],
        figures: [
            { name: "Juan Luis Guerra", role: "Acclaimed musician whose work celebrates Afro-Dominican cultural roots" }
        ],
        facts: [
            { icon: "fas fa-pray", label: "Spiritual Tradition", value: "21 Divisiones, Santería" },
            { icon: "fas fa-music", label: "Music", value: "Palos drumming, Merengue, Gagá" },
            { icon: "fas fa-calendar", label: "Presence Since", value: "16th century" }
        ]
    },
    "puerto-rico": {
        name: "Puerto Rico", flag: "🇵🇷", region: "Caribbean",
        population: "100,000+",
        description: "Santería and Yoruba cultural practices are well established in Puerto Rico, integrated with local spiritual traditions and a growing interest in African roots among Puerto Rican communities.",
        history: "Enslaved Africans, including Yoruba people, were brought to Puerto Rico from the 16th century. Puerto Rican bomba music and dance, concentrated in the coastal towns of Loíza, Ponce, and Mayagüez, represents the most visible survival of African — including Yoruba — cultural heritage. Today, Puerto Rican Santería practitioners are numerous, and the island's African heritage is increasingly celebrated as a vital part of Puerto Rican national identity.",
        culture: [
            "Bomba music and dance — Afro-Puerto Rican tradition with clear West African drum heritage",
            "Loíza Carnival — UNESCO-recognised festival celebrating African cultural roots",
            "Santería widely practised, particularly in urban areas and among the diaspora in New York",
            "Vejigante masks and costumes of African heritage displayed at festivals",
            "African-derived herbal healing traditions (espiritismo) blended with Yoruba concepts",
            "Growing academic and community interest in Yoruba roots and language"
        ],
        figures: [
            { name: "Sylvia del Villard", role: "Pioneer in celebrating Afro-Puerto Rican and African heritage in performing arts" }
        ],
        facts: [
            { icon: "fas fa-map-marker-alt", label: "Stronghold", value: "Loíza, Ponce, San Juan" },
            { icon: "fas fa-pray", label: "Spiritual Practice", value: "Santería, Espiritismo" },
            { icon: "fas fa-music", label: "Music Heritage", value: "Bomba, Plena" },
            { icon: "fas fa-globe", label: "UNESCO Festival", value: "Loíza Carnival" }
        ]
    },
    togo: {
        name: "Togo", flag: "🇹🇬", region: "West Africa",
        population: "500,000+",
        description: "Yoruba communities in Togo are concentrated along the Nigerian and Beninese borders, preserving strong traditional culture, language, and religion across generations.",
        history: "Yoruba people have lived in what is now southern Togo for centuries, predating European colonial borders. The Yoruba of Togo are closely linked to communities in Benin Republic and Nigeria, with many families straddling all three countries. The colonial division of West Africa by European powers in the 19th century cut across traditional Yoruba territories, yet cultural and family ties have remained strong.",
        culture: [
            "Yoruba language maintained across generations in border communities",
            "Traditional Orisha worship and Ifá divination practiced in Yoruba communities",
            "Egungun masquerades performed at funerals and festivals",
            "Cross-border market trade maintaining cultural and economic links with Nigeria and Benin",
            "Traditional Yoruba crafts including weaving, beadwork, and bronze casting",
            "Communal festivals celebrating Yoruba identity and heritage"
        ],
        figures: [
            { name: "Kofi Yamgnane", role: "French-Togolese politician who raised awareness of West African Yoruba heritage in Europe" }
        ],
        facts: [
            { icon: "fas fa-map-marker-alt", label: "Location", value: "Southern Togo, border regions" },
            { icon: "fas fa-language", label: "Language", value: "Yoruba (alongside French and Ewe)" },
            { icon: "fas fa-pray", label: "Religion", value: "Traditional Orisha worship, Islam, Christianity" },
            { icon: "fas fa-calendar", label: "Presence", value: "Pre-colonial to present" }
        ]
    },
    ghana: {
        name: "Ghana", flag: "🇬🇭", region: "West Africa",
        population: "100,000+",
        description: "Growing Yoruba immigrant communities in Ghana — particularly in Accra — have established cultural associations, religious centres, and businesses, contributing to Ghana's cosmopolitan West African character.",
        history: "Yoruba migration to Ghana has occurred in waves, driven by trade, education, and economic opportunity. During the colonial era, Yoruba traders and professionals settled in Gold Coast towns. After Nigerian independence and especially during Ghana's periods of economic growth, Yoruba professionals, traders, and students made Ghana their home. Today, Yoruba cultural organisations in Accra actively promote Yoruba heritage.",
        culture: [
            "Yoruba cultural associations hosting festivals and community events in Accra",
            "Nigerian Yoruba churches well established across major Ghanaian cities",
            "Yoruba traders prominent in markets across Accra and Kumasi",
            "Cultural exchanges between Yoruba and Akan communities — both with rich oral traditions",
            "Yoruba food culture contributing to Ghana's diverse culinary scene",
            "Yoruba language classes maintained through community organisations"
        ],
        figures: [
            { name: "Femi Kuti", role: "Son of Fela Kuti, regularly performs in Ghana to celebrate pan-African Yoruba heritage" }
        ],
        facts: [
            { icon: "fas fa-map-marker-alt", label: "Stronghold", value: "Accra, Kumasi" },
            { icon: "fas fa-users", label: "Community Type", value: "Traders, professionals, students" },
            { icon: "fas fa-pray", label: "Institutions", value: "Yoruba churches & cultural associations" },
            { icon: "fas fa-calendar", label: "Modern Wave", value: "20th century – present" }
        ]
    },
    "sierra-leone": {
        name: "Sierra Leone", flag: "🇸🇱", region: "West Africa",
        population: "50,000+",
        description: "Sierra Leone has a remarkable historical Yoruba community — the Aku — descended from freed enslaved Yoruba people who returned to West Africa and maintained their Yoruba language and traditions in Freetown.",
        history: "After the British abolished the slave trade in 1807, Royal Navy ships intercepted slave vessels and freed the captives at Freetown, Sierra Leone. A large number of these recaptives were Yoruba — they became known as 'Aku' in Sierra Leone. Unlike most diaspora communities, the Aku maintained their Yoruba language (still spoken today), built Yoruba-style houses, and established Muslim communities that preserved Yoruba Islamic scholarship. Freetown's Aku community is considered one of the most remarkable survivals of Yoruba culture outside Nigeria.",
        culture: [
            "Aku Yoruba language still spoken in Freetown communities",
            "Yoruba-style architecture and compound living in historic Freetown areas",
            "Aku Muslim community maintaining Yoruba Islamic traditions and scholarship",
            "Traditional Yoruba naming ceremonies, festivals, and funerary practices",
            "Krio language influenced by Yoruba vocabulary and grammar",
            "Community organisations preserving Aku Yoruba heritage and history"
        ],
        figures: [
            { name: "Samuel Ajayi Crowther", role: "First African Anglican Bishop — a freed Yoruba slave who translated the Bible into Yoruba" }
        ],
        facts: [
            { icon: "fas fa-map-marker-alt", label: "Stronghold", value: "Freetown" },
            { icon: "fas fa-language", label: "Heritage", value: "Aku Yoruba language still spoken" },
            { icon: "fas fa-pray", label: "Religion", value: "Yoruba Islamic tradition" },
            { icon: "fas fa-calendar", label: "Community Founded", value: "Early 19th century (freed captives)" },
            { icon: "fas fa-star", label: "Notable", value: "One of most intact diaspora Yoruba communities" }
        ]
    },
    germany: {
        name: "Germany", flag: "🇩🇪", region: "Europe",
        population: "100,000+",
        description: "Germany hosts a growing Yoruba community with cultural associations, Pentecostal churches, and language schools established across major cities, particularly Berlin, Frankfurt, and Hamburg.",
        history: "Significant Nigerian — predominantly Yoruba — migration to Germany began in the 1980s and accelerated through the 1990s and 2000s, driven by economic migration and asylum seeking. Germany's Nigerian community is one of the largest in Europe, with Yoruba professionals, students, and traders establishing roots in major German cities.",
        culture: [
            "Nigerian Pentecostal and evangelical churches operating across German cities",
            "Yoruba cultural organisations hosting community events and heritage celebrations",
            "Nigerian restaurants and food markets offering Yoruba cuisine in major cities",
            "Afrobeats music scene in Germany heavily influenced by Yoruba artists",
            "Academic and student Yoruba communities at German universities",
            "Annual Nigerian community festivals celebrating Yoruba heritage"
        ],
        figures: [
            { name: "Adewale Akinnuoye-Agbaje", role: "Actor of Yoruba heritage, known for his international film and TV career (though raised in UK)" }
        ],
        facts: [
            { icon: "fas fa-map-marker-alt", label: "Stronghold", value: "Berlin, Frankfurt, Hamburg, Munich" },
            { icon: "fas fa-pray", label: "Institutions", value: "Pentecostal churches, cultural associations" },
            { icon: "fas fa-calendar", label: "Major Wave", value: "1980s – present" },
            { icon: "fas fa-users", label: "Community Type", value: "Professionals, students, traders" }
        ]
    },
    france: {
        name: "France", flag: "🇫🇷", region: "Europe",
        population: "50,000+",
        description: "Yoruba immigrants in France maintain cultural identity through community organisations, religious practices, and a vibrant Afrobeats music scene that has made Paris a hub of Yoruba cultural expression in Europe.",
        history: "Nigerian and Yoruba migration to France grew significantly from the 1970s onwards, initially through students and professionals, followed by economic migrants. Paris has emerged as a key hub for Yoruba culture in continental Europe, hosting major Afrobeats events and a thriving West African diaspora community.",
        culture: [
            "Active Yoruba and Nigerian community associations in Paris and Lyon",
            "Nigerian Pentecostal churches serving Yoruba congregations across French cities",
            "West African restaurants and food markets with Yoruba cuisine in Paris",
            "Paris as a major Afrobeats hub — many Yoruba artists perform and record in France",
            "Yoruba fashion designers gaining prominence in the French fashion scene",
            "Annual festivals and cultural events celebrating Nigerian and Yoruba heritage"
        ],
        figures: [
            { name: "Wizkid", role: "Global Afrobeats superstar of Yoruba heritage — regularly performs in Paris and France" }
        ],
        facts: [
            { icon: "fas fa-map-marker-alt", label: "Stronghold", value: "Paris, Lyon, Marseille" },
            { icon: "fas fa-music", label: "Cultural Scene", value: "Major Afrobeats hub in Europe" },
            { icon: "fas fa-pray", label: "Institutions", value: "Pentecostal churches, cultural organisations" },
            { icon: "fas fa-calendar", label: "Major Wave", value: "1970s – present" }
        ]
    },
    italy: {
        name: "Italy", flag: "🇮🇹", region: "Europe",
        population: "50,000+",
        description: "An emerging Yoruba community exists in Italy, with cultural centres and churches particularly in Rome and Milan, as part of a broader West African diaspora making Italy their home.",
        history: "Nigerian migration to Italy increased significantly from the 1990s, with many Yoruba arriving through both regular and irregular migration routes. The Nigerian community in Italy, though facing significant social challenges, has established cultural and religious institutions in major Italian cities.",
        culture: [
            "Nigerian Pentecostal churches serving Yoruba communities in Rome, Milan, and Naples",
            "West African community markets and restaurants with Yoruba food culture",
            "Cultural associations celebrating Yoruba heritage and Nigerian independence",
            "Growing Afrobeats music scene with Yoruba artist presence",
            "Yoruba community support networks helping new arrivals",
            "Traditional Yoruba ceremonies (naming, weddings) maintained in diaspora"
        ],
        figures: [
            { name: "Emeka Ike", role: "Nigerian-Italian Nollywood actor raising awareness of Yoruba culture in Italy" }
        ],
        facts: [
            { icon: "fas fa-map-marker-alt", label: "Stronghold", value: "Rome, Milan, Naples, Turin" },
            { icon: "fas fa-pray", label: "Institutions", value: "Pentecostal churches, community groups" },
            { icon: "fas fa-calendar", label: "Major Wave", value: "1990s – present" }
        ]
    },
    spain: {
        name: "Spain", flag: "🇪🇸", region: "Europe",
        population: "30,000+",
        description: "A growing Nigerian community with Yoruba cultural presence is established in Barcelona, Madrid, and other Spanish cities, enriching Spain's multicultural urban identity.",
        history: "Nigerian migration to Spain accelerated from the 1990s and 2000s, with many Yoruba people settling in Barcelona and Madrid. Spain's historical connection to the transatlantic slave trade also means Yoruba spiritual traditions influenced some Afro-Latino communities in Spain's former colonies. Today, the community continues to grow and build cultural institutions.",
        culture: [
            "Nigerian Pentecostal churches and Yoruba cultural groups in Barcelona and Madrid",
            "West African food culture — Nigerian restaurants serving Yoruba dishes",
            "Cultural events celebrating Yoruba and Nigerian heritage",
            "Afrobeats music scene growing rapidly across Spanish cities",
            "Yoruba community networks supporting education and integration",
            "Traditional ceremonies and festivals maintained within the diaspora community"
        ],
        figures: [
            { name: "Burna Boy", role: "Grammy-winning Afrobeats artist of Nigerian heritage who has performed extensively in Spain" }
        ],
        facts: [
            { icon: "fas fa-map-marker-alt", label: "Stronghold", value: "Barcelona, Madrid, Valencia" },
            { icon: "fas fa-pray", label: "Institutions", value: "Pentecostal churches, cultural associations" },
            { icon: "fas fa-calendar", label: "Major Wave", value: "1990s – present" }
        ]
    }
};

function loadCountryPage() {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('country');
    const country = allCountriesData[slug];

    if (!country) {
        document.getElementById('countryHero').style.display = 'none';
        document.querySelector('.dc-back-bar').style.display = 'none';
        document.querySelector('.dc-content').style.display = 'none';
        document.getElementById('notFound').style.display = 'block';
        document.title = 'Country Not Found - Yoruba Heritage';
        return;
    }

    // Page title & meta
    document.title = `${country.name} - Yoruba Diaspora - Yoruba Heritage`;

    // Hero
    document.getElementById('countryFlag').textContent = country.flag;
    document.getElementById('countryName').textContent = country.name;
    document.getElementById('countryRegion').textContent = country.region;
    document.getElementById('countryPopulation').textContent = country.population;

    // Overview
    document.getElementById('countryDescription').textContent = country.description;

    // Tags
    const tagsEl = document.getElementById('countryTags');
    country.tags && country.tags.forEach(tag => {
        const span = document.createElement('span');
        span.className = 'dc-tag';
        span.textContent = tag;
        tagsEl.appendChild(span);
    });

    // History
    document.getElementById('countryHistory').textContent = country.history;

    // Culture list
    const cultureEl = document.getElementById('countryCulture');
    country.culture.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `<i class="fas fa-check-circle"></i> ${item}`;
        cultureEl.appendChild(li);
    });

    // Notable figures
    const figuresEl = document.getElementById('countryFigures');
    if (country.figures && country.figures.length > 0) {
        country.figures.forEach(fig => {
            const div = document.createElement('div');
            div.className = 'dc-figure';
            div.innerHTML = `
                <div class="dc-figure-icon"><i class="fas fa-user-circle"></i></div>
                <div>
                    <strong>${fig.name}</strong>
                    <p>${fig.role}</p>
                </div>`;
            figuresEl.appendChild(div);
        });
    } else {
        document.getElementById('notableFiguresCard').style.display = 'none';
    }

    // Quick facts sidebar
    const factsEl = document.getElementById('countryFacts');
    country.facts.forEach(fact => {
        const li = document.createElement('li');
        li.innerHTML = `<i class="${fact.icon}"></i><span class="dc-fact-label">${fact.label}:</span> ${fact.value}`;
        factsEl.appendChild(li);
    });
}

document.addEventListener('DOMContentLoaded', loadCountryPage);
