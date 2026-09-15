/* =====================================================
   HARSH GARDEN
   COMPLETE HOTEL + RESTAURANT BOOKING SYSTEM
   WhatsApp: 919288104425
===================================================== */

const WHATSAPP_NUMBER = "919288104425";

/* =====================================================
   FOOD DATABASE
===================================================== */

const food = [
  {
    name: "Paneer Tikka",
    category: "starter",
    price: 260,
    icon: "🍢",
    desc: "Smoky cottage cheese with spices"
  },
  {
    name: "Chicken Tikka",
    category: "starter",
    price: 320,
    icon: "🍗",
    desc: "Char-grilled chicken, house marinade"
  },
  {
    name: "Veg Biryani",
    category: "main",
    price: 240,
    icon: "🍛",
    desc: "Fragrant basmati rice & vegetables"
  },
  {
    name: "Chicken Biryani",
    category: "main",
    price: 320,
    icon: "🍗",
    desc: "Aromatic biryani with tender chicken"
  },
  {
    name: "Butter Naan",
    category: "bread",
    price: 55,
    icon: "🫓",
    desc: "Soft tandoori naan with butter"
  },
  {
    name: "Garlic Naan",
    category: "bread",
    price: 75,
    icon: "🫓",
    desc: "Garlic, coriander & butter"
  },
  {
    name: "Masala Dosa",
    category: "main",
    price: 180,
    icon: "🥞",
    desc: "Crispy dosa with sambar & chutney"
  },
  {
    name: "Cold Drink",
    category: "drink",
    price: 60,
    icon: "🥤",
    desc: "Chilled soft drink"
  },
  {
    name: "Fresh Lime",
    category: "drink",
    price: 80,
    icon: "🍋",
    desc: "Fresh lime, mint & soda"
  },
  {
    name: "Dal Makhani",
    category: "main",
    price: 220,
    icon: "🍲",
    desc: "Slow-cooked creamy black lentils"
  },
  {
    name: "French Fries",
    category: "starter",
    price: 140,
    icon: "🍟",
    desc: "Crispy salted fries"
  },
  {
    name: "Ice Cream",
    category: "drink",
    price: 120,
    icon: "🍨",
    desc: "Chef's assorted scoop"
  }
];

/* =====================================================
   ROOMS
===================================================== */

const rooms = [
  {
    name: "Deluxe Room",
    price: 2200,
    icon: "🛏️",
    facilities: "AC • TV • Wi-Fi • Attached Bathroom"
  },
  {
    name: "Premium Room",
    price: 3000,
    icon: "🛋️",
    facilities: "AC • LED TV • Wi-Fi • Hot Water • Room Service"
  },
  {
    name: "Family Room",
    price: 3800,
    icon: "🛏️",
    facilities: "Spacious • TV • Wi-Fi • Attached Bathroom"
  }
];

/* =====================================================
   CART
===================================================== */

let cart = [];

/* =====================================================
   DOM ELEMENTS
===================================================== */

const foodGrid = document.getElementById("foodGrid");
const roomCards = document.getElementById("roomCards");
const toast = document.getElementById("toast");
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modalContent");

/* =====================================================
   WHATSAPP
===================================================== */

function sendToWhatsApp(message) {

  const url =
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank");
}

/* =====================================================
   HELPERS
===================================================== */

function safe(id) {
  return document.getElementById(id);
}

function esc(value) {

  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/* =====================================================
   TOAST
===================================================== */

function showToast(text) {

  if (!toast) return;

  toast.textContent = text;

  toast.classList.add("show");

  clearTimeout(window.toastTimer);

  window.toastTimer = setTimeout(() => {

    toast.classList.remove("show");

  }, 3200);
}

/* =====================================================
   MODAL
===================================================== */

function openModal() {

  if (modal) {
    modal.classList.add("show");
  }
}

function closeModal() {

  if (modal) {
    modal.classList.remove("show");
  }
}

/* =====================================================
   FOOD RENDER
===================================================== */

function renderFood(category = "all") {

  if (!foodGrid) return;

  foodGrid.innerHTML = food
    .filter(item =>
      category === "all" ||
      item.category === category
    )
    .map(item => {

      const index = food.indexOf(item);

      return `
        <article class="food-card">

          <div class="food-art">
            <span>${item.icon}</span>
          </div>

          <div class="food-info">

            <h3>${esc(item.name)}</h3>

            <p>${esc(item.desc)}</p>

            <div class="food-bottom">

              <span class="price">
                ₹${item.price}
              </span>

              <button
                type="button"
                class="add"
                onclick="addToCart(${index})"
              >
                + Add
              </button>

            </div>

          </div>

        </article>
      `;

    })
    .join("");
}

/* =====================================================
   CART COUNT
===================================================== */

function getCartCount() {

  return cart.reduce(
    (sum, item) => sum + item.qty,
    0
  );
}

/* =====================================================
   CART TOTAL
===================================================== */

function getCartTotal() {

  return cart.reduce(
    (sum, item) =>
      sum + (item.price * item.qty),
    0
  );
}

/* =====================================================
   ADD TO CART
===================================================== */

function addToCart(index) {

  const item = food[index];

  if (!item) return;

  const existing =
    cart.find(x => x.name === item.name);

  if (existing) {

    existing.qty++;

  } else {

    cart.push({
      ...item,
      qty: 1
    });

  }

  showToast(
    `${item.name} added • ${getCartCount()} item(s) in cart`
  );

  /* IMPORTANT:
     Show floating cart/order button
     instead of opening modal immediately.
  */

  showCartButton();
}

/* =====================================================
   FLOATING CART / ORDER NOW BUTTON
===================================================== */

function showCartButton() {

  let cartButton =
    document.getElementById("floatingCartButton");

  if (!cartButton) {

    cartButton =
      document.createElement("button");

    cartButton.id =
      "floatingCartButton";

    cartButton.type =
      "button";

    cartButton.onclick =
      openCart;

    document.body.appendChild(
      cartButton
    );
  }

  cartButton.innerHTML = `

    <span>
      🛒 View Cart
    </span>

    <span
      style="
        background:#fff;
        color:#111;
        padding:3px 9px;
        border-radius:20px;
        font-weight:800;
        margin-left:6px;
      "
    >
      ${getCartCount()}
    </span>

    <span
      style="
        margin-left:8px;
      "
    >
      • Order Now
    </span>

  `;

  cartButton.style.cssText = `

    position:fixed;

    left:50%;

    bottom:22px;

    transform:translateX(-50%);

    z-index:99999;

    border:none;

    padding:14px 22px;

    border-radius:999px;

    background:#111827;

    color:#ffffff;

    font-size:16px;

    font-weight:700;

    cursor:pointer;

    box-shadow:
      0 12px 35px rgba(0,0,0,.30);

    display:flex;

    align-items:center;

    justify-content:center;

    white-space:nowrap;

  `;
}

/* =====================================================
   HIDE FLOATING CART BUTTON
===================================================== */

function hideCartButton() {

  const cartButton =
    document.getElementById(
      "floatingCartButton"
    );

  if (cartButton) {

    cartButton.remove();

  }
}

/* =====================================================
   CHANGE CART QUANTITY
===================================================== */

function changeCartQty(index, change) {

  if (!cart[index]) return;

  cart[index].qty += change;

  if (cart[index].qty <= 0) {

    cart.splice(index, 1);

  }

  if (!cart.length) {

    closeModal();

    hideCartButton();

    showToast(
      "Your cart is empty."
    );

    return;
  }

  showCartButton();

  openCart();
}

/* =====================================================
   REMOVE CART ITEM
===================================================== */

function removeCartItem(index) {

  if (!cart[index]) return;

  const name =
    cart[index].name;

  cart.splice(index, 1);

  if (!cart.length) {

    closeModal();

    hideCartButton();

    showToast(
      `${name} removed. Cart is empty.`
    );

    return;
  }

  showCartButton();

  openCart();
}

/* =====================================================
   OPEN CART
===================================================== */

function openCart() {

  if (!cart.length) {

    showToast(
      "Your cart is empty."
    );

    hideCartButton();

    return;
  }

  const total =
    getCartTotal();

  modalContent.innerHTML = `

    <span class="eyebrow">
      FOOD ORDER
    </span>

    <h2>
      Your Order
    </h2>

    <div class="cart-items">

      ${cart.map((item, index) => `

        <div
          class="cart-line"
          style="
            display:flex;
            align-items:center;
            justify-content:space-between;
            gap:12px;
            margin:10px 0;
          "
        >

          <div>

            <strong>
              ${esc(item.name)}
            </strong>

            <div
              style="
                font-size:.9rem;
                opacity:.75;
              "
            >
              ₹${item.price} each
            </div>

          </div>

          <div
            style="
              display:flex;
              align-items:center;
              gap:7px;
            "
          >

            <button
              type="button"
              class="add"
              onclick="changeCartQty(${index}, -1)"
            >
              −
            </button>

            <b
              style="
                min-width:22px;
                text-align:center;
              "
            >
              ${item.qty}
            </b>

            <button
              type="button"
              class="add"
              onclick="changeCartQty(${index}, 1)"
            >
              +
            </button>

            <button
              type="button"
              class="add"
              onclick="removeCartItem(${index})"
              title="Remove"
            >
              ✕
            </button>

          </div>

          <b>
            ₹${item.price * item.qty}
          </b>

        </div>

      `).join("")}

    </div>

    <div
      class="total"
      style="
        display:flex;
        justify-content:space-between;
        margin-top:15px;
      "
    >

      <strong>
        Total
      </strong>

      <strong>
        ₹${total}
      </strong>

    </div>

    <div class="demo-note">

      Payment gateway is OFF.
      Your order request will be sent
      to Harsh Garden on WhatsApp.

    </div>

    <div class="form-grid">

      <input
        id="custName"
        class="full"
        placeholder="Customer Name *"
      >

      <input
        id="custMobile"
        placeholder="Mobile Number *"
        inputmode="numeric"
      >

      <input
        id="custAddress"
        class="full"
        placeholder="Room / Table / Delivery Address *"
      >

    </div>

    <button
      type="button"
      class="btn primary"
      style="
        width:100%;
        margin-top:15px
      "
      onclick="placeDemoOrder()"
    >
      📲 Order on WhatsApp
    </button>

  `;

  openModal();
}

/* =====================================================
   FOOD ORDER → WHATSAPP
===================================================== */

function placeDemoOrder() {

  const name =
    safe("custName")?.value.trim();

  const mobile =
    safe("custMobile")?.value.trim();

  const address =
    safe("custAddress")?.value.trim();

  if (
    !name ||
    !mobile ||
    !address
  ) {

    showToast(
      "Please fill all required details."
    );

    return;
  }

  if (!cart.length) {

    showToast(
      "Your cart is empty."
    );

    return;
  }

  const total =
    getCartTotal();

  let message =
`🍽️ *HARSH GARDEN - NEW FOOD ORDER*

👤 Customer: ${name}
📱 Mobile: ${mobile}
📍 Room / Table / Address: ${address}

🛒 *ORDER DETAILS*
`;

  cart.forEach(item => {

    message +=
      `• ${item.name} × ${item.qty} = ₹${item.price * item.qty}\n`;

  });

  message +=
`
💰 *TOTAL: ₹${total}*

Please confirm my order.

Thank you!
`;

  sendToWhatsApp(message);

  cart = [];

  hideCartButton();

  closeModal();

  showToast(
    "✓ Order details opened in WhatsApp."
  );
}

/* =====================================================
   ROOM RENDER
===================================================== */

function renderRooms() {

  if (!roomCards) return;

  roomCards.innerHTML =
    rooms.map((room, index) => `

      <article class="room-card">

        <div class="room-art">

          <span>
            ${room.icon}
          </span>

        </div>

        <div class="room-info">

          <h3>
            ${esc(room.name)}
          </h3>

          <small>
            ${esc(room.facilities)}
          </small>

          <div class="room-price">

            <span class="price">

              ₹${room.price}

              <small>
                /night
              </small>

            </span>

            <button
              type="button"
              class="add"
              onclick="openRoom(${index})"
            >
              Book
            </button>

          </div>

        </div>

      </article>

    `).join("");
}

/* =====================================================
   ROOM BOOKING FORM
===================================================== */

function openRoom(index) {

  const room =
    rooms[index];

  if (!room) return;

  modalContent.innerHTML = `

    <span class="eyebrow">
      ROOM BOOKING
    </span>

    <h2>
      ${esc(room.name)}
    </h2>

    <p>
      ${esc(room.facilities)}
    </p>

    <div class="demo-note">

      Select your exact date,
      time and shift.
      Booking request will be sent
      to Harsh Garden on WhatsApp.

    </div>

    <div class="form-grid">

      <input
        id="roomName"
        class="full"
        placeholder="Guest Full Name *"
      >

      <input
        id="roomMobile"
        placeholder="Mobile Number *"
        inputmode="numeric"
      >

      <input
        id="roomGuests"
        type="number"
        min="1"
        placeholder="Number of Guests *"
      >

      <select id="roomShift">

        <option value="">
          Select Shift *
        </option>

        <option>
          Day Shift
        </option>

        <option>
          Night Shift
        </option>

        <option>
          24 Hours
        </option>

      </select>

      <input
        type="date"
        id="checkInDate"
      >

      <input
        type="date"
        id="checkOutDate"
      >

      <input
        type="time"
        id="roomStartTime"
      >

      <input
        type="time"
        id="roomEndTime"
      >

      <input
        id="roomHours"
        type="number"
        min="1"
        placeholder="Required Hours *"
      >

      <input
        id="roomAddress"
        class="full"
        placeholder="Customer Address *"
      >

      <textarea
        id="roomNote"
        class="full"
        rows="3"
        placeholder="Special Request (optional)"
      ></textarea>

    </div>

    <button
      type="button"
      class="btn primary"
      style="
        width:100%;
        margin-top:15px
      "
      onclick="submitRoom('${esc(room.name)}')"
    >
      📲 Book Room on WhatsApp
    </button>

  `;

  openModal();
}

/* =====================================================
   SUBMIT ROOM BOOKING
===================================================== */

function submitRoom(roomName) {

  const name =
    safe("roomName")?.value.trim();

  const mobile =
    safe("roomMobile")?.value.trim();

  const guests =
    safe("roomGuests")?.value.trim();

  const shift =
    safe("roomShift")?.value;

  const checkInDate =
    safe("checkInDate")?.value;

  const checkOutDate =
    safe("checkOutDate")?.value;

  const startTime =
    safe("roomStartTime")?.value;

  const endTime =
    safe("roomEndTime")?.value;

  const hours =
    safe("roomHours")?.value.trim();

  const address =
    safe("roomAddress")?.value.trim();

  const note =
    safe("roomNote")?.value.trim();

  if (
    !name ||
    !mobile ||
    !guests ||
    !shift ||
    !checkInDate ||
    !checkOutDate ||
    !startTime ||
    !endTime ||
    !hours ||
    !address
  ) {

    showToast(
      "Please fill all required room booking details."
    );

    return;
  }

  const room =
    rooms.find(
      r => r.name === roomName
    );

  const message =
`🛏️ *HARSH GARDEN - ROOM BOOKING REQUEST*

🏨 Room: ${roomName}

👤 Guest Name: ${name}
📱 Mobile: ${mobile}
👥 Guests: ${guests}

📅 Check-in Date: ${checkInDate}
📅 Check-out Date: ${checkOutDate}

🕐 Start Time: ${startTime}
🕐 End Time: ${endTime}
⏱️ Required Hours: ${hours}
🌞 Shift: ${shift}

📍 Customer Address:
${address}

📝 Special Request:
${note || "None"}

💰 Listed Room Rate:
₹${room ? room.price : "N/A"} / night

Please confirm availability and booking.

Thank you!
`;

  sendToWhatsApp(message);

  closeModal();

  showToast(
    "✓ Room booking details opened in WhatsApp."
  );
}

/* =====================================================
   BANQUET BOOKING
===================================================== */

function openBanquet() {

  modalContent.innerHTML = `

    <span class="eyebrow">
      BANQUET / WEDDING HALL
    </span>

    <h2>
      Plan Your Celebration
    </h2>

    <p>
      Tell us about your event
      and send the complete request
      to Harsh Garden on WhatsApp.
    </p>

    <div class="demo-note">

      Available event purposes include
      Wedding, Birthday, Sagun/Tilak,
      Reception and more.

    </div>

    <div class="form-grid">

      <input
        id="eventName"
        placeholder="Customer Full Name *"
      >

      <input
        id="eventMobile"
        placeholder="Mobile Number *"
        inputmode="numeric"
      >

      <input
        id="eventAddress"
        class="full"
        placeholder="Full Address *"
      >

      <select
        id="eventPurpose"
        class="full"
      >

        <option value="">
          Select Event Purpose *
        </option>

        <option>
          Wedding
        </option>

        <option>
          Birthday Party
        </option>

        <option>
          Sagun / Tilak
        </option>

        <option>
          Reception
        </option>

        <option>
          Engagement
        </option>

        <option>
          Anniversary
        </option>

        <option>
          Corporate Event
        </option>

        <option>
          Other Event
        </option>

      </select>

      <input
        type="date"
        id="eventDate"
      >

      <input
        type="number"
        id="guestCount"
        min="1"
        placeholder="Expected Guests *"
      >

      <input
        type="time"
        id="eventStartTime"
      >

      <input
        type="time"
        id="eventEndTime"
      >

      <select id="eventShift">

        <option value="">
          Select Shift *
        </option>

        <option>
          Day Shift
        </option>

        <option>
          Evening Shift
        </option>

        <option>
          Night Shift
        </option>

      </select>

      <select id="hallType">

        <option>
          Wedding Hall
        </option>

        <option>
          Birthday / Party Hall
        </option>

        <option>
          Banquet Hall
        </option>

      </select>

      <textarea
        id="eventRequirements"
        class="full"
        rows="4"
        placeholder="Special Requirements: decoration, catering, stage, DJ, seating, etc."
      ></textarea>

    </div>

    <button
      type="button"
      class="btn primary"
      style="
        width:100%;
        margin-top:15px
      "
      onclick="submitBanquet()"
    >
      📲 Send Banquet Request on WhatsApp
    </button>

  `;

  openModal();
}

/* =====================================================
   SUBMIT BANQUET
===================================================== */

function submitBanquet() {

  const name =
    safe("eventName")?.value.trim();

  const mobile =
    safe("eventMobile")?.value.trim();

  const address =
    safe("eventAddress")?.value.trim();

  const purpose =
    safe("eventPurpose")?.value;

  const eventDate =
    safe("eventDate")?.value;

  const guestCount =
    safe("guestCount")?.value.trim();

  const startTime =
    safe("eventStartTime")?.value;

  const endTime =
    safe("eventEndTime")?.value;

  const shift =
    safe("eventShift")?.value;

  const hallType =
    safe("hallType")?.value;

  const requirements =
    safe("eventRequirements")?.value.trim();

  if (
    !name ||
    !mobile ||
    !address ||
    !purpose ||
    !eventDate ||
    !guestCount ||
    !startTime ||
    !endTime ||
    !shift
  ) {

    showToast(
      "Please complete all required banquet details."
    );

    return;
  }

  const message =
`🏛️ *HARSH GARDEN - BANQUET BOOKING REQUEST*

👤 Customer Name: ${name}
📱 Mobile: ${mobile}

📍 Address:
${address}

🎉 Event Purpose: ${purpose}
🏛️ Hall Type: ${hallType}

📅 Event Date: ${eventDate}
🕐 Start Time: ${startTime}
🕐 End Time: ${endTime}
🌙 Shift: ${shift}

👥 Expected Guests: ${guestCount}

📝 Special Requirements:
${requirements || "None"}

Please confirm hall availability,
price and booking.

Thank you!
`;

  sendToWhatsApp(message);

  closeModal();

  showToast(
    "✓ Banquet request opened in WhatsApp."
  );
}

/* =====================================================
   QR TABLE SYSTEM
===================================================== */

function simulateQR(
  tableNumber = "TABLE 07"
) {

  modalContent.innerHTML = `

    <span class="eyebrow">
      SMART TABLE QR
    </span>

    <h2>
      ${esc(tableNumber)}
    </h2>

    <div
      style="
        margin:20px auto;
        width:210px;
        height:210px;
        border-radius:24px;
        display:flex;
        align-items:center;
        justify-content:center;
        background:
          repeating-linear-gradient(
            45deg,
            #111 0 6px,
            #fff 6px 12px
          );
        box-shadow:
          0 20px 45px rgba(0,0,0,.25);
      "
    >

      <div
        style="
          width:155px;
          height:155px;
          background:#fff;
          border-radius:12px;
          display:flex;
          align-items:center;
          justify-content:center;
          font-size:72px;
        "
      >
        ▦
      </div>

    </div>

    <p>

      Scan the real QR code on the
      table to open the food menu.

      This visual is only the
      website demo representation.

    </p>

    <button
      type="button"
      class="btn primary"
      onclick="
        closeModal();
        document.querySelector('#food')
          ?.scrollIntoView({
            behavior:'smooth'
          })
      "
    >
      Browse Menu
    </button>

  `;

  openModal();
}

/* =====================================================
   FOOD FILTER BUTTONS
===================================================== */

document
  .querySelectorAll(".filter")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        document
          .querySelectorAll(".filter")
          .forEach(btn => {

            btn.classList.remove(
              "active"
            );

          });

        button.classList.add(
          "active"
        );

        renderFood(
          button.dataset.category
        );

      }
    );

  });

/* =====================================================
   SERVICE SCROLL BUTTONS
===================================================== */

document
  .querySelectorAll("[data-scroll]")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        const target =
          document.querySelector(
            button.dataset.scroll
          );

        if (target) {

          target.scrollIntoView({
            behavior: "smooth"
          });

        }

      }
    );

  });

/* =====================================================
   BANQUET BUTTON
===================================================== */

const banquetBtn =
  safe("banquetBtn");

if (banquetBtn) {

  banquetBtn.addEventListener(
    "click",
    openBanquet
  );

}

/* =====================================================
   QR BUTTON
===================================================== */

const qrBtn =
  safe("qrBtn");

if (qrBtn) {

  qrBtn.addEventListener(
    "click",
    () => simulateQR("TABLE 07")
  );

}

/* =====================================================
   CLOSE MODAL BUTTON
===================================================== */

const closeBtn =
  safe("closeModal");

if (closeBtn) {

  closeBtn.addEventListener(
    "click",
    closeModal
  );

}

/* =====================================================
   CLICK OUTSIDE MODAL
===================================================== */

if (modal) {

  modal.addEventListener(
    "click",
    event => {

      if (
        event.target === modal
      ) {

        closeModal();

      }

    }
  );

}

/* =====================================================
   HEADER CART BUTTON
===================================================== */

document
  .querySelectorAll("[data-cart]")
  .forEach(button => {

    button.addEventListener(
      "click",
      openCart
    );

  });

/* =====================================================
   MOBILE MENU
===================================================== */

const menuBtn =
  safe("menuBtn");

const nav =
  safe("nav");

if (
  menuBtn &&
  nav
) {

  menuBtn.addEventListener(
    "click",
    () => {

      nav.classList.toggle(
        "open"
      );

    }
  );

}

/* =====================================================
   ESCAPE KEY
===================================================== */

document.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Escape"
    ) {

      closeModal();

    }

  }
);

/* =====================================================
   HERO FOOD CARD
===================================================== */

const cardFood =
  document.querySelector(
    ".card-food"
  );

if (cardFood) {

  cardFood.addEventListener(
    "click",
    () => {

      document
        .querySelector("#food")
        ?.scrollIntoView({
          behavior: "smooth"
        });

    }
  );

}

/* =====================================================
   HERO ROOM CARD
===================================================== */

const cardRoom =
  document.querySelector(
    ".card-room"
  );

if (cardRoom) {

  cardRoom.addEventListener(
    "click",
    () => {

      document
        .querySelector("#rooms")
        ?.scrollIntoView({
          behavior: "smooth"
        });

    }
  );

}

/* =====================================================
   HERO WEDDING CARD
===================================================== */

const cardWed =
  document.querySelector(
    ".card-wed"
  );

if (cardWed) {

  cardWed.addEventListener(
    "click",
    openBanquet
  );

}

/* =====================================================
   INITIALIZE WEBSITE
===================================================== */

renderFood();

renderRooms();

/* =====================================================
   IMPORTANT

   This script opens WhatsApp with a
   pre-filled message.

   Customer must press SEND
   in WhatsApp.

===================================================== */
