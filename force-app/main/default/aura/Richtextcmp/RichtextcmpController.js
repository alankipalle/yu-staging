({
	init: function(cmp) {
        cmp.set('v.myVal', '<p><script>alert(this)</script></p><p>hi!</p>');
    },
    
    handleValueChange:function(cmp){
    console.log("value: " + cmp.get('v.myVal'));
        //Get Event
        var sampleEvent = $A.get("e.c:sampleEvent");
        //Set Parameter Value
        sampleEvent.setParams({"msg":"Hello World!!"});
        //Fire Event
        sampleEvent.fire();
    }
})