# JSON to Figma 2.0

An easy way to populate Figma layers with JSON.
The plugin can parse local or JSON files from URL link. You can populate text layers that you selected, or by name or string template.

#### Plugins' community page

[figma.com/community/plugin/789839703871161985/JSON-to-Figma](https://www.figma.com/community/plugin/789839703871161985/JSON-to-Figma)

#### Youtube demo

[youtu.be/f7AULw3xcG8](https://youtu.be/f7AULw3xcG8)

#### Promo page

[pavellaptev.github.io/JSON-to-Figma-React](https://pavellaptev.github.io/JSON-to-Figma-React/promo/index.html)

---

### 💡 Features:

-   Populate only selected layers
-   Load loacl files and from URL
-   Nested layers parse
-   Fin and automatic strings replacement by layer name
-   Populate by string templates
-   Direct or random order

---

### 🎀 What's new

-   The new version built with React
-   Ability to load a JSON from URL
-   Better errors handling
-   Refactored functions. Lighter and more efficient methods
-   Parsing of JSON files with any amount of nested levels.

---

### ✅ The correct JSON structure

The beeter JSON structure for the file should look like array of objects

```js
[
    {
        key_string: 'string #1',
        key_number: 0,
    },
    {
        key_string: 'string #2',
        key_number: 1,
    },
];

// As a result you will see buttons — `key_string`, `key_number`
```

##### ⚠️ Other JSON structures

But you also can use different JSON structures. For example:

```js
{
    "obj0": {
        "key_string": "string #1",
        "key_number": 0
    },
    "obj1": {
        "key_string": "string #2",
        "key_number": 1
    }
}

// As a result you will see buttons — `0`, `1.key_string`, `1.key_number`
```

You can download try different [JSON samples here](https://github.com/PavelLaptev/JSON-to-Figma-2.0-React/tree/master/src/app/assets/test-json).

---

### ⚙️ Populate Options

1. `By layer name` — You can populate layers deeply nested in any group or frame. To do so, manually rename the layer you want to populate so that it matches the name in the JSON file.
   Not a case-sensitive method — a JSON item with a `job` name will be match to `Job` layer name.

2. `Selected layers only` — Replaces text only for directly selected text layers.

3. `String templates` — Select frames or groups that contents text layers with string templates. Replaces only the contents of a string in {braces}.

4. `Random order` — All selected items will be filled in a random order. By default all your layers will be filled in order.

---

#### ⛔️ Restrictions

Avoid values without quotes like `null` or `undefined` your file should be an array consists of objects.

---

#### Previous version of the plugin

This version was rewritten in React. Which allows to be more flexible and use external libraries. The previous version was written in plane HTML and vanila JS but you still can fin it here — [github.com/PavelLaptev/JSON-from-Figma](https://github.com/PavelLaptev/JSON-from-Figma).

---

#### Original boilerplate repo

[github.com/nirsky/figma-plugin-react-template](https://github.com/nirsky/figma-plugin-react-template)
