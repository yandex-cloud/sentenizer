// const sentenize = x => x;

/*
      DELIMITER = ([=:;]-?[)(]{1,3}|[\.\?!…;"„'»”’\)\]\}])
        DELIMETER = smiles or delimeters
        smiles = r'[=:;]-?[)(]{1,3}'  # :-) ;) =(((
        delimeters = ENDINGS + ';' + GENERIC_QUOTES + CLOSE_QUOTES + CLOSE_BRACKETS
          ENDINGS        = '.?!…'
          GENERIC_QUOTES = '"„\''
          CLOSE_QUOTES   = '»”’'
          CLOSE_BRACKETS = ')]}'
*/

const delimiters = /([.?!…;])/gmu;
// . ? ! ... ;

function sentenize(text) {
    return text.split(delimiters);
}

export {sentenize};
