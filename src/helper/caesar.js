//using this library to check if the unscrambled word is actually a word
var checkWord = require('check-word'),
    words = checkWord('en');

var fs = require('fs')

//recreating mod function so that modulus of a negative remains positive
function mod(n, m) {
    return ((n % m) + m) % m;
}
//caesar solver
export let caesar = (cipher) => {
    //because js does not have good ascii support I use the alphabet to index my letters
    
    const alphabetArr = "abcdefghijklmnopqrstuvwxyz".split("");

    //storing unscrambled results
    let store = []

    //checking all caesar shifts
    for (let cipher_shift = 1; cipher_shift < 26; cipher_shift++) {
        let shifted_cipher = ""
        for (let i = 0; i < cipher.length; i++) {

            //getting the current letter
            const curr_char = cipher[i]
                //finding the alphabet index using my earlier aray
            const alpha_index = alphabetArr.indexOf(curr_char)

            //if index is -1 we leave it be as it is a space
            if (alpha_index === -1) {
                shifted_cipher += cipher[i];
                //console.log(`yo this is ${cipher[i]}`)
                continue;
            }

            //here we shift and then mod the answer to get our new index
            const decrypt_char = mod((alpha_index - cipher_shift), 26)
                //append to our result
            shifted_cipher += alphabetArr[decrypt_char]
        }

        //here we check if our deciphered word is actually english or not
        const split_words = shifted_cipher.split(" ")
        if (words.check(split_words[0]) || split_words[0] === "i") {
            store.push(shifted_cipher)
        }
    }
    //logging the answer
    console.log(store)
}
