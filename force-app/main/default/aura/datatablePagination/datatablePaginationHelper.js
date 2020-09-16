({
    paginate : function(component, oldPageNumber, newPageNumber) {
        var currentSelectedRows = component.get("v.currentSelectedRows");
        var overallSelectedRows = component.get("v.overallSelectedRows") || {};
        console.log(overallSelectedRows);
       
        overallSelectedRows[oldPageNumber] = currentSelectedRows;
        console.log(overallSelectedRows[oldPageNumber]);
        
        component.set("v.currentPageNumber", newPageNumber);
        component.set("v.overallSelectedRows", overallSelectedRows);
        component.set("v.currentSelectedRows", overallSelectedRows[newPageNumber] || []);
        
        var length = this.setData(component, newPageNumber);
        if(newPageNumber == length-1) {
            component.set("v.isLastPage", true);
        } else {
            component.set("v.isLastPage", false);
        }
    },
    
    setData : function(component, pageNumber) {
        var data = [];

		data[0] = [
            {id: 101, name: "First record"},
            {id: 202, name: "Second record"},
            {id: 303, name: "Third record"},
            {id: 404, name: "Fourth record"},
            {id: 505, name: "Fifth record"}
        ];
        
        data[1] = [
            {id: 606, name: "Sixth record"},
            {id: 707, name: "Seventh record"},
            {id: 808, name: "Eighth record"},
            {id: 909, name: "Ninth record"},
            {id: 1010, name: "Tenth record"}
        ];
        
        data[2] = [
            {id: 1111, name: "Eleventh record"},
            {id: 1212, name: "Twelveth record"}
        ];
        
        component.set("v.data", data[pageNumber]);
        
        return data.length;
    }
})