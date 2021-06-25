# JSON to Figma 4.0

![plugin preview](readme-images/cover.jpg)

##### An easy way to use real data in Figma.

The plugin can parse local or JSON files from a URL link. You can populate any layers with text or images.

---

### 💡 Features:

-   Load **local** files and fetch **from URL**
-   Fetch images
-   Parsing JSON files with **any amount of nested levels**
-   **Flexible** keys selection
-   **Invert** selected keys
-   **Download** filltered JSON
-   Popualte **in random order**
-   Select any **ranges** from JSON file
-   the **"skip" rule** for layers you won't populate
-   Handle `null` values
-   One Easter egg 🐰
-   Resizeable plugin window

---

### Get the plugin

##### 📥 [figma.com/community/plugin/789839703871161985/JSON-to-Figma](https://www.figma.com/community/plugin/789839703871161985/JSON-to-Figma)

### Youtube demo

##### 🎥 [youtu.be/7CKYdDfLFDY]()

---

## 🚀 How to Use

All you need is a [proper JSON](#-valid-json-structure). The plugin will parse show all available keys from the JSON including nested layers.

![Plugin preview](readme-images/plugin-preview.jpg)

1. Load a JSON file localy or copy a link and the click on the "From Cipboard link" button.
2. Make sure layers you want to populate have the same names as in the JSON file. For example — if you see a key "user.name" key in the plugin the layer name also should be "user.name".
3. Select layers with items you want to populate. You can select group or frames with these layers, no need to select layers dirictly or manualy, the plugin will find them by their names.
4. Select keys you want to use for population.
5. Press "Populate selected" button

---

### 🤘 Features

**`Range seection`** — If you want to select a certain range from a JSON, you can do it like this “1-10”, “1, 5, 20”, or combine them “1-10, 21, 50-340” — it means that the plugin will take JSON objects from 1 to 10, 21 and from 50 to 340 and combine them into one new array. Then you can also **save filtered array**.

**`Skip marked layers`** — if you want to skip layers, groups or frames — exclude them from the list, then you can use the “Skip marked layers” option. Just select layers and press “Skip selected”. You can also clean marked layers or add the marker manually.

**`Random order`** — If you switch it on all items will be filled in a random order. By default, all your layers will be filled in order.

**`Image URLs recognition`** — The plugin will automaticly recognise values from a JSON that end with .JPG, .PNG, .GIF or .WEBP as images. if you name a shape or a frame with the name of the key — the pllugin wil fetch the image by URL and add it as a fill.

---

### ✅ Valid JSON structure

The JSON structure for the file should look like an array of objects.

```json
[
    {
        "key_string": "string #1",
        "key_number": 1
    },
    {
        "key_string": "string #2",
        "key_number": 2
    }
]
```

---

### 📓 Services to generate JSON data

You can download try different JSON samples [from this repo](https://github.com/PavelLaptev/JSON-to-Figma-2.0-React/tree/master/json-test-files).

Or you can use on of these services:

-   [mockaroo.com](https://www.mockaroo.com/)
-   [next.json-generator.com](https://next.json-generator.com/EyLps-PPO?fbclid=IwAR0WGNKJMclqcS6qwRHj-NXOyF52BjQYJp9osgeWRmN2iCGZ47awnDDLhmI)
-   [jsonplaceholder.typicode.com](https://jsonplaceholder.typicode.com/)

---

### 🤙 Feedback

Please if you have any trubles with the plugin or ideas how I could improve the plugin, let me know here or by email 😊

---

### [🧑‍💻💸 Support plugin](https://www.paypal.com/paypalme/pavellaptev)
