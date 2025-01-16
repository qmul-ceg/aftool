import { AFibColumns } from "@/enums/AFibColumns";

export function onAnticoagulantMeds(dataRow) {

    let OnAnticoag = "NO";

    let DOAC, Warf, AnticoagContra, AnticoagDecline;

    DOAC = dataRow[AFibColumns.DOAC_Date];
    Warf = dataRow[AFibColumns.WarfarinDate];
    AnticoagContra = dataRow[AFibColumns.AnticoagContraDate];
    AnticoagDecline = dataRow[AFibColumns.AnticoagDeclineDate];
    
    if (DOAC) {        
        OnAnticoag = "YES - DOAC";
        if (Warf && Date.parse(Warf) > Date.parse(DOAC))
            OnAnticoag = "YES - WARF"
    }
    else if (Warf) {
        OnAnticoag = "YES - WARF";
    }
    else if (AnticoagContra) 
        OnAnticoag = "CONTRA"

    else if (AnticoagDecline)
        OnAnticoag = "DECLINED"
    
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