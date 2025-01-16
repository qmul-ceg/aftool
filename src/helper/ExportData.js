import { AFibColumns } from "@/enums/AFibColumns";
import { GpSystems } from "@/enums/GPsystems";

export function exportNHS_list(patientList) {

    console.log("Count: " + patientList.length);

    if (patientList.length == 0) {
        alert("No patient statisfied current filter selection, or patient count is '0'");
        return;
    }

    alert("You are about to export a file containing NHS numbers.  Please make sure the file is saved to an appropriately secure drive.");

    let NHSnumbers = "";

    patientList.forEach(patient => {
        NHSnumbers += patient[AFibColumns.NHS_Number] + "\n";
    });

    const link = document.createElement("a");    
    const file = new Blob([NHSnumbers], { type: 'text/plain' });

    link.href = URL.createObjectURL(file);
    link.download = "AFib_patients_NHS_number_" + getRandomNumbers() + ".txt";
    link.click();
    URL.revokeObjectURL(link.href);    
}


export function exportAccuRxList(patientList, selGpSystem) {

    console.log("Count: " + patientList.length);

    if (patientList.length == 0) {
        alert("No patient statisfied current filter selection, or patient count is '0'");
        return;
    }
    
    alert("You are about to export a file containing patient-identifiable data. Please make sure the file is saved to an appropriately secure drive.");

    let outputContent = "";

    if (selGpSystem == GpSystems.EMIS_Web) {

        outputContent = "EMIS Number, NHS Number"

        patientList.forEach(patient => {
            outputContent += "\n" + patient[AFibColumns.PatientReference] + "," + patient[AFibColumns.NHS_Number];
        });
    }
    else if (selGpSystem == GpSystems.SystmOne) {

        outputContent = "NHS Number, Date of Birth, Mobile telephone"

        patientList.forEach(patient => {
            outputContent += "\n" + patient[AFibColumns.NHS_Number] + "," + patient[AFibColumns.DateOfBirth] + "," + patient[AFibColumns.MobileTelephone];
        });        
    }

    const link = document.createElement("a");    
    const file = new Blob([outputContent], { type: 'text/plain' });

    link.href = URL.createObjectURL(file);
    link.download = "AccuRx_AF_patients_list_" + getRandomNumbers() + ".csv ";
    link.click();
    URL.revokeObjectURL(link.href);    
}

function getRandomNumbers() {
	let dateObj = new Date()
	let dateTime = dateObj.getHours() + '' + dateObj.getMinutes() + '' + dateObj.getSeconds();

	return dateTime + '' + Math.floor((Math.random().toFixed(2)*100));
}