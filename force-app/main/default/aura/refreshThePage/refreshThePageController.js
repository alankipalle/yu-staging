({
    /**
    * Yearup.
    *
    * @category  Yearup
    * @author    Yearup
    * @copyright Yearup
    * @description This component is for refresh the current page.
    */
	doInit : function(component, event, helper) {
        $A.get("e.force:refreshView").fire(); 
		$A.get("e.force:closeQuickAction").fire();        
	}
})