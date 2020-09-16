({
    doAction : function(component, event, helper) {
        //Get Event
        var sampleEvent = $A.get("e.c:SampleEvent");
        //Set Parameter Value
        sampleEvent.setParams({"msg":"Hello World!!"});
        //Fire Event
        sampleEvent.fire();
    },
    handleValueChange:function(cmp){
    console.log("value: " + cmp.get('v.myVal'));
        //Get Event
        var sampleEvent = $A.get("e.c:SampleEvent");
        //Set Parameter Value
        sampleEvent.setParams({"msg":cmp.get('v.myVal')});
        //Fire Event
        sampleEvent.fire();
    }
})