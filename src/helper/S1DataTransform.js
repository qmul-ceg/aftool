import { AFibColumns, S1_ReportColumns } from "@/enums/AFibColumns";

export function transformS1ImportedData(data, runDate) {    

    const dt6monthBeforeRunDate = new Date(runDate);
    dt6monthBeforeRunDate.setMonth(dt6monthBeforeRunDate.getMonth() - 6);

    const dt12monthBeforeRunDate = new Date(runDate);
    dt12monthBeforeRunDate.setMonth(dt12monthBeforeRunDate.getMonth() - 12);

    let dataArr = [];
    let dataRow = [];

    data.map((row, index) => {

        dataArr.push(Object.values(row));
        dataRow = [...dataArr[index]];

        dataArr[index][AFibColumns.FullName] = dataRow[S1_ReportColumns.Full_Name];
        dataArr[index][AFibColumns.PatientReference] = dataRow[S1_ReportColumns.NHS_Number];
        dataArr[index][AFibColumns.Age] = dataRow[S1_ReportColumns.Age];
        dataArr[index][AFibColumns.Gender] = dataRow[S1_ReportColumns.Gender];
        dataArr[index][AFibColumns.NHS_Number] = dataRow[S1_ReportColumns.NHS_Number];
        dataArr[index][AFibColumns.DateOfBirth] = dataRow[S1_ReportColumns.Date_of_Birth];
        dataArr[index][AFibColumns.MobileTelephone] = dataRow[S1_ReportColumns.Mobile_telephone];
        dataArr[index][AFibColumns.OrganisationCode] = dataRow[S1_ReportColumns.Usual_GP_Organisation];
        dataArr[index][AFibColumns.EthnicityCodeTerm] = dataRow[S1_ReportColumns.Ethnicity_Term];
        dataArr[index][AFibColumns.AFConcept] = dataRow[S1_ReportColumns.AF_Term];
        dataArr[index][AFibColumns.IHD_Concept] = dataRow[S1_ReportColumns.IHD_Term].trim();
        dataArr[index][AFibColumns.StrokeTIA_Concept] = dataRow[S1_ReportColumns.Stroke_TIA_Term].trim();
        dataArr[index][AFibColumns.NonHaemStrokeConcept] = dataRow[S1_ReportColumns.Non_Haem_Stroke_Term].trim();
        dataArr[index][AFibColumns.PAD_Concept] = dataRow[S1_ReportColumns.PAD_Term].trim();
        dataArr[index][AFibColumns.HF_Concept] = dataRow[S1_ReportColumns.HF_Term].trim();
        dataArr[index][AFibColumns.HTN_Concept] = dataRow[S1_ReportColumns.HTN_Term].trim();
        dataArr[index][AFibColumns.DiabetesConcept] = dataRow[S1_ReportColumns.Diabetes_Term].trim();
        dataArr[index][AFibColumns.BleedConcept] = dataRow[S1_ReportColumns.Bleed_Term].trim();
        dataArr[index][AFibColumns.CKD3_5_Concept] = dataRow[S1_ReportColumns.CKD_3_5_Term].trim();
        dataArr[index][AFibColumns.SMI_Concept] = dataRow[S1_ReportColumns.SMI_Term].trim();
        dataArr[index][AFibColumns.LiverFailureConcept] = dataRow[S1_ReportColumns.Liver_Failure_Term].trim();
        dataArr[index][AFibColumns.HeartValveConcept] = dataRow[S1_ReportColumns.Heart_Valve_Term].trim();
        dataArr[index][AFibColumns.DementiaConcept] = dataRow[S1_ReportColumns.Dementia_Term].trim();
        dataArr[index][AFibColumns.PalliativeCareConcept] = dataRow[S1_ReportColumns.Palliative_Term].trim();
        dataArr[index][AFibColumns.HouseboundConcept] = dataRow[S1_ReportColumns.Housebound_Term].trim();
        dataArr[index][AFibColumns.LD_Concept] = dataRow[S1_ReportColumns.LD_Term].trim();
        dataArr[index][AFibColumns.CHADSVAScDate] = dataRow[S1_ReportColumns.CHADSVASc_Date];
        dataArr[index][AFibColumns.CHADSVAScValue] = dataRow[S1_ReportColumns.CHADSVASc_Value];
        dataArr[index][AFibColumns.HASBLED_Date] = dataRow[S1_ReportColumns.HASBLED_Date];
        dataArr[index][AFibColumns.HASBLED_Value] = dataRow[S1_ReportColumns.HASBLED_Value];
        dataArr[index][AFibColumns.ORBIT_Date] = dataRow[S1_ReportColumns.ORBIT_Date];
        dataArr[index][AFibColumns.ORBIT_Value] = dataRow[S1_ReportColumns.ORBIT_Value];
        dataArr[index][AFibColumns.CreatClearanceDate] = dataRow[S1_ReportColumns.Creat_Clearance_Date];
        dataArr[index][AFibColumns.CreatClearanceValue] = dataRow[S1_ReportColumns.Creat_Clearance_Value];
        dataArr[index][AFibColumns.eGFR_Concept] = dataRow[S1_ReportColumns.eGFR_Concept].trim();
        dataArr[index][AFibColumns.eGFR_Date] = dataRow[S1_ReportColumns.eGFR_Date];
        dataArr[index][AFibColumns.eGFR_Value] = dataRow[S1_ReportColumns.eGFR_Value].split(' ')[0];
        dataArr[index][AFibColumns.INR_Date] = dataRow[S1_ReportColumns.INR_Date];
        dataArr[index][AFibColumns.INR_Value] = dataRow[S1_ReportColumns.INR_Value];
        dataArr[index][AFibColumns.AlcoholConcept] = dataRow[S1_ReportColumns.Alcohol_Concept].trim();
        dataArr[index][AFibColumns.AlcoholDate] = dataRow[S1_ReportColumns.Alcohol_Date];
        dataArr[index][AFibColumns.AlcoholValue] = dataRow[S1_ReportColumns.Alcohol_Value];
        dataArr[index][AFibColumns.AuditScoresConcept] = dataRow[S1_ReportColumns.Audit_Scores_Concept].trim();
        dataArr[index][AFibColumns.AuditScoresCodeTerm] = dataRow[S1_ReportColumns.Audit_Scores_Code_Term].trim();
        dataArr[index][AFibColumns.AuditScoresDate] = dataRow[S1_ReportColumns.Audit_Scores_Date];
        dataArr[index][AFibColumns.AuditScoresValue] = dataRow[S1_ReportColumns.Audit_Scores_Value];
        dataArr[index][AFibColumns.ALT_LFT_Concept] = dataRow[S1_ReportColumns.ALT_LFT_Concept].trim();
        dataArr[index][AFibColumns.ALT_LFT_Date] = dataRow[S1_ReportColumns.ALT_LFT_Date];
        dataArr[index][AFibColumns.ALT_LFT_Value] = dataRow[S1_ReportColumns.ALT_LFT_Value];
        dataArr[index][AFibColumns.SerumCreatDate] = dataRow[S1_ReportColumns.Serum_Creat_Date];
        dataArr[index][AFibColumns.SerumCreatValue] = dataRow[S1_ReportColumns.Serum_Creat_Value];
        dataArr[index][AFibColumns.SystolicBPConcept] = dataRow[S1_ReportColumns.Systolic_BP_Concept];
        dataArr[index][AFibColumns.SystolicBPDate] = dataRow[S1_ReportColumns.Systolic_BP_Date];
        dataArr[index][AFibColumns.SystolicBPValue] = dataRow[S1_ReportColumns.Systolic_BP_Value].split(' ')[0];
        dataArr[index][AFibColumns.DiastolicBPConcept] = dataRow[S1_ReportColumns.Diastolic_BP_Concept];
        dataArr[index][AFibColumns.DiastolicBPDate] = dataRow[S1_ReportColumns.Diastolic_BP_Date];
        dataArr[index][AFibColumns.DiastolicBPValue] = dataRow[S1_ReportColumns.Diastolic_BP_Value].split(' ')[0];
        dataArr[index][AFibColumns.WeightDate] = dataRow[S1_ReportColumns.Weight_Date];
        dataArr[index][AFibColumns.WeightValue] = dataRow[S1_ReportColumns.Weight_Value];
        dataArr[index][AFibColumns.HaemEstimateDate] = dataRow[S1_ReportColumns.Haemoglobin_Estimate_Date];
        dataArr[index][AFibColumns.HaemEstimateValue] = dataRow[S1_ReportColumns.Haemoglobin_Estimate_Value].split(' ')[0];
        dataArr[index][AFibColumns.AnticoagContraCodeTerm] = dataRow[S1_ReportColumns.Anticoag_Contra_Concept].trim();
        dataArr[index][AFibColumns.AnticoagContraDate] = dataRow[S1_ReportColumns.Anticoag_Contra_Date];
        dataArr[index][AFibColumns.AnticoagDeclineCodeTerm] = dataRow[S1_ReportColumns.Anticoag_Decline_Concept].trim();
        dataArr[index][AFibColumns.AnticoagDeclineDate] = dataRow[S1_ReportColumns.Anticoag_Decline_Date];

        //Third Party Code in 12m
        dataArr[index][AFibColumns.ThirdPartyCodeTerm] = dataRow[S1_ReportColumns.Third_Party_Code_Term].trim();
        dataArr[index][AFibColumns.ThirdPartyCodeDate] = dataRow[S1_ReportColumns.Third_Party_Code_Date];        
        if (dataRow[S1_ReportColumns.Third_Party_Code_Date]) {
            if (Date.parse(dataRow[S1_ReportColumns.Third_Party_Code_Date]) < dt12monthBeforeRunDate) {
                dataArr[index][AFibColumns.ThirdPartyCodeTerm] = "";
                dataArr[index][AFibColumns.ThirdPartyCodeDate] = "";                
            }
        }
        //Warfarin in 6m
        dataArr[index][AFibColumns.WarfarinMed] = dataRow[S1_ReportColumns.Warfarin_med].trim();
        dataArr[index][AFibColumns.WarfarinDate] = dataRow[S1_ReportColumns.Warfarin_Date];
        if (dataRow[S1_ReportColumns.Warfarin_Date]) {
            if (Date.parse(dataRow[S1_ReportColumns.Warfarin_Date]) < dt6monthBeforeRunDate) {
                dataArr[index][AFibColumns.WarfarinMed] = "";
                dataArr[index][AFibColumns.WarfarinDate] = "";
            }
        }
        //Aspirin in 6m
        dataArr[index][AFibColumns.AspirinMed] = dataRow[S1_ReportColumns.Aspirin_med].trim();
        dataArr[index][AFibColumns.AspirinDate] = dataRow[S1_ReportColumns.Aspirin_Date];
        if (dataRow[S1_ReportColumns.Aspirin_Date]) {
            if (Date.parse(dataRow[S1_ReportColumns.Aspirin_Date]) < dt6monthBeforeRunDate) {
                dataArr[index][AFibColumns.AspirinMed] = "";
                dataArr[index][AFibColumns.AspirinDate] = "";
            }
        }
        //Antiplatelet in 6m
        dataArr[index][AFibColumns.AntiplateletMed] = dataRow[S1_ReportColumns.Antiplatelet_med].trim();
        dataArr[index][AFibColumns.AntiplateletDate] = dataRow[S1_ReportColumns.Antiplatelet_Date];
        if (dataRow[S1_ReportColumns.Antiplatelet_Date]) {
            if (Date.parse(dataRow[S1_ReportColumns.Antiplatelet_Date]) < dt6monthBeforeRunDate) {
                dataArr[index][AFibColumns.AntiplateletMed] = "";
                dataArr[index][AFibColumns.AntiplateletDate] = "";
            }
        }
        //NSAID in 6m
        dataArr[index][AFibColumns.NSAID_Med] = dataRow[S1_ReportColumns.NSAID_med].trim();
        dataArr[index][AFibColumns.NSAID_Date] = dataRow[S1_ReportColumns.NSAID_Date];
        if (dataRow[S1_ReportColumns.NSAID_Date]) {
            if (Date.parse(dataRow[S1_ReportColumns.NSAID_Date]) < dt6monthBeforeRunDate) {
                dataArr[index][AFibColumns.NSAID_Med] = "";
                dataArr[index][AFibColumns.NSAID_Date] = "";
            }
        }
        //DOACs in 6m
        dataArr[index][AFibColumns.DOAC_Med] = dataRow[S1_ReportColumns.DOACs_med].trim();
        dataArr[index][AFibColumns.DOAC_Date] = dataRow[S1_ReportColumns.DOACs_Date];
        dataArr[index][AFibColumns.DOAC_MedCourseStatus] = "";
        if (dataRow[S1_ReportColumns.DOACs_Date]) {
            if (Date.parse(dataRow[S1_ReportColumns.DOACs_Date]) < dt6monthBeforeRunDate) {
                dataArr[index][AFibColumns.DOAC_Med] = "";
                dataArr[index][AFibColumns.DOAC_Date] = "";
            }
        }
        //Other Anitcoagulants in 6m
        dataArr[index][AFibColumns.OtherAnticoagulantsMed] = dataRow[S1_ReportColumns.Other_Anticoagulants_med].trim();
        dataArr[index][AFibColumns.OtherAnticoagulantsDate] = dataRow[S1_ReportColumns.Other_Anticoagulants_Date];
        if (dataRow[S1_ReportColumns.Other_Anticoagulants_Date]) {
            if (Date.parse(dataRow[S1_ReportColumns.Other_Anticoagulants_Date]) < dt6monthBeforeRunDate) {
                dataArr[index][AFibColumns.OtherAnticoagulantsMed] = "";
                dataArr[index][AFibColumns.OtherAnticoagulantsDate] = "";
            }
        }
        dataArr[index][AFibColumns.ThirdPartyWarfarinMed] = "";
        dataArr[index][AFibColumns.ThirdPartyWarfarinDate] = "";
        dataArr[index][AFibColumns.ThirdParty_DOAC_med] = "";
        dataArr[index][AFibColumns.ThirdParty_DOAC_Date] = "";
        //Statins in 6m
        dataArr[index][AFibColumns.StatinsMed] = dataRow[S1_ReportColumns.Statins_med].trim();
        dataArr[index][AFibColumns.StatinsDate] = dataRow[S1_ReportColumns.Statins_Date];
        if (dataRow[S1_ReportColumns.Statins_Date]) {
            if (Date.parse(dataRow[S1_ReportColumns.Statins_Date]) < dt6monthBeforeRunDate) {
                dataArr[index][AFibColumns.StatinsMed] = "";
                dataArr[index][AFibColumns.StatinsDate] = "";
            }
        }
        //PPI in 6m
        dataArr[index][AFibColumns.PPI_Med] = dataRow[S1_ReportColumns.PPI_med].trim();
        dataArr[index][AFibColumns.PPI_Date] = dataRow[S1_ReportColumns.PPI_Date];
        if (dataRow[S1_ReportColumns.PPI_Date]) {
            if (Date.parse(dataRow[S1_ReportColumns.PPI_Date]) < dt6monthBeforeRunDate) {
                dataArr[index][AFibColumns.PPI_Med] = "";
                dataArr[index][AFibColumns.PPI_Date] = "";
            }
        }
        dataArr[index][AFibColumns.MedsReviewConcept] = dataRow[S1_ReportColumns.Meds_Review_Concept].trim();
        dataArr[index][AFibColumns.MedsReviewCodeTerm] = dataRow[S1_ReportColumns.Meds_Review_Code_Term].trim();
        dataArr[index][AFibColumns.MedsReviewDate] = dataRow[S1_ReportColumns.Meds_Review_Date];        
    });

    //De-duplicate patients
    const uniqueArray = removeDuplicates(dataArr, it => it[AFibColumns.NHS_Number]);
    
    return uniqueArray;
}

function removeDuplicates(data, key) {

    return [...new Map(data.map (x => [key(x), x]) ).values()]
}
