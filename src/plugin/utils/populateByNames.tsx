export default function populateByNames(selectedLayers, obj, btnName) {
    selectedLayers.map(item => {
        for (let keys in item) {
            if (item['name'] === btnName) {
                if (keys === key) {
                    figma.loadFontAsync(item.fontName).then(() => {
                        item.characters = JSONobj[newItem][btnName].toString();
                        newItem = ++newItem;
                    });
                }
            } else if (Array.isArray(item[keys])) {
                getAllLayers(item[keys], btnName, JSONobj, key);
            }
        }
    });
}

// function getAllLayers(arr, btnName, JSONobj, key) {
//     arr.map(item => {
//       for (let keys in item) {
//         if (item['name'] === btnName) {
//           if (keys === key) {
//             figma.loadFontAsync(item.fontName).then(() => {
//               item.characters = JSONobj[newItem][btnName].toString();
//               newItem = ++newItem;
//             });
//           }
//         } else if (Array.isArray(item[keys])) {
//           getAllLayers(item[keys], btnName, JSONobj, key);
//         }
//       }
//     });
//   }
