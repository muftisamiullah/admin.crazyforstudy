const MakeSlug = (str) => {
    return str?.trim()?.toLowerCase()?.replace(/[^\w ]+/g,'')?.replace(/ +/g,'-');   
}
const SameSlug = (str) => {
    return str?.trim()?.replace(/[^\w ]+/g,'')?.replace(/ +/g,'-');   
}

const GetString = (str, length) => {
    if(str){
        return str.substr(0,length);
    }else{
        return '';
    }
}
const GetName = (str) => {
    if(str){
        return str.replaceAll('-', ' ');   
    }else{
        return '';
    }
}

const getAllValue = (str) => {
    const data = str.split('-')
    return {
        id: data[0],
        value: MakeSlug(data[1]),
        value2: MakeSlug(data[2])
    }
}

const ObjectToCsv = async (data) => {
    const csvRows = [];
    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(','));
    for(const row of data){
        const values = headers.map(header => {
            const escaped = (''+row[header]).replace(/"/g, '\\"');
            return `"${escaped}"`;
        });
        csvRows.push(values.join(','));
    }
    return csvRows.join('\n');
}

const downloadData = async (data,isbn) => {
    const blob = new Blob([data],{ type: 'text/csv'});
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden",'');
    a.setAttribute("href",url);
    a.setAttribute("download",`${isbn}.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
export function checkExists(arr = [], field, el){
    if(typeof arr !== "undefined") {
        return Array.from(arr)?.some(elem => elem[field] == el);
    }
}
export function getFilteredData(arrayData, match_field,field_value,field_name){
    if(typeof arrayData !== "undefined"){
     const filtereData = Array?.from(arrayData)?.filter(element => element[match_field] == field_value);
     if(filtereData[0] !== undefined){
       return filtereData && filtereData[0][field_name];
     }
    }
  }

function htmlDecode(content) {
    let e = document.createElement('div');
    e.innerHTML = content;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
}

function pad (str, max) {
    str = str.toString();
    return str.length < max ? pad("0" + str, max) : str;
}

const calculateTime = (id, eventTime, afterComplete) => {
    var countDownDate = new Date(eventTime).getTime();        
    var x = setInterval(function() {
        var now = new Date().getTime();
        var distance = countDownDate + 14400000 - now;
        //console.log(distance);
        let ele = document.getElementById(id);
        if (distance < 4000) {
            clearInterval(x);
            if(ele){
                ele.innerHTML = afterComplete;
            }
        }else{
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = (days*24)+Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            if(ele){
                ele.innerHTML = pad(hours,2) + ":"  + pad(minutes,2) + ":" + pad(seconds,2);
            }
        }
    }, 1000);
}

const calculateTime1 = (id, eventTime, afterComplete) => {
    var countDownDate = new Date(eventTime).getTime();        
    var x = setInterval(function() {
        var now = new Date().getTime();
        var distance = countDownDate - now;
        //console.log(distance);
        let ele = document.getElementById(id);
        
        if (distance < 4000) {
            clearInterval(x);
            if(ele){
                ele.innerHTML = afterComplete;
            }
        }else{
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = (days*24)+Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            if(ele){
                ele.innerHTML = '';
                ele.innerHTML = pad(hours,2) + ":"  + pad(minutes,2) + ":" + pad(seconds,2);
            }
        }
    }, 1000);
} 

export {
    MakeSlug,
    calculateTime,
    SameSlug,
    GetString,
    GetName,
    getAllValue,
    ObjectToCsv,
    downloadData,
    htmlDecode,
    calculateTime1,
}
