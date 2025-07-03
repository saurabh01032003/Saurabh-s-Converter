// function toggleInputs() {
//   const inputFormat = document.getElementById("inputFormat").value;
//   const outputFormat = document.getElementById("outputFormat").value;
//   const isFolder = document.getElementById("folderToggle").checked;

//   const fileInputs = document.getElementById("fileInputs");
//   const folderInputs = document.getElementById("folderInputs");

//   const jsonFileInput = document.getElementById("jsonFileInput");
//   const xmlXsdInputs = document.getElementById("xmlXsdInputs");
//   const folderXsdFile = document.getElementById("folderXsdFile");
//   const xsdLabel = document.getElementById("xsdLabel");
//   const folderLabel = folderInputs.querySelector("label");

//   if (isFolder) {
//     fileInputs.classList.add("hidden");
//     folderInputs.classList.remove("hidden");

//     // Update folder label dynamically
//     if (inputFormat === "json") {
//       folderLabel.textContent = "Select Folder of JSON files:";
//       xsdLabel.classList.add("hidden");
//       folderXsdFile.classList.add("hidden");
//     } else if (inputFormat === "xml-xsd") {
//       folderLabel.textContent = "Select Folder of XML files:";
//       xsdLabel.classList.remove("hidden");
//       folderXsdFile.classList.remove("hidden");
//     }
//   } else {
//     fileInputs.classList.remove("hidden");
//     folderInputs.classList.add("hidden");

//     if (inputFormat === "json") {
//       jsonFileInput.classList.remove("hidden");
//       xmlXsdInputs.classList.add("hidden");
//     } else if (inputFormat === "xml-xsd") {
//       jsonFileInput.classList.add("hidden");
//       xmlXsdInputs.classList.remove("hidden");
//     }
//   }
// }


// function parseXSD(xsdText) {
//   const parser = new DOMParser();
//   const xsdDoc = parser.parseFromString(xsdText, "application/xml");
//   const elements = xsdDoc.getElementsByTagNameNS("http://www.w3.org/2001/XMLSchema", "element");
//   const arrayElements = new Set();
//   for (const el of elements) {
//     const name = el.getAttribute("name");
//     const maxOccurs = el.getAttribute("maxOccurs");
//     if (name && (maxOccurs === "unbounded" || (maxOccurs && parseInt(maxOccurs) > 1))) {
//       arrayElements.add(name);
//     }
//   }
//   return arrayElements;
// }

// function convertElementToJson(el, arrayElements) {
//   const node = {};
//   if (el.attributes) {
//     for (const attr of el.attributes) {
//       node["@" + attr.name] = attr.value;
//     }
//   }
//   const children = Array.from(el.childNodes).filter(n => n.nodeType === 1);
//   const textOnly = Array.from(el.childNodes).filter(n => n.nodeType === 3).map(n => n.nodeValue.trim()).join('').trim();
//   const grouped = {};
//   for (const child of children) {
//     const tag = child.nodeName;
//     if (!grouped[tag]) grouped[tag] = [];
//     grouped[tag].push(child);
//   }
//   for (const [tag, list] of Object.entries(grouped)) {
//     node[tag] = (arrayElements.has(tag) || list.length > 1) ? list.map(child => convertElementToJson(child, arrayElements)) : convertElementToJson(list[0], arrayElements);
//   }
//   if (children.length === 0 && Object.keys(node).length === 0) return textOnly || null;
//   if (textOnly) node["#text"] = textOnly;
//   return node;
// }

// function convertJsonToXml(obj, rootName) {
//   let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
//   xml += `<${rootName}>\n`;
//   xml += objectToXml(obj, 1);
//   xml += `</${rootName}>\n`;
//   return xml;
// }

// // function objectToXml(obj, indentLevel = 0) {
// //   const indent = '  '.repeat(indentLevel);
// //   let xml = '';

// //   if (obj === null || obj === undefined) return '';

// //   if (typeof obj !== 'object') {
// //     return escapeXml(obj.toString());
// //   }

// //   for (const key in obj) {
// //     if (!obj.hasOwnProperty(key)) continue;
// //     const value = obj[key];

// //     if (Array.isArray(value)) {
// //       for (const item of value) {
// //         xml += `${indent}<${key}>\n${objectToXml(item, indentLevel + 1)}${indent}</${key}>\n`;
// //       }
// //     } else if (typeof value === 'object') {
// //       xml += `${indent}<${key}>\n${objectToXml(value, indentLevel + 1)}${indent}</${key}>\n`;
// //     } else {
// //       xml += `${indent}<${key}>${escapeXml(value)}</${key}>\n`;
// //     }
// //   }

// //   return xml;
// // }

// function objectToXml(obj, indentLevel = 0) {
//   const indent = '  '.repeat(indentLevel);
//   let xml = '';

//   if (obj === null || obj === undefined) return '';

//   if (typeof obj !== 'object') {
//     return escapeXml(obj.toString());
//   }

//   for (const key in obj) {
//     if (!obj.hasOwnProperty(key)) continue;
//     const value = obj[key];

//     if (Array.isArray(value)) {
//       for (const item of value) {
//         xml += `${indent}<${key}>\n${objectToXml(item, indentLevel + 1)}${indent}</${key}>\n`;
//       }
//     } else if (typeof value === 'object') {
//       const innerXml = objectToXml(value, indentLevel + 1);
//       xml += `${indent}<${key}>\n${innerXml}${indent}</${key}>\n`;
//     } else {
//       const text = escapeXml(value);
//       xml += `${indent}<${key}>${text}</${key}>\n`;
//     }
//   }

//   return xml;
// }



// function escapeXml(unsafe) {
//   return String(unsafe).replace(/[<>&'"]/g, function (c) {
//     switch (c) {
//       case '<': return '&lt;';
//       case '>': return '&gt;';
//       case '&': return '&amp;';
//       case '\'': return '&apos;';
//       case '"': return '&quot;';
//     }
//   });
// }

// async function handleConversion() {
//   const input = document.getElementById("inputFormat").value;
//   const output = document.getElementById("outputFormat").value;
//   const folderMode = document.getElementById("folderToggle").checked;
//   const log = document.getElementById("outputLog");
//   const link = document.getElementById("downloadLink");
//   log.textContent = "";
//   link.classList.add("hidden");

//   try {
//     if (!folderMode) {
//       // Single file conversion (same as before)
//       // ... (retain existing logic)

//         if (input === "xml-xsd" && output === "json") {
//           const xml = document.getElementById("xmlFile").files[0];
//           const xsd = document.getElementById("xsdFile").files[0];
//           if (!xml || !xsd) throw new Error("XML or XSD file missing.");
//           const xmlText = await xml.text();
//           const xsdText = await xsd.text();

//           let xmlDoc;
//           try {
//             xmlDoc = new DOMParser().parseFromString(xmlText, "application/xml");
//             if (xmlDoc.querySelector("parsererror")) throw new Error("Malformed XML.");
//           } catch (err) {
//             throw new Error("Invalid XML syntax.");
//           }

//           const arrayElements = parseXSD(xsdText);
//           const root = xmlDoc.documentElement;
//           const json = convertElementToJson(root, arrayElements);
//           const result = root.nodeName === "Root" ? json : { [root.nodeName]: json };
//           const jsonStr = JSON.stringify(result, null, 2);
//           log.textContent = jsonStr;
//           const blob = new Blob([jsonStr], { type: "application/json" });
//           link.href = URL.createObjectURL(blob);
//           link.download = "output.json";
//           link.classList.remove("hidden");

//         } else if (input === "json" && output === "xml") {
//           const json = document.getElementById("jsonFile").files[0];
//           if (!json) throw new Error("JSON file missing.");
//           const jsonText = await json.text();

//           let obj;
//           try {
//             obj = JSON.parse(jsonText);
//           } catch (err) {
//             throw new Error("Invalid JSON syntax.");
//           }

//           const keys = Object.keys(obj);
//           const xml = keys.length === 1 ? `<${keys[0]}>${objectToXml(obj[keys[0]])}</${keys[0]}>` : `<Root>${objectToXml(obj)}</Root>`;
//           log.textContent = xml;
//           const blob = new Blob([xml], { type: "application/xml" });
//           link.href = URL.createObjectURL(blob);
//           link.download = "output.xml";
//           link.classList.remove("hidden");

//         } else {
//           throw new Error("Unsupported conversion");
//         }


//     } else {
//       const files = document.getElementById("folderInput").files;
//       const zip = new JSZip();
//       let successCount = 0;
//       let failCount = 0;
//       let invalidCount = 0;
//       let failedFiles = [];
//       let invalidFiles = [];

//       if (input === "xml-xsd" && output === "json") {
//         const xsdFile = document.getElementById("folderXsdFile").files[0];
//         if (!xsdFile) throw new Error("Please upload XSD file.");
//         const xsdText = await xsdFile.text();
//         const arrayElements = parseXSD(xsdText);

//         for (const file of files) {
//           if (!file.name.endsWith(".xml")) {
//             invalidCount++;
//             invalidFiles.push(file.name);
//             continue;
//           }
//           try {
//             const text = await file.text();
//             const xmlDoc = new DOMParser().parseFromString(text, "application/xml");
//             if (xmlDoc.querySelector("parsererror")) throw new Error("Malformed XML.");
//             const root = xmlDoc.documentElement;
//             const json = convertElementToJson(root, arrayElements);
//             const finalJson = root.nodeName === "Root" ? json : { [root.nodeName]: json };
//             zip.file(file.name.replace(".xml", ".json"), JSON.stringify(finalJson, null, 2));
//             successCount++;
//           } catch (err) {
//             failCount++;
//             failedFiles.push(`${file.name} (Error: ${err.message})`);
//           }
//         }

//       } else if (input === "json" && output === "xml") {
//         for (const file of files) {
//           if (!file.name.endsWith(".json")) {
//             invalidCount++;
//             invalidFiles.push(file.name);
//             continue;
//           }
//           try {
//             const text = await file.text();
//             const json = JSON.parse(text);
//             const keys = Object.keys(json);
//             const xml = keys.length === 1
//               ? `<${keys[0]}>${objectToXml(json[keys[0]])}</${keys[0]}>`
//               : `<Root>${objectToXml(json)}</Root>`;
//             zip.file(file.name.replace(".json", ".xml"), xml);
//             successCount++;
//           } catch (err) {
//             failCount++;
//             failedFiles.push(`${file.name} (Error: ${err.message})`);
//           }
//         }
//       } else {
//         throw new Error("Unsupported conversion");
//       }

//       if (successCount > 0) {
//         const blob = await zip.generateAsync({ type: "blob" });
//         link.href = URL.createObjectURL(blob);
//         link.download = "converted_output.zip";
//         link.classList.remove("hidden");
//       }

//       log.textContent =
//         `✅ Successfully converted files: ${successCount}\n` +
//         `❌ Failed to convert files: ${failCount}\n` +
//         (failedFiles.length ? `\nFailed Files:\n- ${failedFiles.join('\n- ')}` : '') +
//         (invalidFiles.length ? `\n\n🚫 Invalid Format Files (not processed): ${invalidCount}\n- ${invalidFiles.join('\n- ')}` : '');
//     }
//   } catch (e) {
//     log.textContent = "Error: " + e.message;
//   }
// }


//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function toggleInputs() {
  const inputFormat = document.getElementById("inputFormat").value;
  const outputFormat = document.getElementById("outputFormat").value;
  const isFolder = document.getElementById("folderToggle").checked;

  const fileInputs = document.getElementById("fileInputs");
  const folderInputs = document.getElementById("folderInputs");

  const jsonFileInput = document.getElementById("jsonFileInput");
  const xmlXsdInputs = document.getElementById("xmlXsdInputs");
  const folderXsdFile = document.getElementById("folderXsdFile");
  const xsdLabel = document.getElementById("xsdLabel");
  const folderLabel = folderInputs.querySelector("label");

  if (isFolder) {
    fileInputs.classList.add("hidden");
    folderInputs.classList.remove("hidden");

    if (inputFormat === "json") {
      folderLabel.textContent = "Select Folder of JSON files:";
      xsdLabel.classList.add("hidden");
      folderXsdFile.classList.add("hidden");
    } else if (inputFormat === "xml-xsd") {
      folderLabel.textContent = "Select Folder of XML files:";
      xsdLabel.classList.remove("hidden");
      folderXsdFile.classList.remove("hidden");
    }
  } else {
    fileInputs.classList.remove("hidden");
    folderInputs.classList.add("hidden");

    if (inputFormat === "json") {
      jsonFileInput.classList.remove("hidden");
      xmlXsdInputs.classList.add("hidden");
    } else if (inputFormat === "xml-xsd") {
      jsonFileInput.classList.add("hidden");
      xmlXsdInputs.classList.remove("hidden");
    }
  }
}

function escapeXml(unsafe) {
  return String(unsafe).replace(/[<>&'"]/g, function (c) {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
    }
  });
}

// function objectToXml(obj, indentLevel = 0) {
//   const indent = '  '.repeat(indentLevel);
//   let xml = '';

//   if (obj === null || obj === undefined) return '';

//   if (typeof obj !== 'object') {
//     return escapeXml(obj.toString());
//   }

//   for (const key in obj) {
//     if (!obj.hasOwnProperty(key)) continue;
//     const value = obj[key];

//     if (Array.isArray(value)) {
//       for (const item of value) {
//         const innerXml = objectToXml(item, indentLevel + 1);
//         xml += `${indent}<${key}>\n${innerXml}${indent}</${key}>\n`;
//       }
//     } else if (typeof value === 'object' && value !== null) {
//       const innerXml = objectToXml(value, indentLevel + 1);
//       xml += `${indent}<${key}>\n${innerXml}${indent}</${key}>\n`;
//     } else {
//       const text = escapeXml(value);
//       xml += `${indent}<${key}>${text}</${key}>\n`;
//     }
//   }

//   return xml;
// }

function objectToXml(obj, indentLevel = 0) {
  const indent = '  '.repeat(indentLevel);
  let xml = '';

  if (obj === null || obj === undefined || obj === '') return '';

  if (typeof obj !== 'object') {
    const val = (obj === null || obj === '' || obj === undefined) ? '' : escapeXml(obj.toString());
    return val === '' ? '' : val;
  }

  for (const key in obj) {
    if (!obj.hasOwnProperty(key)) continue;
    const value = obj[key];

    if (Array.isArray(value)) {
      if (value.length === 0) {
        xml += `${indent}<${key}/>\n`;
      } else {
        for (const item of value) {
          const innerXml = objectToXml(item, indentLevel + 1);
          xml += innerXml.trim()
            ? `${indent}<${key}>\n${innerXml}${indent}</${key}>\n`
            : `${indent}<${key}/>\n`;
        }
      }
    } else if (typeof value === 'object' && value !== null) {
      const innerXml = objectToXml(value, indentLevel + 1);
      xml += innerXml.trim()
        ? `${indent}<${key}>\n${innerXml}${indent}</${key}>\n`
        : `${indent}<${key}/>\n`;
    } else {
      if (value === null || value === '' || value === undefined) {
        xml += `${indent}<${key}/>\n`;
      } else {
        xml += `${indent}<${key}>${escapeXml(value)}</${key}>\n`;
      }
    }
  }

  return xml;
}

function convertJsonToXml(json) {
  const keys = Object.keys(json);
  let rootName, content;

  if (keys.length === 1) {
    rootName = keys[0];
    const value = json[rootName];

    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      content = objectToXml(value, 1);
      return `<${rootName}>\n${content}</${rootName}>\n`;
    } else {
      content = objectToXml({ [rootName]: value }, 1);
      return `<Root>\n${content}</Root>\n`;
    }
  } else {
    content = objectToXml(json, 1);
    return `<Root>\n${content}</Root>\n`;
  }
}


// function convertJsonToXml(json) {
//   const keys = Object.keys(json);
//   let rootName, content;

//   if (keys.length === 1) {
//     rootName = keys[0];
//     const value = json[rootName];

//     if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
//       content = objectToXml(value, 1);
//       return `<?xml version="1.0" encoding="UTF-8"?>\n<${rootName}>\n${content}</${rootName}>\n`;
//     } else {
//       content = objectToXml({ [rootName]: value }, 1);
//       return `<?xml version="1.0" encoding="UTF-8"?>\n<Root>\n${content}</Root>\n`;
//     }
//   } else {
//     content = objectToXml(json, 1);
//     return `<?xml version="1.0" encoding="UTF-8"?>\n<Root>\n${content}</Root>\n`;
//   }
// }

function parseXSD(xsdText) {
  const parser = new DOMParser();
  const xsdDoc = parser.parseFromString(xsdText, "application/xml");
  const elements = xsdDoc.getElementsByTagNameNS("http://www.w3.org/2001/XMLSchema", "element");
  const arrayElements = new Set();
  for (const el of elements) {
    const name = el.getAttribute("name");
    const maxOccurs = el.getAttribute("maxOccurs");
    if (name && (maxOccurs === "unbounded" || (maxOccurs && parseInt(maxOccurs) > 1))) {
      arrayElements.add(name);
    }
  }
  return arrayElements;
}

function convertElementToJson(el, arrayElements) {
  const node = {};
  if (el.attributes) {
    for (const attr of el.attributes) {
      node["@" + attr.name] = attr.value;
    }
  }
  const children = Array.from(el.childNodes).filter(n => n.nodeType === 1);
  const textOnly = Array.from(el.childNodes).filter(n => n.nodeType === 3).map(n => n.nodeValue.trim()).join('').trim();
  const grouped = {};
  for (const child of children) {
    const tag = child.nodeName;
    if (!grouped[tag]) grouped[tag] = [];
    grouped[tag].push(child);
  }
  for (const [tag, list] of Object.entries(grouped)) {
    node[tag] = (arrayElements.has(tag) || list.length > 1)
      ? list.map(child => convertElementToJson(child, arrayElements))
      : convertElementToJson(list[0], arrayElements);
  }
  if (children.length === 0 && Object.keys(node).length === 0) return textOnly || null;
  if (textOnly) node["#text"] = textOnly;
  return node;
}

async function handleConversion() {
  const input = document.getElementById("inputFormat").value;
  const output = document.getElementById("outputFormat").value;
  const folderMode = document.getElementById("folderToggle").checked;
  const log = document.getElementById("outputLog");
  const link = document.getElementById("downloadLink");
  log.textContent = "";
  link.classList.add("hidden");

  try {
    if (!folderMode) {
      if (input === "xml-xsd" && output === "json") {
        const xml = document.getElementById("xmlFile").files[0];
        const xsd = document.getElementById("xsdFile").files[0];
        if (!xml || !xsd) throw new Error("XML or XSD file missing.");
        const xmlText = await xml.text();
        const xsdText = await xsd.text();

        let xmlDoc;
        try {
          xmlDoc = new DOMParser().parseFromString(xmlText, "application/xml");
          if (xmlDoc.querySelector("parsererror")) throw new Error("Malformed XML.");
        } catch (err) {
          throw new Error("Invalid XML syntax.");
        }

        const arrayElements = parseXSD(xsdText);
        const root = xmlDoc.documentElement;
        const json = convertElementToJson(root, arrayElements);
        const result = root.nodeName === "Root" ? json : { [root.nodeName]: json };
        const jsonStr = JSON.stringify(result, null, 2);
        log.textContent = jsonStr;
        const blob = new Blob([jsonStr], { type: "application/json" });
        link.href = URL.createObjectURL(blob);
        link.download = "output.json";
        link.classList.remove("hidden");

      } else if (input === "json" && output === "xml") {
        const json = document.getElementById("jsonFile").files[0];
        if (!json) throw new Error("JSON file missing.");
        const jsonText = await json.text();

        let obj;
        try {
          obj = JSON.parse(jsonText);
        } catch (err) {
          throw new Error("Invalid JSON syntax.");
        }

        const xml = convertJsonToXml(obj);
        log.textContent = xml;
        const blob = new Blob([xml], { type: "application/xml" });
        link.href = URL.createObjectURL(blob);
        link.download = "output.xml";
        link.classList.remove("hidden");

      } else {
        throw new Error("Unsupported conversion");
      }

    } else {
      const files = document.getElementById("folderInput").files;
      const zip = new JSZip();
      let successCount = 0;
      let failCount = 0;
      let invalidCount = 0;
      let failedFiles = [];
      let invalidFiles = [];

      if (input === "xml-xsd" && output === "json") {
        const xsdFile = document.getElementById("folderXsdFile").files[0];
        if (!xsdFile) throw new Error("Please upload XSD file.");
        const xsdText = await xsdFile.text();
        const arrayElements = parseXSD(xsdText);

        for (const file of files) {
          if (!file.name.endsWith(".xml")) {
            invalidCount++;
            invalidFiles.push(file.name);
            continue;
          }
          try {
            const text = await file.text();
            const xmlDoc = new DOMParser().parseFromString(text, "application/xml");
            if (xmlDoc.querySelector("parsererror")) throw new Error("Malformed XML.");
            const root = xmlDoc.documentElement;
            const json = convertElementToJson(root, arrayElements);
            const finalJson = root.nodeName === "Root" ? json : { [root.nodeName]: json };
            zip.file(file.name.replace(".xml", ".json"), JSON.stringify(finalJson, null, 2));
            successCount++;
          } catch (err) {
            failCount++;
            failedFiles.push(`${file.name} (Error: ${err.message})`);
          }
        }

      } else if (input === "json" && output === "xml") {
        for (const file of files) {
          if (!file.name.endsWith(".json")) {
            invalidCount++;
            invalidFiles.push(file.name);
            continue;
          }
          try {
            const text = await file.text();
            const json = JSON.parse(text);
            const xml = convertJsonToXml(json);
            zip.file(file.name.replace(".json", ".xml"), xml);
            successCount++;
          } catch (err) {
            failCount++;
            failedFiles.push(`${file.name} (Error: ${err.message})`);
          }
        }
      } else {
        throw new Error("Unsupported conversion");
      }

      if (successCount > 0) {
        const blob = await zip.generateAsync({ type: "blob" });
        link.href = URL.createObjectURL(blob);
        link.download = "converted_output.zip";
        link.classList.remove("hidden");
      }

      log.textContent =
        `✅ Successfully converted files: ${successCount}\n` +
        `❌ Failed to convert files: ${failCount}\n` +
        (failedFiles.length ? `\nFailed Files:\n- ${failedFiles.join('\n- ')}` : '') +
        (invalidFiles.length ? `\n\n🚫 Invalid Format Files (not processed): ${invalidCount}\n- ${invalidFiles.join('\n- ')}` : '');
    }
  } catch (e) {
    log.textContent = "Error: " + e.message;
  }
}
