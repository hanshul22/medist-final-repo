const moment = require("moment");
const converter = require("number-to-words");

let params = {
  contactLink: "https://www.clothiq.in/contact-page",
  appLink: `https://play.google.com/store/apps/details?id=${process.env.ANDROID_PACKAGE_NAME}`,
  date: moment().format("DD MMM, YYYY"),
  time: moment().format("h:mm A"),
};

let generateInvoice = async (data, warehouse, bill_no = 1) => {
  let html = "";
  html += `
  <table style="width: 100%">
    <tbody>
        <tr>
          <td class="company-detail">
            <div class="row cell-section">
                <div class="col">
                  <h4>ClothiQ Solutions Pvt. Ltd.</h4>
                  <span>${warehouse?.address}</span><br>
                  <span>Phone No: ${warehouse?.mobile_no}</span><br>
                  <span>GSTIN: 08CHMPR1675R1Z8</span><br>
                </div>
              </div>
          </td>
          <td class="order-no-section">
              <div class="row cell-section">
                <div class="col">
                  <span>Order No:</span><br>
                  <span><b>${data?.order_id}</b></span><br>
                  <span>Payment Status:</span><br>
                  <span><b>${
                    data?.payment_status == "PAID" ? "Paid" : "Pending"
                  }</b></span><br>
                </div>
              </div>
          </td>
          <td>
            <div class="row cell-section">
              <div class="col">
                <span>Invoice Date:</span><br>
                <span>${moment().format("DD-MM-YYYY")}</span><br>
                <span>Delivery Date:</span><br>
                <span>${moment(data?.drop_date).format("DD-MM-YYYY")}</span><br>
              </div>
            </div>
          </td>
        </tr>
        <tr>
        <td colspan="3">
          <div class="row cell-section bill-to-section">
            <div class="col">
              <span>Bill To</span><br>
              <span>${data?.customer?.name}</span><br>
              <span>${data?.address}</span><br>
            </div>
          </div>
        </td>
        </tr>
        </tbody>
        </table>
        <table class="items-table" style="width: 100%">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Weight</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
  `;
  data.services
    .filter((x) => x?.type != "DRY_CLEAN")
    .map((item, index) => {
      html += `
        <tr>
          <td>
            ${index + 1}
          </td>
          <td>${item?.name}</td>
          <td>${item?.quantity} Item</td>
          <td>${item?.weight ? `${item?.weight} kg` : "NA"}</td>
          <td>
          <label style="text-decoration: line-through">₹${Number(
            item?.total_amount || 0
          ).toFixed(2)}</label>&nbsp;&nbsp;<label>₹${Number(
        item?.amount
      ).toFixed(2)}</label></td>
        </tr>
      `;
    });
  data.services
    .filter((x) => x?.type == "DRY_CLEAN")
    .map((item) => {
      item?.selected_items.map((item1, index) => {
        html += `
        <tr>
          <td>
            ${
              data.services.filter((x) => x?.type != "DRY_CLEAN").length +
              index +
              1
            }
          </td>
          <td>${item1?.name}</td>
          <td>${item1?.quantity} Item</td>
          <td>NA</td>
          <td>
            <label style="text-decoration: line-through">₹${Number(
              item1?.total_amount || 0
            ).toFixed(2)}</label>&nbsp;&nbsp;<label>₹${Number(
          item1?.amount
        ).toFixed(2)}</label>
          </td>
        </tr>
      `;
      });
    });
  const total_amount =
    Number(data?.amount || 0) -
    Number(data?.tax_amount || 0) +
    Number(data?.discount || 0) +
    Number(data?.offer_discount) -
    Number(data?.additional_amount || 0);
  html += `
        <tr>
          <td colspan="3">
            <div class="row cell-section">
              <div class="col">
                <span>Payment Mode: ${data?.payment_mode}</span><br>
                <span>Invoice Amount In Words</span><br>
                <span><b>${converter.toWords(data?.amount)}</b></span>
              </div>
            </div>
          </td>
          <td colspan="2">
            <div class="row cell-section">
              <div class="col total-amount-section">
                <span>Amount: <b>₹${Number(total_amount).toFixed(
                  2
                )}</b></span><br/>
                <span>Discount: <b>₹${(
                  Number(data?.discount || 0) +
                  Number(data?.offer_discount || 0)
                ).toFixed(2)}</b></span><br/>
                <span>Additional Amount: <b>₹${Number(
                  data?.additional_amount || 0
                ).toFixed(2)}</b></span><br/>
                <span>Tax Amount(CGST-9%): <b>₹${(
                  data?.tax_amount / 2 || 0
                ).toFixed(2)}</b></span><br/>
                <span>Tax Amount(SGST-9%): <b>₹${(
                  data?.tax_amount / 2 || 0
                ).toFixed(2)}</b></span><br/>
                <span>Total Amount: <b>₹${data?.amount.toFixed(2)}</b></span>
              </div>
            </div>
          </td>
        </tr>`;
  html += `
        <tr>
          <td colspan="3">
            <div class="row cell-section">
              <div class="col">
                <span><b>Terms and Conditions</b></span><br>
                <span>Thankyou for doing business with us.</span>
              </div>
            </div>
          </td>
          <td colspan="2">
            <div class="row cell-section">
              <div class="col signature-section">
                <span>For: ClothiQ Solutions Pvt. Ltd.</span><br>
                <img src="${process.env.BASE_URL}/images/signature.png" width="20%" alt="sign">
                <br>
                <span><b>Authorized Signatory</b></span>
              </div>
            </div>
          </td>
        </tr>`;
  html += `</tbody>
    </table>`;
  return `<!DOCTYPE html>
  <html>
  
  <head>
    <style>
      html {
        -webkit-print-color-adjust: exact;
      }
        table, th, td {
        border: 1px solid black;
        border-collapse: collapse;
        background: white;
      }
      .theme-color {
        color: #01b59c;
        font-weight: 400;
      }
      .details {
        border: 1px solid black;
        padding: 5px;
        background: white !important;
        margin: 15px 0;
      }
      .line-r {
        border-right: 1px solid #01b59c;
      }
      .total {
        border: 1px solid black;
        border-radius: 8px;
        padding: 10px;
        text-align: center;
        margin: 15px 0;
        background-color: lightgray;
        overflow:hidden;
        page-break-inside: avoid;
      }
      .entries {
        margin-bottom: 15px;
      }
      .report-table {
          width: 100%;
          border-spacing: 0pt;
          border-collapse: separate;
      }
      .report-table th {
          background: #ddd;
      }
      .report-table th,
      .report-table td {
          padding: 0.75rem;
          border: 1px solid black;
      }
      .report-table th:first-child {
          border-top-left-radius: 8px;
      }
      .report-table th:last-child {
          border-top-right-radius: 8px;
      }
      .report-table tr:last-child td:first-child {
          border-bottom-left-radius: 8px;
      }
      .report-table tr:last-child td:last-child {
          border-bottom-right-radius: 8px;
      }
      .give .txt {
        color: green;
      }
      .get .txt {
        color: red;
      }
      .give .txt span,
      .get .txt span {
        color: black
      }
      .txt-gray {
        color: lightgray;
      }
      #header {
        position: fixed;
        width: 100%;
        top: 0;
        left: 0;
        right: 0;
        height: 120px;
        z-index: -1;
      }
      #footer {
        position: fixed;
        width: 100%;
        bottom: 0;
        left: 0;
        right: 0;
        height: 60px;
      }
      .header-space {
        height: 100px;
      }
      .footer-space {
        height: 60px;
      }
      .report-name{
        color: white;
        text-align: right;
      }
      .bg-white {
        background: white;
      }
      .row {
        display: flex;
        flex-wrap: wrap;
        margin-right: 0;
        margin-left: 0;
      }
      .col {
        flex-basis: 0;
        flex-grow: 1;
        max-width: 100%;
        padding-right: 15px;
        padding-left: 15px;
      }
      .company-detail {
        width: 60%;
      }
      .company-detail h4 {
        margin-top: 0;
        margin-bottom: 0;
      }
      .order-no-section {
        width: 20%;
      }
      .cell-section{
        padding: 10px 0;
      }
      .items-table th, .items-table td {
        text-align: left;
        padding: 7px 10px;
      }
      .total-amount-section {
        text-align: right;
      }
      .invoice-heading {
        margin: 15px;
        text-align: center;
      }
      .bill-to-section {
        width: 50%;
      }
      .signature-section {
        text-align: center;
      }
    </style>
  </head>
  
  <body
    style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; ">
    <div class="invoice-heading"><b>Tax Invoice-${bill_no}</b></div>
    ${html}
    <div class="footer-space"> </div>
  </body>
  
  </html>
`;
};

{
  /* <div id="header">
      <img src="${
        process.env.BASE_URL
      }/images/PDF_BG-01.svg" width="100%" alt="header image">
      <div style="width: 45%;position: absolute; top: 30%; right: 6%;">
        <p class="report-name">  </b>
      </div>
    </div>
    <div id="footer">
      <div style="width: 45%;position: absolute; bottom: 6%; left: 6%;z-index:9;">
        <img style="width: 15px;margin-top:-3px;" src="${
          process.env.BASE_URL
        }/images/${"Helpline-01.svg"}" alt="img">
        <b style="color: #fff"><i class="fa fa-phone-square" aria-hidden="true"></i> Helpline: </b>
        <a target="_blank" href="${params.contactLink}"
          style="color: #fff;text-decoration: none">${
            params.contactLink
          }</a><br>
        <span style="color: #fff;font-size: 12px;">T & C apply.</span>
      </div>
      <div style="width: 40%;position: absolute; bottom: 21%; right: 6%;text-align: right;">
        <span style="color: white;">Use ClothiQ Now</span>
        <a target="_blank" href="${params.appLink}"
          style="margin-left: 5px;color: #726f7a;background-color: white;border-radius: 4px;padding: 3px 10px;text-decoration: none;">Install
          <img style="width: 13px;margin-top:-3px;" src="${
            process.env.BASE_URL
          }/images/${"Install-01.svg"}" alt="img"></a>
      </div>
    </div>
    <div class="header-space"> </div> */
}

module.exports = generateInvoice;
