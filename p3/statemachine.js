// Your task is to fill in the rest of this file with your state machine, and then save
// the file to statemachine.js.

var currentState = {};
var nextState = "";
var stateTable = [];
var elem;

function StateMachine(description, elementToAttach) {
    stateTable = description;
    elem = elementToAttach;
    currentState = stateTable.states[0];
    
    //for the transitions in each state, add a listener to updateState()
    for (var k = 0; k < stateTable.states.length; k++){
        for (var i = 0; i < stateTable.states[k].transitions.length; i++){    
            elem.addEventListener(stateTable.states[k].transitions[i].input, foo, false);
            function foo(e){
                updateState(e);
            };  
        }
    }
}

//transition if the input is a legal action, perform action, and update current state
function updateState(e){
    for (var i = 0; i < currentState.transitions.length; i++) {
        if (currentState.transitions[i].input == e.type){
            //based on input type and current state, do appropriate action
            currentState.transitions[i].action(e, elem);
            nextState = currentState.transitions[i].endState;
            setCurrentState(nextState);
            return;
        }     
    }
}

function setCurrentState(endState){
    for (var i = 0; i < stateTable.states.length; i++){
        if (endState == stateTable.states[i].name){
            currentState = stateTable.states[i];
        }
    }
    
}