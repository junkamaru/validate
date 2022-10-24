const county = ["Alba", "Arad", "Arges", "Bacau", "Bihor", "Bistrita-Nasaud", 
    "Botosani", "Brasov", "Braila", "Buzau", "Caras-Severin", "Cluj", "Constanta",
    "Covasna", "Dâmbovița", "Dolj", "Galați", "Gorj", "Harghita", "Hunedoara",
    "Ialomita", "Iasi", "Ilfov", "Maramures", "Mehedinti", "Mures", "Neamt", "Olt",
    "Prahova", "Satu-Mare", "Salaj", "Sibiu", "Suceava", "Teleorman", "Timis",
    "Tulcea", "Vaslui", "Valcea", "Vrancea", "Bucuresti", "Bucuresti - Sector 1",
    "Bucuresti - Sector 2", "Bucuresti - Sector 3", "Bucuresti - Sector 4",
    "Bucuresti - Sector 5", "Bucuresti - Sector 6", "Calarasi", "Giurgiu",
];

const cValidate = [2, 7, 9, 1, 4, 6, 3, 5, 8, 2, 7, 9];

const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const date = {
    sex: "",
    year: "",
    month: "",
    day: "",
    county: "",
};

//

let validate = true;

///////////////////////////////////////////////////////////////////////////////




function checkLast(CNP, con) {
    
    let n = 0;

    for ( let i = 0; i <= 11; i++ ) 
         n = n + CNP[i] * con[i];
    

    return n % 11;
};

function computeYearValidate(sex, year) {
    if (sex == 1 || sex == 2) {
        return year + 1900;
    }
    else if (sex == 3 || sex == 4) {
        return year + 1800;
    } 
    else {
        return year + 2000;
    }
};

function computeYearGenerate(sex, year) {
    if (sex == 1 || sex == 2) {
        return year - 1900;
    }
    else if (sex == 3 || sex == 4) {
        return year - 1800;
    } 
    else {
        return year - 2000;
    }
};

function checkLeapYear( year, monthdays) {
    if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)){
        monthdays = 29;
    }
};

function checkSex ( sex ) {
    if(sex % 2 == 0) {
        return "F";
    }
    else return "M";
}

/////////////////////////////////////////////////////////////////////

function validateForLetters( CNP ) {
    if(/^\d+$/.test(CNP) === 0) {
        validate = false;
        //return alert("CNP invalid");
    };
};
///
function validateSex( sex ) {
    if(sex == 0){
        validate = false;
        //return alert("CNP invalid");
        
    }
};
///
function validateYearMonth(year, month) {
    if(year < 1800 || year > 2022 || month == 0 || month > 12){
        validate = false;
        //return alert("CNP invalid");

    }
    
};
///
function validateDay( day, monthdays ) {
    if (1 > day || day > monthdays) {
        validate = false;
        //return alert("CNP invalid");
    }
};
///
function validateCounty( county ) {
    if (county < 1 || county > 52) {
        validate = false;
        //return alert("CNP invalid");
    }        
};

/////////////////////////////////////////////////////////////////////

document.getElementById("validateCNP").onclick = function() {

    let codnumeric = document.getElementById("inputCNP").value;

    let sex = parseInt(codnumeric.slice(0, 1));
    let year = parseInt(codnumeric.slice(1, 3));
    let month = parseInt(codnumeric.slice(3, 5));
    let day = parseInt(codnumeric.slice(5, 7));
    let user_county = codnumeric.slice(7, 9);
    let constant = parseInt(codnumeric.slice(12, 13));
    let cCNP = codnumeric;


    validateForLetters(codnumeric);
    validateSex(sex);
    validateYearMonth(computeYearValidate(sex, year), month);
    validateCounty(user_county);
    validateDay(day, monthDays[month-1])
    checkLeapYear(year, monthDays);

    

    if ( validate == false ) {
        document.getElementById("result").innerHTML = JSON.stringify("CNP-ul nu este valid!");
        console.log("1");
    }
    else {
        date.sex = checkSex(sex);
        date.year = computeYearValidate(sex, year);
        date.month = month;
        date.day = day;
        date.county = county[user_county-1];
    }
    
    if( constant !== (checkLast(cCNP, cValidate))) {
        document.getElementById("result").innerHTML = JSON.stringify("CNP-ul nu este valid!");
        console.log("2");
    }
    else {
        document.getElementById("result").innerHTML = JSON.stringify(date);
    }
    
};

document.getElementById("clear").onclick = function() {
    document.getElementById("result").innerHTML = "";
    document.getElementById("inputCNP").value = "";
};

function convertAndCheckSex( sex, year ) {
    if (sex == "M") {
        if (year > 1999) {
            return 5;
        }
        else if (year < 2000 && year > 1899) {
            return 1;
        }
        else if ( year > 1799 && year < 1900) {
            return 3;
        }
        else return 7;
    }
    else if ( sex == "F") {
        if (year > 1999) {
            return 6;
        }
        else if (year < 2000 && year > 1899) {
            return 2;
        }
        else if ( year > 1799 && year < 1900) {
            return 4;
        }
        else return 8;
    }
    else {
        
        return 0;
    }
    
}

function convertAndCheckYear( year ) {
    if( year > 1999 ) {
        return (year - 2000).toString();
    }
    else if(year < 2000 && year > 1899) {
        return (year - 1900).toString();
    } 
    else if (year > 1799 && year < 1900) {
        return (year - 1800).toString();
    }
    else return 0;
}

function generateRandomSex() {
    let sex = Math.floor(Math.random() * 2) + 1;

    if(sex == 1) {
        return "M";
    }
    else return "F";
}

function generateRandomInputs(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function checkAndCreateRandomValues(sex, year, month, day, user_county) {
//     if(sex == "") {
//         sex += generateRandomSex();
//     }

//     if(year ==  "") {
//         year += generateRandomInputs(1900, 2022);
//     }

//     if(month == "") {
//         month += generateRandomInputs(1, 12);
//     }

//     if(day == "") {
//         day += generateRandomInputs(1, monthDays[month]);
//     }
    
//     if(user_county == "") {
//         let countyIndex = generateRandomInputs(1,47);
//         user_county += county[countyIndex];
//     }



// }

document.getElementById("generateCNP").onclick = function() {
        
    let sex = document.getElementById("gen").value;
    let year = document.getElementById("anulN").value;
    let month = document.getElementById("luna").value;
    let day = document.getElementById("ziua").value;
    let user_county = document.getElementById("judet").value;

    //checkAndCreateRandomValues(sex, year, month, day, user_county);

    if(sex == "") {
        sex = generateRandomSex();
    }
    else if (sex != "M" && sex != "F") {
        return alert("Gen invalid!")
    }

    if(year ==  "") {
        year = generateRandomInputs(1900, 2022);
    }
    else if (year < 1800 || year > 2022) {
        return alert("An invalid!");
    }

    if(month == "") {
        month = generateRandomInputs(1, 12);
    }
    else if(month < 1 || month > 12) {
        return alert("Luna invalida!");
    }

    if(day == "") {
        day = generateRandomInputs(1, monthDays[month-1]);
    }
    else if (day < 1 || day > monthDays[month-1]) {
        return alert("Zi invalida!");
    }
    
    if(user_county == "") {
        let countyIndex = generateRandomInputs(1,47);
        user_county = county[countyIndex];
    }

    if (county.indexOf(user_county) != -1){
        user_county = county.indexOf(user_county) + 1;
    }
    else return alert("Judet invalid!");


    sex = convertAndCheckSex(sex, year).toString();
    year = computeYearGenerate(sex, year).toString();
    month = month.toString();
    day = day.toString();
    if( user_county < 10 ) {
        user_county = "0" + user_county.toString();
    }
    else user_county = user_county.toString();


    let newCNP = sex + year + month + day + user_county + generateRandomInputs(500, 999).toString();
    console.log(newCNP);
    
    let finalN = checkLast(newCNP, cValidate).toString();

    newCNP = newCNP + finalN;
    // confirm += checkLast(confirm.split(""), cValidate).toString();
    console.log(newCNP);

    
    console.log(typeof(sex));
    console.log(typeof(year));
    console.log(typeof(month));
    console.log(typeof(day));
    console.log(typeof(user_county));




    console.log(sex);
    console.log(year);
    console.log(month);
    console.log(day);
    console.log(user_county);

}
    

    
       
    
    