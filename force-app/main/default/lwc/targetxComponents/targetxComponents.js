import { LightningElement, wire } from "lwc";
import getObjects from "@salesforce/apex/TX_DataRetrieveController.getAllObjects";
import getFields from "@salesforce/apex/TX_DataRetrieveController.getFieldList";
import getRecords from "@salesforce/apex/TX_DataRetrieveController.getRecords";
const columns = [
  { label: "Label", fieldName: "Label" },
  { label: "DeveloperName", fieldName: "DeveloperName" }
];
const DELAY = 300;
export default class TargetxComponents extends LightningElement {
  options = [];
  searchKey = "";
  data = [];
  columns = columns;
  loaded = false;
  dataColumns = [];
  recordColumns = [];
  selectedFields = [];
  recorddata = [];
  @wire(getObjects)
  wiredUserRoles({ error, data }) {
    if (data) {
      // Map picklist values
      this.options = data.map((plValue) => {
        return {
          label: plValue.QualifiedApiName,
          value: plValue.QualifiedApiName
        };
      });
      this.loaded = !this.loaded;
      //this.error = undefined;
    } else if (error) {
      //this.error = error;
      console.log(JSON.stringify(error));
    }
  }

  handleChange(event) {
    event.preventDefault();
    this.searchKey = event.target.value;
  }

  handleClick() {
    this.loaded = false;
    getFields({
      objectName: this.searchKey
    })
      .then((result) => {
        this.data = result;
        this.loaded = !this.loaded;
      })
      .catch((error) => {
        this.error = error;
        this.loaded = !this.loaded;
      });
  }

  getSelected() {
    this.loaded = false;
    var selectedRecords = this.template
      .querySelector("lightning-datatable")
      .getSelectedRows();

    var arrNames = [];
    var seleFields = [];
    selectedRecords.forEach(function (item) {
      var val = item.DeveloperName;
      var col = {
        label: item.DeveloperName,
        fieldName: item.DeveloperName
      };
      seleFields.push(col);
      arrNames.push(val);
    });
    arrNames.push("Id");
    console.log(seleFields);
    this.recordColumns = seleFields;
    var query = "SELECT+";
    query += arrNames.toString();
    query += "+from+";
    query += this.searchKey;
    query += "+limit+10";

    console.log(query); //prints ["someone1", "someone2"]
    getRecords({
      query: query
    })
      .then((result) => {
        this.loaded = !this.loaded;
        this.recorddata = result;
        console.log(JSON.stringify(result));
      })
      .catch((error) => {
        this.error = error;
        this.loaded = !this.loaded;
      });
  }
}
