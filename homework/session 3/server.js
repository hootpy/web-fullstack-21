const express = require("express");
const app = express();
const fs = require("fs");

app.get("/",function(req,res){
    res.send(`
    <h1>
    <ul>
        <li><a href="/web13">Web 13</a></li>
        <li><a href="/web14">Web 14</a></li>
        <li><a href="/web15">Web 15</a></li>
        <li><a href="/web16">Web 16</a></li>
        <li><a href="/web17">Web 17</a></li>
        <li><a href="/web18">Web 18</a></li>
</ul>
</h1>
    `)
})

app.get("/:name",function (req,res){
    const { name } = req.params;
    const fileData = fs.readFileSync(`./data/${name}.json`, { encoding: 'utf-8' });
    const dataArr = JSON.parse(fileData);
    let html = "<ul>";
    for(let i = 0; i < dataArr.length; i ++){
        let item = dataArr[i];
        html = html + `<li>${item}</li>`
    }
    html = html + "</ul>"
    res.send(html)
})


app.listen(8008,function (error) {
    if(error) console.log(error)
    else console.log("Server start success!")
})

