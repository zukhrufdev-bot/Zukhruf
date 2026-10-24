/* =====================================================
   reviews.js
   Add a client review by copying one block inside the
   list below, filling it in, and keeping the commas.

   Only add reviews the client has allowed you to show.
   While the list is empty, the Reviews section stays
   hidden on the home page.
   ===================================================== */

const reviews = [
  // Example (remove the // at the start of each line to try it):
  // {
  //   name: "Client name",
  //   business: "Their business",
  //   rating: 5,
  //   text: "Write the client's own words here."
  // },
];

(function () {
  const section = document.getElementById('reviews');
  const list = document.getElementById('reviewList');
  if (!section || !list || !reviews.length) return;

  reviews.forEach(function (r) {
    const rating = Math.max(1, Math.min(5, Number(r.rating) || 5));

    const card = document.createElement('article');
    card.className = 'review-card';

    const stars = document.createElement('div');
    stars.className = 'review-stars';
    stars.textContent = '★'.repeat(rating) + '☆'.repeat(5 - rating);
    stars.setAttribute('role', 'img');
    stars.setAttribute('aria-label', rating + ' out of 5 stars');

    const text = document.createElement('p');
    text.className = 'review-text';
    text.textContent = r.text;

    const by = document.createElement('p');
    by.className = 'review-by';
    by.textContent = r.name;
    if (r.business) {
      const biz = document.createElement('span');
      biz.textContent = r.business;
      by.appendChild(biz);
    }

    card.appendChild(stars);
    card.appendChild(text);
    card.appendChild(by);
    list.appendChild(card);
  });

  section.hidden = false;
})();