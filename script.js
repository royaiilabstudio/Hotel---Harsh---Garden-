/* =====================================================
   HARSH GARDEN
   JAVASCRIPT
===================================================== */


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
    facilities:
      "AC • TV • Wi-Fi • Attached Bathroom"
  },

  {
    name: "Premium Room",
    price: 3000,
    icon: "🛋️",
    facilities:
      "AC • LED TV • Wi-Fi • Hot Water • Room Service"
  },

  {
    name: "Family Room",
    price: 3800,
    icon: "🛏️",
    facilities:
      "Spacious • TV • Wi-Fi • Attached Bathroom"
  }

];



/* ================= CART ================= */

let cart = [];



const foodGrid =
  document.getElementById("foodGrid");


const roomCards =
  document.getElementById("roomCards");


const toast =
  document.getElementById("toast");


const modal =
  document.getElementById("modal");


const modalContent =
  document.getElementById("modalContent");



/* ================= FOOD RENDER ================= */

function renderFood(category = "all") {

  foodGrid.innerHTML = food

    .filter(item => {

      return category === "all" ||
             item.category === category;

    })

    .map(item => {

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
                onclick="addToCart(${food.indexOf(item)})"
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



/* ================= ROOM RENDER ================= */

function renderRooms() {

  roomCards.innerHTML = rooms

    .map((room, index) => {

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



/* ================= ADD TO CART ================= */

function addToCart(index) {

  const item = food[index];


  const existing =
    cart.find(
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


  showToast(

    `${item.name} added • ` +

    `${cart.reduce(
      (sum, item) =>
        sum + item.qty,
      0
    )} item(s) in cart`

  );



  /* Demo shortcut */

  setTimeout(() => {

    if (cart.length > 0) {

      openCart();

    }

  }, 500);

}



/* ================= CART ================= */

function openCart() {

  if (!cart.length) {

    showToast(
      "Your cart is empty."
    );

    return;

  }


  const total =
    cart.reduce(
      (sum, item) =>
        sum + item.price * item.qty,
      0
    );


  modalContent.innerHTML = `

    <span class="eyebrow">
      DEMO FOOD ORDER
    </span>


    <h2>
      Your Order
    </h2>


    ${

      cart.map(item => `

        <div class="cart-line">

          <span>
            ${item.name} × ${item.qty}
          </span>

          <b>
            ₹${item.price * item.qty}
          </b>

        </div>

      `).join("")

    }


    <div class="total">

      <span>
        Total
      </span>

      <span>
        ₹${total}
      </span>

    </div>


    <div class="demo-note">

      Payment gateway is OFF.

      This is only a demo order flow.

      No real payment will be taken.

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
      style="width:100%;margin-top:15px"
      onclick="placeDemoOrder()"
    >

      Place Demo Order

    </button>

  `;


  openModal();

}



/* ================= PLACE ORDER ================= */

function placeDemoOrder() {

  const name =
    document.getElementById(
      "custName"
    ).value.trim();


  const mobile =
    document.getElementById(
      "custMobile"
    ).value.trim();


  const address =
    document.getElementById(
      "custAddress"
    ).value.trim();


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


  closeModal();


  showToast(
    "✓ Demo order generated successfully. Payment was NOT taken."
  );


  cart = [];

}



/* ================= ROOM BOOKING ================= */

function openRoom(index) {

  const room =
    rooms[index];


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

      Payment gateway is OFF.

      This demo only creates a booking request.

    </div>


    <div class="form-grid">

      <input
        id="roomName"
        placeholder="Guest Name *"
      >


      <input
        id="roomMobile"
        placeholder="Mobile Number *"
        inputmode="numeric"
      >


      <input
        type="date"
        id="checkIn"
      >


      <input
        type="date"
        id="checkOut"
      >


      <select id="guests">

        <option>
          1 Guest
        </option>

        <option>
          2 Guests
        </option>

        <option>
          3 Guests
        </option>

        <option>
          4+ Guests
        </option>

      </select>

    </div>


    <button
      class="btn primary"
      style="width:100%;margin-top:15px"
      onclick="submitRoom('${room.name}')"
    >

      Send Booking Request

    </button>

  `;


  openModal();

}



/* ================= SUBMIT ROOM ================= */

function submitRoom(roomName) {

  const name =
    document.getElementById(
      "roomName"
    ).value.trim();


  const mobile =
    document.getElementById(
      "roomMobile"
    ).value.trim();


  const checkIn =
    document.getElementById(
      "checkIn"
    ).value;


  const checkOut =
    document.getElementById(
      "checkOut"
    ).value;


  if (
    !name ||
    !mobile ||
    !checkIn ||
    !checkOut
  ) {

    showToast(
      "Please fill all required booking details."
    );

    return;

  }


  closeModal();


  showToast(
    `✓ ${roomName} booking request created for demo.`
  );

}



/* ================= BANQUET ================= */

function openBanquet() {

  modalContent.innerHTML = `

    <span class="eyebrow">
      BANQUET BOOKING
    </span>


    <h2>
      Plan Your Celebration
    </h2>


    <p>

      Choose your event date and
      event requirements.

    </p>


    <div class="demo-note">

      Payment gateway is OFF.

      This demo only creates a booking request.

    </div>


    <div class="form-grid">

      <input
        id="eventName"
        placeholder="Name *"
      >


      <input
        id="eventMobile"
        placeholder="Mobile *"
        inputmode="numeric"
      >


      <input
        type="date"
        id="eventDate"
      >


      <select id="eventType">

        <option>
          Wedding
        </option>

        <option>
          Reception
        </option>

        <option>
          Birthday
        </option>

        <option>
          Anniversary
        </option>

        <option>
          Other Event
        </option>

      </select>


      <input
        id="guestCount"
        class="full"
        type="number"
        min="1"
        placeholder="Expected Guests *"
      >

    </div>


    <button
      class="btn primary"
      style="width:100%;margin-top:15px"
      onclick="submitBanquet()"
    >

      Send Banquet Request

    </button>

  `;


  openModal();

}



/* ================= SUBMIT BANQUET ================= */

function submitBanquet() {

  const fields = [

    "eventName",

    "eventMobile",

    "eventDate",

    "guestCount"

  ];


  const incomplete =
    fields.some(
      id =>
        !document
          .getElementById(id)
          .value
          .trim()
    );


  if (incomplete) {

    showToast(
      "Please complete the required details."
    );

    return;

  }


  closeModal();


  showToast(
    "✓ Banquet booking request created for demo."
  );

}



/* ================= QR ================= */

function simulateQR() {

  modalContent.innerHTML = `

    <span class="eyebrow">
      TABLE 07
    </span>


    <h2>
      Welcome to Harsh Garden
    </h2>


    <p>

      Your table number can be carried
      through the QR URL in the production
      version.

    </p>


    <div class="demo-note">

      Demo table detected:

      <b>
        TABLE 07
      </b>

      <br><br>

      Payment gateway is OFF.

    </div>


    <button
      class="btn primary"
      onclick="closeModal(); document.querySelector('#food').scrollIntoView({behavior:'smooth'})"
    >

      Browse Menu

    </button>

  `;


  openModal();

}



/* ================= MODAL ================= */

function openModal() {

  modal.classList.add(
    "show"
  );

}


function closeModal() {

  modal.classList.remove(
    "show"
  );

}



/* ================= TOAST ================= */

function showToast(text) {

  toast.textContent =
    text;


  toast.classList.add(
    "show"
  );


  clearTimeout(
    window.toastTimer
  );


  window.toastTimer =
    setTimeout(() => {

      toast.classList.remove(
        "show"
      );

    }, 3200);

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

document
  .getElementById(
    "banquetBtn"
  )
  .addEventListener(
    "click",
    openBanquet
  );



/* ================= QR BUTTON ================= */

document
  .getElementById(
    "qrBtn"
  )
  .addEventListener(
    "click",
    simulateQR
  );



/* ================= CLOSE MODAL ================= */

document
  .getElementById(
    "closeModal"
  )
  .addEventListener(
    "click",
    closeModal
  );


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



/* ================= MOBILE MENU ================= */

const menuBtn =
  document.getElementById(
    "menuBtn"
  );


const nav =
  document.getElementById(
    "nav"
  );


menuBtn.addEventListener(
  "click",
  () => {

    nav.classList.toggle(
      "open"
    );

  }
);



/* ================= ESCAPE ================= */

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



/* ================= HERO SHORTCUTS ================= */

document
  .querySelector(".card-food")
  .addEventListener(
    "click",
    () => {

      document
        .querySelector("#food")
        .scrollIntoView({
          behavior: "smooth"
        });

    }
  );


document
  .querySelector(".card-room")
  .addEventListener(
    "click",
    () => {

      document
        .querySelector("#rooms")
        .scrollIntoView({
          behavior: "smooth"
        });

    }
  );


document
  .querySelector(".card-wed")
  .addEventListener(
    "click",
    openBanquet
  );



/* ================= INITIALIZE ================= */

renderFood();

renderRooms();