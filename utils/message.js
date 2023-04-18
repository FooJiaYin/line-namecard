export function getBackgroundImagePath(imageId, orientation = "horizontal") {
  return `${process.env.LIFF_URL}/images/background/${orientation}/background-${imageId}.png`;
}

export function generateMessage(templateName, data) {
  // load json string from template
  const template = require(`../assets/template/${templateName}.json`);
  const dataCopy = {
    ...data,
    companyColor: data.companyColor || data.textColor,
    nameColor: data.nameColor || data.textColor,
  };
  if (data.backgroundUrl && data.backgroundUrl.startsWith("/images")) {
    dataCopy.backgroundUrl = `${process.env.LIFF_URL}${data.backgroundUrl}`;
  }
  // Replace all placeholder `${data.key}` with value from `data[key]`
  // For example, if `data` is { name: "John" }, then ${data.name} will be replaced with "John"
  const message = JSON.stringify(template).replace(
    /\${data.(\w+)}/g,
    (match, key) => dataCopy[key]
  );
  return JSON.parse(message);
}
