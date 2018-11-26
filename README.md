# inkdrop-csv-to-markdown package

---

Integrated [donatj](https://github.com/donatj)'s [CsvToMarkdownTable](https://github.com/donatj/CsvToMarkdownTable) as an [Inkdrop](https://www.inkdrop.info) plugin.

---

Convert CSV-formatted text to a Markdown table.

Turn this:

```
Heading 1,Heading 2,Heading 3
Cell 1:1,Cell 2:1,Cell 3:1
Cell 1:2,Cell 2:2,Cell 3:2
Cell 1:3,Cell 2:3,Cell 3:3
```

Into this:

```
| Heading 1 | Heading 2 | Heading 3 | 
|-----------|-----------|-----------| 
| Cell 1:1  | Cell 2:1  | Cell 3:1  | 
| Cell 1:2  | Cell 2:2  | Cell 3:2  | 
| Cell 1:3  | Cell 2:3  | Cell 3:3  | 

```

Which then reders as this:

| Heading 1 | Heading 2 | Heading 3 | 
|-----------|-----------|-----------| 
| Cell 1:1  | Cell 2:1  | Cell 3:1  | 
| Cell 1:2  | Cell 2:2  | Cell 3:2  | 
| Cell 1:3  | Cell 2:3  | Cell 3:3  | 

![inkdrop-csv-to-markdown.gif](https://raw.githubusercontent.com/checktheroads/inkdrop-csv-to-markdown/master/assets/inkdrop-csv-to-markdown.gif)

## Installation
From Inkdrop Package Manager (`ipm`), run the command:

```
ipm install csv-to-markdown
```
## Usage
Activate the plugin by:
* Navigating to **Plugins** → **Convert CSV to Markdown Table**
* Selecting & right clicking on your CSV-formatted table and selecting **Convert CSV to Markdown Table**
* Selecting your CSV-formatted table and pressing **`Cmd`+`Ctrl`+`T`**

## Notes

>*Disclaimer: I'm a network engineer, not a developer, so I know not what I do. Please educate me if I've done something wrong here.*

When taking notes, writing markdown, or writing in general, creating and working with tables is a bit of a drag. I rely *heavily* on the [takezoe/atom-csv-markdown](https://github.com/takezoe/atom-csv-markdown) tool in [Atom](https://atom.io) to make this easier, as it's significantly faster & easier to quickly record data in CSV format than trying to create a table on the fly.

## TODO
* Create an "reverse" function to convert from a Markdown table back to CSV.
