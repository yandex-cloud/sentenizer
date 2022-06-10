# sentenizer
sentenizer — rule-based NLP library for sentence segmentation with **russian language** support

## api

### sentenize
takes text of type `string` and returns segmented sentences as `string[]`

#### type
```
sentenize :: string -> string[]
```

## usage
```
const {sentenize} = require('sentenizer');

const text = 'Он купил фрукты - яблоки, бананы, и т. д. все были очень рады угощению. Вот такой он добродушный наш родственник И. В. Иванов.';

const sentences = sentenize(text);
// sentences:
// [
//  'Он купил фрукты - яблоки, бананы, и т. д. все были очень рады угощению.',
//  'Вот такой он добродушный наш родственник И. В. Иванов.'
// ]
```
