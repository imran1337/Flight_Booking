//variables
const subTotalMoney = document.getElementById("sub_total");
const vipTicket = document.getElementById("vip_ticket_input");
const economyTicket = document.getElementById("economy_ticket_input");
let vipTicketTotalAmount = 0;
let economyTicketTotalAmount = 0;

function handleTicket(
  quantityBtnId,
  ticketInputId,
  ticketCategory,
  ticketPrice,
  isIncrease
) {
  document.getElementById(quantityBtnId).addEventListener("click", () => {
    const ticketInputID = document.getElementById(ticketInputId + "_input");
    let ticketQuantityCount = parseInt(ticketInputID.value);
    if (isIncrease == true) {
      ticketInputID.value = ++ticketQuantityCount;
    } else {
      ticketQuantityCount > 0
        ? (ticketInputID.value = --ticketQuantityCount)
        : null;
    }

    // ticketTotal amount
    ticketCategory == "vip"
      ? (vipTicketTotalAmount = ticketQuantityCount * ticketPrice)
      : (economyTicketTotalAmount = ticketQuantityCount * ticketPrice);

    // showing money to Sub Total money
    subTotalMoney.innerText = vipTicketTotalAmount + economyTicketTotalAmount;

    // click to update moneyUpdater function call
    totalMoneyUpdater();
  });
}

handleTicket("vip_ticket_quantity_increase", "vip_ticket", "vip", 150, true);
handleTicket("vip_ticket_quantity_decrease", "vip_ticket", "vip", 150, false);
handleTicket("economy_ticket_quantity_increase", "economy_ticket", "economy", 100, true);
handleTicket("economy_ticket_quantity_decrease", "economy_ticket", "economy", 100, false);

// cart total working area
function totalMoneyUpdater() {
  const totalTax = document.getElementById("total_tax");
  totalTax.innerText = parseFloat(subTotalMoney.innerText) * 0.1;
  document.getElementById("grand_total").innerText =
    parseFloat(subTotalMoney.innerText) + parseFloat(totalTax.innerText);
}

// book now btn working area
document.getElementById("book_now").addEventListener("click", () => {
  if (vipTicket.value > 0 || economyTicket.value > 0) {
    handleSweetAlert();
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please add ticket to buy!",
    });
  }
});

// sweet alert function
function handleSweetAlert() {
  const ticketBookFrom = document.getElementById("ticket_book_from");
  const ticketGoTo = document.getElementById("ticket_book_goFor");
  // sweetAlert
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger me-5",
    },
    buttonsStyling: false,
  });
  swalWithBootstrapButtons
    .fire({
      title: "Are you sure?",
      text: `You want to book ${
        ticketBookFrom.value.length > 0 && ticketBookFrom.value != ""
          ? ticketBookFrom.value + " to " + ticketGoTo.value
          : ""
      } ticket`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, book it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          `Hello Sir`,
          `Your ${vipTicket.value > 0 ? vipTicket.value + " VIP" : ""} ${
            economyTicket.value > 0 ? economyTicket.value + " ECONOMY" : ""
          } ticket booked successfully`,
          "success"
        );
        // ticket form reset
        ticketFormMoneyReset();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
          "Cancelled",
          `${vipTicket.value > 0 ? vipTicket.value + " VIP" : ""} ${
            economyTicket.value > 0 ? economyTicket.value + " ECONOMY" : ""
          } ticket`,
          "error"
        );
        // ticket form reset
        ticketFormMoneyReset();
      }
    });
}

// ticket form & money
function ticketFormMoneyReset() {
  vipTicket.value = 0;
  economyTicket.value = 0;
  subTotalMoney.innerText = 0;
  vipTicketTotalAmount = 0;
  economyTicketTotalAmount = 0;
  document.getElementById("ticket_book_from").value = "";
  document.getElementById("ticket_book_goFor").value = "";
  document.querySelectorAll("input[type=date]")
  .forEach((date) => (date.value = ""));
  totalMoneyUpdater();
}

// arrow press to increase or decrease ticket quantity
function arrowBtnQuantityCounter(ticketInput, ticketBtn, isIncrease) {
  document
    .getElementById(ticketInput + "_ticket_input")
    .addEventListener("keyup", (event) => {
      event.keyCode === 38 && isIncrease == true
        ? document.getElementById(ticketBtn).click()
        : null;
      event.keyCode === 40 && isIncrease == false
        ? document.getElementById(ticketBtn).click()
        : null;
      event.preventDefault();
    });
}

arrowBtnQuantityCounter("vip", "vip_ticket_quantity_increase", true);
arrowBtnQuantityCounter("vip", "vip_ticket_quantity_decrease", false);
arrowBtnQuantityCounter("economy", "economy_ticket_quantity_increase", true);
arrowBtnQuantityCounter("economy", "economy_ticket_quantity_decrease", false);