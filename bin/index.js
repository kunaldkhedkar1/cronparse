#! /usr/bin/env node
const yargs = require("yargs");
const parseCronExpression  = require("../src/parser");
const formatToTable = require("../src/formatToTable");
const usage = "\nUsage: cronparse <cron-expression> to be parsed <path-to-script> script to run";
const options = yargs  
      .usage(usage)                                                                                                   
      .help(true)  
      .argv;
      
    const args = yargs.argv._;
    try{
        const parsedexpr = parseCronExpression(args[0]);
        const out = formatToTable(parsedexpr)
        console.log(out);
    }
    catch(e){
        console.error(e.message)
    }
