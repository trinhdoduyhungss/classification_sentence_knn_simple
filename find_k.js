/// tìm best k dựa vào sự tương quan results label của từng ở các k trong bigdata với các label của từng câu trong data_find_k
let test_sentence_data = require('./data_find_k')
const myModule = require('./arraytrainbot');
let bot = myModule.bot();
const sentences_bot = require('./datasentence')
const sentence_data = sentences_bot.bot()
const ready_check = test_sentence_data.bot()
let bigdata = {}
let vaulek_rep = {}
function find_best_k(k) {
    let knn_result = {}
    var dataset = {}
    let savedataset = {}
    let testsen = {}
    let sortedDist = []
    let countelement = {}
    let sentence_test
    function test_train(sentence, lengthdata) {
        let timmot;
        let timhai;
        let y = 0;
        let test = []
        let word;
        sentence_lowerCase = sentence.toLowerCase()
        bot.forEach(myFunc);
        function myFunc(item) {
            //Chạy duyệt qua từng câu trong arraytrain, thu thập các đặc trưng trùng khớp giữa từng câu trong arraytrain và câu test
            y = item.length
            if (y >= 8) { // y >= 8 tức là y có thể là một câu văn chứ không phải một từ riêng lẻ
                word = item.split(" ")
                word.forEach(mytrain)
                function mytrain(itemtrain) {
                    timhai = sentence_lowerCase.indexOf(itemtrain.toLowerCase())// Đưa cả hai vế về cùng một kiểu viết thường tất cả các chữ cái
                    if (timhai != -1 && timhai >= 1 && sentence_lowerCase.slice(timhai - 1, timhai).indexOf(" ") != -1) { // Kiểm tra việc split câu có chuẩn hay chưa và bắt đầu thu thập đặc trưng khớp
                        test.push(itemtrain.toLowerCase())
                    }
                }
            } else {
                timmot = sentence_lowerCase.indexOf(item.toLowerCase())
                if (timmot != -1) {
                    test.push(item.toLowerCase())
                }
            }
        }
        function deduplicate(arr) { // loại bỏ các từ trùng lặp
            return arr.filter((value, index, arr) => arr.indexOf(value) === index);
        }
        let ans = deduplicate(test);
        if (lengthdata > 2) {
            dataset[sentence] = [sentence.length, ans.length]
        } else {
            testsen[sentence] = [sentence.length, ans.length]
        }
    }

    for (var key_sentence in sentence_data) {
        if (key_sentence != undefined) {
            test_train(key_sentence, Object.keys(sentence_data).length)
        } else {
            break
        }
    }
    function count(arraydata) {
        array_elements = arraydata

        array_elements.sort();

        var current = null;
        var cnt = 0;
        for (var i = 0; i < array_elements.length; i++) {
            if (array_elements[i] != current) {
                if (cnt > 0) {
                    countelement[current] = cnt
                }
                current = array_elements[i];
                cnt = 1;
            } else {
                cnt++;
            }
        }
        if (cnt > 0) {
            countelement[current] = cnt
        }

    }
    function knn(k) {
        for (var key_sentence in dataset) {
            if (key_sentence != undefined) {
                let dist = Math.ceil(Math.sqrt(Math.pow((dataset[key_sentence][0] - testsen[sentence_test][0]), 2) + Math.pow((dataset[key_sentence][1] - testsen[sentence_test][1]), 2)))
                knn_result[key_sentence] = dist
            } else {
                break
            }
        }
        let sortdist = Object.values(knn_result).sort(function (a, b) { return a - b })
        for (let i = 0; i < k; i++) {
            sortedDist.push(sortdist[i])
        }
        count(sortedDist)
        let sortcount = Object.values(countelement).sort(function (a, b) { return a - b })
        var maxInNumbers = Math.max.apply(Math, sortcount);
        //check label
        for (var neighbor in knn_result) {
            for (var i in countelement) {
                if (countelement[i] == maxInNumbers) {
                    if (knn_result[neighbor] == i) {
                        results_label = sentence_data[neighbor]
                        savedataset[sentence_test] = results_label
                    }
                }
            }
        }
    }

    for (var key_sentence in test_sentence_data.bot()) {
        if (key_sentence != undefined) {
            sentence_test = key_sentence
            test_train(key_sentence, 1)
            knn(k + 1)
            bigdata[k + 1] = savedataset
        } else {
            break
        }
    }
}
for (var k = 0; k < 10; k++) {
    find_best_k(k)
}
let scores_list = {}
if (bigdata != null && bigdata != {}) {
    for (var k in bigdata) {
        var scores = 1
        for (var sentence_check in bigdata[k]) {
            if (bigdata[k][sentence_check] == ready_check[sentence_check]) {
                scores += 1
            }
        }
        scores_list[k] = scores
    }
    console.log('scores_list k: ', scores_list)
}
function countvalueof_k_rep(arraydata) {
    array_elements = arraydata

    array_elements.sort();

    var current = null;
    var cnt = 0;
    for (var i = 0; i < array_elements.length; i++) {
        if (array_elements[i] != current) {
            if (cnt > 0) {
                vaulek_rep[current] = cnt
            }
            current = array_elements[i];
            cnt = 1;
        } else {
            cnt++;
        }
    }
    if (cnt > 0) {
        vaulek_rep[current] = cnt
    }

}
let sort_scores_list = Object.values(scores_list).sort(function (a, b) { return a - b }) // Object.values(<name_object>).sort(function (a, b) { return a - b }) best solution convert object to array
countvalueof_k_rep(sort_scores_list)
let sort_valueofk_rep_list = Object.values(vaulek_rep).sort(function (a, b) { return a - b })
var maxInNumbers = Math.max.apply(Math, sort_valueofk_rep_list);
let area_k_to_check = []
for (var k in vaulek_rep) {
    if (vaulek_rep[k] == maxInNumbers) {
        area_k_to_check.push(k)
    }
}
var bestvalue_K = Math.max.apply(Math, area_k_to_check);
var bestk 
for (var k in scores_list){
    if(scores_list[k] == bestvalue_K){
        bestk = k
    }
}
console.log('best K: ',bestk)