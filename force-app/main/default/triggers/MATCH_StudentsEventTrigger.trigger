trigger MATCH_StudentsEventTrigger on MATCH_Student_Event__e (after insert) {
    System.debug('inside PE');
	 MATCH_StudentEventTriggerHandler handler = new MATCH_StudentEventTriggerHandler();
    if ( Trigger.isAfter && Trigger.isInsert ) {  
        handler.process(Trigger.new);
    }
}