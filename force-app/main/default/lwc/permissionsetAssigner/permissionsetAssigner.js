import { LightningElement, track, wire, api } from "lwc";
import hidePageHeader from "@salesforce/resourceUrl/hidePageHeader";
import { loadStyle, loadScript } from "lightning/platformResourceLoader";
export default class PermissionsetAssigner extends LightningElement {
  data;
  result;
  dataLength;
  selectedItemsToDisplay = ""; //to display items in comma-delimited way
  values = []; //stores the labels in this array
  isItemExists = false; //flag to check if message can be displayed
  records = [];
  objectName = "Profile";
  showTable = false;
  value = "inProgress";
  selection = [];
  allSelectedRows = [];
  hasPageChanged;
  initialLoad = true;
  error;
  selectedRows = [];
  recordsToDisplay = []; //Records to be displayed on the page
  rowNumberOffset; //Row number
  showSelected = false;
  get options() {
    return [
      { label: "Profile", value: "Profile" },
      { label: "Permission Set", value: "PermissionSet" }
    ];
  }

  config = {
    objectName: "User",
    limit: 10,
    tableConfig: {
      columns: [
        { api: "Name", label: "Name", fieldName: "Name", sortable: true },
        {
          api: "IsActive",
          label: "Active",
          fieldName: "Active",
          sortable: true,
          type: "boolean"
        },
        {
          api: "Profile.Name",
          label: "Profile",
          fieldName: "Profile",
          sortable: true
        },
        {
          api: "UserRole.Name",
          label: "Role",
          fieldName: "UserRole",
          sortable: true
        },
        {
          api: "permAssignments",
          label: "Permission Sets",
          fieldName: "permAssignments",
          type: "richText"
        }
      ]
    }
  };

  hanldeProgressValueChange(event) {
    this.records = event.detail;
    this.dispatchEvent(
      new CustomEvent("selectedpermsets", { detail: event.detail })
    );
    console.log("From Parent: " + JSON.stringify(this.records));
  }
}