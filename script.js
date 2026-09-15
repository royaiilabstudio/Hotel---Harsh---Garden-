/* =====================================================
   HARSH GARDEN
   COMPLETE HOTEL + RESTAURANT BOOKING SYSTEM
   WhatsApp: 919288104425
===================================================== */


/* ================= WHATSAPP ================= */

const WHATSAPP_NUMBER = "919288104425";

function sendToWhatsApp(message) {
  const url =
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank");
}


/* ================= FOOD DATABASE ================= */

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


/* ================= ROOMS ================= */

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


/* ================= CART ================= */

let cart = [];


/* ================= ELEMENTS ================= */

const foodGrid = document.getElementById("foodGrid");

const roomCards = document.getElementById("roomCards");

const toast = document.getElementById("toast");

const modal = document.getElementById("modal");

const modalContent = document.getElementById("modalContent");


/* ================= HELPERS ================= */

function getElement(id) {
  return document.getElementById(id);
}


function showToast(text) {

  if (!toast) return;

  toast.textContent = text;

  toast.classList.add("show");

  clearTimeout(window.toastTimer);

  window.toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 3200);

}


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


/* ================= FOOD RENDER ================= */

function renderFood(category = "all") {

  if (!foodGrid) return;

  foodGrid.innerHTML = food
    .filter(item => {

      return category === "all" ||
             item.category === category;

    })
    .map(item => {

      const index = food.indexOf(item);

      return `

        <article class="food-card">

          <div class="food-art">

            <span>
              ${item.icon}
            </span>

          </div>

          <div class="food-info">

            <h3>
              ${item.name}
            </h3>

            <p>
              ${item.desc}
            </p>

            <div class="food-bottom">

              <span class="price">
                ₹${item.price}
              </span>

              <button
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


/* ================= CART COUNT ================= */

function getCartCount() {

  return cart.reduce(
    (sum, item) => sum + item.qty,
    0
  );

}


/* ================= CART TOTAL ================= */

function getCartTotal() {

  return cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

}


/* ================= ADD TO CART ================= */

function addToCart(index) {

  const item = food[index];

  if (!item) return;

  const existing = cart.find(
    x => x.name === item.name
  );

  if (existing) {

    existing.qty++;

  } else {

    cart.push({
      ...item,
      qty: 1
    });

  }

  /*
    IMPORTANT:
    Cart will NOT open automatically.

    Customer can continue selecting
    multiple food items first.
  */

  showToast(
    `${item.name} added • ` +
    `${getCartCount()} item(s) in cart`
  );

}


/* ================= PLUS / MINUS ================= */

function changeCartQty(index, change) {

  if (!cart[index]) return;

  cart[index].qty += change;

  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }

  if (!cart.length) {

    closeModal();

    showToast("Your cart is empty.");

    return;

  }

  openCart();

}


/* ================= REMOVE ITEM ================= */

function removeCartItem(index) {

  if (!cart[index]) return;

  const itemName = cart[index].name;

  cart.splice(index, 1);

  if (!cart.length) {

    closeModal();

    showToast(
      `${itemName} removed. Cart is empty.`
    );

    return;

  }

  openCart();

}


/* ================= OPEN CART ================= */

function openCart() {

  if (!cart.length) {

    showToast("Your cart is empty.");

    return;

  }

  const total = getCartTotal();

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
            margin:12px 0;
          "
        >

          <div>

            <strong>
              ${item.name}
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

      Select all your food items first.
      Then review your cart and place
      the final order on WhatsApp.

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


/* ================= FOOD ORDER ================= */

function placeDemoOrder() {

  const name =
    getElement("custName")?.value.trim();

  const mobile =
    getElement("custMobile")?.value.trim();

  const address =
    getElement("custAddress")?.value.trim();

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

  const total = getCartTotal();

  let message =
`🍽️ *HARSH GARDEN - NEW FOOD ORDER*

👤 Customer Name:
${name}

📱 Mobile:
${mobile}

📍 Room / Table / Address:
${address}

🛒 *ORDER DETAILS*

`;

  cart.forEach(item => {

    message +=
      `• ${item.name} × ${item.qty} = ₹${item.price * item.qty}\n`;

  });

  message +=
`
💰 *TOTAL AMOUNT: ₹${total}*

Please confirm my food order.

Thank you!
`;

  sendToWhatsApp(message);

  cart = [];

  closeModal();

  showToast(
    "✓ Order details opened in WhatsApp."
  );

}


/* ================= ROOM RENDER ================= */

function renderRooms() {

  if (!roomCards) return;

  roomCards.innerHTML =
    rooms.map((room, index) => {

      return `

        <article class="room-card">

          <div class="room-art">

            <span>
              ${room.icon}
            </span>

          </div>

          <div class="room-info">

            <h3>
              ${room.name}
            </h3>

            <small>
              ${room.facilities}
            </small>

            <div class="room-price">

              <span class="price">

                ₹${room.price}

                <small>
                  /night
                </small>

              </span>

              <button
                class="add"
                onclick="openRoom(${index})"
              >
                Book
              </button>

            </div>

          </div>

        </article>

      `;

    })
    .join("");

}


/* ================= ROOM BOOKING FORM ================= */

function openRoom(index) {

  const room = rooms[index];

  if (!room) return;

  modalContent.innerHTML = `

    <span class="eyebrow">
      ROOM BOOKING
    </span>

    <h2>
      ${room.name}
    </h2>

    <p>
      ${room.facilities}
    </p>

    <div class="demo-note">

      Select your exact date,
      time and shift.

      Your booking request will be
      sent to Harsh Garden on WhatsApp.

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
        placeholder="Customer Full Address *"
      >

      <textarea
        id="roomNote"
        class="full"
        rows="3"
        placeholder="Special Request (optional)"
      ></textarea>

    </div>

    <button
      class="btn primary"
      style="
        width:100%;
        margin-top:15px
      "
      onclick="submitRoom('${room.name}')"
    >
      📲 Book Room on WhatsApp
    </button>

  `;

  openModal();

}


/* ================= SUBMIT ROOM ================= */

function submitRoom(roomName) {

  const name =
    getElement("roomName")?.value.trim();

  const mobile =
    getElement("roomMobile")?.value.trim();

  const guests =
    getElement("roomGuests")?.value.trim();

  const shift =
    getElement("roomShift")?.value;

  const checkInDate =
    getElement("checkInDate")?.value;

  const checkOutDate =
    getElement("checkOutDate")?.value;

  const startTime =
    getElement("roomStartTime")?.value;

  const endTime =
    getElement("roomEndTime")?.value;

  const hours =
    getElement("roomHours")?.value.trim();

  const address =
    getElement("roomAddress")?.value.trim();

  const note =
    getElement("roomNote")?.value.trim();

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

🏨 Room Type:
${roomName}

👤 Guest Name:
${name}

📱 Mobile:
${mobile}

👥 Number of Guests:
${guests}

📅 Check-in Date:
${checkInDate}

📅 Check-out Date:
${checkOutDate}

🕐 Start Time:
${startTime}

🕐 End Time:
${endTime}

⏱️ Required Hours:
${hours}

🌞 Shift:
${shift}

📍 Customer Address:
${address}

📝 Special Request:
${note || "None"}

💰 Listed Room Rate:
₹${room ? room.price : "N/A"} / night

Please confirm room availability,
price and booking.

Thank you!
`;

  sendToWhatsApp(message);

  closeModal();

  showToast(
    "✓ Room booking opened in WhatsApp."
  );

}


/* ================= BANQUET BOOKING ================= */

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

      Choose your event purpose,
      date, timing and guest count.

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
        placeholder="Full Customer Address *"
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
        placeholder="Special Requirements: Decoration, Catering, Stage, DJ, Seating etc."
      ></textarea>

    </div>

    <button
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


/* ================= SUBMIT BANQUET ================= */

function submitBanquet() {

  const name =
    getElement("eventName")?.value.trim();

  const mobile =
    getElement("eventMobile")?.value.trim();

  const address =
    getElement("eventAddress")?.value.trim();

  const purpose =
    getElement("eventPurpose")?.value;

  const eventDate =
    getElement("eventDate")?.value;

  const guestCount =
    getElement("guestCount")?.value.trim();

  const startTime =
    getElement("eventStartTime")?.value;

  const endTime =
    getElement("eventEndTime")?.value;

  const shift =
    getElement("eventShift")?.value;

  const hallType =
    getElement("hallType")?.value;

  const requirements =
    getElement("eventRequirements")?.value.trim();

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

👤 Customer Name:
${name}

📱 Mobile:
${mobile}

📍 Customer Address:
${address}

🎉 Event Purpose:
${purpose}

🏛️ Hall Type:
${hallType}

📅 Event Date:
${eventDate}

🕐 Start Time:
${startTime}

🕐 End Time:
${endTime}

🌙 Shift:
${shift}

👥 Expected Guests:
${guestCount}

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


/* ================= QR TABLE SYSTEM ================= */

function simulateQR(tableNumber = "TABLE 07") {

  modalContent.innerHTML = `

    <span class="eyebrow">
      SMART TABLE QR
    </span>

    <h2>
      ${tableNumber}
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
      Scan the real QR code on the table
      to open the food menu.
    </p>

    <button
      class="btn primary"
      onclick="
        closeModal();
        document
          .querySelector('#food')
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


/* ================= FILTER BUTTONS ================= */

document
  .querySelectorAll(".filter")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        document
          .querySelectorAll(".filter")
          .forEach(btn => {

            btn.classList.remove("active");

          });

        button.classList.add("active");

        renderFood(
          button.dataset.category
        );

      }
    );

  });


/* ================= SERVICE SCROLL ================= */

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


/* ================= BANQUET BUTTON ================= */

const banquetBtn =
  getElement("banquetBtn");

if (banquetBtn) {

  banquetBtn.addEventListener(
    "click",
    openBanquet
  );

}


/* ================= QR BUTTON ================= */

const qrBtn =
  getElement("qrBtn");

if (qrBtn) {

  qrBtn.addEventListener(
    "click",
    () => {

      simulateQR("TABLE 07");

    }
  );

}


/* ================= CLOSE MODAL ================= */

const closeModalButton =
  getElement("closeModal");

if (closeModalButton) {

  closeModalButton.addEventListener(
    "click",
    closeModal
  );

}


if (modal) {

  modal.addEventListener(
    "click",
    event => {

      if (event.target === modal) {
        closeModal();
      }

    }
  );

}


/* ================= CART BUTTON ================= */

document
  .querySelectorAll("[data-cart]")
  .forEach(button => {

    button.addEventListener(
      "click",
      openCart
    );

  });


/* ================= MOBILE MENU ================= */

const menuBtn =
  getElement("menuBtn");

const nav =
  getElement("nav");

if (
  menuBtn &&
  nav
) {

  menuBtn.addEventListener(
    "click",
    () => {

      nav.classList.toggle("open");

    }
  );

}


/* ================= ESCAPE ================= */

document.addEventListener(
  "keydown",
  event => {

    if (event.key === "Escape") {
      closeModal();
    }

  }
);


/* ================= HERO FOOD ================= */

const cardFood =
  document.querySelector(".card-food");

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


/* ================= HERO ROOM ================= */

const cardRoom =
  document.querySelector(".card-room");

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


/* ================= HERO WEDDING ================= */

const cardWed =
  document.querySelector(".card-wed");

if (cardWed) {

  cardWed.addEventListener(
    "click",
    openBanquet
  );

}


/* ================= INITIALIZE ================= */

renderFood();

renderRooms();


/* =====================================================
   END OF HARSH GARDEN JAVASCRIPT
===================================================== */
