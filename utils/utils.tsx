// @ts-nocheck

export function generateVariantsData(product) {
  //1. find how many types of variants exist.This is specific to product data object
  //and needs to be changed.
  let attributes = {};

  //   Loop through each item in the data
  product.sku_data.forEach((item) => {
    item.attributes.forEach((attr) => {
      // Initialize the array for the attribute type if it doesn't exist
      if (!attributes[attr.master_attribute]) {
        attributes[attr.master_attribute] = [];
      }
      // Add the value to the array if it's not already present
      if (!attributes[attr.master_attribute].includes(attr.value)) {
        attributes[attr.master_attribute].push(attr.value);
      }
    });
  });

  console.log("Attributes are: ",attributes);

  // we have found existing attributes, for products that have 2 level variants we have
  //   {
  //     sleeve:['HS','FS'],
  //     size: [22,24]
  //   }

  //now create object considering 2 available variants. 1 variant and no variant

  let variantLevels = Object.keys(attributes).length;

  let primaryAttribute = findKeyWithSmallestArray(attributes);

  let variantsInfo={}
  let variantsData = {};

  if (variantLevels == 2) {
    //construct object
    variantsInfo["primaryAttribute"]=true;
    variantsInfo["secondaryAttribute"]=true;
    
    //loop again to make that new
    product.sku_data.forEach((item) => {
      let prime = ''; // Initialize prime
      let second = ''; // Initialize second

      // Loop through each attribute of the item
      item.attributes.forEach((attr) => {
        if (attr.master_attribute === primaryAttribute) {
          prime = attr.value;
        } else {
          second = attr.value;
        }
      });

      // Initialize nested objects if they don't exist
      if (!variantsData[prime]) {
        variantsData[prime] = {};
      }

      // Assign the UUID to the correct place in the variantsData object
      variantsData[prime][second] = {
        uuid: item.uuid,
        qty: item.inventory,
        original_price: item.original_price,
        selling_price: item.selling_price,
      };
      variantsData[prime]['zeta'] = {
        total: variantsData[prime]['zeta']?.total
          ? variantsData[prime]['zeta'].total + item.inventory
          : 0 + item.inventory,
        maxPrice: variantsData[prime]['zeta']?.maxPrice
          ? Math.max(variantsData[prime]['zeta'].maxPrice, item.selling_price)
          : item.selling_price,
        minPrice: variantsData[prime]['zeta']?.minPrice
          ? Math.min(variantsData[prime]['zeta'].minPrice, item.selling_price)
          : item.selling_price,
      };
    });
  } else if (variantLevels == 1) {
    variantsInfo["primaryAttribute"]=false;
    variantsInfo["secondaryAttribute"]=true;
    //construct object 
    product.sku_data.forEach(item => {
        // Loop through each attribute of the item
        let prime = "";
        item.attributes.forEach(attr => {
           // Assign the UUID to the correct place in the variantsData object
            if (attr.master_attribute === primaryAttribute) {
                prime = attr.value;
            }
        });
        variantsData[prime] = {
            uuid: item.uuid,
            qty: item.inventory,
            original_price: item.original_price,
            selling_price: item.selling_price
        };
    });
  } else {
    variantsInfo["primaryLevelSelection"]=false;
    variantsInfo["secondaryLevelSelection"]=false;
    //construct object
    product.sku_data.forEach(item => {
        // Loop through each attribute of the item
        variantsData['item'] = {
            uuid: item.uuid,
            qty: item.inventory,
            original_price: item.original_price,
            selling_price: item.selling_price
        };
    });
  }
  console.log("Variants Data is: ",variantsData);
  variantsInfo = {...variantsInfo,variantsData};
  console.log("Returning: ",variantsInfo)
  return variantsInfo;
}

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

export function generateVariantsData_(product) {
  console.log("Ishika: ",product)
  //1. find how many types of variants exist.This is specific to product data object
  //and needs to be changed.
  let attributes = {};

  //   Loop through each item in the data
  product.sku_data.forEach((item) => {
    item.attributes.forEach((attr) => {
      // Initialize the array for the attribute type if it doesn't exist
      if (!attributes[attr.master_attribute]) {
        attributes[attr.master_attribute] = [];
      }
      // Add the value to the array if it's not already present
      if (!attributes[attr.master_attribute].includes(attr.value)) {
        attributes[attr.master_attribute].push(attr.value);
      }
    });
  });

  console.log("Attributes are: ",attributes);

  // we have found existing attributes, for products that have 2 level variants we have
  //   {
  //     sleeve:['HS','FS'],
  //     size: [22,24]
  //   }

  //now create object considering 2 available variants. 1 variant and no variant

  let variantLevels = Object.keys(attributes).length;

  let attributeHeirarchy = categorizeData(attributes);

  let variantsInfo={}
  let variantsData = {};

  if (variantLevels == 2) {
    //construct object
    variantsInfo["primaryAttribute"]=attributeHeirarchy.primary;
    variantsInfo["secondaryAttribute"]=attributeHeirarchy.secondary ;
    
    //loop again to make that new
    product.sku_data.forEach((item) => {
      let prime = ''; // Initialize prime
      let second = ''; // Initialize second

      // Loop through each attribute of the item
      item.attributes.forEach((attr) => {
        if (attr.master_attribute === attributeHeirarchy.primary) {
          prime = attr.value;
        } else {
          second = attr.value;
        }
      });

      // Initialize nested objects if they don't exist
      if (!variantsData[prime]) {
        variantsData[prime] = {};
      }

      // Assign the UUID to the correct place in the variantsData object
      variantsData[prime][second] = {
        uuid: item.uuid,
        qty: item.inventory,
        original_price: item.original_price,
        selling_price: item.selling_price,
      };
      variantsData[prime]['meta'] = {
        total: variantsData[prime]['meta']?.total
          ? variantsData[prime]['meta'].total + item.inventory
          : 0 + item.inventory,
        maxPrice: variantsData[prime]['meta']?.maxPrice
          ? Math.max(variantsData[prime]['meta'].maxPrice, item.selling_price)
          : item.selling_price,
        minPrice: variantsData[prime]['meta']?.minPrice
          ? Math.min(variantsData[prime]['meta'].minPrice, item.selling_price)
          : item.selling_price,
      };
    });
  } else if (variantLevels == 1) {
    variantsInfo["primaryAttribute"]=attributeHeirarchy.primary;
    variantsInfo["secondaryAttribute"]=attributeHeirarchy.secondary;
    //construct object 
    product.sku_data.forEach(item => {
        // Loop through each attribute of the item
        let second = "";
        item.attributes.forEach(attr => {
           // Assign the UUID to the correct place in the variantsData object
            if (attr.master_attribute === attributeHeirarchy.secondary) {
                second = attr.value;
            }
        });
        variantsData[second] = {
            uuid: item.uuid,
            qty: item.inventory,
            original_price: item.original_price,
            selling_price: item.selling_price
        };
    });
  } else {
    variantsInfo["primaryLevelSelection"]=attributeHeirarchy.primary;
    variantsInfo["secondaryLevelSelection"]=attributeHeirarchy.secondary;
    //construct object
    product.sku_data.forEach(item => {
        // Loop through each attribute of the item
        variantsData['item'] = {
            uuid: item.uuid,
            qty: item.inventory,
            original_price: item.original_price,
            selling_price: item.selling_price
        };
    });
  }
  console.log("Variants Data is: ",variantsData);
  variantsInfo = {...variantsInfo,variantsData};
  console.log("Returning: ",variantsInfo)
  return variantsInfo;
}

export function generateVariantsData_2(product) {
  console.log("Ishika: ",product)
  //1. find how many types of variants exist.This is specific to product data object
  //and needs to be changed.
  let attributes = {};

  //   Loop through each item in the data
  product.sku_data.forEach((item) => {
    item.attributes.forEach((attr) => {
      // Initialize the array for the attribute type if it doesn't exist
      if (!attributes[attr.master_attribute]) {
        attributes[attr.master_attribute] = [];
      }
      // Add the value to the array if it's not already present
      if (!attributes[attr.master_attribute].includes(attr.value)) {
        attributes[attr.master_attribute].push(attr.value);
      }
    });
  });
  // we have found existing attributes, for products that have 2 level variants we have
  //   {
  //     sleeve:['HS','FS'],
  //     size: [22,24]
  //   }

  //now create object considering 2 available variants. 1 variant and no variant

  let variantLevels = Object.keys(attributes).length;

  let attributeHeirarchy = categorizeData(attributes);

  // {
  //   primary:"sleeve",
  //   secondary:"24"
  // }

  let variants={}
  let data = {};

  if (variantLevels == 2) {
    //construct object
    variants["primaryAttribute"]=attributeHeirarchy.primary;
    variants["secondaryAttribute"]=attributeHeirarchy.secondary ;
    
    //loop again to make that new
    product.sku_data.forEach((sku) => {
      let prime = ''; // Initialize prime
      let second = ''; // Initialize second

      // Loop through each attribute of the sku
      sku.attributes.forEach((attr) => {
        if (attr.master_attribute === attributeHeirarchy.primary) {
          prime = attr.value;
        } else {
          second = attr.value;
        }
      });

      // Initialize nested objects if they don't exist
      if (!data[prime]) {
        data[prime] = {};
      }

      // Assign the UUID to the correct place in the data object

      const newSkuObject = (() => {
        const { attributes, ...rest } = sku; // Destructure to exclude 'attributes'
        return rest; // Return the new object without 'attributes'
      })();


      data[prime][second] = newSkuObject;

      data[prime]['meta'] = {
        total: data[prime]['meta']?.total
          ? data[prime]['meta'].total + sku.inventory
          : 0 + sku.inventory,
        maxPrice: data[prime]['meta']?.maxPrice
          ? Math.max(data[prime]['meta'].maxPrice, sku.selling_price)
          : sku.selling_price,
        minPrice: data[prime]['meta']?.minPrice
          ? Math.min(data[prime]['meta'].minPrice, sku.selling_price)
          : sku.selling_price,
      };
    });
  } else if (variantLevels == 1) {
    variants["primaryAttribute"]=attributeHeirarchy.primary;
    variants["secondaryAttribute"]=attributeHeirarchy.secondary;
    //construct object 
    product.sku_data.forEach(sku => {
        // Loop through each attribute of the sku
        let second = "";
        sku.attributes.forEach(attr => {
           // Assign the UUID to the correct place in the data object
            if (attr.master_attribute === attributeHeirarchy.secondary) {
                second = attr.value;
            }
        });

        const newSkuObject = (() => {
          const { attributes, ...rest } = sku; // Destructure to exclude 'attributes'
          return rest; // Return the new object without 'attributes'
        })();
  
        data[second] = newSkuObject;

    });
  } else {
    variants["primaryLevelSelection"]=attributeHeirarchy.primary;
    variants["secondaryLevelSelection"]=attributeHeirarchy.secondary;
    //construct object
    product.sku_data.forEach(sku => {
        // Loop through each attribute of the sku
        data['sku'] = {
            uuid: sku.uuid,
            qty: sku.inventory,
            original_price: sku.original_price,
            selling_price: sku.selling_price
        };
    });
  }
  console.log("Variants Data is: ",data);
  variants = {...variants,data};
  console.log("Returning: ",variants)
  delete product["sku_data"];
  return {...product,variants};
}

export function generateVariantsData_22(product) {
  console.log("Ishika: ", product);

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
  const data = {};
  const variants = {};

  if (variantLevels === 2) {
    // Handle two-level variants
    variants.primaryAttribute = attributeHeirarchy.primary;
    variants.secondaryAttribute = attributeHeirarchy.secondary;

    product.sku_data.forEach((sku) => {
      const attributesMap = sku.attributes.reduce((map, { master_attribute, value }) => {
        map[master_attribute] = value;
        return map;
      }, {});

      const prime = attributesMap[attributeHeirarchy.primary];
      const second = attributesMap[attributeHeirarchy.secondary];

      const { attributes, ...rest } = sku;
      if (!data[prime]) data[prime] = {};
      if (!data[prime][second]) data[prime][second] = { ...rest };

      const meta = data[prime]['meta'] || {};
      data[prime]['meta'] = {
        total: (meta.total || 0) + sku.inventory,
        maxPrice: Math.max(meta.maxPrice || sku.selling_price, sku.selling_price),
        minPrice: Math.min(meta.minPrice || sku.selling_price, sku.selling_price),
      };

      data[prime][second] = { ...data[prime][second], ...rest };
    });
  } else if (variantLevels === 1) {

    // Handle one-level variants
    variants.primaryAttribute = attributeHeirarchy.primary;
    variants.secondaryAttribute = attributeHeirarchy.secondary;

    product.sku_data.forEach((sku) => {
      const secondaryValue = sku.attributes.find(({ master_attribute }) => master_attribute === attributeHeirarchy.secondary)?.value;
      const { attributes, ...rest } = sku;

      data[secondaryValue] = { ...rest };
    });
  } else {
    // Handle no variants
    variants.primaryLevelSelection = attributeHeirarchy.primary;
    variants.secondaryLevelSelection = attributeHeirarchy.secondary;

    product.sku_data.forEach((sku) => {
      const { attributes, ...rest } = sku;
      data.sku = {...rest}
    });
  }

  console.log("Variants Data is: ", data);
  const result = { ...product, variants: { ...variants, data } };
  console.log("Returning: ", result);

  delete result.sku_data;
  return result;
}

