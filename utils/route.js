import { decodeData, encodeData } from "./compress";
import { generateMessage } from "./message";

/**
 * `getServersideProps` function to get template, data and message from url
 * @param {*} context 
 * @returns {Object} { template, code, data, message, url }
 * @example
 * ```js
 * // pages/example.js
 * export const getServerSideProps = getDataFromUrl;
 * ```
 */
export async function getDataFromUrl(context) {
  let { template, code, data, message } = context.query;

  if (template && code) {
    data = decodeData(template, code);
    message = generateMessage(template, data);
  } else {
    // The code below fixes Error: Error serializing `.data` returned from `getServerSideProps`.
    // Reason: `undefined` cannot be serialized as JSON. Please use `null` or omit this value.
    data = null;
    message = null;
  }

  return {
    props: { ...context.query, data, message, url: context.resolvedUrl },
  };
}

/**
 * Get url from template and data or code
 * @param {string} mode 
 * @param {string} template 
 * @param {Object} { data, code } 
 * @param {string} domain: process.env.LIFF_URL or process.env.DOMAIN_URL
 * @returns {string} url
 * @example
 * ```js
 * const url = getUrl("create", "namecard-horizontal", { data: formData });
 * // "https://line-namecard.netlify.app/create/namecard-horizontal?code=..."
 * const url = getUrl("share", "namecard-horizontal", { code });
 * // "https://line-namecard.netlify.app/share?template=namecard-horizontal&code=..."
 * liff.login({ 
 *     redirectUri: getUrl("send", "namecard-horizontal", { code }, domain=process.env.DOMAIN_URL)
 *  });
 * // "https://line-namecard.netlify.app/share/namecard-horizontal?code=...&send=1"
 * ```
 */
export function getUrl(mode, template, { data, code }, domain=process.env.LIFF_URL) {
  code = code ?? encodeData(template, data);
  let send = mode == "send" ? "&send=1" : "";
  return domain + (mode == "create" ? `/create/${template}?code=${code}` : `/share?template=${template}&code=${code}${send}`);
}