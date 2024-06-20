const createInvoice = (data, filePath) => {
    const doc = new PDFDocument({ size: "A4" });
  
    doc.pipe(fs.createWriteStream(filePath));
  
    // Add background image with adjusted top margin
    const backgroundImageBuffer = Buffer.from(data.backgroundImage, "base64");
    const imagePosition = {
      fit: [595.28, 841.89], // A4 size
      align: "center",
      valign: "center",
    };
    const topMarginAdjustment = 0; // Adjust this value to decrease the top margin
    doc.image(backgroundImageBuffer, 0, topMarginAdjustment, imagePosition);
  
    // Header
    const headerYPosition = 75; // Adjust this value to position the header lower
    doc.fontSize(16).text(data.translate.invoice, 50, headerYPosition, { align: "right" });
  
    // Divider Line
    // doc.moveTo(50, headerYPosition + 30).lineTo(550, headerYPosition + 30).stroke();
  
    // Sender details
    const senderYPosition = headerYPosition + 50;
    doc.font("Helvetica-Bold").fontSize(14).text(`${data.sender.company}`, 50, senderYPosition);
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
    doc.font("Helvetica-Bold").fontSize(14).text(`Client: ${data.client.company}`, 50, clientYPosition);
    doc
      .font("Helvetica")
      .fontSize(12)
      .text(`Address: ${data.client.address}`, 50, clientYPosition + 20);
    // doc.text(`Zip: ${data.client.zip}`, 50, clientYPosition + 35);
    // doc.text(`City: ${data.client.city}`, 50, clientYPosition + 50);
    doc.text(`Country: ${data.client.country}`, 50, clientYPosition + 35);
  
    // Invoice details
    const invoiceXPosition = 390; // Adjust this value to move invoice details horizontally
    doc.font("Helvetica-Bold").fontSize(14).text(`${data.translate.number}: ${data.information.number}`, invoiceXPosition, clientYPosition);
    doc
      .font("Helvetica")
      .fontSize(12)
      .text(`Date: ${data.information.date}`, invoiceXPosition, clientYPosition + 20);
    doc.text(`Due-date: ${data.information["due-date"]}`, invoiceXPosition, clientYPosition + 35);
  
    // Divider Line
    doc.moveTo(50, 380).lineTo(550, 380).stroke();
  
    // Products Table
    const productsYPosition = clientYPosition + 120;
    doc.font("Helvetica-Bold").fontSize(14).text(`${data.translate.products}:`, 50, productsYPosition);
  
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
        .text(`${parseFloat(product.price).toFixed(2)}`, tableColumns[2].x, currentY)
        .text(`${parseFloat(product.total).toFixed(2)}`, tableColumns[3].x, currentY);
      currentY += 20;
    });
  
    // Subtotal and Amount Paid
    const totalsYPosition = currentY + 20;
    const amountPaid = parseFloat(paid_amount);
  
    doc
      .font("Helvetica-Bold")
      .fontSize(12)
      .text("Subtotal:", 400, totalsYPosition)
      .text(`${amountPaid.toFixed(2)}`, 480, totalsYPosition, { align: "right" });
  
    doc.text("Amount Paid:", 400, totalsYPosition + 20).text(`${amountPaid.toFixed(2)}`, 480, totalsYPosition + 20, { align: "right" });
  
    // Bottom notice
    doc
      .font("Helvetica")
      .fontSize(12)
      .text(`\n${data["bottom-notice"]}`, 250, doc.y + 20);
  
    doc.end();
  };
  