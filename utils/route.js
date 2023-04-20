import { decodeData } from "./compress";
import { generateMessage } from "./message";

/**
 * `getServersideProps` function to get template, data and message from url
 * @param {*} context 
 * @returns {Object} { template, data, message, url }
 * @example
 * ```js
 * // pages/example.js
 * export const getServerSideProps = getDataFromUrl;
 * ```
 */
export async function getDataFromUrl(context) {
  let { template, data, message } = context.query;
  
  if (template && data) {
    data = decodeData(template, data);
    message = generateMessage(template, data);
  }

  return {
    props: { template, data, message, url: context.resolvedUrl },
  };
}
