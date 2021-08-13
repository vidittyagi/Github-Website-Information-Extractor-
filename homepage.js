const request = require("request");
const cheerio = require("cheerio");
let repofetch = require("./repositiries");

request("https://github.com/Github",cb);

function cb(error,response,data){
        let ch = cheerio.load(data);
        let allatags = ch('.UnderlineNav-item '); //6 atags
        let link = ch(allatags[2]).attr("href"); //3 position pe hai people ka atag
        let completelink = "https://github.com" + link;
        // console.log(completelink);
        people(completelink);
}

//github ke page pe jo people ata hai uska link hai completelink
function people(link){
    request(link,cb1);
}
//cb1 vale function mai humne jo top 2 people name nikal liye aur unka  completelink bhejenge
function cb1(error,response,data){
        let ch = cheerio.load(data);
        let allatags = ch('.table-list-cell.py-3.v-align-middle.css-truncate.pl-3 a'); //30 atags
        for(let i=0;i<2;i++){
        let atag = allatags[i];
        let link = ch(atag).attr("href");
        let completelink = "https://github.com" + link;
        // console.log(completelink);
        repofetch(completelink);
        }
}
