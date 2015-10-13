'use strict';

(function() {

    var checkboxes = document.getElementById('checkboxes');
    var results = document.getElementById('results');
    var currentAmount = 0;

    var updateArray = function() {
        var resultArray = [];

        return resultArray;
    }

    function addCheckbox(eventCallback) {
        var id = currentAmount + 1;
        currentAmount++;

        var newDiv = createNode({ element: 'div', class: 'checkbox-group' });
        var input = createNode({ element: 'input', type: 'checkbox', class: 'checkbox', id: 'c' + id });
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
            addCheckbox(updateArray);
        }

        initAmountField(updateArray, config.itemCount);
        initClearBtn(updateArray);
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
    return node;
}