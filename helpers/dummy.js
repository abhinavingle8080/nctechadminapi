const addMemberPackage = async function (req, res) {
  try {
    const center_id = req.body.center_id;
    const package_id = req.body.package_id;
    const member_id = req.body.member_id;
    const start_date = req.body.start_date;
    const expiry_date = req.body.expiry_date;
    const package_amount = req.body.package_amount || 0;
    const discount_amount = req.body.discount_amount || 0;
    const paid_amount = req.body.paid_amount || 0;
    const payment_mode = req.body.payment_mode || "Cash";
    const remark = req.body.remark || null;

    const package = await Package.findOne({
      where: { id: package_id, center_id: center_id },
    });

    const create = await MemberPackageMapping.create({
      center_id: center_id,
      package_id: package_id,
      member_id: member_id,
      start_date: start_date,
      expiry_date: expiry_date,
      package_name: package.package_name,
      package_duration: package.package_duration,
      package_amount: package_amount,
      discount_amount: discount_amount,
      paid_amount: paid_amount,
      payment_mode: payment_mode,
      remark: remark,
      status:
        parseInt(package_amount) - parseInt(discount_amount) ===
        parseInt(paid_amount)
          ? 0
          : 1,
    });

    let createdPayment = null;
    const imageCreatedTime = moment().format("YYYY-MM-DD-HH-mm-ss");
    if (paid_amount > 0) {
      createdPayment = await Payment.create({
        center_id: center_id,
        member_id: member_id,
        package_id: package_id,
        amount: paid_amount,
        payment_date_time: new Date(),
        payment_mode: payment_mode,
        payment_details: remark,
        member_package_id: create.id,
        payment_invoice_url: `${
          req.constants.PAYMENT_RECEIPT_PATH +
          center_id +
          "_" +
          member_id +
          "_" +
          imageCreatedTime
        }.pdf`,
      });
    }

    const getPckDetails = await MemberPackageMapping.findOne({
      where: { id: create.id },
      attributes: {
        include: [
          [
            Sequelize.literal(
              "(Select currency_symbol  from currencies as c where c.id = MemberPackageMapping.currency_id )"
            ),
            "CurrencySymbol",
          ],
          [
            Sequelize.fn(
              "DATE_FORMAT",
              Sequelize.col("start_date"),
              "%Y-%m-%d"
            ),
            "start_date",
          ],
          [
            Sequelize.fn(
              "DATE_FORMAT",
              Sequelize.col("expiry_date"),
              "%Y-%m-%d"
            ),
            "expiry_date",
          ],
          [
            Sequelize.fn(
              "DATE_FORMAT",
              Sequelize.col("created_at"),
              "%Y-%m-%d %H:%i:%s"
            ),
            "created_at",
          ],
          [
            Sequelize.fn(
              "DATE_FORMAT",
              Sequelize.col("updated_at"),
              "%Y-%m-%d %H:%i:%s"
            ),
            "updated_at",
          ],
        ],
      },
    });

    const getMemberDetails = await Member.findOne({
      where: {
        id: req.body.member_id,
      },
    });

    const getCenterDetails = await Center.findOne({
      where: {
        id: req.body.center_id,
      },
    });

    const createInvoice = (data, filePath) => {
      const doc = new PDFDocument({ size: "A4" });

      doc.pipe(fs.createWriteStream(filePath));

      // Add background image with adjusted top margin
      const backgroundImageBuffer = Buffer.from(
        data.images.background,
        "base64"
      );
      const imagePosition = {
        fit: [595.28, 841.89], // A4 size
        align: "center",
        valign: "center",
      };
      const topMarginAdjustment = 0; // Adjust this value to decrease the top margin
      doc.image(backgroundImageBuffer, 0, topMarginAdjustment, imagePosition);

      // Header
      const headerYPosition = 75; // Adjust this value to position the header lower
      doc
        .fontSize(16)
        .text(data.translate.invoice, 50, headerYPosition, { align: "right" });

      // // Divider Line
      // doc.moveTo(50, headerYPosition + 30).lineTo(550, headerYPosition + 30).stroke();

      // Sender details
      const senderYPosition = headerYPosition + 50;
      doc
        .font("Helvetica-Bold")
        .fontSize(14)
        .text(`${data.sender.company}`, 50, senderYPosition);
      doc
        .font("Helvetica")
        .fontSize(12)
        .text(`Address: ${data.sender.address}`, 50, senderYPosition + 20);
      // doc.text(`Zip: ${data.sender.zip}`, 50, senderYPosition + 35);
      // doc.text(`City: ${data.sender.city}`, 50, senderYPosition + 50);
      doc.text(`Country: ${data.sender.country}`, 50, senderYPosition + 35);

      // Divider Line
      doc
        .moveTo(50, senderYPosition + 100)
        .lineTo(550, senderYPosition + 100)
        .stroke();

      // Client details
      const clientYPosition = senderYPosition + 120;
      doc
        .font("Helvetica-Bold")
        .fontSize(14)
        .text(`Client: ${data.client.company}`, 50, clientYPosition);
      doc
        .font("Helvetica")
        .fontSize(12)
        .text(`Address: ${data.client.address}`, 50, clientYPosition + 20);
      // doc.text(`Zip: ${data.client.zip}`, 50, clientYPosition + 35);
      // doc.text(`City: ${data.client.city}`, 50, clientYPosition + 50);
      doc.text(`Country: ${data.client.country}`, 50, clientYPosition + 35);

      // Invoice details
      const invoiceXPosition = 390; // Adjust this value to move invoice details horizontally
      doc
        .font("Helvetica-Bold")
        .fontSize(14)
        .text(
          `${data.translate.number}: ${data.information.number}`,
          invoiceXPosition,
          clientYPosition
        );
      doc
        .font("Helvetica")
        .fontSize(12)
        .text(
          `Date: ${data.information.date}`,
          invoiceXPosition,
          clientYPosition + 20
        );
      doc.text(
        `Due-date: ${data.information["due-date"]}`,
        invoiceXPosition,
        clientYPosition + 35
      );

      // Divider Line
      doc.moveTo(50, 380).lineTo(550, 380).stroke();

      // Products Table
      const productsYPosition = clientYPosition + 120;
      doc
        .font("Helvetica-Bold")
        .fontSize(14)
        .text(`${data.translate.products}:`, 50, productsYPosition);

      // Table Header
      const tableHeaderY = productsYPosition + 20;
      const tableStartX = 50;
      const tableEndX = 550;

      // doc.moveTo(tableStartX, tableHeaderY).lineTo(tableEndX, tableHeaderY).stroke();

      const tableColumns = [
        { title: "Items", x: tableStartX + 10, width: 200 },
        { title: "Quantity", x: tableStartX + 220, width: 70 },
        // { title: "Tax Rate", x: tableStartX + 300, width: 70 },
        { title: "Amount", x: tableStartX + 300, width: 70 },
        { title: "Total", x: tableStartX + 380, width: 100 },
      ];

      tableColumns.forEach((column) => {
        doc
          .font("Helvetica-Bold")
          .fontSize(12)
          .text(column.title, column.x, tableHeaderY + 5);
      });

      doc
        .moveTo(tableStartX, tableHeaderY + 20)
        .lineTo(tableEndX, tableHeaderY + 20)
        .stroke();

      // Table Rows
      let currentY = tableHeaderY + 25;
      data.products.forEach((product) => {
        doc
          .font("Helvetica")
          .fontSize(12)
          .text(product.name, tableColumns[0].x, currentY)
          .text(product.quantity, tableColumns[1].x, currentY)
          .text(
            `${parseFloat(product.price).toFixed(2)}`,
            tableColumns[2].x,
            currentY
          )
          .text(
            `${parseFloat(product.total).toFixed(2)}`,
            tableColumns[3].x,
            currentY
          );
        currentY += 20;
      });

      // Subtotal and Amount Paid
      const totalsYPosition = currentY + 20;
      const amountPaid = parseFloat(paid_amount);

      doc
        .font("Helvetica-Bold")
        .fontSize(12)
        .text("Subtotal:", 400, totalsYPosition)
        .text(`${amountPaid.toFixed(2)}`, 480, totalsYPosition, {
          align: "right",
        });

      doc
        .text("Amount Paid:", 400, totalsYPosition + 20)
        .text(`${amountPaid.toFixed(2)}`, 480, totalsYPosition + 20, {
          align: "right",
        });

      // Bottom notice
      doc
        .font("Helvetica")
        .fontSize(12)
        .text(`\n${data["bottom-notice"]}`, 250, doc.y + 20);

      doc.end();
    };

    const data = {
      images: {
        // The invoice background
        background: fs.readFileSync("fitnessmaa.jpg", "base64"),
      },
      sender: {
        company:
          getCenterDetails.center_name +
          "(" +
          getCenterDetails.center_unique_id +
          ")",
        address: getCenterDetails.address,
        zip: "440024",
        city: getCenterDetails.city,
        country: "India",
      },
      client: {
        company:
          getMemberDetails.firstname +
          " " +
          getMemberDetails.lastname +
          "(" +
          getMemberDetails.member_unique_id +
          ")",
        address: getMemberDetails.address,
        zip: "440024",
        city: getMemberDetails.address,
        country: "India",
      },
      information: {
        number: createdPayment?.id,
        date: moment().format("YYYY-MM-DD"),
        "due-date": "--",
      },
      products: [
        {
          name: getPckDetails?.package_name,
          quantity: 1,
          description: "Payment Against Package",
          "tax-rate": 0,
          price: paid_amount,
          total: paid_amount,
        },
      ],
      "bottom-notice": "Thank you for choosing us.",
      settings: {
        currency: "INR",
        locale: "en-IN",
        "tax-notation": "gst",
        "margin-top": 50,
        "margin-right": 50,
        "margin-left": 50,
        "margin-bottom": 50,
      },
      translate: {
        invoice: "Payment Receipt",
        number: "Payment-id",
        products: "Items",
        price: "Amount",
        total: "Amount Paid",
      },
    };

    const path = `${req.constants.FILE_BASE_PATH}${req.constants.PAYMENT_RECEIPT_PATH}`;
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true });
    }

    const filePath = `${path}${center_id}_${member_id}_${imageCreatedTime}.pdf`;

    createInvoice(data, filePath);

    return ReE(
      res,
      {
        static_key: "success",
        message: "Package has been successfully added to the member.",
        data: getPckDetails,
        status_code: 200,
      },
      200
    );
  } catch (error) {
    console.log(error);
    return ReE(
      res,
      {
        static_key: "server error",
        message: error.message,
        data: null,
        status_code: 500,
      },
      500
    );
  }
};
