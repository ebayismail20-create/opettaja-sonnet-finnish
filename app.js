/* =============================================
   APP.JS — Interactive Finnish Learning App
   Handles: navigation, lesson rendering,
   exercise checking, quiz scoring, writing
   saving, progress tracking.
   ============================================= */

// ---- State ----
let currentLessonId = null;

// ---- Navigation ----
function showLessonPage(lessonId) {
    const id = lessonId || getProgress().currentLesson || 1;
    currentLessonId = id;
    document.getElementById('landing-page').style.display = 'none';
    document.getElementById('lesson-page').style.display = 'block';
    renderLesson(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showLanding() {
    document.getElementById('landing-page').style.display = '';
    document.getElementById('lesson-page').style.display = 'none';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ---- Progress (localStorage) ----
function getProgress() {
    try {
        return JSON.parse(localStorage.getItem('finnishProgress')) || { currentLesson: 1, scores: {}, writing: {}, checklist: {} };
    } catch { return { currentLesson: 1, scores: {}, writing: {}, checklist: {} }; }
}
function saveProgress(data) {
    localStorage.setItem('finnishProgress', JSON.stringify(data));
}

// ---- Render Lesson ----
function renderLesson(id) {
    const lesson = LESSONS.find(l => l.id === id);
    if (!lesson) { renderNoLesson(id); return; }
    const progress = getProgress();
    const totalLessons = LESSONS.length;
    const pct = Math.round((id / 300) * 100);

    const container = document.getElementById('lesson-page');
    container.innerHTML = `
        <!-- Nav -->
        <div class="lesson-nav">
            <div class="logo" onclick="showLanding()" title="Back to home">🇫🇮 <span>Opettaja Sonnet</span></div>
            <div class="lesson-progress-bar"><div class="lesson-progress-fill" style="width:${pct}%"></div></div>
            <span style="font-size:0.8rem;color:var(--text-secondary);">Lesson ${id}/300</span>
        </div>

        <!-- Header -->
        <div class="lesson-header">
            <div class="lesson-level">${lesson.level}</div>
            <h1>🇫🇮 Lesson #${lesson.id}</h1>
            <h2>${lesson.titleFi} — ${lesson.titleEn}</h2>
            <p class="lesson-goal">🎯 ${lesson.goal}</p>
        </div>

        <div class="lesson-body">
            ${renderVocabulary(lesson)}
            ${renderGrammar(lesson)}
            ${renderAudio(lesson)}
            ${renderWriting(lesson, progress)}
            ${renderExercises(lesson)}
            ${renderQuiz(lesson)}
            ${renderYKI(lesson)}
            ${renderReview(lesson)}
            ${renderChecklist(lesson, progress)}
            ${renderBottomNav(lesson)}
        </div>
    `;

    // Restore writing
    const wa = document.getElementById('writing-area');
    if (wa && progress.writing && progress.writing[id]) {
        wa.value = progress.writing[id];
    }

    // Restore checklist
    restoreChecklist(id, progress);
}

function renderNoLesson(id) {
    const container = document.getElementById('lesson-page');
    container.innerHTML = `
        <div class="lesson-nav">
            <div class="logo" onclick="showLanding()">🇫🇮 <span>Opettaja Sonnet</span></div>
            <div style="flex:1"></div>
        </div>
        <div style="text-align:center;padding:120px 20px;">
            <h1 style="font-size:3rem;margin-bottom:16px;">🚧</h1>
            <h2>Lesson ${id} Coming Soon!</h2>
            <p style="color:var(--text-secondary);margin:16px 0 32px;">We currently have ${LESSONS.length} lessons available. More are being added!</p>
            <button class="btn" onclick="showLessonPage(${LESSONS.length})">← Go to Lesson ${LESSONS.length}</button>
            <button class="btn btn-outline" onclick="showLanding()" style="margin-left:8px;">Home</button>
        </div>
    `;
}

// ---- Section Renderers ----

function renderVocabulary(lesson) {
    const items = lesson.vocabulary.map(v => `
        <div class="vocab-item">
            <div class="vocab-word">${v.word}</div>
            <div class="vocab-pron">${v.pron}</div>
            <div class="vocab-trans">${v.en}</div>
        </div>
    `).join('');

    return `
    <div class="lesson-section fade-in">
        <h3>🎯 New Vocabulary</h3>
        <div class="vocab-grid-lesson">${items}</div>
        <div class="trick-box">
            <span class="box-title">💡 Memory Trick</span>
            ${lesson.memoryTrick}
        </div>
    </div>`;
}

function renderGrammar(lesson) {
    const rules = lesson.grammarRules.map(r => `
        <div class="grammar-box">
            <span class="box-title">📐 ${r.rule}</span>
            <p><strong>Pattern:</strong> <code>${r.pattern}</code></p>
            <p style="margin-top:8px;">${r.explanation}</p>
            <div style="margin-top:10px;">
                ${r.examples.map(e => `<div style="padding:3px 0;color:var(--accent-3);">→ ${e}</div>`).join('')}
            </div>
        </div>
    `).join('');

    return `
    <div class="lesson-section fade-in">
        <h3>📚 Grammar Focus: ${lesson.grammarTitle}</h3>
        ${rules}
        <div class="trick-box">
            <span class="box-title">🧠 Easy Way to Remember</span>
            <p>${lesson.easyRemember}</p>
        </div>
        <div class="trick-box" style="border-left-color:#ff9800;">
            <span class="box-title">⚠️ Common Mistake</span>
            <p>${lesson.commonMistake}</p>
        </div>
        <div class="trick-box" style="border-left-color:#9c27b0;">
            <span class="box-title">🔍 Compare with English</span>
            <p>${lesson.compareEnglish}</p>
        </div>
    </div>`;
}

function renderAudio(lesson) {
    const lines = lesson.audioScript.map(s => `
        <div style="margin:6px 0;"><strong>${s.speaker}:</strong> ${s.line} <span style="color:var(--text-secondary);font-size:0.8rem;">${s.note}</span></div>
    `).join('');

    return `
    <div class="lesson-section fade-in">
        <h3>🎧 Audio Comprehension</h3>
        <p style="color:var(--text-secondary);margin-bottom:12px;"><em>AUDIO: ${lesson.audioScene}</em></p>
        <div class="audio-box">
            <span class="box-title">📜 Dialogue Script</span>
            ${lines}
        </div>
        <div style="margin-top:12px;">
            <strong>Key Phrases:</strong> ${lesson.audioKeyPhrases.map(p => `<code style="background:rgba(255,255,255,0.06);padding:2px 8px;border-radius:4px;margin:0 4px;">${p}</code>`).join(' ')}
        </div>
        <div style="margin-top:12px;padding:12px;background:rgba(255,255,255,0.03);border-radius:var(--radius-sm);">
            <strong>🎯 Listening Task:</strong> ${lesson.audioTask}
        </div>
    </div>`;
}

function renderWriting(lesson, progress) {
    const saved = (progress.writing && progress.writing[lesson.id]) || '';
    return `
    <div class="lesson-section fade-in">
        <h3>✍️ Writing Assignment</h3>
        <p><strong>Task:</strong> ${lesson.writingTask}</p>
        <p style="margin:8px 0;color:var(--text-secondary);"><strong>Requirements:</strong> ${lesson.writingRequirements}</p>
        <p style="margin-bottom:16px;"><strong>Example:</strong> <em>${lesson.writingExample}</em></p>
        <textarea id="writing-area" class="writing-area" placeholder="Write your Finnish text here... Your work is saved automatically as you type.">${saved}</textarea>
        <div style="display:flex;gap:10px;margin-top:12px;align-items:center;flex-wrap:wrap;">
            <button class="check-btn" onclick="saveWriting(${lesson.id})">💾 Save My Writing</button>
            <button class="check-btn" style="background:linear-gradient(135deg,#43e97b,#38f9d7);color:#0b0f1a;" onclick="clearWriting(${lesson.id})">🗑️ Clear</button>
            <span id="writing-status" class="writing-saved"></span>
        </div>
        <div class="submit-box" style="margin-top:16px;">
            <span class="box-title">📝 How Corrections Work</span>
            <p>Your writing is saved locally. To get corrections, share your text with your teacher or language exchange partner using the color system:
            <span style="color:#f5576c;">Red = Error</span> ·
            <span style="color:#43e97b;">Green = Correction</span> ·
            <span style="color:#64b5f6;">Blue = Explanation</span></p>
        </div>
    </div>`;
}

function renderExercises(lesson) {
    const items = lesson.exercises.map((ex, i) => `
        <div class="exercise-block">
            <strong>Exercise ${i + 1}: ${ex.question}</strong>
            <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
                <input type="text" class="exercise-input" id="ex-${lesson.id}-${i}" placeholder="Type your answer..."
                    style="flex:1;min-width:200px;" autocomplete="off"
                    onkeydown="if(event.key==='Enter')checkExercise(${lesson.id},${i},'${escapeForAttr(ex.answer)}')">
                <button class="check-btn" onclick="checkExercise(${lesson.id},${i},'${escapeForAttr(ex.answer)}')">Check ✓</button>
            </div>
            <p style="color:var(--text-secondary);font-size:0.8rem;margin-top:6px;">💡 Hint: ${ex.hint}</p>
            <div class="exercise-feedback" id="fb-${lesson.id}-${i}"></div>
        </div>
    `).join('');

    return `
    <div class="lesson-section fade-in">
        <h3>📝 Interactive Exercises</h3>
        <p style="color:var(--text-secondary);margin-bottom:16px;">Type your answers and click "Check" to get instant feedback!</p>
        ${items}
    </div>`;
}

function renderQuiz(lesson) {
    const questions = lesson.quiz.map((q, qi) => {
        const opts = q.options.map((o, oi) => `
            <label class="quiz-option" id="qopt-${lesson.id}-${qi}-${oi}" onclick="selectQuizOption(${lesson.id},${qi},${oi})">
                <input type="radio" name="quiz-${lesson.id}-${qi}" value="${oi}">
                ${o}
            </label>
        `).join('');
        return `
        <div class="quiz-question" id="qq-${lesson.id}-${qi}">
            <p>${qi + 1}. ${q.question}</p>
            <div class="quiz-options">${opts}</div>
            <div class="exercise-feedback" id="qfb-${lesson.id}-${qi}"></div>
        </div>`;
    }).join('');

    return `
    <div class="lesson-section fade-in">
        <h3>🧪 Daily Mini-Test (${lesson.quiz.length} questions)</h3>
        <p style="color:var(--text-secondary);margin-bottom:16px;">Select your answers, then click "Submit Quiz" to see your score.</p>
        ${questions}
        <div style="text-align:center;margin-top:20px;">
            <button class="btn" onclick="submitQuiz(${lesson.id})">📊 Submit Quiz</button>
        </div>
        <div id="quiz-score-${lesson.id}" style="display:none;"></div>
    </div>`;
}

function renderYKI(lesson) {
    return `
    <div class="lesson-section fade-in">
        <div class="yki-box">
            <h3>🎓 YKI Preparation Corner</h3>
            <p><strong>Skill Focus:</strong> ${lesson.ykiSkillFocus}</p>
            <p style="margin:8px 0;"><strong>YKI Tip:</strong> ${lesson.ykiTip}</p>
            <p><strong>Sample YKI Task:</strong> ${lesson.ykiSample}</p>
        </div>
    </div>`;
}

function renderReview(lesson) {
    const prev = lesson.reviewPrevious.length > 0
        ? lesson.reviewPrevious.map(r => `<li style="margin:4px 0;">${r}</li>`).join('')
        : '<li>This is your first lesson — welcome! 🎉</li>';

    return `
    <div class="lesson-section fade-in">
        <h3>🔄 Review & What's Next</h3>
        <div style="margin-bottom:16px;">
            <strong>From Previous Lessons:</strong>
            <ul style="list-style:none;margin-top:8px;">${prev}</ul>
        </div>
        <div class="trick-box" style="border-left-color:var(--accent-3);">
            <span class="box-title">📅 Tomorrow's Preview</span>
            <p>${lesson.tomorrowPreview}</p>
        </div>
        <div class="trick-box" style="border-left-color:var(--gold);">
            <span class="box-title">📋 Homework</span>
            <p>${lesson.homework}</p>
        </div>
    </div>`;
}

function renderChecklist(lesson, progress) {
    const items = ['Vocabulary memorized', 'Grammar understood', 'Audio practiced', 'Writing submitted', 'Exercises done', 'Quiz passed'];
    const checks = items.map((item, i) => {
        const checked = progress.checklist && progress.checklist[lesson.id] && progress.checklist[lesson.id][i];
        return `<label class="${checked ? 'checked' : ''}" id="cl-${lesson.id}-${i}">
            <input type="checkbox" ${checked ? 'checked' : ''} onchange="toggleChecklist(${lesson.id},${i},this.checked)"> ${item}
        </label>`;
    }).join('');

    return `
    <div class="lesson-section fade-in" style="text-align:center;">
        <h3>✅ Completion Checklist</h3>
        <div class="checklist">${checks}</div>
    </div>`;
}

function renderBottomNav(lesson) {
    const prevBtn = lesson.id > 1
        ? `<button class="btn btn-outline" onclick="showLessonPage(${lesson.id - 1})">← Lesson ${lesson.id - 1}</button>`
        : `<button class="btn btn-outline" onclick="showLanding()">← Home</button>`;

    const nextExists = LESSONS.find(l => l.id === lesson.id + 1);
    const nextBtn = nextExists
        ? `<button class="btn" onclick="showLessonPage(${lesson.id + 1})">Lesson ${lesson.id + 1} →</button>`
        : `<button class="btn" disabled style="opacity:0.5;">Next lesson coming soon</button>`;

    return `
    <div class="lesson-bottom-nav">
        ${prevBtn}
        ${nextBtn}
    </div>`;
}

// ---- Interactive Logic ----

function escapeForAttr(str) {
    return str.replace(/'/g, "\\'").replace(/"/g, '\\"');
}

function checkExercise(lessonId, exIndex, correctAnswer) {
    const input = document.getElementById(`ex-${lessonId}-${exIndex}`);
    const fb = document.getElementById(`fb-${lessonId}-${exIndex}`);
    if (!input || !fb) return;

    const userAnswer = input.value.trim().toLowerCase();
    const correct = correctAnswer.toLowerCase();

    if (!userAnswer) {
        fb.className = 'exercise-feedback incorrect';
        fb.innerHTML = '⚠️ Please type an answer first!';
        fb.style.display = 'block';
        return;
    }

    if (userAnswer === correct) {
        fb.className = 'exercise-feedback correct';
        fb.innerHTML = `✅ Correct! <strong>"${correctAnswer}"</strong> — Hienoa! (Great!)`;
        fb.style.display = 'block';
        input.style.borderColor = 'var(--accent-3)';
    } else {
        fb.className = 'exercise-feedback incorrect';
        fb.innerHTML = `❌ Not quite. You wrote "<em>${input.value}</em>". The correct answer is: <strong>"${correctAnswer}"</strong>. Try again!`;
        fb.style.display = 'block';
        input.style.borderColor = '#f5576c';
    }
}

function selectQuizOption(lessonId, qIndex, optIndex) {
    // Remove selected from siblings
    const lesson = LESSONS.find(l => l.id === lessonId);
    if (!lesson) return;
    for (let i = 0; i < lesson.quiz[qIndex].options.length; i++) {
        const el = document.getElementById(`qopt-${lessonId}-${qIndex}-${i}`);
        if (el) el.classList.remove('selected', 'correct-answer', 'wrong-answer');
    }
    const selected = document.getElementById(`qopt-${lessonId}-${qIndex}-${optIndex}`);
    if (selected) selected.classList.add('selected');
}

function submitQuiz(lessonId) {
    const lesson = LESSONS.find(l => l.id === lessonId);
    if (!lesson) return;
    let score = 0;

    lesson.quiz.forEach((q, qi) => {
        const radios = document.querySelectorAll(`input[name="quiz-${lessonId}-${qi}"]`);
        let selected = -1;
        radios.forEach((r, ri) => { if (r.checked) selected = ri; });

        const fb = document.getElementById(`qfb-${lessonId}-${qi}`);

        // Reset option styles
        for (let i = 0; i < q.options.length; i++) {
            const el = document.getElementById(`qopt-${lessonId}-${qi}-${i}`);
            if (el) el.classList.remove('correct-answer', 'wrong-answer', 'selected');
        }

        // Show correct
        const correctEl = document.getElementById(`qopt-${lessonId}-${qi}-${q.correct}`);
        if (correctEl) correctEl.classList.add('correct-answer');

        if (selected === q.correct) {
            score++;
            if (fb) { fb.className = 'exercise-feedback correct'; fb.innerHTML = '✅ Correct!'; fb.style.display = 'block'; }
        } else {
            if (selected >= 0) {
                const wrongEl = document.getElementById(`qopt-${lessonId}-${qi}-${selected}`);
                if (wrongEl) wrongEl.classList.add('wrong-answer');
            }
            if (fb) {
                fb.className = 'exercise-feedback incorrect';
                fb.innerHTML = selected === -1
                    ? `⚠️ You didn't answer. The correct answer is: <strong>${q.options[q.correct]}</strong>`
                    : `❌ The correct answer is: <strong>${q.options[q.correct]}</strong>`;
                fb.style.display = 'block';
            }
        }
    });

    // Show score
    const scoreDiv = document.getElementById(`quiz-score-${lessonId}`);
    const total = lesson.quiz.length;
    const passed = score >= Math.ceil(total * 0.8);
    scoreDiv.style.display = 'block';
    scoreDiv.innerHTML = `
        <div class="score-display">
            <div class="score-num" style="${passed ? '' : 'background:linear-gradient(135deg,#f5576c,#ff6a88);-webkit-background-clip:text;-webkit-text-fill-color:transparent;'}">${score}/${total}</div>
            <div class="score-label">${passed ? '🎉 Excellent! You passed!' : '📖 Review the lesson and try again.'}</div>
            ${!passed && score < Math.ceil(total * 0.8) ? '<p style="margin-top:12px;color:var(--text-secondary);font-size:0.85rem;">You need at least ' + Math.ceil(total * 0.8) + '/' + total + ' to pass.</p>' : ''}
        </div>
    `;

    // Save score
    const progress = getProgress();
    if (!progress.scores) progress.scores = {};
    progress.scores[lessonId] = score;
    saveProgress(progress);
}

function saveWriting(lessonId) {
    const wa = document.getElementById('writing-area');
    if (!wa) return;
    const progress = getProgress();
    if (!progress.writing) progress.writing = {};
    progress.writing[lessonId] = wa.value;
    saveProgress(progress);

    const status = document.getElementById('writing-status');
    if (status) {
        status.textContent = '✅ Your writing has been saved!';
        status.classList.add('show');
        setTimeout(() => status.classList.remove('show'), 3000);
    }
}

function clearWriting(lessonId) {
    const wa = document.getElementById('writing-area');
    if (wa) wa.value = '';
    const progress = getProgress();
    if (progress.writing) { delete progress.writing[lessonId]; saveProgress(progress); }
}

function toggleChecklist(lessonId, index, checked) {
    const progress = getProgress();
    if (!progress.checklist) progress.checklist = {};
    if (!progress.checklist[lessonId]) progress.checklist[lessonId] = {};
    progress.checklist[lessonId][index] = checked;
    saveProgress(progress);

    const label = document.getElementById(`cl-${lessonId}-${index}`);
    if (label) { checked ? label.classList.add('checked') : label.classList.remove('checked'); }
}

function restoreChecklist(lessonId, progress) {
    if (!progress.checklist || !progress.checklist[lessonId]) return;
    Object.keys(progress.checklist[lessonId]).forEach(i => {
        const label = document.getElementById(`cl-${lessonId}-${i}`);
        if (label && progress.checklist[lessonId][i]) label.classList.add('checked');
    });
}

// ---- Auto-save writing on typing ----
document.addEventListener('input', function (e) {
    if (e.target && e.target.id === 'writing-area' && currentLessonId) {
        const progress = getProgress();
        if (!progress.writing) progress.writing = {};
        progress.writing[currentLessonId] = e.target.value;
        saveProgress(progress);
    }
});
