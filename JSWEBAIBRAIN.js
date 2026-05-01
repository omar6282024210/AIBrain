// AIBrain Main JavaScript

document.addEventListener('DOMContentLoaded', () => {

    // Mobile Navigation (if needed) & Active Link Handling
    const navLinks = document.querySelectorAll('.nav-links a');
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });

    // --- Tracker Page Live Feed Simulation ---
    const liveFeedList = document.getElementById('live-feed-list');
    if (liveFeedList) {
        const forensicEvents = [
            { type: "AI News", loc: "Berlin, DE", detail: "Deepfake audio clip detected in local election" },
            { type: "Bot Activity", loc: "Moscow, RU", detail: "Coordinated cluster of 400 accounts detected" },
            { type: "OSINT Match", loc: "Tokyo, JP", detail: "Image metadata confirms original capture date 2019" },
            { type: "Fact Check", loc: "London, UK", detail: "Official denial issued regarding healthcare rumors" },
            { type: "IP Trace", loc: "Beijing, CN", detail: "Source server of viral video identified" },
            { type: "Sentiment Shift", loc: "Cairo, EG", detail: "High friction detected in digital currency discussions" }
        ];

        const addFeedItem = (event) => {
            const item = document.createElement('div');
            item.className = 'glass-panel fade-in-up';
            item.style.padding = '0.8rem';
            item.style.marginBottom = '0.8rem';
            item.style.borderLeft = '3px solid ' + (event.type.includes('AI') ? 'var(--danger)' : 'var(--accent)');
            item.innerHTML = `
                <div style="display: flex; justify-content: space-between; font-size: 0.7rem; color: var(--text-secondary); margin-bottom: 5px;">
                    <span>${event.type}</span>
                    <span>${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
                </div>
                <div style="font-weight: bold; font-size: 0.85rem;">${event.loc}</div>
                <div style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 2px;">${event.detail}</div>
            `;
            liveFeedList.prepend(item);
            if (liveFeedList.children.length > 8) liveFeedList.lastChild.remove();
        };

        // Initial items
        forensicEvents.slice(0, 4).forEach((e, i) => setTimeout(() => addFeedItem(e), i * 300));

        // Periodically add new events
        setInterval(() => {
            const randomEvent = forensicEvents[Math.floor(Math.random() * forensicEvents.length)];
            addFeedItem(randomEvent);
        }, 4000);
    }

    // Animated Counters on Scroll
    const statElements = document.querySelectorAll('.counter');
    let hasCounted = false;

    const runCounters = () => {
        statElements.forEach(stat => {
            const target = +stat.getAttribute('data-target');
            const suffix = stat.getAttribute('data-suffix') || '';
            let count = 0;
            const speed = target / 50; // adjust speed

            const updateCount = () => {
                count += speed;
                if (count < target) {
                    stat.innerText = Math.ceil(count) + suffix;
                    requestAnimationFrame(updateCount);
                } else {
                    stat.innerText = target + suffix;
                }
            };
            updateCount();
        });
    };

    // Simple intersection observer for stats
    const statsSection = document.querySelector('.stats-bar');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !hasCounted) {
                runCounters();
                hasCounted = true;
            }
        });
        observer.observe(statsSection);
    }

    // --- Helper: Simple Hashing for Deterministic Results ---
    const getHash = (str) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return Math.abs(hash);
    };

    // --- Analyze Page Logic ---
    const analyzeBtn = document.getElementById('analyzeBtn');
    const analyzeInput = document.getElementById('analyzeInput');
    const resultsPanel = document.getElementById('resultsPanel');

    if (analyzeBtn && analyzeInput && resultsPanel) {
        analyzeBtn.addEventListener('click', () => {
            const inputText = analyzeInput.value.trim();
            if (!inputText) return;

            const hash = getHash(inputText);

            // Generate deterministic but convincing values based on hash
            const aiScore = 60 + (hash % 35); // 60-95%
            const rumorProb = 40 + (hash % 55); // 40-95%

            // Simulate API Call
            analyzeBtn.innerHTML = 'Analyzing <i class="fas fa-spinner fa-spin"></i>';
            analyzeBtn.disabled = true;
            resultsPanel.style.display = 'none';
            resultsPanel.classList.remove('fade-in-up');

            setTimeout(() => {
                resultsPanel.style.display = 'block';
                // Trigger reflow
                void resultsPanel.offsetWidth;
                resultsPanel.classList.add('fade-in-up');

                // Add glitch effect for extreme danger
                if (rumorProb > 85) {
                    resultsPanel.classList.add('glitch-danger');
                } else {
                    resultsPanel.classList.remove('glitch-danger');
                }

                resultsPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
                analyzeBtn.innerHTML = 'Analyze';
                analyzeBtn.disabled = false;

                // --- OSINT DATA GENERATOR ---
                const inputVal = analyzeInput.value.toLowerCase();

                const osintScenarios = {
                    crypto: {
                        source: { domain: "crypto-insider-news.net", ip: "193.186.4.12", date: "Registered 2024-02-12 (Flagged)" },
                        person: { handle: "@WhaleAlerts_Bot", followers: "3.2M (Coordinated Network)", img: "https://api.dicebear.com/7.x/bottts/svg?seed=crypto" },
                        manipulation: [
                            { orig: "Bitcoin faces minor regulatory challenges in the EU.", alt: "Bitcoin is about to be completely banned across the EU within 48 hours." }
                        ],
                        impact: { score: 9.4, desc: "High financial volatility risk. Severe potential for market panic." },
                        external: [{ name: "CoinDesk", desc: "No ban mentioned in EU draft", domain: "coindesk.com" }]
                    },
                    politics: {
                        source: { domain: "global-truth-network.org", ip: "45.133.2.99", date: "Domain origin: Eastern Europe (Proxy)" },
                        person: { handle: "Patriot_News_Q", followers: "84K (Verified Botnet)", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=patriot" },
                        manipulation: [
                            { orig: "Local election turnout was average.", alt: "Thousands of fraudulent votes were secretly injected overnight." }
                        ],
                        impact: { score: 8.7, desc: "High risk of civic unrest and damage to institutional trust." },
                        external: [{ name: "AP News", desc: "Election Board confirms secure process", domain: "apnews.com" }]
                    },
                    tech: {
                        source: { domain: "tech-future-digest.com", ip: "104.21.44.11", date: "Cloudflare Protected Node" },
                        person: { handle: "Dr_AI_Visionary", followers: "12K (AI Generated Persona)", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=ai_doctor" },
                        manipulation: [
                            { orig: "A new language model shows capability to code simple websites.", alt: "A sentient AI has breached firewall protocols and is rewriting its own code." }
                        ],
                        impact: { score: 7.2, desc: "Moderate societal anxiety. Significant tech sector impact." },
                        external: [{ name: "MIT Tech Review", desc: "Truth about the latest LLM release", domain: "technologyreview.com" }]
                    }
                };

                let scenario;
                const lowerInput = inputText.toLowerCase();
                if (lowerInput.includes('crypto') || lowerInput.includes('bitcoin') || lowerInput.includes('btc')) {
                    scenario = osintScenarios.crypto;
                } else if (lowerInput.includes('election') || lowerInput.includes('vote') || lowerInput.includes('mayor') || lowerInput.includes('president')) {
                    scenario = osintScenarios.politics;
                } else if (lowerInput.includes('ai') || lowerInput.includes('tech') || lowerInput.includes('robot') || lowerInput.includes('system')) {
                    scenario = osintScenarios.tech;
                } else {
                    let extractedDomain = "unknown-source.com";
                    try {
                        const url = new URL(inputText);
                        extractedDomain = url.hostname;
                    } catch (e) {
                        extractedDomain = inputText.replace(/[^a-zA-Z0-9.-]/g, '').substring(0, 15) + ".net";
                        if (extractedDomain === ".net") extractedDomain = "anonymous-node.org";
                    }

                    const ipPart = (hash % 255);
                    scenario = {
                        source: { domain: extractedDomain, ip: `185.22.${ipPart}.12`, date: "Deep Web Entry Node Detected" },
                        person: { handle: "Node_" + (hash % 9999), followers: "Encrypted Network", img: "https://api.dicebear.com/7.x/identicon/svg?seed=" + hash },
                        manipulation: [
                            { orig: "Standard factual reporting detected.", alt: "Detected Narrative Hijacking via context removal." }
                        ],
                        impact: { score: (4 + (hash % 5)).toFixed(1), desc: "Moderate risk of algorithmic amplification." },
                        external: [{ name: "OSINT Database", desc: "Match found in known disinfo repositories", domain: "osint.org" }]
                    };
                }

                // Update DOM with OSINT
                const osintSource = document.getElementById('osint-source');
                if (osintSource) {
                    osintSource.innerHTML = `
                        <div class="card-title">Digital Footprint & Source</div>
                        <div style="display: flex; align-items: center; gap: 1rem; margin-top: 1rem; margin-bottom: 1rem;">
                            <div style="background: #410093; width: 40px; height: 40px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 1.2rem;"><i class="fas fa-server"></i></div>
                            <div style="overflow: hidden;">
                                <h3 style="margin: 0; font-size: 1.2rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${scenario.source.domain} <span class="osint-badge">Verified Source</span></h3>
                                <p style="color: var(--text-secondary); font-size: 0.85rem;">IP: ${scenario.source.ip} | ${scenario.source.date}</p>
                            </div>
                        </div>
                        <a href="#" class="trace-ip-btn" data-ip="${scenario.source.ip}" style="color: var(--accent); font-size: 0.9rem; cursor: pointer; display: inline-block; padding: 0.5rem; background: rgba(0,229,255,0.1); border-radius: 6px;"><i class="fas fa-network-wired"></i> OSINT Trace Route</a>
                    `;

                    setTimeout(() => {
                        const traceBtn = osintSource.querySelector('.trace-ip-btn');
                        if (traceBtn) {
                            traceBtn.addEventListener('click', (e) => {
                                e.preventDefault();
                                traceBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Tracing hops through proxy...';
                                traceBtn.style.color = 'var(--gold)';
                                setTimeout(() => {
                                    const locations = [
                                        { name: "Moscow, RU", lat: 55.7558, lng: 37.6173 },
                                        { name: "Beijing, CN", lat: 39.9042, lng: 116.4074 },
                                        { name: "Pyongyang, KP", lat: 39.0194, lng: 125.7547 },
                                        { name: "Tehran, IR", lat: 35.6892, lng: 51.3890 },
                                        { name: "Unknown Proxy Server", lat: 64.1265, lng: -21.8174 }
                                    ];
                                    // Deterministic location based on hash
                                    const loc = locations[hash % locations.length];

                                    // Save to OSINT storage for the map page
                                    localStorage.setItem('tracedOSINT', JSON.stringify({
                                        name: loc.name,
                                        lat: loc.lat,
                                        lng: loc.lng,
                                        ip: scenario.source.ip,
                                        domain: scenario.source.domain,
                                        time: new Date().toLocaleString()
                                    }));

                                    traceBtn.innerHTML = `<i class="fas fa-check-circle" style="color:var(--success);"></i> Traced to: ${loc.name} (AS${1000 + (hash % 9000)}) - <a href="tracker.html" style="color:var(--accent); text-decoration:underline; margin-left: 5px;">View on Map</a>`;
                                    traceBtn.style.color = 'var(--text-primary)';
                                    traceBtn.style.background = 'rgba(0,230,118,0.1)';
                                }, 2000);
                            });
                        }
                    }, 100);
                }

                const osintManipulation = document.getElementById('osint-manipulation');
                if (osintManipulation) {
                    const ul = osintManipulation.querySelector('ul');
                    if (ul) {
                        ul.innerHTML = scenario.manipulation.map(m => `
                            <li style="position: relative;">
                                <i class="fas fa-circle" style="color: var(--danger); position: absolute; left: -16px; top: 4px; font-size: 10px;"></i>
                                <p style="font-size: 0.85rem; color: var(--text-secondary);">Original Context: "${m.orig}"</p>
                                <p style="font-size: 0.85rem; color: var(--danger);">Weaponized Alteration: "${m.alt}"</p>
                            </li>
                        `).join('');
                        osintManipulation.querySelector('p').innerText = `${scenario.manipulation.length} Aggressive Alterations Detected`;
                    }
                }

                const osintPerson = document.getElementById('osint-person');
                if (osintPerson) {
                    osintPerson.innerHTML = `
                        <div class="card-title">Patient Zero (Origin Node)</div>
                        <div style="display: flex; align-items: center; gap: 1rem; margin-top: 1rem;">
                            <div style="width: 50px; height: 50px; border-radius: 50%; background: #333; overflow: hidden; border: 2px solid var(--danger);">
                                <img src="${scenario.person.img}" alt="avatar" style="width: 100%;">
                            </div>
                            <div>
                                <h4 style="margin: 0; font-size: 1rem;">${scenario.person.handle}</h4>
                                <p style="font-size: 0.8rem; color: var(--text-secondary);">Followers: ${scenario.person.followers}</p>
                            </div>
                        </div>
                        <div class="mt-4">
                            <span class="badge badge-danger"><i class="fas fa-radiation"></i> Super-Spreader Node</span>
                        </div>
                    `;
                }

                const osintImpact = document.getElementById('osint-impact');
                if (osintImpact) {
                    const bar = osintImpact.querySelector('.card-item > div:last-child > div:last-child > div');
                    const scoreText = osintImpact.querySelector('.card-item > div:last-child > div:first-child > span:last-child');
                    const descText = osintImpact.querySelector('p');
                    if (bar && scoreText && descText) {
                        setTimeout(() => {
                            bar.style.width = `${scenario.impact.score * 10}%`;
                            scoreText.innerText = `${scenario.impact.score} / 10`;
                        }, 500);
                        descText.innerText = scenario.impact.desc;
                    }
                }

                const osintExternalList = document.getElementById('osint-external-list');
                if (osintExternalList) {
                    osintExternalList.innerHTML = scenario.external.map((e, index) => `
                        <div style="display: flex; justify-content: space-between; font-size: 0.95rem; padding: 0.5rem; background: rgba(10,10,26,0.5); border-radius: 6px;">
                            <div><span style="color: var(--text-secondary); margin-right: 10px;">${index + 1}</span> <strong>${e.name}</strong> - ${e.desc}</div>
                            <div style="color: var(--text-secondary); font-size: 0.85rem;">${e.domain}</div>
                        </div>
                    `).join('');
                }

                // --- POPULATE FORENSIC REASONING ---
                const reasoningSyntax = document.getElementById('reasoning-syntax');
                const reasoningSource = document.getElementById('reasoning-source');
                const reasoningNarrative = document.getElementById('reasoning-narrative');

                if (reasoningSyntax && reasoningSource && reasoningNarrative) {
                    const isHighAi = aiScore > 75;
                    reasoningSyntax.querySelector('p').innerHTML = isHighAi ?
                        `Detected <strong>uniform sentence length</strong> and <strong>low burstiness</strong> typical of Large Language Models. Syntax consistency score: 98.2%.` :
                        `Detected <strong>human-like variance</strong> in sentence structure. Natural linguistic 'noise' indicates manual authorship.`;

                    reasoningSource.querySelector('p').innerHTML =
                        `SSL Certificate verified for <strong>${scenario.source.domain}</strong>. Server geolocation matches reported origin. No known malicious redirects detected in the chain.`;

                    reasoningNarrative.querySelector('p').innerHTML = rumorProb > 70 ?
                        `High correlation with <strong>known misinformation clusters</strong>. Narrative matches patterns found in 14 previous disinfo campaigns.` :
                        `Narrative appears <strong>neutral and factual</strong>. No significant matches found in global rumor databases.`;
                }

                // --- BIAS & IMPACT METERS ---
                const resultsGrid = document.querySelector('.analyze-grid');
                if (resultsGrid && !document.getElementById('bias-card')) {
                    const biasCard = document.createElement('div');
                    biasCard.id = 'bias-card';
                    biasCard.className = 'card-item';
                    biasCard.style.gridColumn = 'span 1';
                    biasCard.innerHTML = `
                        <div class="card-title"><i class="fas fa-balance-scale"></i> Political Bias</div>
                        <div style="height: 10px; width: 100%; background: var(--border); border-radius: 5px; margin: 1.5rem 0; position: relative; overflow: hidden;">
                            <div id="bias-bar" style="height: 100%; width: 0%; background: linear-gradient(90deg, #3498db, #e74c3c); transition: width 1s;"></div>
                            <div style="position: absolute; left: 50%; top: 0; width: 2px; height: 100%; background: white; opacity: 0.5;"></div>
                        </div>
                        <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--text-secondary);">
                            <span>Left Wing</span>
                            <span>Neutral</span>
                            <span>Right Wing</span>
                        </div>
                        <p id="bias-desc" style="font-size: 0.8rem; margin-top: 1rem; color: var(--text-secondary);">Analyzing linguistic leaning...</p>
                    `;
                    resultsGrid.appendChild(biasCard);

                    const impactCard = document.createElement('div');
                    impactCard.id = 'impact-card';
                    impactCard.className = 'card-item';
                    impactCard.style.gridColumn = 'span 2';
                    impactCard.innerHTML = `
                        <div class="card-title"><i class="fas fa-chart-line"></i> Societal Impact Prediction</div>
                        <div style="display: flex; gap: 1rem; margin-top: 1rem;">
                            <div style="flex: 1; text-align: center; padding: 1rem; background: rgba(255,255,255,0.03); border-radius: 8px;">
                                <div style="font-size: 0.7rem; color: var(--text-secondary);">REACH</div>
                                <div id="impact-reach" style="font-size: 1.2rem; font-weight: bold; color: var(--accent);">0</div>
                            </div>
                            <div style="flex: 1; text-align: center; padding: 1rem; background: rgba(255,255,255,0.03); border-radius: 8px;">
                                <div style="font-size: 0.7rem; color: var(--text-secondary);">SOCIAL FRICTION</div>
                                <div id="impact-friction" style="font-size: 1.2rem; font-weight: bold; color: var(--danger);">0%</div>
                            </div>
                            <div style="flex: 1; text-align: center; padding: 1rem; background: rgba(255,255,255,0.03); border-radius: 8px;">
                                <div style="font-size: 0.7rem; color: var(--text-secondary);">MARKET VOLATILITY</div>
                                <div id="impact-market" style="font-size: 1.2rem; font-weight: bold; color: var(--gold);">0%</div>
                            </div>
                        </div>
                    `;
                    resultsGrid.appendChild(biasCard);
                    resultsGrid.appendChild(impactCard);

                    // Animate meters
                    setTimeout(() => {
                        const bias = (hash % 100);
                        document.getElementById('bias-bar').style.width = bias + '%';
                        document.getElementById('bias-desc').innerText = bias < 40 ? "Leaning Left: Focus on collective interests detected." : (bias > 60 ? "Leaning Right: Focus on individual/market autonomy detected." : "Neutral: Balanced narrative structure found.");

                        document.getElementById('impact-reach').innerText = (hash % 500) + "K+";
                        document.getElementById('impact-friction').innerText = (hash % 100) + "%";
                        document.getElementById('impact-market').innerText = (hash % 30) + "%";
                    }, 500);
                }

                const confidenceVal = document.getElementById('confidence-val');
                const trustVal = document.getElementById('trust-val');
                const threatVal = document.getElementById('threat-val');

                if (confidenceVal && trustVal && threatVal) {
                    confidenceVal.innerText = (85 + (hash % 14)) + "%";

                    if (rumorProb > 80) {
                        trustVal.innerText = "Suspicious";
                        trustVal.style.color = "var(--danger)";
                        threatVal.innerText = "Critical";
                        threatVal.style.color = "var(--danger)";
                    } else if (rumorProb > 50) {
                        trustVal.innerText = "Neutral";
                        trustVal.style.color = "var(--gold)";
                        threatVal.innerText = "Elevated";
                        threatVal.style.color = "var(--gold)";
                    } else {
                        trustVal.innerText = "Verified";
                        trustVal.style.color = "var(--success)";
                        threatVal.innerText = "Low";
                        threatVal.style.color = "var(--success)";
                    }
                }
                // Animate Circle Progress (AI Content Score)
                const circle = document.querySelector('.progress-circle');
                const progressVal = document.querySelector('.progress-value');
                const humanText = circle ? circle.nextElementSibling : null;

                if (circle && progressVal && humanText) {
                    let currentAi = 0;
                    const animateCircle = () => {
                        currentAi += 2;
                        if (currentAi > aiScore) currentAi = aiScore;

                        circle.style.background = `conic-gradient(var(--accent) ${currentAi}%, var(--border) 0)`;
                        progressVal.innerHTML = `${Math.floor(currentAi)}%<span>AI Generated</span>`;
                        humanText.innerText = `${100 - Math.floor(currentAi)}% Human`;

                        if (currentAi < aiScore) {
                            requestAnimationFrame(animateCircle);
                        }
                    };
                    requestAnimationFrame(animateCircle);
                }

                // Animate Gauge Needle (Rumor Probability)
                const gaugeNeedle = document.querySelector('.gauge-needle');
                const rumorContainer = document.querySelector('.gauge-container');
                const rumorProbText = rumorContainer ? rumorContainer.nextElementSibling.querySelector('h2') : null;
                const rumorStatusText = rumorProbText ? rumorProbText.nextElementSibling : null;

                if (gaugeNeedle && rumorProbText && rumorStatusText) {
                    let currentProb = 0;
                    const animateGauge = () => {
                        currentProb += 1.5;
                        if (currentProb > rumorProb) currentProb = rumorProb;

                        // Map 0-100 to -90 to 90 degrees
                        const degrees = (currentProb / 100) * 180 - 90;
                        gaugeNeedle.style.transform = `rotate(${degrees}deg)`;
                        rumorProbText.innerText = Math.floor(currentProb) + '%';

                        if (currentProb < 50) {
                            rumorStatusText.innerText = "Unlikely Rumor";
                            rumorStatusText.style.color = "var(--success)";
                        } else if (currentProb < 75) {
                            rumorStatusText.innerText = "Potential Rumor";
                            rumorStatusText.style.color = "var(--warning)";
                        } else {
                            rumorStatusText.innerText = "Likely Rumor";
                            rumorStatusText.style.color = "var(--danger)";
                        }

                        if (currentProb < rumorProb) {
                            requestAnimationFrame(animateGauge);
                        }
                    };
                    requestAnimationFrame(animateGauge);
                }
            }, 1800);
        });
    }

    // --- Converter Page Logic ---
    const convertBtn = document.getElementById('convertBtn');
    const aiInput = document.getElementById('aiInput');
    const humanOutput = document.getElementById('humanOutput');
    const useSampleBtn = document.getElementById('useSampleBtn');
    const aiWordCount = document.getElementById('aiWordCount');
    const humanWordCount = document.getElementById('humanWordCount');
    const humanScorePercent = document.getElementById('humanScorePercent');
    const humanScoreText = document.getElementById('humanScoreText');

    const modeAiToHuman = document.getElementById('modeAiToHuman');
    const modeHumanToAi = document.getElementById('modeHumanToAi');
    const inputLabel = document.getElementById('inputLabel');
    const outputLabel = document.getElementById('outputLabel');

    if (convertBtn && aiInput && humanOutput) {
        let currentMode = 'aiToHuman';

        if (modeAiToHuman && modeHumanToAi) {
            modeAiToHuman.addEventListener('click', () => {
                currentMode = 'aiToHuman';
                modeAiToHuman.classList.add('btn-primary');
                modeAiToHuman.style.background = '';
                modeAiToHuman.style.color = '';
                modeHumanToAi.classList.remove('btn-primary');
                modeHumanToAi.style.background = 'transparent';
                modeHumanToAi.style.color = 'var(--text-secondary)';
                if (inputLabel) inputLabel.innerText = 'AI Text Input';
                if (outputLabel) outputLabel.innerText = 'Humanized Output';
                aiInput.placeholder = 'Paste your AI generated text here...';
            });

            modeHumanToAi.addEventListener('click', () => {
                currentMode = 'humanToAi';
                modeHumanToAi.classList.add('btn-primary');
                modeHumanToAi.style.background = '';
                modeHumanToAi.style.color = '';
                modeAiToHuman.classList.remove('btn-primary');
                modeAiToHuman.style.background = 'transparent';
                modeAiToHuman.style.color = 'var(--text-secondary)';
                if (inputLabel) inputLabel.innerText = 'Human Text Input';
                if (outputLabel) outputLabel.innerText = 'AI Structured Output';
                aiInput.placeholder = 'Type your normal, conversational text here...';
            });
        }

        const updateWordCount = (text, element) => {
            if (!element) return;
            const count = text.trim() ? text.trim().split(/\s+/).length : 0;
            element.innerText = count + (count === 1 ? ' word' : ' words');
        };

        aiInput.addEventListener('input', () => {
            updateWordCount(aiInput.value, aiWordCount);
        });

        const aiSamples = [
            "In today's rapidly evolving technological landscape, it is imperative to acknowledge the significant impact that artificial intelligence has on various sectors. Organizations are increasingly leveraging AI-driven solutions to optimize operations and enhance productivity.",
            "The utilization of advanced machine learning paradigms facilitates the augmentation of predictive analytics capabilities within enterprise architectures.",
            "Individuals must ascertain the validity of empirical data before formulating conclusions regarding socioeconomic phenomenons in the modern era.",
            "The implementation of autonomous vehicular systems necessitates rigorous algorithmic validation to mitigate potential deleterious outcomes."
        ];

        const humanizeText = (text, creativity, formality, emotion) => {
            let result = text;

            const replacements = {
                "rapidly evolving technological landscape": "fast-changing tech world",
                "it is imperative to acknowledge": "we need to recognize",
                "significant impact": "big effect",
                "utilization of": "using",
                "facilitates the augmentation of": "helps improve",
                "enterprise architectures": "businesses",
                "ascertain the validity": "check the truth",
                "empirical data": "facts",
                "formulating conclusions": "making up their minds",
                "socioeconomic phenomenons": "social issues",
                "implementation of": "using",
                "necessitates rigorous algorithmic validation": "needs careful testing",
                "mitigate potential deleterious outcomes": "prevent bad things from happening",
                "In today's": "Today,",
                "Furthermore,": "Also,",
                "integration of": "adding",
                "facilitates": "helps with",
                "decision making processes": "making decisions",
                "leveraging AI-driven solutions": "using AI",
                "optimize operations": "work better",
                "enhance productivity": "get more done",
                "advanced machine learning paradigms": "machine learning",
                "predictive analytics capabilities": "predicting the future",
                "autonomous vehicular systems": "self-driving cars",
                "approximately": "about",
                "submit": "send in",
                "application": "form",
                "utilize": "use",
                "however,": "but,",
                "moreover,": "also,",
                "consequently,": "so,",
                "subsequently": "then",
                "first step": "first thing to do",
                "move on to": "go to",
                "scheduling": "setting up"
            };

            for (const [complex, simple] of Object.entries(replacements)) {
                if (formality > 70 && ["approximately", "application", "submit"].includes(complex)) continue;
                const regex = new RegExp(complex, 'gi');
                result = result.replace(regex, simple);
            }

            if (emotion > 60) {
                const adverbs = ["Honestly, ", "Surprisingly, ", "To be frank, ", "Amazingly, ", "Believe it or not, "];
                if (Math.random() > 0.4 && !result.match(/Honestly|Surprisingly|frank|Amazingly|Believe/i)) {
                    result = adverbs[Math.floor(Math.random() * adverbs.length)] + result.charAt(0).toLowerCase() + result.slice(1);
                }
                result = result.replace(/very/g, "incredibly");
                result = result.replace(/important/g, "crucial");
            }

            if (creativity > 70) {
                const introPhrases = ["So here's the thing: ", "If you think about it, ", "At the end of the day, ", "Essentially, "];
                if (Math.random() > 0.5 && !result.match(/(thing:|think about it|end of the day|Essentially)/i)) {
                    result = introPhrases[Math.floor(Math.random() * introPhrases.length)] + result.charAt(0).toLowerCase() + result.slice(1);
                }
            }

            if (formality < 40) {
                result = result.replace(/It is/g, "It's").replace(/I am/g, "I'm").replace(/do not/g, "don't").replace(/cannot/g, "can't");
            }

            return result;
        };

        const aiifyText = (text, formality, creativity, tone = 'professional') => {
            let result = text;
            const isArabic = /[\u0600-\u06FF]/.test(text);

            if (isArabic) {
                let arReplacements = {
                    "عشان": "نظراً لأن",
                    "بس": "إلا أنه في الواقع",
                    "كمان": "بالإضافة إلى ذلك",
                    "بدي": "أرغب بشدة في",
                    "شفت": "لقد لوحظ بشكل جلي",
                    "كتير": "بشكل ملحوظ للغاية",
                    "صح": "دقيق من الناحية الموضوعية",
                    "مهم": "في غاية الأهمية الاستراتيجية",
                    "صعب": "يمثل تحدياً معقداً",
                    "سهل": "مبسط وقابل للتنفيذ",
                    "ليش": "ما هي الدوافع وراء",
                    "كيف": "ما هي الآلية التي",
                    "ممكن": "من المحتمل جداً",
                    "أكيد": "من المؤكد قطعيًا",
                    "يلا": "لنباشر العمل على الفور",
                    "منيح": "في حالة مثالية",
                    "سيء": "يفتقر إلى المعايير المطلوبة",
                    "كبير": "ذو أبعاد جوهرية واسعة",
                    "صغير": "ضئيل من الناحية الكمية",
                    "كتير": "بشكل مفرط وغير مسبوق",
                    "بسرعة": "بصورة عاجلة وفورية",
                    "بطيء": "يتسم بالتباطؤ الهيكلي",
                    "شو": "ما هي ماهية",
                    "وين": "في أي حيز جغرافي",
                    "كتير": "بصورة بالغة الأهمية",
                    "قوي": "ذو فاعلية استراتيجية",
                    "ضعيف": "يفتقر إلى القوة اللازمة",
                    "جديد": "مستحدث من الناحية التقنية",
                    "قديم": "متقادم في السياق الحالي",
                    "كذب": "ادعاء يفتقر للمصداقية الموضوعية",
                    "صدق": "تحقق موضوعي من البيانات",
                    "شخص": "كيان بشري فاعل",
                    "عالم": "المحيط الكوني الشامل"
                };

                if (tone === 'academic') {
                    arReplacements["مهم"] = "ذو دلالة إحصائية جوهرية";
                    arReplacements["دراسة"] = "أطروحة بحثية منهجية";
                    arReplacements["فكرة"] = "فرضية نظرية";
                    arReplacements["نتيجة"] = "مخرج تحليلي كمي";
                } else if (tone === 'casual') {
                    arReplacements = { "بدي": "حبيت", "شفت": "لاحظت", "مهم": "ضروري جداً", "عشان": "بسبب" };
                }

                for (const [simple, formal] of Object.entries(arReplacements)) {
                    result = result.replace(new RegExp(simple, 'gi'), formal);
                }

                result = result.replace(/ و /g, "، وعلاوة على ذلك، ");
                result = result.replace(/ أو /g, "، أو كبديل لذلك، ");

                if (creativity > 60 && text.length > 20) {
                    result = "بناءً على التحليل الدقيق للمعطيات، يمكن صياغة النقاط التالية:\n\n" +
                        "• " + result.split('،').join("\n• ") +
                        "\n\nوختاماً، يستوجب هذا السياق دراسة معمقة لضمان تحقيق النتائج المرجوة.";
                } else if (!result.match(/تشير|بناء|من منظور/)) {
                    const intros = [
                        "تشير المعطيات التحليلية إلى أن: ",
                        "من منظور استراتيجي، يلاحظ أن: ",
                        "في ضوء المعلومات المتاحة، يمكن القول إن: "
                    ];
                    result = intros[Math.floor(Math.random() * intros.length)] + result;
                }

                if (result === text) {
                    result = "تحليل البيانات المبدئي: " + result + " (يُوصى بمزيد من التقييم والتدقيق).";
                }

            } else {
                const enReplacements = {
                    "so": "consequently",
                    "but": "however, it must be noted that",
                    "also": "furthermore",
                    "use": "utilize",
                    "show": "demonstrate unequivocally",
                    "help": "facilitate",
                    "important": "of paramount importance",
                    "good": "highly optimal",
                    "bad": "severely deleterious",
                    "hard": "exceedingly challenging",
                    "easy": "highly straightforward",
                    "why": "the underlying rationale for",
                    "how": "the methodology by which",
                    "maybe": "it is highly probable that",
                    "sure": "it is definitively established",
                    "ok": "acceptable under current parameters"
                };

                for (const [simple, formal] of Object.entries(enReplacements)) {
                    const regex = new RegExp("\\b" + simple + "\\b", 'gi');
                    result = result.replace(regex, formal);
                }

                result = result.replace(/ and /gi, ", and concomitantly, ");
                result = result.replace(/ or /gi, ", or alternatively, ");

                if (creativity > 60 && text.length > 20) {
                    result = "Based on a comprehensive algorithmic analysis, the following paradigms emerge:\n\n" +
                        "- " + result.split('. ').join(".\n- ") +
                        "\n\nIn conclusion, these factors necessitate a fundamental reassessment of our core objectives.";
                } else if (!result.match(/Based on|Furthermore|According to|imperative/i)) {
                    const intros = [
                        "It is imperative to note that: ",
                        "According to the available empirical data: ",
                        "A critical analysis reveals that: "
                    ];
                    result = intros[Math.floor(Math.random() * intros.length)] + result.charAt(0).toLowerCase() + result.slice(1);
                }

                if (result === text) {
                    result = "Analytical output: " + result + " (Further empirical validation is strongly recommended).";
                }
            }
            return result;
        };

        const animateHumanScore = (targetScore) => {
            if (!humanScorePercent) return;
            let current = 0;
            const duration = 1500;
            const startTime = performance.now();

            const step = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easeOut = progress * (2 - progress);
                current = Math.floor(easeOut * targetScore);
                humanScorePercent.innerText = current + '%';

                const circle = humanScorePercent.closest('div[style*="border-radius"]');
                if (circle) {
                    if (current < 50) circle.style.borderColor = 'var(--danger)';
                    else if (current < 80) circle.style.borderColor = 'var(--warning)';
                    else circle.style.borderColor = 'var(--success)';
                }

                if (progress < 1) {
                    requestAnimationFrame(step);
                }
            };
            requestAnimationFrame(step);
        };

        const typeWriterEffect = (text, element, onComplete) => {
            element.value = '';
            let i = 0;
            const speed = 15;
            const type = () => {
                if (i < text.length) {
                    element.value += text.charAt(i);
                    i++;
                    updateWordCount(element.value, humanWordCount);
                    element.scrollTop = element.scrollHeight;
                    setTimeout(type, speed);
                } else {
                    if (onComplete) onComplete();
                }
            };
            type();
        };

        convertBtn.addEventListener('click', () => {
            const inputText = aiInput.value.trim();
            if (!inputText) return;

            const creativitySlider = document.getElementById('creativitySlider');
            const formalitySlider = document.getElementById('formalitySlider');
            const emotionSlider = document.getElementById('emotionSlider');

            const creativity = creativitySlider ? parseInt(creativitySlider.value) : 70;
            const formality = formalitySlider ? parseInt(formalitySlider.value) : 40;
            const emotion = emotionSlider ? parseInt(emotionSlider.value) : 60;

            convertBtn.innerHTML = '<i class="fas fa-cog fa-spin"></i> Processing...';
            convertBtn.disabled = true;

            setTimeout(() => {
                let outputText;
                let targetScore;

                if (currentMode === 'aiToHuman') {
                    outputText = humanizeText(inputText, creativity, formality, emotion);

                    let baseScore = 60;
                    baseScore += (creativity * 0.2);
                    baseScore += (emotion * 0.15);
                    baseScore -= (Math.abs(50 - formality) * 0.1);

                    targetScore = Math.floor(baseScore + (Math.random() * 10));
                    if (targetScore > 99) targetScore = 99;
                    if (targetScore < 10) targetScore = 12;

                    let statusText = "Human-Like";
                    let statusColor = "var(--success)";
                    if (targetScore > 85) { statusText = "Very Human"; }
                    else if (targetScore > 65) { statusText = "Likely Human"; statusColor = "var(--warning)"; }
                    else if (targetScore > 40) { statusText = "Mixed"; statusColor = "var(--warning)"; }
                    else { statusText = "Likely AI"; statusColor = "var(--danger)"; }

                    if (humanScoreText) {
                        humanScoreText.innerText = statusText;
                        humanScoreText.style.color = statusColor;
                    }
                } else {
                    const tone = document.querySelector('input[name="tone"]:checked').value;
                    outputText = aiifyText(inputText, formality, creativity, tone);

                    let baseScore = 40;
                    if (tone === 'academic') baseScore -= 10;
                    if (tone === 'professional') baseScore -= 5;

                    baseScore -= (formality * 0.3);
                    baseScore -= (creativity * 0.1);

                    targetScore = Math.floor(baseScore + (Math.random() * 5));
                    if (targetScore < 0) targetScore = 0;

                    let statusText = "AI Generated";
                    let statusColor = "var(--danger)";
                    if (targetScore > 30) { statusText = "Mixed"; statusColor = "var(--warning)"; }
                    if (targetScore > 60) { statusText = "Human-Like"; statusColor = "var(--success)"; }

                    if (humanScoreText) {
                        humanScoreText.innerText = statusText;
                        humanScoreText.style.color = statusColor;
                    }
                }

                animateHumanScore(targetScore);

                typeWriterEffect(outputText, humanOutput, () => {
                    convertBtn.innerHTML = '<i class="fas fa-sparkles"></i> Convert Text';
                    convertBtn.disabled = false;
                });

            }, 800);
        });

        if (useSampleBtn) {
            useSampleBtn.addEventListener('click', () => {
                const randomSample = aiSamples[Math.floor(Math.random() * aiSamples.length)];
                aiInput.value = randomSample;
                updateWordCount(randomSample, aiWordCount);
            });
        }
    }

    // --- Tracker Page Map Initialization ---
    const mapElement = document.getElementById('map');
    if (mapElement && typeof L !== 'undefined') {
        // Initialize Leaflet Map
        const map = L.map('map', {
            zoomControl: false
        }).setView([30, 10], 2);

        L.control.zoom({ position: 'topright' }).addTo(map);

        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
            subdomains: 'abcd',
            maxZoom: 20
        }).addTo(map);

        // Check for Traced OSINT from Analyze Page
        const savedOSINT = localStorage.getItem('tracedOSINT');

        if (savedOSINT) {
            const data = JSON.parse(savedOSINT);
            const targetPos = [data.lat, data.lng];

            // Custom OSINT Target Icon
            const targetIcon = L.divIcon({
                className: 'osint-marker',
                html: `<div style="width:30px; height:30px; background:rgba(0,229,255,0.2); border:2px solid var(--accent); border-radius:50%; display:flex; align-items:center; justify-content:center; animation: pulse 1.5s infinite;">
                        <div style="width:10px; height:10px; background:var(--accent); border-radius:50%;"></div>
                       </div>`,
                iconSize: [30, 30],
                iconAnchor: [15, 15]
            });

            // Fly to the location
            setTimeout(() => {
                map.flyTo(targetPos, 8, { animate: true, duration: 2.5 });
                L.marker(targetPos, { icon: targetIcon }).addTo(map)
                    .bindPopup(`
                        <div style="color:var(--bg-deep); font-family:sans-serif;">
                            <strong style="color:var(--primary);">OSINT TARGET IDENTIFIED</strong><br>
                            <b>Location:</b> ${data.name}<br>
                            <b>IP:</b> ${data.ip}<br>
                            <b>Origin:</b> ${data.domain}<br>
                            <b>Traced at:</b> ${data.time}
                        </div>
                    `)
                    .openPopup();

                // Update Sidebar Info
                const originText = document.querySelector('.tracker-sidebar .glass-panel div div:first-child');
                const originTime = document.querySelector('.tracker-sidebar .glass-panel div div:nth-child(2)');
                if (originText) originText.innerText = data.name;
                if (originTime) originTime.innerText = data.time;

            }, 1000);

            // Clear storage so it doesn't repeat
            localStorage.removeItem('tracedOSINT');

        } else {
            // Default Simulated Spread Path
            const points = [
                [40.7128, -74.0060], // New York
                [51.5074, -0.1278],  // London
                [25.2048, 55.2708],  // Dubai
                [19.0760, 72.8777],  // Mumbai
                [1.3521, 103.8198]   // Singapore
            ];

            const pathLine = L.polyline(points, {
                color: '#FF4757',
                weight: 3, opacity: 0.8, dashArray: '5, 10'
            }).addTo(map);

            const glowIcon = L.divIcon({
                className: 'glow-marker',
                html: '<div style="width:15px; height:15px; background:var(--danger); border-radius:50%; box-shadow: 0 0 15px var(--danger);"></div>',
                iconSize: [15, 15], iconAnchor: [7, 7]
            });

            points.forEach((pt, idx) => {
                setTimeout(() => {
                    L.marker(pt, { icon: glowIcon }).addTo(map)
                        .bindPopup(`Location ${idx + 1}`)
                        .openPopup();
                    map.panTo(pt, { animate: true, duration: 1 });
                }, idx * 2000);
            });
        }
    }

    // --- Accordion Logic for Contact Page ---
    const accordions = document.querySelectorAll('.accordion-header');
    accordions.forEach(acc => {
        acc.addEventListener('click', () => {
            const item = acc.parentElement;
            item.classList.toggle('active');
        });
    });

    // --- Image Forensics Page Logic ---
    const uploadZone = document.getElementById('uploadZone');
    const imageInput = document.getElementById('imageInput');
    const scanOverlay = document.getElementById('scanOverlay');
    const imageResults = document.getElementById('imageResults');
    const scannedImage = document.getElementById('scannedImage');

    if (uploadZone && imageInput) {
        uploadZone.addEventListener('click', () => imageInput.click());

        imageInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (event) => {
                scannedImage.src = event.target.result;
                startImageScan(file);
            };
            reader.readAsDataURL(file);
        });

        const startImageScan = (file) => {
            scanOverlay.style.display = 'flex';
            const progress = document.getElementById('scanProgress');
            const status = document.getElementById('scanStatus');
            const hash = getHash(file.name + file.size);

            let p = 0;
            const steps = [
                "Decompressing Pixel Buffer...",
                "Analyzing Fourier Transforms...",
                "Checking ELA (Error Level Analysis)...",
                "Verifying Cryptographic Signatures...",
                "Mapping EXIF GPS Metadata...",
                "Reverse Searching Global Databases..."
            ];

            const interval = setInterval(() => {
                p += 2;
                progress.style.width = p + '%';
                status.innerText = steps[Math.floor((p / 101) * steps.length)];

                if (p >= 100) {
                    clearInterval(interval);
                    showImageResults(file, hash);
                }
            }, 50);
        };

        const showImageResults = (file, hash) => {
            scanOverlay.style.display = 'none';
            imageResults.style.display = 'block';
            imageResults.classList.add('fade-in-up');

            const imgAiScore = document.getElementById('imgAiScore');
            const imgRealScore = document.getElementById('imgRealScore');
            const sigStatus = document.getElementById('sigStatus');
            const geoLocText = document.getElementById('geoLocText');
            const webMatchesList = document.getElementById('webMatchesList');

            const fileNameLower = file.name.toLowerCase();

            // --- Advanced Forensic Classification ---
            let category, locationName, lat, lng, searchTerms;

            if (fileNameLower.includes('messi') || hash % 10 === 1) {
                category = "Person / Public Figure";
                locationName = "Rosario, Argentina (Home Origin)";
                lat = -32.9442; lng = -60.6505;
                searchTerms = "Lionel Messi official portrait";
            } else if (fileNameLower.includes('gaza') || fileNameLower.includes('war') || hash % 10 === 2) {
                category = "Conflict Zone / News Event";
                locationName = "Gaza City, Palestine";
                lat = 31.5017; lng = 34.4668;
                searchTerms = "Gaza breaking news live footage";
            } else if (fileNameLower.includes('dubai') || hash % 10 === 3) {
                category = "Urban Infrastructure";
                locationName = "Burj Khalifa, Dubai, UAE";
                lat = 25.1972; lng = 55.2744;
                searchTerms = "Dubai skyline professional photography";
            } else {
                category = "Architectural Landmark";
                locationName = "Eiffel Tower, Paris, France";
                lat = 48.8584; lng = 2.2945;
                searchTerms = "Eiffel Tower high resolution";
            }

            const aiProb = 5 + (hash % 85);
            imgAiScore.innerText = aiProb + "%";
            imgRealScore.innerText = (100 - aiProb) + "%";
            imgAiScore.style.color = aiProb > 70 ? "var(--danger)" : (aiProb > 40 ? "var(--gold)" : "var(--success)");

            // Digital Signature
            const isForged = hash % 5 === 0;
            sigStatus.innerHTML = isForged ?
                `<i class="fas fa-times-circle" style="color:var(--danger);"></i> Forged Digital Signature Detected` :
                `<i class="fas fa-check-circle" style="color:var(--success);"></i> Valid Digital Signature (Camera-Original)`;
            sigStatus.style.color = isForged ? "var(--danger)" : "var(--success)";

            // Geolocation
            geoLocText.innerText = `Coordinates: ${lat.toFixed(4)}° N, ${lng.toFixed(4)}° E`;
            geoLocText.nextElementSibling.innerText = `Source Origin: ${locationName} (Inferred from EXIF & Pixel Analysis)`;

            // Save to OSINT storage
            localStorage.setItem('tracedOSINT', JSON.stringify({
                name: locationName,
                lat: lat,
                lng: lng,
                ip: "Image-Source-Node",
                domain: file.name,
                time: new Date().toLocaleString()
            }));

            // Web Presence & Origin Trace
            const isFromWeb = hash % 2 === 0;
            if (isFromWeb) {
                webMatchesList.innerHTML = `
                    <div style="padding: 1.2rem; background: rgba(0, 229, 255, 0.05); border-radius: 8px; border: 1px solid var(--border);">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 0.8rem;">
                            <strong>Classification: <span style="color: var(--accent);">${category}</span></strong>
                            <span class="osint-badge">Source Found</span>
                        </div>
                        <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 1rem;">
                            Digital footprint detected in <b>${(hash % 8) + 1}</b> indexed repositories.
                        </p>
                        <div style="display: flex; gap: 1rem;">
                            <a href="https://www.google.com/search?q=${encodeURIComponent(searchTerms)}" target="_blank" class="btn btn-primary" style="padding: 0.4rem 1rem; font-size: 0.8rem;">
                                <i class="fas fa-search"></i> Found Content Link
                            </a>
                            <a href="tracker.html" class="btn btn-outline" style="padding: 0.4rem 1rem; font-size: 0.8rem;">
                                <i class="fas fa-map-marker-alt"></i> Location Origin
                            </a>
                        </div>
                    </div>
                `;
            } else {
                webMatchesList.innerHTML = `
                    <div style="padding: 1.2rem; background: rgba(0, 230, 118, 0.05); border-radius: 8px; border: 1px solid var(--success);">
                        <i class="fas fa-camera"></i> <strong>Classification: <span style="color: var(--success);">${category}</span></strong>
                        <p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 5px;">Unique content detected. No public web matches found.</p>
                    </div>
                `;
            }
        };
    }

    // --- Slider Logic ---
    const sliders = document.querySelectorAll('.custom-slider');
    sliders.forEach(slider => {
        slider.addEventListener('input', (e) => {
            // Update percentage span if it exists (for text converter)
            const nextElement = e.target.nextElementSibling;
            if (nextElement && nextElement.tagName === 'SPAN') {
                nextElement.innerText = e.target.value + '%';
            }

            // Update tracker timeline text if on the tracker page
            const trackerLayout = e.target.closest('.tracker-layout');
            if (trackerLayout) {
                const overlayPlayer = e.target.closest('.glass-panel');
                if (overlayPlayer) {
                    const timelineSpans = overlayPlayer.querySelectorAll('span');
                    if (timelineSpans.length > 1) {
                        const timelineText = timelineSpans[1];
                        const dates = ['May 10, 08:00 AM', 'May 10, 10:00 AM', 'May 10, 12:00 PM', 'May 10, 06:00 PM', 'May 11, 12:00 AM', 'May 11, 03:00 AM', 'May 11, 06:10 AM', 'May 11, 09:00 AM', 'May 11, 12:00 PM'];
                        const index = Math.min(Math.floor((e.target.value / 100) * dates.length), dates.length - 1);
                        timelineText.innerText = dates[index];
                    }
                }
            }
        });
    });

});

