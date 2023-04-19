export function generateMessage(templateName, data) {
  // load json string from template
  const template = require(`../assets/template/${templateName}.json`);
  const dataCopy = {
    ...data,
    companyColor: data.companyColor || data.textColor,
    nameColor: data.nameColor || data.textColor,
  };

  // Replace background image path with absolute path
  if (data.backgroundUrl && data.backgroundUrl.startsWith("/images")) {
    dataCopy.backgroundUrl = `${process.env.LIFF_URL}${data.backgroundUrl}`;
  }
  let message = JSON.stringify(template)
  
  // Highlight title
  if (data.highlightTitle == true) {
    message = message.replace(
      '{"size":"xxs","text":"${data.title} ${data.titleEN}","type":"text","color":"${data.textColor}","wrap":true},',
      '{"type":"box","layout":"horizontal","contents":[{"type":"box","layout":"vertical","flex":0,"backgroundColor":"${data.textColor}","paddingStart":"sm","paddingEnd":"sm","contents":[{"size":"xxs","text":"${data.title} ${data.titleEN}","type":"text","color":"#ffffff","wrap":true}]}]},'
      )
    }
    
  // Replace all placeholder `${data.key}` with value from `data[key]`
  // For example, if `data` is { name: "John" }, then ${data.name} will be replaced with "John"
  message = message.replace(
    /\${data.(\w+)}/g,
    (match, key) => dataCopy[key]
  ).replace(
    /"flex":"(\d+)"/g,
    (match, flexValue) => `"flex":${flexValue}`
  );
  
  return JSON.parse(message);
}
