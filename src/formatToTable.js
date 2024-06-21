const colToColNameMap = {
    minutes: "minute",
    hours: "hour",
    months: "month",
    days:"day of month",
    weekdays: "day of week",
    cmd: "command"
}
function formatToTable(data){
    let out = ""
    for(let col in data){
        const c = colToColNameMap[col].padEnd(14);
        const v = Array.isArray(data[col]) ? data[col].join(" ") : data[col];
        out+=c + v + "\n"
    }
    return out;
}

module.exports = formatToTable;