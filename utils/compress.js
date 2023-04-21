const zlib = require("zlib");
/**
 * Compress and encode data to base64url string
 * @param {string} template
 * @param {Object} data
 * @returns {string} compressedData
 */
export function encodeData(template, data) {
  // Compress data to an array of values based on the order in the template
  data = compressToArray(template, { ...data });
  // Compress the array with gzip and encode to base64url
  // return zlib.gzipSync(JSON.stringify(data)).toString("base64url"); // Unknown encoding: base64url
  return zlib.gzipSync(JSON.stringify(data)).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

/**
 * Decode and decompress data from base64url string
 * @param {string} template
 * @param {string} base64String
 * @returns {Object} decompressedData
 */
export function decodeData(template, base64String) {
  // Decode base64url and decompress with gunzip
  const data = zlib
    .gunzipSync(Buffer.from(base64String, "base64"))
    .toString("utf8");
  // Decompress the array to an object based on the order in the template
  return decompressFromArray(template, JSON.parse(data));
}

/**
 * Compress data to an array of values based on the order in the template
 * @param {string} template
 * @param {Object} data
 * @returns {Array} compressedData
 * @example
 * ```js
 * const data = {background: "/images/background/horizontal/background-16.png", color: "#6FAEAC", buttons: Array(2), ...}
 * const compressedData = compress("namecard_horizontal", data);
 * // ["/images/background/horizontal/background-16.png","#6FAEAC",1,"https://yourwebsite.com", ... ]
 * ```
 */
function compressToArray(template, data) {
  // Compress data.buttons
  if (data.buttons) {
    data.buttons = data.buttons.map((button) =>
      compressToArray("button", button)
    );
  }
  // load json string from template
  const templateString = JSON.stringify(
    require(`/assets/template/` + template + `.json`)
  );

  let placeholder = new Set();
  let compressedData = [];

  // For each unique placeholder, save the data to compressedData
  templateString.replace(/\${data.(\w+)}/g, (match, key) => {
    if (!placeholder.has(key)) {
      placeholder.add(key);
      compressedData.push(data[key]);
    }
  });

  return compressedData;
}

/**
 * Decompress data from an array of values based on the order in the template
 * @param {string} template
 * @param {Array} data
 * @returns {Object} decompressedData
 * @example
 * ```js
 * const data = ["/images/background/horizontal/background-16.png","#6FAEAC",1,"https://yourwebsite.com", ... ];
 * const decompressedData = decompressFromArray("namecard_horizontal", data);
 * // {background: "/images/background/horizontal/background-16.png", color: "#6FAEAC", buttons: Array(2), ...}
 */
function decompressFromArray(template, data) {
  // load json string from template
  const templateString = JSON.stringify(
    require("/assets/template/" + template + ".json")
  );

  let placeholder = new Set();
  let decompressedData = {};

  // For each unique placeholder, save the data to decompressedData
  templateString.replace(/\${data.(\w+)}/g, (match, key) => {
    if (!placeholder.has(key)) {
      placeholder.add(key);
      if (data[0] != undefined) decompressedData[key] = data[0];
      data.shift();
    }
  });

  // Decompress data.buttons
  if (decompressedData.buttons) {
    decompressedData.buttons = decompressedData.buttons.map((button) =>
      decompressFromArray("button", button)
    );
  }

  return decompressedData;
}
