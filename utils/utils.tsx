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

  // we have found existing attributes, for products that have 2 level variants we have
  //   {
  //     sleeve:['HS','FS'],
  //     size: [22,24]
  //   }

  //now create object considering 2 available variants. 1 variant and no variant

  let variantsAvailable = Object.keys(attributes).length;

  let PrimaryAttribute = findKeyWithSmallestArray(attributes);

  let variantsInfo={}
  let variantsData = {};

  if (variantsAvailable == 2) {
    //construct object
    variantsInfo["primaryLevelSelection"]=true;
    variantsInfo["secondaryLevelSelection"]=true;
    
    //loop again to make that new
    product.sku_data.forEach((item) => {
      let prime = ''; // Initialize prime
      let second = ''; // Initialize second

      // Loop through each attribute of the item
      item.attributes.forEach((attr) => {
        if (attr.master_attribute === PrimaryAttribute) {
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
  } else if (variantsAvailable == 1) {
    variantsInfo["primaryLevelSelection"]=false;
    variantsInfo["secondaryLevelSelection"]=true;
    //construct object 
    product.sku_data.forEach(item => {
        // Loop through each attribute of the item
        let prime = "";
        item.attributes.forEach(attr => {
           // Assign the UUID to the correct place in the variantsData object
            if (attr.master_attribute === PrimaryAttribute) {
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
