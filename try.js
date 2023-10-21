


const heb = require("hebrew-transliteration");



const schema = new heb.Schema({
    ALEF: "A",
    // BET: "B",
    // ZAYIN:"Z"   
  })

const f=(name)=>{
        
        if  (!(/^[a-zA-Z]+$/.test(name))){
            const transliterate = heb.transliterate;
            name=transliterate(name,schema);
        }
        console.log(name)
    }     

f("שלום")
    
