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

  console.log("Mayank you asked for: ",product)

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

