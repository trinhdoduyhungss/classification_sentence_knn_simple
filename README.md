# classification_Vietnamese_sentence_knn_simple


- > It's example just fun.
- > You should run find_k.js to get best k before run testtrainwithknn.js.
- > All is javascript and I don't use any library to build it.
- > I hope it can help you fun and learn KNN to easy.
- > Try it, Good luck <3 !!!!


# Data classified sentences ready for KNN
| Sentence | Type |
|--------------|-------|
| Thứ phò cẩu | Câu bị nghi vấn |
|Con cẩu sanh|Câu bị nghi vấn|
|Bươm bướm dối trá không thấy ngượng mồm|Câu bị nghi vấn|
|Nhớ gia đình ạ|Câu bình thường|
|Bản thân của ngày xưa|Câu bình thường|
|Gặt hái được nhiều thành công|Câu bình thường|
|May mắn lắm đó nha|Câu bình thường|
|Tui nói ông nghe nè, tui yêu ông|Câu bình thường|
|Thương em là điều anh không thể ngờ|Câu bình thường|
|em muốn uống trà sữa|Câu bình thường|
|xịt sữa|Câu bị nghi vấn|
|bình thường, cx ko hay chi mấy|Câu bình thường|
|Thay ava chào năm mới cho đỡ mốc|Câu bình thường|
|..See more at datasentence.js...|...See more at datasentence.js..|

# Bad words
|Word|
|----|
|cc|
|đồ chó|
|clon|
|đm|
|địt con mẹ|
|địt mẹ|
|chu cái mỏ lồn|
|súc vật|
|Đạp mày nát bét|
|Đéo|
|Đè bẹp mày|
|Khinh tao à|
|...See more at arraytrainbot.js...|

# List K test
|K|Correct prediction|
|---|----|
|1|56|
|2|55|
|3|55|
|2|55|
|3|55|
|4|55|
|5|55|
|6|51|
|7|51|
|8|51|
|9|51|
|10|51|

```
That is result for find_k.js : best K : 5 =))) It isn't good but not bad :V That was an objective result in 10 test rounds
The accuracy is 80% for 2052 bad words (word + sentence contain bad words) and 68 classified sentences 
```
