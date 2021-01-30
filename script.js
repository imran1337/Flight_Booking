//capture id
function captureId(idName) {
  return document.getElementById(idName);
}

let vipTicketTotalAmount = 0;
let economyTicketTotalAmount = 0;

function handleTicket(
  quantityBtnId,
  ticketInputId,
  ticketTotalVar,
  ticketPrice,
  isIncrease
) {
  captureId(quantityBtnId).addEventListener("click", () => {
    let ticketQuantityCount = parseInt(captureId(ticketInputId).value);
    if (isIncrease == true) {
      captureId(ticketInputId).value = ++ticketQuantityCount;
    } else {
      ticketQuantityCount > 0
        ? (captureId(ticketInputId).value = --ticketQuantityCount)
        : null;
    }

    // ticketTotal amount
    ticketTotalVar == "vip_ticket_total"
      ? (vipTicketTotalAmount = ticketQuantityCount * ticketPrice)
      : (economyTicketTotalAmount = ticketQuantityCount * ticketPrice);

    // get sub Total money
    getSubTotal(vipTicketTotalAmount, economyTicketTotalAmount);

    // click to update money function call
    totalMoneyUpdater();
  });
}

handleTicket(
  "vip_ticket_quantity_increase",
  "vip_ticket_input",
  "vip_ticket_total",
  150,
  true
);
handleTicket(
  "vip_ticket_quantity_decrease",
  "vip_ticket_input",
  "vip_ticket_total",
  150,
  false
);
handleTicket(
  "economy_ticket_quantity_increase",
  "economy_ticket_input",
  "economy_ticket_total",
  100,
  true
);
handleTicket(
  "economy_ticket_quantity_decrease",
  "economy_ticket_input",
  "economy_ticket_total",
  100,
  false
);

// get Total Money
function getSubTotal(vip, economy) {
  captureId("sub_total").innerText = vip + economy;
}

// cart total working area
function totalMoneyUpdater() {
  const subTotalMoney = captureId("sub_total");
  const totalTax = captureId("total_tax");
  totalTax.innerText = parseFloat(subTotalMoney.innerText) * 0.1;
  captureId("grand_total").innerText =
    parseFloat(subTotalMoney.innerText) + parseFloat(totalTax.innerText);
}

// book now btn working area
captureId("book_now").addEventListener("click", () => {
  const vipTicket = captureId("vip_ticket_input");
  const economyTicket = captureId("economy_ticket_input");
  if (vipTicket.value > 0 || economyTicket.value > 0) {
    handleSweetAlert();
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please add ticked to buy!",
    });
  }
});

// sweet alert function
function handleSweetAlert() {
  const ticketBookFrom = captureId("ticket_book_from");
  const ticketGoTo = captureId("ticket_book_goFor");
  const vipTicket = captureId("vip_ticket_input");
  const economyTicket = captureId("economy_ticket_input");
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
// ticket form reset
function ticketFormMoneyReset() {
  captureId("vip_ticket_input").value = 0;
  captureId("economy_ticket_input").value = 0;
  captureId("sub_total").innerText = 0;
  captureId("ticket_book_from").value = "";
  captureId("ticket_book_goFor").value = "";
  document
    .querySelectorAll("input[type=date]")
    .forEach((date) => (date.value = ""));
  totalMoneyUpdater();
}

// arrow press to increase or decrease ticket quantity
function arrowBtnQuantityCounter(ticketInput, ticketBtn, isIncrease) {
  captureId(ticketInput).addEventListener("keyup", (event) => {
    event.keyCode === 38 && isIncrease == true
      ? captureId(ticketBtn).click()
      : null;
    event.keyCode === 40 && isIncrease == false
      ? captureId(ticketBtn).click()
      : null;
      event.preventDefault();
  });
}

arrowBtnQuantityCounter(
  "vip_ticket_input",
  "vip_ticket_quantity_increase",
  true
);
arrowBtnQuantityCounter(
  "vip_ticket_input",
  "vip_ticket_quantity_decrease",
  false
);
arrowBtnQuantityCounter(
  "economy_ticket_input",
  "economy_ticket_quantity_increase",
  true
);
arrowBtnQuantityCounter(
  "economy_ticket_input",
  "economy_ticket_quantity_decrease",
  false
);
