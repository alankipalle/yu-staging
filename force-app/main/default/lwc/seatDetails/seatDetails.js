import { LightningElement, wire, track } from "lwc";
import { CurrentPageReference } from "lightning/navigation";
import { registerListener, unregisterAllListeners } from "c/pubsub";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

export default class SeatDetails extends LightningElement {
  @track recordId;
  @track objectApiName = "MATCH_Matching_Match__c";
  @track seatSeaction = false;
  preferencefields = [
    "Name",
    "Matching_Student_Name__c",
    "Matching_Seat_Name__c",
    "Finalize_Match__c",
    "Match_Status__c",
    "Internship_Details__c",
    "Decision_Notes__c"
  ];
  @wire(CurrentPageReference) pageRef;
  connectedCallback() {
    if (!this.pageRef) {
      this.pageRef = {};
      this.pageRef.attributes = {};
      this.pageRef.attributes.LightningApp = "LightningApp";
    }
    // subscribe to bearListUpdate event
    registerListener("seatRecord", this.handleseatRecord, this);
  }
  disconnectedCallback() {
    // unsubscribe from bearListUpdate event
    unregisterAllListeners(this);
  }

  handleseatRecord(record) {
    this.seatSeaction = true;
    console.log("selected Record Id: " + record.Id);
    this.recordId = record.Id;
  }

  handleSubmit() {
    const event = new ShowToastEvent({
      title: "Success!",
      message: "Student is finalized with Seat Record " + this.recordId,
      messageData: [
        "Salesforce",
        {
          url: "http://www.salesforce.com/",
          label: "here"
        }
      ]
    });
    this.dispatchEvent(event);
  }

  handleError(event) {
    let message = event.detail.detail;
    //do some stuff with message to make it more readable
    message = "Something went wrong!";
    this.showToast(TOAST_TITLE_ERROR, message, TOAST_VARIANT_ERROR);
  }

  showToast(theTitle, theMessage, theVariant) {
    const event = new ShowToastEvent({
      title: theTitle,
      message: theMessage,
      variant: theVariant
    });
    this.dispatchEvent(event);
  }
}
