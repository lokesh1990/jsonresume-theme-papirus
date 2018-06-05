var fs = require("fs");
var Handlebars = require("handlebars");
var moment = require("moment");
var pluralize = require('pluralize');
var path = require('path');

function render(resume) {
	var css = fs.readFileSync(path.join(__dirname, "/style.css"), "utf-8");
	var tpl = fs.readFileSync(path.join(__dirname, "/resume.hbs"), "utf-8");
	var partialsDir = path.join(__dirname, "partials");
	var filenames = fs.readdirSync(partialsDir);

	filenames.forEach(function(filename) {
    var matches = /^([^.]+).hbs$/.exec(filename);
    if(!matches) {
      return;
    }
    var name = matches[1];
    var filepath = path.join(partialsDir, filename);
    var template = fs.readFileSync(filepath, "utf8");

    Handlebars.registerPartial(name, template);
	});

	return Handlebars.compile(tpl)({
		css: css,
		resume: resume
	});
}

function exportPdf(resumeFile, pageFormat) {
  var resume = require(__dirname + resumeFile);
  const pdf = require('html-pdf');
  const template = render(resume, pageFormat);

  pdf.create(template, {format: pageFormat}).toFile('./resume.pdf', function (err, res) {
    if (err) {
			return console.log(err);
		}
  });
}

module.exports = {
	render: render,
  exportPdf: exportPdf
};

/* HANDLEBARS HELPERS */
Handlebars.registerHelper('toLowerCase', function(str) {
  return str.toLowerCase();
});

Handlebars.registerHelper('spaceToDash', function(str) {
  return str.replace(/\s/g, '-').toLowerCase();
});

Handlebars.registerHelper('formatDate', function(date) {
	if(typeof date === 'undefined') {
		return 'present';
	}
	return date;
});

Handlebars.registerHelper('formatDateYear', function(date) {
	if(typeof date === 'undefined') {
		return 'present';
	}
	return date;
});

Handlebars.registerHelper('networkIcon', function(network) {
	if(network === 'StackOverflow') {
        return 'stack-overflow';
  }
	else {
        return network.toLowerCase();
	}
});

Handlebars.registerHelper('wordWrap', function(str) {
	str = str.replace(/\//g, "/");
	return str.replace("/ / ", "//");
});

Handlebars.registerHelper('equals', function(src, target, options) {
	if(typeof src !== undefined && src.length > 0 && src === target) {
    return options.fn(this);
  }
  return options.inverse(this);
});
