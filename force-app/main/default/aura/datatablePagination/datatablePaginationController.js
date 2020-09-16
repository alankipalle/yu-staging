({
	doInit : function(component, event, helper) {
        var currentPageNumber = component.get("v.currentPageNumber");
        
		component.set("v.columns", [
            {label: "ID", fieldName: "id", type: "number"},
            {label: "Name", fieldName: "name", type: "text"}
        ]);
        
        helper.paginate(component, currentPageNumber, currentPageNumber);
    },

    selectedRows : function(component, event, helper) {
        var selectedRows = event.getParam('selectedRows');
        var currentPageNumber = component.get("v.currentPageNumber");
        var currentSelectedRows = [];

        selectedRows.forEach(function(selectedRow) {
        	currentSelectedRows.push(selectedRow.id);
        });
        
        component.set("v.currentSelectedRows", currentSelectedRows);
        helper.paginate(component, currentPageNumber, currentPageNumber);
    },
    
    handleNext : function(component, event, helper) {
        var currentPageNumber = component.get("v.currentPageNumber");
        helper.paginate(component, currentPageNumber, ++currentPageNumber);
    },
    
    handlePrev : function(component, event, helper) {
        var currentPageNumber = component.get("v.currentPageNumber");
        helper.paginate(component, currentPageNumber, --currentPageNumber);
    }
})