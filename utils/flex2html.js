/**
 * Convert LINE Flex message to HTML
 * @param {*} json 
 * @returns {string} HTML string
 * @example
 * ```js
 * // React
 * import { flex2html } from 'flex2html'
 * <div dangerouslySetInnerHTML={{ __html: flex2html(flex_message) }} />
 * // Vanilla JS
 * <div id="element_id"></div>
 * <script type="text/javascript" src="flex2html.js"></script>
 * <script>
 *    document.getElementById(element_id).innerHTML = flex2html(flex_message)
 * </script>
 * ```
 */
export function flex2html(json) {
    let carousel = carousel_struc()
    let result = ''
    if (!json) return ''
 
    if(json['type'] === 'flex') {
       json = json['contents']
    }

	 if(json['type'] === 'bubble') {
    	result = bubble_object(json)
      carousel = result
    } else if(json['type'] === 'carousel') {
      json['contents'].forEach((obj, index) => {
         let result = bubble_object(obj)
         result = result.replace('<!-- content -->', '')
         result = result.replace('<!-- inner -->', '')
         carousel = carousel.replace('<!-- inner -->', result + '<!-- inner -->')
    	})
   }
    
    return carousel
 }
 
 function bubble_object(json) {
    let { hero, header, body, footer } = json
    let hero_object = hero_struc(json)
    let header_object = header_struc(json)
    let body_object = body_struc(json)
    let footer_object = footer_struc(json)
    let bubble = bubble_struc(json)
 
    let box = ''
    for(let key in hero){
       if(hero.hasOwnProperty(key)) {
          if(key === 'type' && hero[key] === 'box') {
             box = box_object(hero)
             let box_inner = box_recursive(box, hero['contents'])
             box = box_inner
          } else {
             box = convert_object(hero)
          }
       }
    }
    hero_object = hero_object.replace('<!-- inner -->', box)
 
    box = ''
    for(let key in header){
       if(header.hasOwnProperty(key)) {
          if(key === 'type' && header[key] === 'box') {
             box = box_object(header)
             let box_inner = box_recursive(box, header['contents'])
             box = box_inner
          }
       }
    }
    header_object = header_object.replace('<!-- inner -->', box)
 
    box = ''
    for(let key in body){
       if(body.hasOwnProperty(key)) {
          if(key === 'type' && body[key] === 'box') {
             box = box_object(body)
             let box_inner = box_recursive(box, body['contents'])
             box = box_inner
          }
       }
    }
    body_object = body_object.replace('<!-- inner -->', box)
 
    box = ''
    for(let key in footer){
       if(footer.hasOwnProperty(key)) {
          if(key === 'type' && footer[key] === 'box') {
             box = box_object(footer)
             let box_inner = box_recursive(box, footer['contents'])
             box = box_inner
          }
       }
    }
    footer_object = footer_object.replace('<!-- inner -->', box)
    
 
    bubble = bubble.replace('<!-- hero -->', hero_object)
    bubble = bubble.replace('<!-- header -->', header_object)
    bubble = bubble.replace('<!-- body -->', body_object)
    bubble = bubble.replace('<!-- footer -->', footer_object)
    
    return bubble
 }
 function box_recursive(parent_box, json, layout='vertical') {
    let result = []
    json.forEach((obj, index) => {
       let temp
       obj.parent_layout = layout
       if(obj['type'] === 'box') {
          let temp2 = box_object(obj)
          temp = box_recursive(temp2, obj['contents'], obj['layout'])
       } else if(obj['type'] === 'text' && obj['contents'] && obj['contents'].length > 0 ) {
          let temp2 = convert_object(obj)
          temp = box_recursive(temp2, obj['contents'], 'horizontal')
       } else {
          temp = convert_object(obj)
       }
       result[index] = temp
    })
    json.forEach((obj, index) => {
       result[index] = result[index].replace('<!-- content -->', '')
       parent_box = parent_box.replace('<!-- content -->', result[index] + '<!-- content -->')
    })
 
    return parent_box
 }
 
 function convert_object(json) {
   let object
    switch(json['type']) {
       case 'image':
          object = image_object(json)
          break;
       case 'icon':
          object = icon_object(json)
          break;
       case 'text':
          object = text_object(json)
          break;
       case 'span':
          object = span_object(json)
          break;
       case 'button':
          object = button_object(json)
          break;
       case 'filler':
          object = filler_object(json)
          break;
       case 'spacer':
          object = spacer_object(json)
          break;
       case 'separator':
          object = separator_object(json)
          break;
       default:
          object = null
    }
    return object
 }

 function get_margin(parent_layout, margin, style) {
   let exmgn = ''
    if(margin && margin.indexOf("px") >= 0) {
      if (parent_layout === 'horizontal') {
         style += `margin-left:${margin};`
      } else {
         style += `margin-top:${margin};`
      }
       exmgn = ''
    } else {
      if (parent_layout === 'horizontal') {
         exmgn = (margin) ? 'ExMgnL' + upperalldigit(margin) : ''
      } else {
         exmgn = (margin) ? 'ExMgnT' + upperalldigit(margin) : ''
      }
    }
   return {style, exmgn};
 }
 
 function box_object(json) {
    let style = ''
    let layout1, layout2
    let { layout, position, flex, spacing, margin, width, height, backgroundColor, borderColor, borderWidth, cornerRadius, justifyContent, alignItems, offsetTop, offsetBottom, offsetStart, offsetEnd, paddingAll, paddingTop, paddingBottom, paddingStart, paddingEnd, background, maxWidth, maxHeight} = json
    if(layout === 'baseline') {
       layout1 = 'hr'
       layout2 = 'bl'
    } else if(layout === 'horizontal') {
       layout1 = 'hr'
       layout2 = ''
    } else if(layout === 'vertical') {
       layout1 = 'vr'
       layout2 = ''
    }
    let fl = ''
    if(flex > 3) {
       style += `-webkit-box-flex:${flex};flex-grow:${flex};`
    } else {
       fl = (flex >= 0) ? `fl${flex}` : ''
    }
   let exabs = (position === 'absolute') ? 'ExAbs' : ''

   let spc = ''
    if(spacing && spacing.indexOf("px") >= 0) {
       spc = ''
    } else {
       spc = (spacing) ? 'spc' + upperalldigit(spacing) : ''
    }
    
   //  let { _style, exmgn } = get_margin(json.parent_layout, margin, style)
    let exmgn = ''
    if(margin && margin.indexOf("px") >= 0) {
      if (json.parent_layout === 'horizontal') {
         style += `margin-left:${margin};`
      } else {
         style += `margin-top:${margin};`
      }
       exmgn = ''
    } else {
      if (json.parent_layout === 'horizontal') {
         exmgn = (margin) ? 'ExMgnL' + upperalldigit(margin) : ''
      } else {
         exmgn = (margin) ? 'ExMgnT' + upperalldigit(margin) : ''
      }
    }

    if(width && width !== '') {
       style += `width:${width}; max-width:${width};`
    }
    if(height && height !== '') {
       style += `height:${height};`
    }
    if(backgroundColor) {
       style += `background-color:${backgroundColor} !important;`
    }
    if(borderColor) {
       style += `border-color:${borderColor} !important;`
    }
 
    let ExBdr = ''
    if(borderColor && borderWidth && borderWidth.indexOf("px") >= 0) {
       style += `border-width:${borderWidth}; border-style:solid;`
    } else {
       switch(borderWidth) {
          case 'none':
             ExBdr = 'ExBdrWdtNone'
             break;
          case 'light':
             ExBdr = 'ExBdrWdtLgh'
             break;
          case 'normal':
             ExBdr = 'ExBdrWdtNml'
             break;
          case 'medium':
             ExBdr = 'ExBdrWdtMdm'
             break;
          case 'semi-bold':
             ExBdr = 'ExBdrWdtSbd'
             break;
          case 'bold':
             ExBdr = 'ExBdrWdtBld'
             break;
          default:
             ExBdr = ''
             // code block
          }
    }
    let ExBdrRad = ''
    if(cornerRadius && cornerRadius.indexOf("px") >= 0) {
       style += `border-radius:${cornerRadius};`
    } else {
       ExBdrRad = (cornerRadius) ? 'ExBdrRad' + upperalldigit(cornerRadius) : ''
    }
    
    let jfc = ''
    if(justifyContent && justifyContent !== '') {
       switch(justifyContent) {
          case 'center':
             jfc = 'itms-jfcC'
             break;
          case 'flex-start':
             jfc = 'itms-jfcS'
             break;
          case 'flex-end':
             jfc = 'itms-jfcE'
             break;
          case 'space-between':
             jfc = 'itms-jfcSB'
             break;
          case 'space-around':
             jfc = 'itms-jfcSA'
             break;
          case 'space-evenly':
             jfc = 'itms-jfcSE'
             break;
          default:
             jfc = ''
             // code block
          }
    }
    let alg = ''
    if(alignItems && alignItems !== '') {
       switch(alignItems) {
          case 'center':
             alg = 'itms-algC'
             break;
          case 'flex-start':
             alg = 'itms-algS'
             break;
          case 'flex-end':
             alg = 'itms-algE'
             break;
          default:
             alg = ''
             // code block
          }
    }
    let ext = ''
    if(offsetTop && offsetTop.indexOf("px") >= 0) {
       style += `top:${offsetTop};`
    } else {
       ext = (offsetTop) ? 'ExT' + upperalldigit(offsetTop) : ''
    }
 
    let exb = ''
    if(offsetBottom && offsetBottom.indexOf("px") >= 0) {
       style += `bottom:${offsetBottom};`
    } else {
       exb = (offsetBottom) ? 'ExB' + upperalldigit(offsetBottom) : ''
    }
 
    let exl = ''
    if(offsetStart && offsetStart.indexOf("px") >= 0) {
       style += `left:${offsetStart};`
    } else {
       exl = (offsetStart) ? 'ExL' + upperalldigit(offsetStart) : ''
    }
 
    let exr = ''
    if(offsetEnd && offsetEnd.indexOf("px") >= 0) {
       style += `right:${offsetEnd};`
    } else {
       exr = (offsetEnd) ? 'ExR' + upperalldigit(offsetEnd) : ''
    }
 
    let ExPadA = ''
    if(paddingAll && paddingAll.indexOf("px") >= 0) {
       style += `padding:${paddingAll};`
    } else {
       ExPadA = (paddingAll) ? 'ExPadA' + upperalldigit(paddingAll) : ''
    }
 
    let ExPadT = ''
   if(paddingTop && paddingTop.indexOf("px") >= 0) {
       style += `padding-top:${paddingTop};`
    } else {
       ExPadT = (paddingTop) ? 'ExPadT' + upperalldigit(paddingTop) : ''
    }
 
    let ExPadB = ''
    if(paddingBottom && paddingBottom.indexOf("px") >= 0) {
       style += `padding-bottom:${paddingBottom};`
    } else {
       ExPadB = (paddingBottom) ? 'ExPadB' + upperalldigit(paddingBottom) : ''
    }
 
    let ExPadL = ''
    if(paddingStart && paddingStart.indexOf("px") >= 0) {
       style += `padding-left:${paddingStart};`
    } else {
       ExPadL = (paddingStart) ? 'ExPadL' + upperalldigit(paddingStart) : ''
    }
 
    let ExPadR = ''
    if(paddingEnd && paddingEnd.indexOf("px") >= 0) {
       style += `padding-right:${paddingEnd};`
    } else {
       ExPadR = (paddingEnd) ? 'ExPadR' + upperalldigit(paddingEnd) : ''
    }
 
    if(background && background.type === 'linearGradient') {
       centerPosition = (background.centerPosition) ? background.centerPosition : '50%'
       if(background.centerColor) {
          style += `background: linear-gradient(${background.angle}, ${background.startColor} 0%, ${background.centerColor} ${centerPosition}, ${background.endColor} 100%);`
       } else {
          style += `background: linear-gradient(${background.angle}, ${background.startColor} 0%, ${background.endColor} 100%);`
       }
    }
    if(maxWidth && maxWidth.indexOf("px") >= 0) {
       style += `max-width:${maxWidth};`
    }
    if(maxHeight && maxHeight.indexOf("px") >= 0) {
       style += `max-height:${maxHeight};`
    }
    
    return `<div class="MdBx ${layout1} ${layout2} ${fl} ${exabs} ${exmgn} ${spc} ${ExBdr} ${ExBdrRad} ${jfc} ${alg} ${ext} ${exb} ${exl} ${exr} ${ExPadA} ${ExPadT} ${ExPadB} ${ExPadL} ${ExPadR}" style="${style}"><!-- content --></div>`
 }
 
 function button_object(json) {
    style2 = ''
    style3 = ''
    
    let {flex, margin, position, height, style, color, gravity, adjustMode, offsetTop, offsetBottom, offsetStart, offsetEnd, action} = json
 
    fl = ''
    if(flex > 3) {
       style2 += `-webkit-box-flex:${flex};flex-grow:${flex};`
    } else {
       fl = (flex >= 0) ? `fl${flex}` : ''
    }
    exabs = (position === 'absolute') ? 'ExAbs' : ''
    
   //  let { exmgn } = get_margin(json.parent_layout, margin, style2)
   let exmgn = ''
    if(margin && margin.indexOf("px") >= 0) {
      if (json.parent_layout === 'horizontal') {
         style2 += `margin-left:${margin};`
      } else {
         style2 += `margin-top:${margin};`
      }
       exmgn = ''
    } else {
      if (json.parent_layout === 'horizontal') {
         exmgn = (margin) ? 'ExMgnL' + upperalldigit(margin) : ''
      } else {
         exmgn = (margin) ? 'ExMgnT' + upperalldigit(margin) : ''
      }
    }
 
    height = (!height || height === '' || height === 'md') ? '' : 'Ex' + upperalldigit(height)
    grv = (gravity === 'bottom' || gravity === 'center') ? 'grv' + upper1digit(gravity) : '';
   
    ExBtn = 'ExBtnL'
    if(style && style !== '') {
       switch(style) {
          case 'link':
             ExBtn = 'ExBtnL'
             break;
          case 'primary':
             ExBtn = 'ExBtn1'
             break;
          case 'secondary':
             ExBtn = 'ExBtn2'
             break;
          default:
             ExBtn = 'ExBtnL'
             // code block
          }
    }
 
    if(color) {
       style3 += `background-color:${color} !important;`
    }
 
    if(offsetTop && offsetTop.indexOf("px") >= 0) {
       style2 += `top:${offsetTop};`
       ext = ''
    } else {
       ext = (offsetTop) ? 'ExT' + upperalldigit(offsetTop) : ''
    }
 
    if(offsetBottom && offsetBottom.indexOf("px") >= 0) {
       style2 += `bottom:${offsetBottom};`
       exb = ''
    } else {
       exb = (offsetBottom) ? 'ExB' + upperalldigit(offsetBottom) : ''
    }
 
    if(offsetStart && offsetStart.indexOf("px") >= 0) {
       style2 += `left:${offsetStart};`
       exl = ''
    } else {
       exl = (offsetStart) ? 'ExL' + upperalldigit(offsetStart) : ''
    }
 
    if(offsetEnd && offsetEnd.indexOf("px") >= 0) {
       style2 += `right:${offsetEnd};`
       exr = ''
    } else {
       exr = (offsetEnd) ? 'ExR' + upperalldigit(offsetEnd) : ''
    }
 
    action = (!action) ? {'type':'none'} : action
    if(action.type === 'uri') {
       return `<div class="MdBtn ${ExBtn} ${height} ${fl} ${exabs} ${exmgn} ${grv} ${ext} ${exb} ${exl} ${exr}" style="${style2}" id="8d1efea2-4017-4c89-8931-98a5f4f141f2"><a href="${action.uri}" target="_blank" style="${style3}"><div>${action.label}</div></a></div>`
    } else if(action.type === 'message') {
       return `<div class="MdBtn ${ExBtn} ${height} ${fl} ${exabs} ${exmgn} ${grv} ${ext} ${exb} ${exl} ${exr}" style="${style2}" id="8d1efea2-4017-4c89-8931-98a5f4f141f2"><a onclick="alert('message: ${action.text}')" style="${style3}"><div>${action.label}</div></a></div>`
    } else if(action.type === 'postback') {
       return `<div class="MdBtn ${ExBtn} ${height} ${fl} ${exabs} ${exmgn} ${grv} ${ext} ${exb} ${exl} ${exr}" style="${style2}" id="8d1efea2-4017-4c89-8931-98a5f4f141f2"><a onclick="alert('postback data: ${action.data}')" style="${style3}"><div>${action.label}</div></a></div>`
    } else {
       return `<div class="MdBtn ${ExBtn} ${height} ${fl} ${exabs} ${exmgn} ${grv} ${ext} ${exb} ${exl} ${exr}" style="${style2}" id="8d1efea2-4017-4c89-8931-98a5f4f141f2"><a style="${style3}"><div>${action.label}</div></a></div>`
    }
 }
 function filler_object(json) {
    let style = ''
    let {flex} = json
    let fl = ''
    if(flex > 3) {
       style += `-webkit-box-flex:${flex};flex-grow:${flex};`
    } else {
       fl = (flex >= 0) ? `fl${flex}` : ''
    }
    return `<div class="mdBxFiller ${fl}" style="${style}" ></div>`
 }
 function icon_object(json) {
    let style2 = ''
    let {size, aspectRatio, url, position, margin, offsetTop, offsetBottom, offsetStart, offsetEnd} = json
    let styleimg = `background-image:url('${url}');`
    
    size = (!size || size === '') ? 'md' : size
    if(size.indexOf("px") >= 0) {
       style2 += `font-size:${size};`
       size = ''
    } else {
       size = 'Ex' + upperalldigit(size)
    }
       
    if(!aspectRatio || aspectRatio === '') {
       styleimg += `width:1em;`
    } else {
       ratio = ratio[0]/ratio[1] 
       styleimg += `width:${ratio}em;`
    }
    exabs = (position === 'absolute') ? 'ExAbs' : ''
    
   //  let { exmgn } = get_margin(json.parent_layout, margin, style2)
   let exmgn = ''
    if(margin && margin.indexOf("px") >= 0) {
      if (json.parent_layout === 'horizontal') {
         style2 += `margin-left:${margin};`
      } else {
         style2 += `margin-top:${margin};`
      }
       exmgn = ''
    } else {
      if (json.parent_layout === 'horizontal') {
         exmgn = (margin) ? 'ExMgnL' + upperalldigit(margin) : ''
      } else {
         exmgn = (margin) ? 'ExMgnT' + upperalldigit(margin) : ''
      }
    }
    
    if(offsetTop && offsetTop.indexOf("px") >= 0) {
       style2 += `top:${offsetTop};`
       ext = ''
    } else {
       ext = (offsetTop) ? 'ExT' + upperalldigit(offsetTop) : ''
    }
 
    if(offsetBottom && offsetBottom.indexOf("px") >= 0) {
       style2 += `bottom:${offsetBottom};`
       exb = ''
    } else {
       exb = (offsetBottom) ? 'ExB' + upperalldigit(offsetBottom) : ''
    }
 
    if(offsetStart && offsetStart.indexOf("px") >= 0) {
       style2 += `left:${offsetStart};`
       exl = ''
    } else {
       exl = (offsetStart) ? 'ExL' + upperalldigit(offsetStart) : ''
    }
 
    if(offsetEnd && offsetEnd.indexOf("px") >= 0) {
       style2 += `right:${offsetEnd};`
       exr = ''
    } else {
       exr = (offsetEnd) ? 'ExR' + upperalldigit(offsetEnd) : ''
    }
    
    return `<div class="MdIco fl0 ${size} ${exabs} ${exmgn} ${ext} ${exb} ${exl} ${exr}" style="${style2}" ><div><span style="${styleimg}"></span></div></div>`
 }
 function image_object(json) {
    let style = ''
    let style2 = ''
    let {aspectMode, size, aspectRatio, url, position, flex, margin, align, gravity, backgroundColor, offsetTop, offsetBottom, offsetStart, offsetEnd, action} = json
    let styleimg = `background-image:url('${url}');`
    if(backgroundColor) {
       styleimg += `background-color:${backgroundColor} !important;`
    }
 
    aspectMode = (!aspectMode || aspectMode === '') ? 'fit' : aspectMode
    size = (!size || size === '') ? 'md' : size
    aspectMode = upperalldigit(aspectMode)
    if(size.indexOf("px") >= 0) {
       style2 += `width:${size};`
       size = ''
    } else {
       size = 'Ex' + upperalldigit(size)
    }
       
    let ratio = '100'
    if(!aspectRatio || aspectRatio === '') {
    } else {
       ratio = aspectRatio.split(':')
       ratio = ratio[1]*100/ratio[0]
    }
    let fl = ''
    if(flex > 3) {
       style += `-webkit-box-flex:${flex};flex-grow:${flex};`
    } else {
       fl = (flex >= 0) ? `fl${flex}` : ''
    }
    let exabs = (position === 'absolute') ? 'ExAbs' : ''
    
   //  let { exmgn } = get_margin(json.parent_layout, margin, style)
   let exmgn = ''
   if(margin && margin.indexOf("px") >= 0) {
     if (json.parent_layout === 'horizontal') {
        style += `margin-left:${margin};`
     } else {
        style += `margin-top:${margin};`
     }
      exmgn = ''
   } else {
     if (json.parent_layout === 'horizontal') {
        exmgn = (margin) ? 'ExMgnL' + upperalldigit(margin) : ''
     } else {
        exmgn = (margin) ? 'ExMgnT' + upperalldigit(margin) : ''
     }
   }
    
    let alg = (align === 'start' || align === 'end') ? 'alg' + upper1digit(align) : '';
    let grv = (gravity === 'bottom' || gravity === 'center') ? 'grv' + upper1digit(gravity) : '';
 
    let ext = ''
    if(offsetTop && offsetTop.indexOf("px") >= 0) {
       style += `top:${offsetTop};`
    } else {
       ext = (offsetTop) ? 'ExT' + upperalldigit(offsetTop) : ''
    }
    
    let exb = ''
    if(offsetBottom && offsetBottom.indexOf("px") >= 0) {
       style += `bottom:${offsetBottom};`
    } else {
       exb = (offsetBottom) ? 'ExB' + upperalldigit(offsetBottom) : ''
    }
 
    let exl = ''
    if(offsetStart && offsetStart.indexOf("px") >= 0) {
       style += `left:${offsetStart};`
    } else {
       exl = (offsetStart) ? 'ExL' + upperalldigit(offsetStart) : ''
    }
 
    let exr = ''
    if(offsetEnd && offsetEnd.indexOf("px") >= 0) {
       style += `right:${offsetEnd};`
    } else {
       exr = (offsetEnd) ? 'ExR' + upperalldigit(offsetEnd) : ''
    }
    action = (!action) ? {'type':'none'} : action
    if(action.type === 'uri') {
       return `<div class="MdImg Ex${aspectMode} ${fl} ${size} ${exabs} ${exmgn} ${alg} ${grv} ${ext} ${exb} ${exl} ${exr}"  style="${style}">
                   <div style="${style2}">
                      <a href="${action.uri}" target="_blank" style="padding-bottom:${ratio}%;">
                         <span style="${styleimg}"></span>
                      </a>
                   </div>
                </div>`
    } else if(action.type === 'message') {
       return `<div class="MdImg Ex${aspectMode} ${fl} ${size} ${exabs} ${exmgn} ${alg} ${grv} ${ext} ${exb} ${exl} ${exr}"  style="${style}">
                   <div style="${style2}">
                      <a onclick="alert('message: ${action.text}')" style="padding-bottom:${ratio}%;">
                         <span style="${styleimg}"></span>
                      </a>
                   </div>
                </div>`
    } else if(action.type === 'postback') {
       return `<div class="MdImg Ex${aspectMode} ${fl} ${size} ${exabs} ${exmgn} ${alg} ${grv} ${ext} ${exb} ${exl} ${exr}"  style="${style}">
                   <div style="${style2}">
                      <a onclick="alert('postback data: ${action.data}')" style="padding-bottom:${ratio}%;">
                         <span style="${styleimg}"></span>
                      </a>
                   </div>
                </div>`
    } else {
       return `<div class="MdImg Ex${aspectMode} ${fl} ${size} ${exabs} ${exmgn} ${alg} ${grv} ${ext} ${exb} ${exl} ${exr}"  style="${style}">
                   <div style="${style2}">
                      <a style="padding-bottom:${ratio}%;">
                         <span style="${styleimg}"></span>
                      </a>
                   </div>
                </div>`
    }
 
    
 }
 function separator_object(json) {
    let style = ''
    let {margin, color} = json
 
   //  let { exmgn } = get_margin(json.parent_layout, margin, style)
   let exmgn = ''
   if(margin && margin.indexOf("px") >= 0) {
     if (json.parent_layout === 'horizontal') {
        style += `margin-left:${margin};`
     } else {
        style += `margin-top:${margin};`
     }
      exmgn = ''
   } else {
     if (json.parent_layout === 'horizontal') {
        exmgn = (margin) ? 'ExMgnL' + upperalldigit(margin) : ''
     } else {
        exmgn = (margin) ? 'ExMgnT' + upperalldigit(margin) : ''
     }
   }
    
    if(color) {
       style += `border-color:${color} !important;`
    }
 
    return `<div class="fl0 MdSep ${exmgn}" style="${style}" ></div>`
 }
 function spacer_object(json) {
    let {size} = json
    size = (!size || size === '') ? 'md' : size
    if(size.indexOf("px") >= 0) {
       size = ''
    } else {
       size = 'spc' + upperalldigit(size)
    }
    return `<div class="mdBxSpacer ${size} fl0" ></div>`
 }
 function span_object(json) {
 
    let style2 = ''
    let {text, size, color, weight, style, decoration} = json
    
    if(size && size !== '') {
       if(size.indexOf("px") >= 0) {
          style2 += `font-size:${size};`
          size = ''
       } else {
          size = 'Ex' + upperalldigit(size)
       }
    } else {
       size = ''
    }
    
    if(color && color!=='') {
       style2 += `color:${color};`
    }
    ExWB = (weight === 'bold') ? 'ExWB' : ''
    ExFntSty = (style === 'normal') ? 'ExFntStyNml' : (style === 'italic') ? 'ExFntStyIt' : ''
    ExTxtDec = (decoration === 'line-through') ? 'ExTxtDecLt' : (decoration === 'underline') ? 'ExTxtDecUl' : (decoration === 'none') ? 'ExTxtDecNone' : ''
   
    return `<span class="MdSpn ${ExWB} ${size} ${ExFntSty} ${ExTxtDec}" style="${style2}" >${text}</span>`
 }
 function carousel_struc() {
    return `<div class="LySlider"><div class="lyInner"><!-- inner --></div></div><br>`
 }
 
 function bubble_struc(json) {
    let {size, direction, action} = json
    size = (!size || size === '') ? 'medium' : size
    direction = (!direction || direction == '') ? 'ltr' : direction
    size = upper2digit(size)
 
    return `<div class="lyItem Ly${size}"><div class="T1 fx${direction.toUpperCase()}" dir="${direction}"><!-- hero --><!-- header --><!-- body --><!-- footer --></div></div>`
 }
 function hero_struc(json) {
    let {styles} = json
    let backgroundColor = ''
    if(styles) {
       let { hero } = styles
       backgroundColor = (hero && hero.backgroundColor) ? `background-color:${hero.backgroundColor}` : ''
    }
    return `<div class="t1Hero" style="${backgroundColor}"><!-- inner --></div>`
 }
 function header_struc(json) {
    let {styles} = json
    let backgroundColor = ''
    if(styles) {
       let { header } = styles
       backgroundColor = (header && header.backgroundColor) ? `background-color:${header.backgroundColor}` : ''
    }
    return `<div class="t1Header" style="${backgroundColor}"><!-- inner --></div>`
 }
 function body_struc(json) {
    let {footer, styles} = json
    let backgroundColor = ''
    if(styles) {
       let { body } = styles
       backgroundColor = (body && body.backgroundColor) ? `background-color:${body.backgroundColor}` : ''
    }
    let ExHasFooter = (footer) ? 'ExHasFooter' : ''
    return `<div class="t1Body ${ExHasFooter}" style="${backgroundColor}"><!-- inner --></div>`
 }
 function footer_struc(json) {
    let {styles} = json
    let backgroundColor = ''
    if(styles) {
       let { footer } = styles
       backgroundColor = (footer && footer.backgroundColor) ? `background-color:${footer.backgroundColor}` : ''
    }
    return `<div class="t1Footer" style="${backgroundColor}"><!-- inner --></div>`
 }
 function text_object(json) {
    
    let style2 = ''
    let {flex, margin, size, position, align, gravity, text, color, weight, style, decoration, wrap, maxLines, adjustMode, offsetTop, offsetBottom, offsetStart, offsetEnd, lineSpacing} = json
    
    let fl = ''
    if(flex > 3) {
       style2 += `-webkit-box-flex:${flex};flex-grow:${flex};`
    } else {
       fl = (flex >= 0) ? `fl${flex}` : ''
    }
    let exabs = (position === 'absolute') ? 'ExAbs' : ''
    
   //  let { exmgn } = get_margin(json.parent_layout, margin, style)
    let exmgn = ''
     if(margin && margin.indexOf("px") >= 0) {
       if (json.parent_layout === 'horizontal') {
          style2 += `margin-left:${margin};`
       } else {
          style2 += `margin-top:${margin};`
       }
        exmgn = ''
     } else {
       if (json.parent_layout === 'horizontal') {
          exmgn = (margin) ? 'ExMgnL' + upperalldigit(margin) : ''
       } else {
          exmgn = (margin) ? 'ExMgnT' + upperalldigit(margin) : ''
       }
     }
    
    let alg = (align === 'start' || align === 'end' || align === 'center') ? 'ExAlg' + upper1digit(align) : '';
    let grv = (gravity === 'bottom' || gravity === 'center') ? 'grv' + upper1digit(gravity) : '';
    size = (!size || size === '') ? 'md' : size
    if(size.indexOf("px") >= 0) {
       style2 += `font-size:${size};`
       size = ''
    } else {
       size = 'Ex' + upperalldigit(size)
    }
 
    if(color && color!=='') {
       style2 += `color:${color};`
    }
    let ExWB = (weight === 'bold') ? 'ExWB' : ''
    let ExFntSty = (style === 'normal') ? 'ExFntStyNml' : (style === 'italic') ? 'ExFntStyIt' : ''
    let ExTxtDec = (decoration === 'line-through') ? 'ExTxtDecLt' : (decoration === 'underline') ? 'ExTxtDecUl' : (decoration === 'none') ? 'ExTxtDecNone' : ''
    let ExWrap = (wrap === true) ? 'ExWrap' : ''
    let ext = ''
    if(offsetTop && offsetTop.indexOf("px") >= 0) {
       style2 += `top:${offsetTop};`
    } else {
       ext = (offsetTop) ? 'ExT' + upperalldigit(offsetTop) : ''
    }
 
    let exb = ''
    if(offsetBottom && offsetBottom.indexOf("px") >= 0) {
       style2 += `bottom:${offsetBottom};`
    } else {
       exb = (offsetBottom) ? 'ExB' + upperalldigit(offsetBottom) : ''
    }
 
    let exl = ''
    if(offsetStart && offsetStart.indexOf("px") >= 0) {
       style2 += `left:${offsetStart};`
    } else {
       exl = (offsetStart) ? 'ExL' + upperalldigit(offsetStart) : ''
    }
 
    let exr = ''
    if(offsetEnd && offsetEnd.indexOf("px") >= 0) {
       style2 += `right:${offsetEnd};`
    } else {
       exr = (offsetEnd) ? 'ExR' + upperalldigit(offsetEnd) : ''
    }
 
    if(lineSpacing && lineSpacing.indexOf("px") >= 0) {
       let lineHeight = (parseInt(lineSpacing.replace('px','')) + 15) + 'px'
       style2 += `line-height:${lineHeight};`
    }
    text = (!text) ? '' : text 
    return `<div class="MdTxt ${fl} ${exabs} ${exmgn} ${alg} ${grv} ${size} ${ExWB} ${ExFntSty} ${ExTxtDec} ${ExWrap} ${ext} ${exb} ${exl} ${exr}" style="${style2}">${text}<!-- content --></div>`
 }
 function upper1digit(str) {
    return str.charAt(0).toUpperCase()
 }
 function upper2digit(str) {
    return str.charAt(0).toUpperCase() + str.substring(1, 2)
 }
 function upperalldigit(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
 }