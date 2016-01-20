function formatDate(value){
  if(value){
    Number.prototype.padLeft = function(base,chr){
      var len = (String(base || 10).length - String(this).length)+1;
      return len > 0? new Array(len).join(chr || '0')+this : this;
    }
    var d = new Date(value),
    dformat = [ (d.getMonth()+1).padLeft(),
                 d.getDate().padLeft(),
                 d.getFullYear()].join('-')+
              ' ' +
              [ d.getHours().padLeft(),
                d.getMinutes().padLeft(),
                d.getSeconds().padLeft()].join(':');
    return dformat;
  }
}
var dates = [
1340114322000,
1340114637000,
1340116336000,
1340119146000,
1340120233000,
1349746259000,
1354031136000,
1354031209000,
1373896170000,
1375282382000,
1395241207000,
1395843246000,
1395843292000,
1398433659000,
1398442844000,
1398442879000,
1404476521000,
1404476714000,
1404895421000,
1404895459000,
1405066156000,
1410945336000,
1410946471000,
1410954571000,
1416501640000,
1416501666000,
1427879187000,
1427879263000,
1431951214000,
1431951286000,
1431951493000,
1431951620000,
1434034118000,
1434034324000,
1440681471000,
1441023370000,
1441024025000,
1441189993000,
]
utc = []
dateedit = []
for (var i = 0; i < dates.length; i++) {
	utc.push(formatDate(dates[i])); // Wed, 02 Sep 2015 10:33:13
	dateedit.push(new Date(dates[i]).toUTCString()); // "2015-09-02 12:33:13
};
console.log(utc);
console.log(dateedit);