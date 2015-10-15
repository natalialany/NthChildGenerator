function getResults(checkedArray, amount) {

    var resultArray = [];

    var length = checkedArray.length;
    var array = checkedArray;

    var rules = {
        firstChild: {
            value: function() {
                return ':first-child';
            },
            condition: function() {
                return (length === 1 && array[0] === 1);
            }
        },
        lastChild: {
            value: function() {
                return ':last-child';
            },
            condition: function() {
                return (length === 1 && array[0] === amount);
            }
        },
        nthChild: {
            value: function() {
                return ':nth-child(' + (array[0]) + ')';
            },
            condition: function() {
                return (length === 1);
            }
        },
        nthLastChild: {
            value: function() {
                return ':nth-last-child(' + (amount - array[0] + 1) + ')';
            },
            condition: function() {
                return (length === 1);
            }
        },
        nthOdd: {
            value: function() {
                return ':nth-child(odd)';
            },
            condition: function() {
                var series = findRegularSeries();
                return (length>0 && series.diff === 2 && series.fromStart && series.fromEnd && array[0] === 1);
            }
        },
        nthEven: {
            value: function() {
                return ':nth-child(even)';
            },
            condition: function() {
                var series = findRegularSeries();
                return (length>0 && series.diff === 2 && series.fromStart && series.fromEnd && array[0] === 2);
            }
        }
    }

    for (var rule in rules) {
        if (rules.hasOwnProperty(rule)) {
            if (rules[rule].condition()) {
                resultArray.push(rules[rule].value());
            }
        }
    }

    function findRegularSeries() {
        var series;

        for (var i = 0; i < array.length; i++) {

            series = series || {};
            series.items = series.items || [];

            if (series.items.length > 0) {
                var currentDiff = array[i] - array[i-1];
                var requiredDiff = series.diff || currentDiff;
                if (currentDiff === requiredDiff && array[i-1] === series.items[series.items.length-1]) {
                    series.items.push(array[i]);
                }
                series.diff = series.diff || requiredDiff;
            } else {
                series.items.push(array[i]);
            }
        }
        if (series && series.items.length > 0) {
            series.fromStart = (series.items[0] <= series.diff);
            console.log(amount, ' ', series.items[series.items.length-1]);
            series.fromEnd = (amount - series.items[series.items.length-1] < series.diff)
        }
        console.log(series);
        return series;
    }
    findRegularSeries();

    function regularDifference(diff) {
        var diff = 0;
        if (array.length > 0) {
            diff = array[1] - array[0];
        }
        for (var i = 1; i < array.length; i++) {
            if (array[i] - array[i - 1] !== diff) {
                return 0;
            }
        }
        return diff;
    }

    function distanceAtStart() {
        return array[0];
    }
    function distanceAtEnd() {
        return amount - array[array.length - 1];
    }
    //console.log(amount);

    //More than one items
    if (array.length > 1) {

        //Regular
        var diff = array[1] - array[0];
        var diffFirst = array[0];
        var diffLast = amount - array[array.length - 1];

        var endGood = false;
        var startGood = false;
        var regular = true;
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
            var hook = (endGood) ? array[0] : array[array.length - 1];
            if (diff !== hook) {
                resultArray.push(':nth-child(' + direction + density + 'n+' + hook + ')');
            } else {
                resultArray.push(':nth-child(' + direction + density + 'n)');
            }
        }

    }

    return resultArray;
};