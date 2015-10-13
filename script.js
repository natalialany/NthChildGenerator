'use strict';

(function() {

    var checkboxes = document.getElementById('checkboxes');
    var amountField = document.getElementById('amount');
    var length = document.getElementById('length');
    var results = document.getElementById('results');
    var currentAmount = 0;

    var updateArray = function() {
        console.log('update');
    }

    function createNodeCheckboxInput(id) {
        var input = document.createElement('input');
        input.type = "checkbox";
        input.classList.add("checkbox");
        input.id = "c" + id;
        return input;
    }
    function createNodeCheckboxLabel(id) {
        var label = document.createElement('label');
        label.classList.add('label');
        label.setAttribute('for', "c" + id);
        label.innerHTML = id;
        return label;
    }
    function createNodeCheckboxGroup() {
        var newDiv = document.createElement('div');
        newDiv.classList.add("checkbox-group");
        return newDiv;
    }

    function addCheckbox() {
        var id = currentAmount + 1;
        currentAmount++;

        var newDiv = createNodeCheckboxGroup();
        var input = createNodeCheckboxInput(id);
        var label = createNodeCheckboxLabel(id);

        newDiv.appendChild(input);
        newDiv.appendChild(label);
        checkboxes.appendChild(newDiv);

        input.addEventListener('change', function() {
            updateArray();
        });
    }

    function removeCheckbox() {
        if (checkboxes.childNodes.length>0) {
            checkboxes.removeChild(checkboxes.lastChild);
            currentAmount--;
        }
        updateArray();
    }

    function init(config) {

        //create markup with checkboxes
        var length = config.itemCount;
        while(length--) {
            addCheckbox();
        }

        //amountField - init
        amountField.value = config.itemCount;

        //amountField - add event listener
        amountField.addEventListener('input', function() {
            (this.value > currentAmount) ? addCheckbox() : removeCheckbox();
        });
    }

    init({
        itemCount: 10,
        rowCount: 1
    });

}());
