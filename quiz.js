/* =====================================================
   quiz.js
   Runs the "Which website do you need?" quiz.

   How it works, in plain words:
   1. Every answer in quiz.html carries points
      (data-landing, data-business, data-redesign).
   2. When the person finishes, we add up the points.
   3. The package with the most points is shown as the answer.
   4. If two packages tie, Business Website wins.
   ===================================================== */

// The three possible answers. Change the words here any time.
const packages = {
  business: {
    title: 'Business Website',
    need: 'Business Website', // must match the option text in the contact form
    why: 'You want people to understand your whole business, so a few well-made pages will serve you better than one.',
    points: [
      'Home, About, Services and Contact pages',
      'Designed for you, not copied from a template',
      'Works well on phones, tablets and desktops',
    ],
  },
  landing: {
    title: 'Landing Page',
    need: 'Landing Page',
    why: 'You have one clear thing to promote, so one focused page that makes the next step obvious is the best fit.',
    points: [
      'One focused page with a clear next step',
      'A contact form that lands in your inbox',
      'Ready in about 1 to 2 weeks',
    ],
  },
  redesign: {
    title: 'Redesign',
    need: 'Redesign of current website',
    why: 'You already have a website that is not working for you, so we keep what works and fix what confuses people.',
    points: [
      'Cleaner layout and faster loading',
      'Mobile-friendly on every page',
      'Timeline agreed after I see your current site',
    ],
  },
};

// Grab the parts of the page we need to control.
const form = document.getElementById('quizForm');
const panels = form.querySelectorAll('fieldset');
const stepText = document.getElementById('quizStep');
const bar = document.getElementById('quizBar');
const backBtn = document.getElementById('quizBack');
const nextBtn = document.getElementById('quizNext');
const result = document.getElementById('quizResult');

let current = 0; // 0 = first question

// Show only the current question and update the buttons.
function showStep() {
  panels.forEach(function (panel, i) {
    panel.hidden = i !== current;
  });
  stepText.textContent = 'Question ' + (current + 1) + ' of ' + panels.length;
  bar.style.width = ((current + 1) / panels.length) * 100 + '%';
  backBtn.hidden = current === 0;
  nextBtn.textContent = current === panels.length - 1 ? 'See my answer' : 'Next';
  // "Next" works only after an answer is chosen on this question.
  nextBtn.disabled = !panels[current].querySelector('input:checked');
}

// When someone picks an answer, allow them to continue.
form.addEventListener('change', function () {
  nextBtn.disabled = false;
});

backBtn.addEventListener('click', function () {
  if (current > 0) {
    current--;
    showStep();
  }
});

nextBtn.addEventListener('click', function () {
  if (current < panels.length - 1) {
    current++;
    showStep();
  } else {
    showResult();
  }
});

// Add up the points and show the winning package.
function showResult() {
  const totals = { business: 0, landing: 0, redesign: 0 };

  form.querySelectorAll('input:checked').forEach(function (input) {
    Object.keys(totals).forEach(function (key) {
      totals[key] += Number(input.dataset[key] || 0);
    });
  });

  // Start with business, so it wins any tie.
  let winner = 'business';
  Object.keys(totals).forEach(function (key) {
    if (totals[key] > totals[winner]) winner = key;
  });

  const pkg = packages[winner];
  document.getElementById('resultTitle').textContent = 'You need: ' + pkg.title;
  document.getElementById('resultWhy').textContent = pkg.why;

  const list = document.getElementById('resultPoints');
  list.textContent = '';
  pkg.points.forEach(function (point) {
    const li = document.createElement('li');
    li.textContent = point;
    list.appendChild(li);
  });

  // The button opens the contact form with this package already selected.
  document.getElementById('resultLink').href =
    'contact.html?need=' + encodeURIComponent(pkg.need);

  form.hidden = true;
  result.hidden = false;
  result.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// "Start again" clears everything and goes back to question 1.
document.getElementById('quizAgain').addEventListener('click', function () {
  form.reset();
  current = 0;
  result.hidden = true;
  form.hidden = false;
  showStep();
});

showStep();