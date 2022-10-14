const judete = ["Alba", "Arad", "Argeș", "Bacău", "Bihor", "Bistrița-Năsăud", 
    "Botoșani", "Brașov", "Brăila", "Buzău", "Caraș-Severin", "Cluj", "Constanța",
    "Covasna", "Dâmbovița", "Dolj", "Galați", "Gorj", "Harghita", "Hunedoara",
    "Ialomița", "Iași", "Ilfov", "Maramureș", "Mehedinți", "Mureș", "Neamț", "Olt",
    "Prahova", "SatuMare", "Sălaj", "Sibiu", "Suceava", "Teleorman", "Timiș",
    "Tulcea", "Vaslui", "Vâlcea", "Vrancea", "București", "București - Sector 1",
    "București - Sector 2", "București - Sector 3", "București - Sector 4",
    "București - Sector 5", "București - Sector 6", "Călărași", "Giurgiu",
];

const cValidate = [2, 7, 9, 1, 4, 6, 3, 5, 8, 2, 7, 9];

const zileLuna = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const date = {
    sex: "",
    an: "",
    luna: "",
    zi: "",
    judet: "",
};

function validateLast(x, y) {
    
    let n = 0;

    for ( let i = 0; i <= 11; i++ ) 
         n = n + x[i] * y[i];
    

    return n;
}

document.getElementById("validateCNP").onclick = function() {
    
    var codnumeric = document.getElementById("inputCNP").value;
    
    if(/^\d+$/.test(codnumeric) === 0) {
        alert("CNP invalid");
        
    };

    let sex = parseInt(codnumeric.slice(0, 1));
    
    if(sex == 0){
        alert("CNP invalid");
    }
    else if(sex % 2 == 0) {
        date.sex = "F";
    }
    else date.sex = "M";
    
    //date.sex = sex;
    
    let an = parseInt(codnumeric.slice(1, 3));
    
    if (sex == 1 || sex == 2) {
        an += 1900;
    }
    else if (sex == 3 || sex == 4) {
        an += 1800;
    } 
    else {
        an += 2000;
    }
    
    date.an = an;
    
    
    let luna = parseInt(codnumeric.slice(3, 5));
    
    if(an < 1000 || an > 3000 || luna == 0 || luna > 12){
        alert("CNP invalid");
    }
    
    date.luna = luna;
    
    if(an % 400 == 0 || (an % 100 != 0 && an % 4 == 0)){
        zileLuna[1] = 29;
    }
    
    let zi = parseInt(codnumeric.slice(5, 7));
    
    if (1 > zi || zi > zileLuna[luna-1]) {
        alert("CNP invalid");
    }
    
    date.zi = zi;
    
    let judet = codnumeric.slice(7, 9);
    
    if (judet < 1 || judet > 52) {
        alert("CNP invalid");
    }

    date.judet = judete[judet-1];
    
    let comp = parseInt(codnumeric.slice(12, 13));

    let cCNP = codnumeric.split("");
    
   
    

    if( comp !== (validateLast(cCNP, cValidate) % 11)) {
        alert("CNP invalid");
    }

    /*
    
    for ( let i = 0; i <= 12; i++ ) {
        n = n + cCNP[i]*cValidate[i];
    }

    if( comp !== (n % 11)) {
        alert("CNP invalid");
    }


    console.log(validateLast(cCNP, cValidate) % 11);
    console.log(cCNP);
    console.log(cValidate);
    console.log(typeof codnumeric);
    console.log(codnumeric);
    console.log(sex);
    console.log(an);
    console.log(luna);
    console.log(zi);
    console.log(judet); 
    console.log(judete[judet-1]);
    
    */

    document.getElementById("result").innerHTML = JSON.stringify(date);

    
}
