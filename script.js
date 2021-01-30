//capture id
function captureId(idName) {
  return document.getElementById(idName);
}

function handleTicket(
  quantityBtnId,
  ticketInputId,
  ticketTotalId,
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
    captureId(ticketTotalId).innerText = ticketQuantityCount * ticketPrice;
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

// cart total working area
function totalMoneyUpdater() {
  const subTotalMoney = captureId("sub_total");
  const totalTax = captureId("total_tax");

  subTotalMoney.innerText =
    parseInt(captureId("vip_ticket_total").innerText) +
    parseInt(captureId("economy_ticket_total").innerText);

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
      text: `You want to buy ${ticketBookFrom.value} to ${ticketGoTo.value} ticket`,
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
          `${vipTicket.value} VIP & ${economyTicket.value} ECONOMY ticket booked successfully`,
          "success"
        );
        // ticket form reset
        vipTicket.value = 0;
        economyTicket.value = 0;
        captureId("sub_total").innerText = 0;
        captureId("vip_ticket_total").innerText = 0;
        captureId("economy_ticket_total").innerText = 0;
        totalMoneyUpdater();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
          "Cancelled",
          `${vipTicket.value} VIP & ${economyTicket.value} ECONOMY ticket`,
          "error"
        );
      }
    });
}
