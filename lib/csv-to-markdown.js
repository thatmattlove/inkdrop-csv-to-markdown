'use strict'

// define application requirements & paths
//
const app = require('electron').remote.app;
const modulePath = app.getAppPath() + '/node_modules/'

// import default codemirror module
//
require(modulePath + 'codemirror');
const editor = global.inkdrop.getActiveEditor();

// checktheroads: *almost* untouched code from Jesse G. Donat via:
// checktheroads:   * https://donatstudios.com/CsvToMarkdownTable
// checktheroads:   * https://www.npmjs.com/package/csv-to-markdown-table
// checktheroads:   * https://github.com/donatj/CsvToMarkdownTable
// checktheroads: original comments below:
// 
// Converts CSV to Markdown Table
// 
// @param {string} csvContent - The string content of the CSV
// @param {string} delimiter - The character(s) to use as the CSV column delimiter
// @param {boolean} hasHeader - Whether to use the first row of Data as headers
// @returns {string}
// 
function csvToMarkdown(csvContent, delimiter, hasHeader) {
    if (delimiter === void 0) { delimiter = "\t"; }
    if (hasHeader === void 0) { hasHeader = false; }
    if (delimiter != "\t") {
        csvContent = csvContent.replace(/\t/g, "    ");
    }
    var columns = csvContent.split("\n");
    var tabularData = [];
    var maxRowLen = [];
    columns.forEach(function (e, i) {
        if (typeof tabularData[i] == "undefined") {
            tabularData[i] = [];
        }
        var regex = new RegExp(delimiter + '(?![^"]*"\\B)');
        var row = e.split(regex);
        row.forEach(function (ee, ii) {
            if (typeof maxRowLen[ii] == "undefined") {
                maxRowLen[ii] = 0;
            }
            maxRowLen[ii] = Math.max(maxRowLen[ii], ee.length);
            tabularData[i][ii] = ee;
        });
    });
    var headerOutput = "";
    var seperatorOutput = "";
    maxRowLen.forEach(function (len) {
        var sizer = Array(len + 1 + 2);
        seperatorOutput += "|" + sizer.join("-");
        headerOutput += "|" + sizer.join(" ");
    });
    headerOutput += "| \n";
    seperatorOutput += "| \n";
    if (hasHeader) {
        headerOutput = "";
    }
    var rowOutput = "";
    tabularData.forEach(function (col, i) {
        maxRowLen.forEach(function (len, y) {
            var row = typeof col[y] == "undefined" ? "" : col[y];
            var spacing = Array((len - row.length) + 1).join(" ");
            var out = "| " + row + spacing + " ";
            if (hasHeader && i === 0) {
                headerOutput += out;
            }
            else {
                rowOutput += out;
            }
        });
        if (hasHeader && i === 0) {
            headerOutput += "| \n";
        }
        else {
            rowOutput += "| \n";
        }
    });
    return headerOutput + seperatorOutput + rowOutput;
    // checktheroads: removed module export
}

// 'cm.getSelection':
//   see: https://codemirror.net/doc/manual.html#getSelection
//   gets selected text via codemirror api and:
//     sets line separation string
//     sets csv delimiter to a comma
//     uses the first row as a header row
// 'csvToMarkdown':
//   sends the above output from 'cm.getSelection' to the above 'csvToMarkdown' function
// 'cm.replaceSelection':
//   see: https://codemirror.net/doc/manual.html#replaceSelection
//   takes the output of 'csvToMarkdown' and replaces the selected text from 'cm.getSelection'
//   ...which creates a markdown table
//
function convertTable() {
  const cm = global.inkdrop.getActiveEditor().codeMirror
  cm.replaceSelection(csvToMarkdown(cm.getSelection('\n'), ',', true)
)}

// inkdrop plugin command definitions
// see https://doc.inkdrop.info/manual/plugin-word-count
//
module.exports = {
  activate() {
    this.subscription = inkdrop.commands.add(document.body, {
    'csv-to-markdown': () => convertTable()
    })
  },
  deactivate() {
    this.subscription.dispose()
  }
}
