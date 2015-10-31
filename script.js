'use strict';

(function() {

    var checkboxes = document.getElementById('checkboxes');
    var results = document.getElementById('results');
    var currentAmount = 0;

    var updateArray = function() {
        var nodeArray = Array.prototype.slice.call(checkboxes.querySelectorAll('.checkbox')); // converts NodeList to Array
        return nodeArray.filter(function(current) {
            return (current.checked);
        }).map(function(current) {
            return parseInt(current.value, 10);
        });
    }

    var updateResults = function() {
        var i;
        var checkedArray = updateArray();

        var returnedObject = getResults(checkedArray, currentAmount);
        var res = returnedObject.resultArray;
        var processed = returnedObject.processedCheckboxes;

        /* Reset */
        results.innerHTML = '';
        resetHightlight();

        /* Update string results */
        for (i=0; i<res.length; i++) {
            var newDiv = createNode({ element: 'div', innerHTML: res[i]});
            results.appendChild(newDiv);
        }

        /* Hightlight checkboxes that have been processed */
        for (i=0; i<processed.length; i++) {
            highlightCheckbox(processed[i]);
        }
    }

    function addCheckbox(eventCallback) {
        var id = currentAmount + 1;
        currentAmount++;

        var newDiv = createNode({ element: 'div', class: 'checkbox-group' });
        var input = createNode({ element: 'input', type: 'checkbox', class: 'checkbox', id: 'c' + id, value: id });
        var label = createNode({ element: 'label', class: 'label', attr: { name: 'for', value: 'c' + id }, innerHTML: id });

        newDiv.appendChild(input);
        newDiv.appendChild(label);
        checkboxes.appendChild(newDiv);

        input.addEventListener('change', eventCallback);
    }
    function removeCheckbox() {
        if (checkboxes.childNodes.length>0) {
            checkboxes.removeChild(checkboxes.lastChild);
            currentAmount--;
        }
    }
    function clearCheckboxes() {
        var c = checkboxes.querySelectorAll('.checkbox');
        for (var i = 0, max = c.length; i < max; i++) {
            c[i].checked = false;
        }
    }
    function highlightCheckbox(id) {
        var c = checkboxes.querySelector('#c' + id);
        c.classList.add('processed');
    }
    function resetHightlight() {
        var c = checkboxes.querySelectorAll('.checkbox');
        for (var i = 0, max = c.length; i < max; i++) {
            c[i].classList.remove('processed');
        }
    }

    function initAmountField(eventCallback, amount) {
        var amountField = document.getElementById('amount');
        amountField.value = amount;
        amountField.addEventListener('input', function() {
            (this.value > currentAmount) ? addCheckbox(eventCallback) : removeCheckbox();
            eventCallback();
        });
    }
    function initClearBtn(eventCallback) {
        var clearBtn = document.getElementById('clear');
        clearBtn.addEventListener('click', function() {
            clearCheckboxes();
            eventCallback();
        })
    }

    function init(config) {

        var length = config.itemCount;
        while(length--) {
            addCheckbox(updateResults);
        }

        initAmountField(updateResults, config.itemCount);
        initClearBtn(updateResults);
    }

    init({
        itemCount: 10,
        rowCount: 1
    });

}());

function createNode(conf) {
    var node = document.createElement(conf.element);
    if (conf.type !== undefined) {
        node.type = conf.type;
    }
    if (conf.class !== undefined) {
        node.classList.add(conf.class);
    }
    if (conf.attr !== undefined) {
        node.setAttribute(conf.attr.name, conf.attr.value);
    }
    if (conf.innerHTML !== undefined) {
        node.innerHTML = conf.innerHTML;
    }
    if (conf.id !== undefined) {
        node.id = conf.id;
    }
    if (conf.value !== undefined) {
        node.value = conf.value;
    }
    return node;
}



