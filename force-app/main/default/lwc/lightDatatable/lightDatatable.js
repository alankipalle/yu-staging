import { LightningElement,track,wire } from 'lwc';
export default class LightDatatable extends LightningElement {  
    config = {
        objectName: "User",  
        limit: 10,    
        tableConfig: {
            columns: [
                { api: 'Name', label: 'Name', fieldName: 'Name', sortable: true },
                { api: 'IsActive', label: 'Active', fieldName: 'Active', sortable: true, type: "boolean" },
                { api: 'Profile.Name', label: 'Profile', fieldName: 'Profile', sortable: true },
                { api: 'UserRole.Name', label: 'Role', fieldName: 'UserRole', sortable: true },
                { api: 'permAssignments', label: "Permission Sets", fieldName: "permAssignments", type: "richText" }
            ]
        }
    };
}