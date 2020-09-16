/**
 * trigger for the task object
 */
trigger TaskTrigger on Task (before insert, before update, before delete, after insert, after update, after delete, after undelete) {
    /** all events are handled by the TaskTriggerHandler class */
    new TaskTriggerHandler().run();
}