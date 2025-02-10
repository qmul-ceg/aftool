import { AFibColumns } from "@/enums/AFibColumns";

const OnAnticoagulantOptions = {

    DOAC: "YES - DOAC",
    Warf: "YES - Warf",
    OtherOralAnticoagulant: "YES - Other (Oral)",
    ThirdPartyPrescribingCode: "YES - 3rd Party",
    ThirdPartyPrescribingWarf: "YES - Warf (3rd P)",
    ThirdPartyPrescribingDOAC: "YES - DOAC (3rd P)",
    AnticoagulantsDeclined: "DECLINED",
    AnticoagulantsContraindicated: "CONTRA",
    NO: "NO"
};

export function onAnticoagulantMeds(dataRow, relRunDate) {

    const dt6monthBeforeRelRunDate = new Date(relRunDate);
    dt6monthBeforeRelRunDate.setMonth(dt6monthBeforeRelRunDate.getMonth() - 6);

    let DOAC, Warf, AnticoagContra, AnticoagDecline;
    let OtherAnticoagulants, ThirdPartyDOAC, ThirdPartyWarf, ThirdPartyCode;

    DOAC = dataRow[AFibColumns.DOAC_Date];
    Warf = dataRow[AFibColumns.WarfarinDate];
    AnticoagContra = dataRow[AFibColumns.AnticoagContraDate];
    AnticoagDecline = dataRow[AFibColumns.AnticoagDeclineDate];
    ThirdPartyCode = dataRow[AFibColumns.ThirdPartyCodeDate];    
    ThirdPartyDOAC = dataRow[AFibColumns.ThirdParty_DOAC_Date];
    ThirdPartyWarf = dataRow[AFibColumns.ThirdPartyWarfarinDate];
    OtherAnticoagulants = dataRow[AFibColumns.OtherAnticoagulantsDate];

    let AnticoagDates = [];

    if (DOAC) AnticoagDates.push(Date.parse(DOAC));
    if (Warf) AnticoagDates.push(Date.parse(Warf));       
    if (AnticoagContra) AnticoagDates.push(Date.parse(AnticoagContra));
    if (AnticoagDecline) AnticoagDates.push(Date.parse(AnticoagDecline));            
    if (ThirdPartyCode) AnticoagDates.push(Date.parse(ThirdPartyCode));
    if (ThirdPartyDOAC) AnticoagDates.push(Date.parse(ThirdPartyDOAC));
    if (ThirdPartyWarf) AnticoagDates.push(Date.parse(ThirdPartyWarf));
    if (OtherAnticoagulants) AnticoagDates.push(Date.parse(OtherAnticoagulants));

    let OnAnticoag = OnAnticoagulantOptions.NO;

    if (AnticoagDates.length === 1) {
        
        if (DOAC)  
            OnAnticoag = OnAnticoagulantOptions.DOAC;                             // "YES - DOAC";

        else if (Warf)
            OnAnticoag = OnAnticoagulantOptions.Warf;                             // "YES - WARF";

        else if (AnticoagContra)
            OnAnticoag = OnAnticoagulantOptions.AnticoagulantsContraindicated;    // "CONTRA";

        else if (AnticoagDecline)
            OnAnticoag = OnAnticoagulantOptions.AnticoagulantsDeclined;           // "DECLINED";

        else if (OtherAnticoagulants)
            OnAnticoag = OnAnticoagulantOptions.OtherOralAnticoagulant;           // "YES - Other (Oral)";

        else if (ThirdPartyCode && Date.parse(ThirdPartyCode) >= dt6monthBeforeRelRunDate)
            OnAnticoag = OnAnticoagulantOptions.ThirdPartyPrescribingCode;        // "YES - 3rd Party";        

        else if (ThirdPartyWarf && Date.parse(ThirdPartyWarf) >= dt6monthBeforeRelRunDate)
            OnAnticoag = OnAnticoagulantOptions.ThirdPartyPrescribingWarf;        // "YES - Warf (3rd P)";             

        else if (ThirdPartyDOAC && Date.parse(ThirdPartyDOAC) >= dt6monthBeforeRelRunDate)
            OnAnticoag = OnAnticoagulantOptions.ThirdPartyPrescribingDOAC;        // "YES - DOAC (3rd P)";           
    }
    else if (AnticoagDates.length > 1){

        let latestDateOfIssue = AnticoagDates.reduce( (lastestDate, issueDate) => lastestDate < issueDate ? issueDate : lastestDate );

        if (DOAC && Date.parse(DOAC) === latestDateOfIssue)  
            OnAnticoag = OnAnticoagulantOptions.DOAC;                             // "YES - DOAC";

        else if (Warf && Date.parse(Warf) === latestDateOfIssue)
            OnAnticoag = OnAnticoagulantOptions.Warf;                             // "YES - WARF";

        else if (AnticoagContra && Date.parse(AnticoagContra) === latestDateOfIssue)
            OnAnticoag = OnAnticoagulantOptions.AnticoagulantsContraindicated;    // "CONTRA";

        else if (AnticoagDecline && Date.parse(AnticoagDecline) === latestDateOfIssue)
            OnAnticoag = OnAnticoagulantOptions.AnticoagulantsDeclined;           // "DECLINED";

        else if (OtherAnticoagulants && Date.parse(OtherAnticoagulants) === latestDateOfIssue)
            OnAnticoag = OnAnticoagulantOptions.OtherOralAnticoagulant;           // "YES - Other (Oral)";

        else if (ThirdPartyCode  && Date.parse(ThirdPartyCode) === latestDateOfIssue) {
            if (Date.parse(ThirdPartyCode) >= dt6monthBeforeRelRunDate)
                OnAnticoag = OnAnticoagulantOptions.ThirdPartyPrescribingCode;    // "YES - 3rd Party";        
        }
        else if (ThirdPartyWarf && Date.parse(ThirdPartyWarf) === latestDateOfIssue) {
            if (Date.parse(ThirdPartyWarf) >= dt6monthBeforeRelRunDate)
                OnAnticoag = OnAnticoagulantOptions.ThirdPartyPrescribingWarf;    // "YES - Warf (3rd P)";             
        }
        else if (ThirdPartyDOAC && Date.parse(ThirdPartyDOAC) === latestDateOfIssue) {
            if (Date.parse(ThirdPartyDOAC) >= dt6monthBeforeRelRunDate)
                OnAnticoag = OnAnticoagulantOptions.ThirdPartyPrescribingDOAC;    // "YES - DOAC (3rd P)";
        }
    }
        
    return OnAnticoag;
}

export function onAspirinAntiplateletMeds(dataRow) {

    let OnAsprineAntip;

    OnAsprineAntip = dataRow[AFibColumns.AspirinDate] || dataRow[AFibColumns.AntiplateletDate] ? "YES" : "NO";
    
    return OnAsprineAntip;
}

export function onNSAIDMeds(dataRow) {

    return dataRow[AFibColumns.NSAID_Med] ? "YES" : "NO";
}

export function onStatinsMeds(dataRow) {

    return dataRow[AFibColumns.StatinsMed] ? "YES" : "NO";
}


export function hasCVD(dataRow) {

    let CVD = "NO";

    if (dataRow[AFibColumns.IHD_Concept] || dataRow[AFibColumns.StrokeTIA_Concept]  || dataRow[AFibColumns.NonHaemStrokeConcept]  || dataRow[AFibColumns.PAD_Concept]) {
        CVD = "YES";
    }
    
    return CVD;
}

export function hasHypertension(dataRow) {

    return dataRow[AFibColumns.HTN_Concept] ? "YES" : "NO";
}

export function getBloodPressure(dataRow) {
    
    let BP = "";
    if (dataRow[AFibColumns.SystolicBPValue] && dataRow[AFibColumns.DiastolicBPValue])
        BP = `${dataRow[AFibColumns.SystolicBPValue]}/${dataRow[AFibColumns.DiastolicBPValue]}`;

    return BP;

}

// Functions for Third Party Anticoagulant to display on Model pop over
export function getThirdPartyAnticoagulantMedsName(dataRow) {

    let ThirdPartyCode, ThirdPartyDOAC, ThirdPartyWarf;

    ThirdPartyCode = dataRow[AFibColumns.ThirdPartyCodeDate];    
    ThirdPartyDOAC = dataRow[AFibColumns.ThirdParty_DOAC_Date];
    ThirdPartyWarf = dataRow[AFibColumns.ThirdPartyWarfarinDate];

    let ThirdPartyAnticoagDates = [];
    if (ThirdPartyCode) ThirdPartyAnticoagDates.push(Date.parse(ThirdPartyCode));
    if (ThirdPartyDOAC) ThirdPartyAnticoagDates.push(Date.parse(ThirdPartyDOAC));
    if (ThirdPartyWarf) ThirdPartyAnticoagDates.push(Date.parse(ThirdPartyWarf));

    let ThirdPartyAnticoag = "";

    if (ThirdPartyAnticoagDates.length === 1) {
        
        if (ThirdPartyCode)
            ThirdPartyAnticoag = dataRow[AFibColumns.ThirdPartyCodeTerm];       // "YES - 3rd Party";        

        else if (ThirdPartyWarf)
            ThirdPartyAnticoag = dataRow[AFibColumns.ThirdPartyWarfarinMed];    // "YES - Warf (3rd P)";             

        else if (ThirdPartyDOAC)
            ThirdPartyAnticoag = dataRow[AFibColumns.ThirdParty_DOAC_med];      // "YES - DOAC (3rd P)";           
    }
    else if (ThirdPartyAnticoagDates.length > 1) {

        let latestDateOfIssue = ThirdPartyAnticoagDates.reduce( (lastestDate, issueDate) => lastestDate < issueDate ? issueDate : lastestDate );

        if (ThirdPartyCode  && Date.parse(ThirdPartyCode) === latestDateOfIssue)
            ThirdPartyAnticoag = dataRow[AFibColumns.ThirdPartyCodeTerm];       // "YES - 3rd Party";        
        
        else if (ThirdPartyWarf && Date.parse(ThirdPartyWarf) === latestDateOfIssue)
            ThirdPartyAnticoag = dataRow[AFibColumns.ThirdPartyWarfarinMed];    // "YES - Warf (3rd P)";             
        
        else if (ThirdPartyDOAC && Date.parse(ThirdPartyDOAC) === latestDateOfIssue)
            ThirdPartyAnticoag = dataRow[AFibColumns.ThirdParty_DOAC_med];      // "YES - DOAC (3rd P)";
    }
    
    return ThirdPartyAnticoag;
}


export function getThirdPartyAnticoagulantIssueDate(dataRow) {

    let ThirdPartyCode, ThirdPartyDOAC, ThirdPartyWarf;

    ThirdPartyCode = dataRow[AFibColumns.ThirdPartyCodeDate];    
    ThirdPartyDOAC = dataRow[AFibColumns.ThirdParty_DOAC_Date];
    ThirdPartyWarf = dataRow[AFibColumns.ThirdPartyWarfarinDate];

    let ThirdPartyAnticoagDates = [];
    if (ThirdPartyCode) ThirdPartyAnticoagDates.push(Date.parse(ThirdPartyCode));
    if (ThirdPartyDOAC) ThirdPartyAnticoagDates.push(Date.parse(ThirdPartyDOAC));
    if (ThirdPartyWarf) ThirdPartyAnticoagDates.push(Date.parse(ThirdPartyWarf));

    let ThirdPartyAnticoagDt = "";

    if (ThirdPartyAnticoagDates.length === 1) {
        
        if (ThirdPartyCode)
            ThirdPartyAnticoagDt = dataRow[AFibColumns.ThirdPartyCodeDate];

        else if (ThirdPartyWarf)
            ThirdPartyAnticoagDt = dataRow[AFibColumns.ThirdPartyWarfarinDate];

        else if (ThirdPartyDOAC)
            ThirdPartyAnticoagDt = dataRow[AFibColumns.ThirdParty_DOAC_Date];
    }
    else if (ThirdPartyAnticoagDates.length > 1) {

        let latestDateOfIssue = ThirdPartyAnticoagDates.reduce( (lastestDate, issueDate) => lastestDate < issueDate ? issueDate : lastestDate );

        if (ThirdPartyCode  && Date.parse(ThirdPartyCode) === latestDateOfIssue)
            ThirdPartyAnticoagDt = dataRow[AFibColumns.ThirdPartyCodeDate];
        
        else if (ThirdPartyWarf && Date.parse(ThirdPartyWarf) === latestDateOfIssue)
            ThirdPartyAnticoagDt = dataRow[AFibColumns.ThirdPartyWarfarinDate];
        
        else if (ThirdPartyDOAC && Date.parse(ThirdPartyDOAC) === latestDateOfIssue)
            ThirdPartyAnticoagDt = dataRow[AFibColumns.ThirdParty_DOAC_Date];
    }
    
    return ThirdPartyAnticoagDt;
}


export function getThirdPartyAnticoagulantType(dataRow) {

    let ThirdPartyCode, ThirdPartyDOAC, ThirdPartyWarf;

    ThirdPartyCode = dataRow[AFibColumns.ThirdPartyCodeDate];    
    ThirdPartyDOAC = dataRow[AFibColumns.ThirdParty_DOAC_Date];
    ThirdPartyWarf = dataRow[AFibColumns.ThirdPartyWarfarinDate];

    let ThirdPartyAnticoagDates = [];
    if (ThirdPartyCode) ThirdPartyAnticoagDates.push(Date.parse(ThirdPartyCode));
    if (ThirdPartyDOAC) ThirdPartyAnticoagDates.push(Date.parse(ThirdPartyDOAC));
    if (ThirdPartyWarf) ThirdPartyAnticoagDates.push(Date.parse(ThirdPartyWarf));

    let ThirdPartyAnticoagType = "";

    if (ThirdPartyAnticoagDates.length === 1) {
        
        if (ThirdPartyCode)
            ThirdPartyAnticoagType = "YES - Pharm/3rd Party";        

        else if (ThirdPartyWarf)
            ThirdPartyAnticoagType = "YES - Warf (Hospital)";             

        else if (ThirdPartyDOAC)
            ThirdPartyAnticoagType = "YES - DOAC (Hospital)";           
    }
    else if (ThirdPartyAnticoagDates.length > 1) {

        let latestDateOfIssue = ThirdPartyAnticoagDates.reduce( (lastestDate, issueDate) => lastestDate < issueDate ? issueDate : lastestDate );

        if (ThirdPartyCode  && Date.parse(ThirdPartyCode) === latestDateOfIssue)
            ThirdPartyAnticoagType = "YES - Pharm/3rd Party";        
        
        else if (ThirdPartyWarf && Date.parse(ThirdPartyWarf) === latestDateOfIssue)
            ThirdPartyAnticoagType = "YES - Warf (Hospital)";             
        
        else if (ThirdPartyDOAC && Date.parse(ThirdPartyDOAC) === latestDateOfIssue)
            ThirdPartyAnticoagType = "YES - DOAC (Hospital)";
    }
    
    return ThirdPartyAnticoagType;
}