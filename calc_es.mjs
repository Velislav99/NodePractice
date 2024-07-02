import * as readline from 'readline';
import { stdin as input, stdout as output } from 'process';


const rl = readline.createInterface({
    input,
    output
});

function question (query){
    return new Promise((resolve) => {
        rl.question(query, resolve);
    });

}

let answer = await question('Enter your simple equation:');

while (answer !== 'exit') {
    try {
        const value = eval(input);
        console.log(value);
    } catch (e) {
        console.log('Invalid equation');
    }
    answer = await question('Enter your simple equation:');
}

rl.close();