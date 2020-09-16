({
     /**
     * Yearup.
     *
     * @category UtilityBar
     * @author Ajay Kumar Lankipalle  
     * @description on intialization of component we are dynamically getting the base Classic URL from apex.
     */
 
    doInit : function(component, event, helper) {    
       
        var action = component.get("c.getClassicURL");
        action.setCallback(this, function (response) {
            var state = response.getState();
            if (component.isValid() && state === 'SUCCESS') {
                var result = response.getReturnValue()
                component.set('v.baseURL', result)
            }
        })
        $A.enqueueAction(action)
        
    },
    
    /**
     * Yearup.
     *
     * @category UtilityBar
     * @author Ajay Kumar Lankipalle  
     * @description this fucntion is used to copy the URL.
     */
    
    copyClassic : function(cmp, event){
        var urlClassic = cmp.find('urlClassic').getElement().select();
      
        document.queryCommandSupported('copy');
        document.execCommand('copy');   
        
        var source = event.getSource();
        source.set('v.label', 'COPIED!');
        setTimeout(function(){
            source.set('v.label', 'Copy');
        }, 2000);
    }
})