// @ts-nocheck

const findKeyWithSmallestArray = (obj) => {
  return Object.entries(obj).reduce((minKey, [key, value]) => {
    return value.length < obj[minKey].length ? key : minKey;
  }, Object.keys(obj)[0]);
};

const categorizeData = (data) => {
  const keys = Object.keys(data);

  if (keys.length === 0) {
    // Input is empty
    return { primary: null, secondary: null };
  }

  if (keys.length === 1) {
    // Only one array present
    return { primary: null, secondary: keys[0] };
  }

  // Destructure keys into variables
  const [key1, key2] = keys;
  const length1 = data[key1]?.length ?? 0;
  const length2 = data[key2]?.length ?? 0;

  return length1 < length2
    ? { primary: key1, secondary: key2 }
    : { primary: key2, secondary: key1 };
};

export function customizeProductObject(product) {
  console.log('Mayank you asked for: ', product);

  // 1. Find the unique attribute types
  const attributes = product.sku_data.reduce((acc, item) => {
    item.attributes.forEach(({ master_attribute, value }) => {
      if (!acc[master_attribute]) {
        acc[master_attribute] = new Set();
      }
      acc[master_attribute].add(value);
    });
    return acc;
  }, {});

  // Convert Sets to Arrays
  for (const key in attributes) {
    attributes[key] = Array.from(attributes[key]);
  }

  // 2. Categorize data into primary and secondary attributes
  const attributeHeirarchy = categorizeData(attributes);

  // 3. Initialize variant data
  const variantLevels = Object.keys(attributes).length;
  const variants = {};
  const data = {};

  if (variantLevels === 2) {
    // Handle two-level variants
    variants.primaryAttribute = attributeHeirarchy.primary;
    variants.secondaryAttribute = attributeHeirarchy.secondary;

    product.sku_data.forEach((sku) => {
      const attributesMap = sku.attributes.reduce(
        (map, { master_attribute, value }) => {
          map[master_attribute] = value;
          return map;
        },
        {}
      );

      const prime = attributesMap[attributeHeirarchy.primary];
      const second = attributesMap[attributeHeirarchy.secondary];

      const { attributes, ...rest } = sku;
      if (!data[prime]) data[prime] = {};
      if (!data[prime][second])
        data[prime][second] = {
          ...rest,
          primaryAttribute: prime,
          secondaryAttribute: second,
        };

      const meta = data[prime]['meta'] || {};
      data[prime]['meta'] = {
        total: (meta.total || 0) + sku.inventory,
        maxPrice: Math.max(
          meta.maxPrice || sku.selling_price,
          sku.selling_price
        ),
        minPrice: Math.min(
          meta.minPrice || sku.selling_price,
          sku.selling_price
        ),
      };

      data[prime][second] = { ...data[prime][second], ...rest };
    });
  } else if (variantLevels === 1) {
    // Handle one-level variants
    variants.primaryAttribute = attributeHeirarchy.primary;
    variants.secondaryAttribute = attributeHeirarchy.secondary;

    product.sku_data.forEach((sku) => {
      const secondaryValue = sku.attributes.find(
        ({ master_attribute }) =>
          master_attribute === attributeHeirarchy.secondary
      )?.value;
      const { attributes, ...rest } = sku;

      //console.log("IshaMaya",secondaryValue);

      data[secondaryValue] = { ...rest, secondaryAttribute: secondaryValue };
    });
  } else {
    // Handle no variants
    variants.primaryLevelSelection = attributeHeirarchy.primary;
    variants.secondaryLevelSelection = attributeHeirarchy.secondary;

    product.sku_data.forEach((sku) => {
      const { attributes, ...rest } = sku;
      data.sku = { ...rest };
    });
  }

  console.log('Variants Data is: ', data);
  const result = { ...product, variants: { ...variants, data } };
  console.log('Returning: ', result);

  delete result.sku_data;
  return result;
}

function formatDate(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

function getCurrentTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0'); // Get hours (0-23)
  const minutes = String(now.getMinutes()).padStart(2, '0'); // Get minutes (0-59)
  const seconds = String(now.getSeconds()).padStart(2, '0'); // Get seconds (0-59)

  return `${hours}:${minutes}:${seconds}`;
}

function generateItemList(cartItems) {
  console.log('Capture sir', cartItems);

  return cartItems
    .map((cartItem, index) => {
      return `<tr>
          <td>${index + 1}</td>
          <td>
            <span class="itemName">${cartItem.name}</span>
            <table class="inner">
                <tr>
                    <td class="itemName varDetails">
                    ${
                      cartItem.variants.primaryAttribute
                        ? `<span>${
                            cartItem.variants.primaryAttribute +
                            ' : ' +
                            cartItem.selectedVariant.primaryAttribute
                          }</span>`
                        : ``
                    }
                    ${
                      cartItem.variants.secondaryAttribute
                        ? `<span>${
                            cartItem.variants.secondaryAttribute +
                            ' : ' +
                            cartItem.selectedVariant.secondaryAttribute
                          }</span>`
                        : ``
                    }
                    </td>
                </tr>
            </table>
          </td>
          <td class="centreAligned">${cartItem.quantityInCart}</td>
          <td class="centreAligned">${cartItem.selling_price}</td>
          <td class="centreAligned">${
            cartItem.quantityInCart * cartItem.selling_price
          }</td>
        </tr>`;
    })
    .join(''); // Join the array of strings into a single string
}

export function generateBillTemplate(invoiceDetails) {
  const { customerDetails, cart, discount, paymentMode } = invoiceDetails;

  const subtotal = cart.reduce((acc, item) => {
    return acc + item.selectedVariant.selling_price * item.quantityInCart;
  }, 0);

  const thermalPrintTemplate = `
    <html>
      <head>
          <style>
              .itemName {
                  text-align: right;
                  font-size: small;
              }
              .outer {
                  font-family: arial, sans-serif;
                  border-collapse: collapse;
                  width: 100%;
                  font-size: 14px;
              }
              td,
              th {
                  border: 1px solid #dddddd;
                  padding: 4px;
                  text-align: left;
              }
              td .itemName {
                  text-align: left;
              }
              tr:nth-child(even) {
                  background-color: #dddddd;
              }
              body {
                  width: 80mm;
              }
              .inner td,
              th {
                  border: none;
              }
              .varDetails {
                  font-size: smaller;
                  padding: 0;
              }
              .centreAligned {
                  text-align: center;
              }
              h4,
              h5,
              p {
                  margin: 2px;
              }
              .billHeader {
                  font-size: small;
                  font-family: 'Courier New', Courier, monospace;
              }
              .billHeader td {
                  border: none;
              }
              .footer {
                  float: right;
              }
              .footer td {
                  border: none;
                  font-size: large;
                  font-weight: bold;
                  font-family: 'Courier New', Courier, monospace;
                  padding-bottom:5px;
              }
              .instructions {
                  font-family: 'Courier New', Courier, monospace;
                  font-size: small;
                  font-weight: bolder;
                  margin-top: 10 px;
              }
              ul {
                  padding: 10px;
              }
              .rightAligned {
                  text-align: right;
              }
          </style>
      </head>

      <body>
          <div class="thermalPrinter">
              <h4 class="centreAligned">Singhal Uniforms</h4>
              <p class="centreAligned billHeader">Sant Nagar, Burari</p>
              <p class="centreAligned billHeader">www.singhaluniforms.com</p>
              <br />
              <table class="billHeader">
                  <tr>
                      <td>Date: </td>
                      <td>${formatDate(new Date())}, ${getCurrentTime()}</td>
                  </tr>
                  <tr>
                      <td>SalesMan: </td>
                      <td>SalesMan_01</td>
                  </tr>
                  ${
                    customerDetails.customerName
                      ? `<tr>
                      <td>Customer Name: </td>
                      <td>${customerDetails.customerName}</td>
                  </tr>
                  <tr>
                      <td>Customer Contact: </td>
                      <td>${customerDetails.customerPhone}</td>
                  </tr>`
                      : ''
                  }
              </table>
              
              <table class="outer">
                  <tr>
                      <th>SN.</th>
                      <th>Item</th>
                      <th>Qty</th>
                      <th>Price</th>
                      <th>Amount</th>
                  </tr>
                  ${generateItemList(cart)}
              </table>

              <hr />
              <table class="footer">
                  <tr>
                      <td>Actual Amount: </td>
                      <td>Rs.</td>
                      <td class="rightAligned">${subtotal}</td>
                  </tr>
                  ${
                    true
                      ? `<tr>
                      <td>Discount:</td>
                      <td>Rs.</td>
                      <td class="rightAligned">${discount}</td>
                    </tr>`
                      : ``
                  }
                  <tr>
                      <td>Final Amount:</td>
                      <td>Rs.</td>
                      <td class="rightAligned">${subtotal - discount}</td>
                  </tr>
                  <tr>
                      <td>Payment Mode:</td>
                      <td>Rs.</td>
                      <td class="rightAligned">${paymentMode}</td>
                  </tr>
              </table>
              
              <div class="instructions">
              <br>
                <p>Thanks For your purchase</p>
                <ul>
                  <li>Good once sold will only be replaced within 3 days of purchase</li>
                  <li>Return timings 12:00 PM to 3:00 PM</li>
                </ul>
              </div>
          </div>
      </body>
    </html>
`;

  return thermalPrintTemplate;
}

//Function To format Data for createSalesOrder
export function formatSalesRecordData(data) {
  const totalItems = data.cart.reduce((sum, item) => sum + parseInt(item.quantityInCart, 10), 0);
  const totalAmount = data.cart.reduce((sum, item) => sum + (parseFloat(item.selling_price) * parseInt(item.quantityInCart, 10)), 0);
  
  const products = data.cart.map(item => ({
    uuid: item.uuid,
    name: item.name,
    imageUrl: item.all_images[0] || "", // Assuming you want the first image URL
    sellingPrice: item.selling_price,
    categories: item.categories_data.map(cat => cat.name), // Extract category names
    quantity: item.quantityInCart
  }));

  const res =  {
    totalAmount,
    products: [...products],
    totalItems:totalItems,
    discount: parseFloat(data.discount),
    salesMan:data.salesMan,
    helper:"Mukul",
    type:"Retail",
    customer:data.customer,
    paymentMode: data.paymentMode
  };

  console.log("Mayank u got: ",res);

  return {
    totalAmount,
    products: [...products],
    totalItems:totalItems,
    discount: parseFloat(data.discount),
    salesMan:data.salesMan,
    helper:"Mukul",
    type:"Retail",
    customer:data.customer,
    paymentMode: data.paymentMode
  };
}

//3 digit token generator
export const tokenGenerator = () => {
  return Math.floor(100 + Math.random() * 900);
};

//The following function will make api call
export const setCurrentOrderToDone = async (id,status) => {
  try {
    const response = await fetch('/api/ssu/salesAssignment', { // Replace with your actual endpoint
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, status }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    //setMessage(`Record updated: ${JSON.stringify(data.updatedSalesAssignment)}`);
  } catch (error) {
    console.error('Error updating record:', error);
    //setMessage('Failed to update record');
  }
};