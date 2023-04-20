export function generateMessage(templateName, data) {
  // load json string from template
  const template = require(`../assets/template/${templateName}.json`);
  const dataCopy = { ...data };

  if (data.textColor) {
    dataCopy.companyColor = data.companyColor || data.textColor;
    dataCopy.nameColor = data.nameColor || data.textColor;
  }

  // Replace background image path with absolute path
  if (data.backgroundUrl && data.backgroundUrl.startsWith("/images")) {
    dataCopy.backgroundUrl = `${process.env.LIFF_URL}${data.backgroundUrl}`;
  }
  let message = JSON.stringify(template);

  // Highlight title
  if (data.highlightTitle == true) {
    message = message.replace(
      '{"size":"xxs","text":"${data.jobTitle} ${data.jobTitleEN}","type":"text","color":"${data.textColor}","wrap":true},',
      '{"type":"box","layout":"horizontal","contents":[{"type":"box","layout":"vertical","flex":0,"backgroundColor":"${data.textColor}","paddingStart":"sm","paddingEnd":"sm","contents":[{"size":"xxs","text":"${data.title} ${data.titleEN}","type":"text","color":"#ffffff","wrap":true}]}]},'
    );
  }

  if (data.buttons && data.buttons.length > 0) {
    dataCopy.buttons = [];
    data.buttons.forEach((button, _) => {
      dataCopy.buttons.push(generateMessage("button", button));
    });
    // Remove '[' & ']' in beginning and the end of the string
    dataCopy.buttons = JSON.stringify(dataCopy.buttons).slice(1, -1);
  }
  
  // Replace all placeholder `${data.key}` with value from `data[key]`
  // For example, if `data` is { name: "John" }, then ${data.name} will be replaced with "John"
  
  message = message
    .replace('"${data.buttons}"', dataCopy.buttons)
    .replace('"${data.flex}"', dataCopy.flexValue)
    .replace(/\${data.(\w+)}/g, (match, key) => dataCopy[key])
  
  return JSON.parse(message);
}
