const request = require("request");
const cheerio = require("cheerio");
let fs = require("fs");

//top 3 repositries ke naam uthake folder bana denge aur link nikal lenge un repo ke 
function repoheadingname(link,folderpath){
    request(link,function cb(error,response,data){
        let ch = cheerio.load(data);
        let atagofheading = ch('a[itemprop="name codeRepository"]');
        for(let i=0;i<3;i++){
            let oneatagofheading = atagofheading[i];
            let nameofrepo = ch(oneatagofheading).text().trim();
            // console.log(nameofrepo);
            let folderpath1 = folderpath + `/${nameofrepo}`;
            if(!fs.existsSync(folderpath1)){
                fs.mkdirSync(folderpath1);
            }
            let linkofheading = ch(oneatagofheading).attr("href");
            let completelinkofheading = "https://github.com"+linkofheading;
            // console.log(completelinkofheading);
            headingfile(completelinkofheading,folderpath1);
        }
    });
}
//phir un link[href] ko json mai daal denge 
function headingfile(completelinkofheading,folderpath1){
    if(!fs.existsSync(`${folderpath1}/heading.json`)){
        fs.writeFileSync(`${folderpath1}/heading.json`,JSON.stringify([]));

    }
    let heading = JSON.parse(fs.readFileSync(`${folderpath1}/heading.json`));
    let newheadingobj = {
        "heading link" : completelinkofheading
    }
    heading.push(newheadingobj);
    fs.writeFileSync(`${folderpath1}/heading.json`,JSON.stringify(heading));
    
}

module.exports = repoheadingname;