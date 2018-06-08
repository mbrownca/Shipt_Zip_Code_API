 
document.getElementById('button').addEventListener('click', function() {

var zip = document.getElementById('input').value;

 var isValid = /^[0-9]{5}(?:-[0-9]{4})?$/.test(zip);
            if (isValid) {
                  document.getElementById("alert").style.display = "none";
                }
            else {
             document.getElementById("alert").style.display = "block";
            }


fetch('https://shipt-zip-code-test-api.herokuapp.com/api/zip_codes/'+zip)
.then(res => res.json())
.then((result) => {
var openings = result;
var storenames = [];
for(var i=0, numopenings = openings.stores.length; i < numopenings; i++){
var today = new Date();
var store_launch = new Date(openings.stores[i].launch_date),
year  = store_launch.getFullYear(),
month  = (store_launch.getMonth() + 1);
if (today < store_launch) {
var store_launch = 'Coming&nbsp;'+([month,year].join('/'));
}
else {
var store_launch = 'Now Available';
//var store_launch = 'Now Available'+([month,year].join('/'));
}
storenames.push("<li>"+openings.stores[i].name+"<br/><span>"+store_launch+"</span></li>");
document.getElementById('store-container').style.width = 194+(194*[i]) +'px';
}
document.getElementById("store-header").innerHTML =  "DELIVERING FROM";
document.getElementById("store-container").style.padding = "0px 0px 60px 0px";
document.getElementById("store-cta").style.display = "block";
storenames =  storenames.sort().join("");
document.getElementById("store-section").innerHTML =  storenames;
}).catch(err => console.error(err));
});
 