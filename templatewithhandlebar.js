var data = `this is {{name}} and his age is {{age}} and address1 is {{address.address1}}

fullname:
{{fullName author}}

1:date is: {{myxyz "yyyy mm dd" -2}}
`

var dateFormat = require('dateformat');
var handlebar = require('handlebars');
var fs = require('fs')


var context = {
    author: { firstName: "Alan", lastName: "Johnson" },
    body: "I Love Handlebars",
    comments: [{
        author: { firstName: "Yehuda", lastName: "Katz" },
        body: "Me too!"
    }]
};

handlebar.registerHelper('fullName', function (person) {

    console.log('in regiser function')
    //console.log(person)
    return person.firstName + " " + person.lastName;
});

handlebar.registerHelper('myxyz', function (format, days) {
    console.log('---------------')
    console.log('format:' + format)
    console.log('days: ' + days)
    console.log('---------------')

    var date = new Date();

    var newDate = date.setDate(date.getDate() + +days);
    var ret =  dateFormat(date, format)
    console.log(ret)
    return ret
    console.log('---------------')
});

//var day = dateFormat(new Date(), "yyyy-mm-dd");
//console.log(day)
//var data = fs.readFileSync('c:\\temp\\resp.xml', 'utf-8')
var template = handlebar.compile(data)
console.log(template(context))

