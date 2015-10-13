var getResults = function(checkedArray, amount) {
    var resultArray = [];

    console.log(amount);

    //One item
    if (checkedArray.length === 1) {
        if (checkedArray[0] === 1) {
            resultArray.push(':first-child');
        }
        if (checkedArray[0] === amount) {
            resultArray.push(':last-child');
        }
        resultArray.push(':nth-child(' + checkedArray[0] + ')');
        resultArray.push(':nth-last-child(' + (amount - checkedArray[0] + 1) + ')');
    }

    if (checkedArray.length > 1) {

        //Regular
        var diff = checkedArray[1] - checkedArray[0];
        var diffFirst = checkedArray[0];
        var diffLast = amount - checkedArray[checkedArray.length - 1];

        var regular = true;
        var endGood = false;
        var startGood = false;
        for (var i = 1; i < checkedArray.length; i++) {
            if (checkedArray[i] - checkedArray[i - 1] !== diff) {
                regular = false;
            }
        }
        if (regular) {
            if (diffFirst <= diff) {
                startGood = true;
            }
            if (diffLast <= diff - 1) {
                endGood = true;
            }
        }

        if (startGood || endGood) {
            var density = (diff > 1) ? diff : '';
            var direction = (endGood) ? '' : '-';
            var hook = (endGood) ? checkedArray[0] : checkedArray[checkedArray.length - 1];
            if (diff !== hook) {
                resultArray.push(':nth-child(' + direction + density + 'n+' + hook + ')');
            } else {
                resultArray.push(':nth-child(' + direction + density + 'n)');
            }
        }

        //odd & even
        if (regular && diff === 2 && endGood) {
            if (diffFirst === 1) {
                resultArray.push(':nth-child(odd)');
            } else if (diffFirst === 2) {
                resultArray.push(':nth-child(even)');
            }
        }

    }

    return resultArray;
};

(function() {

    var startWith = 10;



    var checkboxes = document.getElementById('checkboxes');
    var inputAmount = document.getElementById('amount');
    var length = document.getElementById('length');
    var results = document.getElementById('results');
    var currentAmount = 0;

    var addCheckbox = function() {
        var id = currentAmount + 1;

        var newDiv = document.createElement('div');
        newDiv.classList.add("checkbox-group");

        var input = document.createElement('input');
        input.type = "checkbox";
        input.classList.add("checkbox");
        input.id = "c" + id;

        var label = document.createElement('label');
        label.classList.add('label');
        label.setAttribute('for', "c" + id);
        label.innerHTML = id;

        newDiv.appendChild(input);
        newDiv.appendChild(label);
        checkboxes.appendChild(newDiv);
        currentAmount++;

        //add event listener
        input.addEventListener('change', function() {
            prepareArray();
        });
    }
    var removeCheckbox = function() {
        if (checkboxes.childNodes.length>0) {
            checkboxes.removeChild(checkboxes.lastChild);
            currentAmount--;
        }
    }

    var prepareArray = function() {
        var array = [];
        for (var i=1; i<checkboxes.childNodes.length; i++) {
            if (document.querySelector('#c'+i).checked) {
                array.push(i);
            }
        }
        length.innerHTML = array.length;
        results.innerHTML = '';
        var res = getResults(array, currentAmount, results);

        for (var i=0; i<res.length; i++) {
            var newDiv = document.createElement('div');
            newDiv.innerHTML = res[i];
            results.appendChild(newDiv);
        }
    }

    inputAmount.addEventListener('input', function() {
        var value = this.value;
        if (value > currentAmount) {
            addCheckbox();
        } else {
            removeCheckbox();
        }
    });

    //init
    inputAmount.value = startWith;
    for (var i=0; i<startWith; i++) {
        addCheckbox();
    }

})();