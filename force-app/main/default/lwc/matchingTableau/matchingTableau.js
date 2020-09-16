import { LightningElement, api } from "lwc";

export default class MatchingTableau extends LightningElement {
  @api studentURL =
    "https://us-east-1.online.tableau.com/t/yearup/views/MatchingInterfaceStudentSalesforce/MatchingInterface?:embed=y#1";
  @api seatURL =
    "https://us-east-1.online.tableau.com/t/yearup/views/MatchingInterfaceInternshipSalesforce/MatchingInterface?:embed=y#1";
  @api mapURL =
    "https://us-east-1.online.tableau.com/t/yearup/views/MatchingInterfaceStudentSalesforce/MatchingInterface?:embed=y#1";
  @api snapshotURL =
    "https://us-east-1.online.tableau.com/t/yearup/views/MatchingSnapshotSalesforce/MatchingSnapshot?:embed=y#1";
}
