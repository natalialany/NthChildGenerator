function getResults(checkedArray, amount) {

    var returnedObject = {
        resultArray: [],
        processedCheckboxes: []
    }


    var length = checkedArray.length;
    var array = checkedArray;
    var arrayFirstItem = array[0];
    var arrayLastItem = array[array.length-1];

    var rules = {
        //firstChild: {
        //    value: function() {
        //        return ':first-child';
        //    },
        //    condition: function() {
        //        return (length === 1 && arrayFirstItem === 1);
        //    }
        //},
        //lastChild: {
        //    value: function() {
        //        return ':last-child';
        //    },
        //    condition: function() {
        //        return (length === 1 && arrayFirstItem === amount);
        //    }
        //},
        //nthChild: {
        //    value: function() {
        //        return ':nth-child(' + (arrayFirstItem) + ')';
        //    },
        //    condition: function() {
        //        return (length === 1);
        //    }
        //},
        //nthLastChild: {
        //    value: function() {
        //        return ':nth-last-child(' + (amount - arrayFirstItem + 1) + ')';
        //    },
        //    condition: function() {
        //        return (length === 1);
        //    }
        //},
        //nthOdd: {
        //    value: function() {
        //        return ':nth-child(odd)';
        //    },
        //    condition: function() {
        //        var series = findRegularSeries();
        //        return (length>0 && series.diff === 2 && series.fromStart && series.fromEnd && arrayFirstItem === 1);
        //    }
        //},
        //nthEven: {
        //    value: function() {
        //        return ':nth-child(even)';
        //    },
        //    condition: function() {
        //        var series = findRegularSeries();
        //        return (length>0 && series.diff === 2 && series.fromStart && series.fromEnd && arrayFirstItem === 2);
        //    }
        //}
        //},
        nthChildManyStart: {
            value: function() {
                var series = findRegularSeries();
                var density = (series.diff === 1) ? '' : series.diff;

                var result_left = '';
                var result_right = '';

                /* Left */
                if (!series.fromStart) {
                    var direction_left = '';
                    var hook_left = series.items[0];
                    result_left = ':nth-child(' + direction_left + density + 'n+' + hook_left + ')';
                }

                /* Right */
                if (!series.fromEnd) {
                    var direction_right = '-';
                    var hook_right = series.items[series.items.length - 1];
                    result_right = ':nth-child(' + direction_right + density + 'n+' + hook_right + ')';
                }

                return result_left + result_right;
            },
            condition: function() {
                var series = findRegularSeries();
                return (length>1);
            }
        }
    }

    for (var rule in rules) {
        if (rules.hasOwnProperty(rule)) {
            if (rules[rule].condition()) {
                returnedObject.resultArray.push(rules[rule].value());
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
            var seriesFirstItem = series.items[0];
            var seriesLastItem = series.items[series.items.length-1];
            series.fromStart = (seriesFirstItem <= series.diff  && seriesFirstItem === arrayFirstItem);
            series.fromEnd = (amount - seriesLastItem < series.diff && seriesLastItem === arrayLastItem)
        }
        if (series) {
            console.log('Series: ' +  series.items);
            for (var i=0; i<series.items.length; i++) {
                returnedObject.processedCheckboxes.push(series.items[i]);
            }
        }
        return series;
    }

    return returnedObject;
};