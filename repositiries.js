const request = require("request");
const cheerio = require("cheerio");
let fs = require("fs");
let repoheadingname = require("./repoheading");

function repofetch(link){
    request(link,cb);
}
//esme repositries nikalenge aur saath mai folder bana denge person ke naam ka
//github->people[folder]->person ki profile mai jake[repositries][link]yaha se bhejenge
function cb(error,response,data){
    let ch = cheerio.load(data);
    let name = ch('.p-name.vcard-fullname.d-block.overflow-hidden ').text().trim();
    // console.log(name);
    let folderpath = `./${name}`;
    if(!fs.existsSync(`./${name}`)){
        fs.mkdirSync(`./${name}`);
    }
    let allatagsofrepo = ch('.UnderlineNav-item');
    let linkofrepo = ch(allatagsofrepo[1]).attr("href");
    let completelinkrepo = "https://github.com"+linkofrepo;
    // console.log(completelinkrepo);
    repoheadingname(completelinkrepo,folderpath);
}

module.exports = repofetch;