const myModule = require('./arraytrainbot');
const sentences_bot = require('./datasentence')
const sentence_data = sentences_bot.bot()
let bot = myModule.bot();
let dataset = {}
let testsen = {}
let knn_result = {}
let sortedDist = []
let countelement = {}
let k_sentence = []
let k_label = []
let accuracy
let results_label
/* ==========<Train>=========== */

module.exports.check_sensitive = function(text){

    function test_train(sentence, lengthdata) {
        let timmot;
        let timhai;
        let y = 0;
        let test = []
        let word;
        let sentence_lowerCase = sentence.toLowerCase()
        bot.forEach(myFunc);
        function myFunc(item) {
            //Chạy duyệt qua từng câu trong arraytrain, thu thập các đặc trưng trùng khớp giữa từng câu trong arraytrain và câu test
            y = item.length
            if (y >= 8) { // y >= 8 tức là y có thể là một câu văn chứ không phải một từ riêng lẻ
                word = item.split(" ")
                word.forEach(mytrain)
                function mytrain(itemtrain) {
                    timhai = sentence_lowerCase.lastIndexOf(itemtrain.toLowerCase())// Đưa cả hai vế về cùng một kiểu viết thường tất cả các chữ cái
                    if (timhai != -1  && sentence_lowerCase.slice(timhai - 1, timhai).lastIndexOf(" ") != -1) { // Kiểm tra việc split câu có chuẩn hay chưa và bắt đầu thu thập đặc trưng khớp
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
        let split_sentence = sentence.split(" ")
        if (lengthdata > 2) {
            dataset[sentence] = [ans.length/split_sentence.length, ans.length]
        } else {
            testsen[sentence] = [ans.length/split_sentence.length, ans.length]
        }
    }

    for (var key_sentence in sentence_data) {
        if (key_sentence != undefined) {
            test_train(key_sentence, Object.keys(sentence_data).length)
        } else {
            break
        }
    }
    //console.log(dataset)
    let test_sentence = text
    test_train(test_sentence, 1)
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
                let dist = Math.ceil(Math.sqrt(Math.pow((dataset[key_sentence][0] - testsen[test_sentence][0]), 2) + Math.pow((dataset[key_sentence][1] - testsen[test_sentence][1]), 2)))
                knn_result[key_sentence] = dist
            } else {
                break
            }
        }
        let sortdist = Object.values(knn_result).sort(function (a, b) { return a - b })
        for (let i = 0; i < k; i++) {
            sortedDist.push(sortdist[i])
        }
        for (var i in sortedDist) {
            for (var sentence_resultdist in knn_result) {
                if (knn_result[sentence_resultdist] == sortedDist[i] && k_sentence.length < k ) {
                    k_sentence.push(sentence_resultdist)
                }
            }
        }
        for (var sentence in k_sentence) {
            k_label.push(sentence_data[k_sentence[sentence]])
        }
        count(k_label)
        let sortcount = Object.values(countelement).sort(function (a, b) { return a - b })
        var maxInNumbers = Math.max.apply(Math, sortcount);
        console.log('maxInNumbers: ', maxInNumbers)
        for (var label in countelement) {
            if (countelement[label] == maxInNumbers) {
                results_label = label
            }
        }
        accuracy = Math.round((maxInNumbers/k)*100)
    }

    var k = 5
    knn(k)
    console.log(String(k)+' khoảng cách gần nhất: ', sortedDist)
    k_sentence != null && k_sentence != [] ? console.log(String(k)+' câu gần nhất: ', k_sentence) : console.log()
    k_label != null && k_label != [] ? console.log(String(k)+' câu gần nhất: ', k_label) : console.log()
    console.log('result label: ', results_label)
    console.log('Độ chính xác', String(accuracy)+'%' )
    return [text, results_label, accuracy]
}