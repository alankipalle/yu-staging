/**
 * trigger for the event object
 */
trigger EventTrigger on Event (before insert, before update, before delete, after insert, after update, after delete, after undelete) {
    /** all events are handled by the EventTriggerHandler class */
    new EventTriggerHandler().run();
}